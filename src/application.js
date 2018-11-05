const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  nativeImage,
  globalShortcut,
  ipcMain,
  clipboard
} = require("electron");
const path = require("path");
const url = require("url");
const robot = require("robotjs");
const ffi = require("ffi");
const ref = require("ref");
const Struct = require("ref-struct");
const iconv = require("iconv-lite");
const ioHook = require("iohook");
const zeroFill = require("zero-fill");
const romanizer = require("romanizer");
const nihongo = require("nihongo");
var japanese = require("japanese");
let force_quit = false;
let fKeyPressed = false;
// NeDb
let Datastore = require("nedb");
let history = new Datastore({
  filename: "./nedb/history.nedb",
  autoload: true
});
let save = new Datastore({
  filename: "./nedb/save.nedb",
  autoload: true
});
let filter = new Datastore({
  filename: "./nedb/filter.nedb",
  autoload: true
});
let source = new Datastore({
  filename: "./nedb/source.nedb",
  autoload: true
});
// flag
let isDesktop = false;
let isFocused = false;

const FILETYPE = ["text", "image", "file", "excel"];

const WndClassEx = Struct({
  cbSize: "uint32",
  style: "uint32",
  lpfnWndProc: "pointer", // callback 'int32', ['pointer', 'uint32', 'int32', 'uint32']
  cbClsExtra: "int32",
  cbWndExtra: "int32",
  hInstance: "pointer", // can be 0?
  hIcon: "pointer",
  hCursor: "pointer",
  hbrBackground: "pointer",
  lpszMenuName: "pointer",
  lpszClassName: "pointer",
  hIconSm: "pointer"
});

const poiterType = ref.refType(ref.types.void);
const WndClassExPtr = ref.refType(WndClassEx);

const kernel32 = new ffi.Library("kernel32", {
  OpenProcess: ["pointer", ["uint32", "int", "uint32"]],
  GetCurrentProcessId: ["uint32", []],
  GetCurrentThreadId: ["uint32", []],
  GlobalLock: [poiterType, [poiterType]],
  GlobalUnlock: ["int8", ["ulong"]]
});

const user32 = new ffi.Library("user32", {
  GetClassNameW: ["int32", ["pointer", "pointer", "uint32"]],
  GetDesktopWindow: ["pointer", []],
  BringWindowToTop: ["bool", ["pointer"]],
  FindWindowA: ["pointer", ["string", "string"]],
  AttachThreadInput: ["bool", ["int", "long", "bool"]],
  SetWindowPos: [
    "bool",
    ["pointer", "int", "int", "int", "int", "int", "uint"]
  ],
  GetForegroundWindow: ["pointer", []],
  GetWindowThreadProcessId: ["uint32", ["pointer", "pointer"]],
  GetActiveWindow: [poiterType, []],
  GetWindow: [poiterType, [poiterType, "int32"]],
  GetParent: [poiterType, [poiterType]],
  SetForegroundWindow: ["bool", [poiterType]],
  RegisterClassExW: ["int32", [WndClassExPtr]],
  CreateWindowExW: [
    poiterType,
    [
      "int32",
      poiterType,
      poiterType,
      "int32", // style, name, name, style
      "int32",
      "int32",
      "int32",
      "int32", // x, y, w, h
      poiterType,
      poiterType,
      poiterType,
      poiterType // handles
    ]
  ],
  DefWindowProcW: ["uint32", ["pointer", "uint32", "int32", "pointer"]],
  OpenClipboard: ["int8", ["ulong"]],
  CloseClipboard: ["int8", []],
  SetClipboardData: ["ulong", ["uint", "ulong"]],
  GetClipboardData: [poiterType, ["uint"]],
  EnumClipboardFormats: ["uint", ["uint"]],
  RegisterClipboardFormatA: ["uint", ["string"]],
  AddClipboardFormatListener: ["bool", [poiterType]]
});

const shell32 = new ffi.Library("Shell32", {
  DragQueryFileA: ["uint", [poiterType, "uint", "string", "uint"]]
});

const psapi = new ffi.Library("psapi", {
  GetModuleBaseNameW: ["uint32", ["pointer", "pointer", "pointer", "uint32"]]
});

module.exports = class Application {
  createWindow() {
    let win = new BrowserWindow({
      title: "Pastify",
      resizable: false,
      width: 900,
      maxWidth: 900,
      minWidth: 900,
      height: 600,
      maxHeight: 600,
      minHeight: 600,
      skipTaskbar: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        preload: __dirname + "/preload.js"
      }
    });
    this.startUrl =
      process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, "/../build/index.html"), // 警告：このファイルを移動する場合ここの相対パスの指定に注意してください
        protocol: "file:",
        slashes: true
      });

    win.loadURL(this.startUrl);
    ioHook.start();
    win.setMenu(null);

    win.on("blur", function(e) {
      if (!force_quit && isFocused) {
        e.preventDefault();
        win.hide();
        win.webContents.send("test", "blured");
        isFocused = false;
      }
    });

    ipcMain.on("focused", (event, arg) => {
      win.webContents.send("test", "focused");
      isFocused = true;
    });

    win.on("close", function(e) {
      if (!force_quit) {
        e.preventDefault();
        showLastActiveWindow();
        win.hide();
      }
    });
    win.on("closed", function() {
      win = null;
    });
    win.webContents.openDevTools();
    const trayIcon = new Tray(
      nativeImage.createFromPath(__dirname + "/../build/icon.png")
    );

    // タスクトレイに右クリックメニューを追加
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "表示",
        click: function() {
          win.show();
        }
      },
      {
        label: "exit",
        click: function() {
          app.quit();
        }
      }
    ]);
    trayIcon.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    trayIcon.setToolTip(app.getName());

    // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
    trayIcon.on("click", function() {
      win.show();
    });

    globalShortcut.register("Esc", () => {
      if (win.isFocused()) {
        if (!force_quit) {
          showLastActiveWindow();
          win.hide();
        }
      }
    });

    let a, b;
    let image;
    globalShortcut.register("ctrl+q", () => {
      // const curerntHandle = user32.GetActiveWindow();
      // const lastWindowHandle = user32.GetWindow(curerntHandle, 2);
      // let tempHandle = user32.GetParent(lastWindowHandle);
      // user32.SetForegroundWindow(tempHandle);
    });
    globalShortcut.register("ctrl+w", () => {
      // b = new Buffer(Buffer.byteLength(a));
      // a.copy(b);
      // win.webContents.send("test", b);
    });
    // globalShortcut.register('e', () => {
    // win.show();
    // forceFocus.focusWindow(win);
    // })
    globalShortcut.register("ctrl+r", () => {
      win.show();
      win.focus();
      win.webContents.send("launch");
    });

    //iohook
    ioHook.on("keyup", event => {
      const handle = kernel32.GetCurrentProcessId();
      if (event.keycode === 42) {
        if (!fKeyPressed) {
          fKeyPressed = true;
          setTimeout(() => {
            fKeyPressed = false;
          }, 500);
        } else {
          win.setSkipTaskbar(false);
          var winToSetOnTop = user32.FindWindowA(null, "Pastify");
          var foregroundHWnd = user32.GetForegroundWindow();

          const pnameLength = 1024;
          const pnameBuf = Buffer.alloc(pnameLength);
          pnameBuf.type = ref.types.CString;
          const bl = user32.GetClassNameW(foregroundHWnd, pnameBuf, 1024);
          const className = ref
            .reinterpretUntilZeros(pnameBuf, bl)
            .toString("ucs2");
          if (className == "Progman") {
            isDesktop = true;
          }

          var currentThreadId = kernel32.GetCurrentThreadId();
          var windowThreadProcessId = user32.GetWindowThreadProcessId(
            foregroundHWnd,
            null
          );
          var setWindowPos1 = user32.SetWindowPos(
            winToSetOnTop,
            -1,
            0,
            0,
            0,
            0,
            0x0001 | 0x0002
          );
          var setWindowPos2 = user32.SetWindowPos(
            winToSetOnTop,
            -2,
            0,
            0,
            0,
            0,
            0x0001 | 0x0002 | 0x0040
          );
          var attachThreadInput = user32.AttachThreadInput(
            windowThreadProcessId,
            currentThreadId,
            1
          );
          var bw = user32.BringWindowToTop(winToSetOnTop);
          var attachThreadInput = user32.AttachThreadInput(
            windowThreadProcessId,
            currentThreadId,
            0
          );

          win.setSkipTaskbar(true);
          robot.keyTap("r", "control");
        }
      }
    });

    const showLastActiveWindow = () => {
      let winToSetOnTop;

      win.setSkipTaskbar(false);
      const curerntHandle = user32.GetActiveWindow();
      let tempHandle = user32.GetWindow(curerntHandle, 2);
      let lastWindowHandle;

      while (!ref.isNull(tempHandle)) {
        lastWindowHandle = tempHandle;
        tempHandle = user32.GetParent(lastWindowHandle);
      }

      if (isDesktop) {
        winToSetOnTop = user32.GetDesktopWindow();
        isDesktop = false;
      } else {
        winToSetOnTop = lastWindowHandle;
      }

      var currentThreadId = kernel32.GetCurrentThreadId();

      const lpdwProcessId = ref.refType(ref.types.ulong);
      const pidAddress = ref.alloc(lpdwProcessId);
      var windowThreadProcessId = user32.GetWindowThreadProcessId(
        winToSetOnTop,
        pidAddress
      );

      const pid = pidAddress.readInt32LE(0);
      const curerntProcessHandle = kernel32.OpenProcess(2097151, false, pid);
      const pnameLength = 1024;
      const pnameBuf = Buffer.alloc(pnameLength);
      pnameBuf.type = ref.types.CString;
      const bl = psapi.GetModuleBaseNameW(
        curerntProcessHandle,
        null,
        pnameBuf,
        1024
      );
      const app_EXE = ref.reinterpretUntilZeros(pnameBuf, bl).toString("ucs2");
      const app = app_EXE.substr(0, app_EXE.length - 4);

      var setWindowPos1 = user32.SetWindowPos(
        winToSetOnTop,
        -1,
        0,
        0,
        0,
        0,
        0x0001 | 0x0002
      );
      var setWindowPos2 = user32.SetWindowPos(
        winToSetOnTop,
        -2,
        0,
        0,
        0,
        0,
        0x0001 | 0x0002 | 0x0040
      );
      var attachThreadInput = user32.AttachThreadInput(
        currentThreadId,
        windowThreadProcessId,
        1
      );
      var setForegroundWindow = user32.SetForegroundWindow(winToSetOnTop);
      var attachThreadInput = user32.AttachThreadInput(
        currentThreadId,
        windowThreadProcessId,
        0
      );
      win.setSkipTaskbar(true);
      return app;
    };

    addClipboardListener();
    function addClipboardListener() {
      const WndProc = ffi.Callback(
        "uint32",
        ["pointer", "uint32", "int32", "pointer"],
        function(hwnd, uMsg, wParam, lParam) {
          if (uMsg == 797 && wParam != 0) {
            const curerntWindowHandle = user32.GetForegroundWindow();
            const lpdwProcessId = ref.refType(ref.types.ulong);
            const pidAddress = ref.alloc(lpdwProcessId);
            const tid = user32.GetWindowThreadProcessId(
              curerntWindowHandle,
              pidAddress
            );
            const pid = pidAddress.readInt32LE(0);

            const curerntProcessHandle = kernel32.OpenProcess(
              2097151,
              false,
              pid
            );

            const pnameLength = 1024;
            const pnameBuf = Buffer.alloc(pnameLength);
            pnameBuf.type = ref.types.CString;
            const bl = psapi.GetModuleBaseNameW(
              curerntProcessHandle,
              null,
              pnameBuf,
              1024
            );
            const sourceApp_EXE = ref
              .reinterpretUntilZeros(pnameBuf, bl)
              .toString("ucs2");
            const sourceApp = sourceApp_EXE.substr(0, sourceApp_EXE.length - 4);

            updateAppDB(sourceApp);

            const cfList = readCFList();
            const clipData = saveClipboard(cfList);
            sendClipDataToRenderer(clipData, sourceApp);
          }
        }
      );

      function updateAppDB(sourceApp) {
        source.findOne({ text: sourceApp }, (err, doc) => {
          if (!doc) {
            doc = {
              key: sourceApp,
              value: sourceApp,
              valueForSort: sourceApp.toLowerCase(),
              text: sourceApp
            };
            source.insert(doc, (err, newDoc) => {
              getSourceAppOption();
            });
          }
        });
      }

      function getSourceAppOption() {
        source
          .find({})
          .sort({ valueForSort: 1 })
          .exec((err, doc) => {
            win.webContents.send("getSourceAppOption", doc);
          });
      }

      ipcMain.on("getSourceAppOption", (event, arg) => {
        getSourceAppOption();
      });

      const className = new Buffer("Node.js WinForms Class\0", "ucs-2");
      const windowName = new Buffer("Node.js WinForms App\0", "ucs-2");
      // Window Class
      const wClass = new WndClassEx();
      wClass.lpszClassName = className;
      wClass.lpfnWndProc = WndProc;
      wClass.cbSize = 80;

      if (user32.RegisterClassExW(wClass.ref())) {
        const hWnd = user32.CreateWindowExW(
          0,
          className,
          windowName,
          0,
          0,
          0,
          0,
          0,
          null,
          null,
          null,
          null
        );
        if (!ref.isNull(hWnd)) {
          user32.AddClipboardFormatListener(hWnd);
        }
      }
    }

    //send clipboard data to renderer
    function sendClipDataToRenderer(clipData, sourceApp) {
      //ソート用にテキストサマリーの日本語をローマ字に変換
      //ライブラリが非同期のため、ここで変換しておく。
      let textForSort;
      if (isNaN(clipData.textSummary)) {
        //テキストデータが文字列の場合、ローマ小文字に
        const temp = clipData.textSummary.toLowerCase();
        //カタカナはすべてひらがなに
        textForSort = japanese.hiraganize(temp);
      } else {
        //テキストデータが数値の場合、ゼロ埋めに
        textForSort = zeroFill(100, clipData.textSummary);
      }

      let docs = {
        db: "history",
        time: new Date().getTime(),
        sourceApp: sourceApp,
        mainFormat: clipData.mainFormat,
        textData: clipData.textData,
        textForFind: clipData.textData.replace(/\r?\n/g, ""),
        textSummary: clipData.textSummary,
        textForSort: textForSort,
        imageSummary: clipData.imageSummary,
        content: clipData.dataList
      };

      history.insert(docs, (err, newDocs) => {
        history.count({}, (err, itemCount) => {
          const itemSummary = createItemSummary(newDocs);
          win.webContents.send("sendNewItem", itemSummary, itemCount);
        });
      });
    }

    function createItemSummary(item) {
      const itemSummary = {
        db: item.db,
        id: item._id,
        time: item.time,
        format: item.mainFormat,
        text: item.textSummary,
        image: item.imageSummary,
        popoverOpen: false,
        hotkey: false
      };

      return itemSummary;
    }

    function saveClipboard(cfList) {
      let data;
      let otherDataList = [];
      let result;
      let mainFormat;
      let picName;
      let picName2 = null;
      let picURL;
      let fileList = [];

      const TXTLEN = 200;
      const IMGHEIGHT = 100;
      let textData = null;
      let textSummary = null;
      let textForSort = null;
      let imageSummary = null;

      Object.keys(cfList).forEach(function(format, i) {
        switch (cfList[format].formatName) {
          case "EXCEL":
            data = clipboard.readBuffer("XML Spreadsheet");
            break;
          case "TEXT":
            data = clipboard.readText();
            //テキストデータが大きすぎる場合カット
            if (data.length > TXTLEN) {
              textSummary = data.substring(0, TXTLEN);
            } else {
              textSummary = data;
            }
            break;
          case "IMAGE":
            let tempData = clipboard.readImage();

            data = tempData.toDataURL();
            const height = tempData.getSize().height;
            //イメージデータが大きすぎる場合縮小
            if (height > IMGHEIGHT) {
              imageSummary = tempData
                .resize({
                  height: IMGHEIGHT,
                  quality: "good"
                })
                .toDataURL();
            } else {
              imageSummary = tempData
                .resize({
                  quality: "good"
                })
                .toDataURL();
            }
            break;
          case "HTML":
            data = readHTML();
            switch (mainFormat) {
              case "IMAGE":
                picURL = data.match('s*"([^"]+)"');
                picName = picURL[1]
                  .split("/")
                  .pop()
                  .split("?")[0];
                picName2 = picName.split(":")[0];
                break;

              default:
                break;
            }
            break;
          case "FILE":
            data = readFile();
            fileList = data.join("");
            break;
          default:
            break;
        }

        //要素先頭をメインフォーマットとする
        if (i == 0) {
          mainFormat = cfList[format].formatName;
        }

        if (cfList[format].formatName === "TEXT") {
          textData = data;
        } else {
          result = {
            format: cfList[format].formatName,
            data: data
          };
          otherDataList.push(result);
        }
      });

      if (mainFormat != "TEXT") {
        switch (mainFormat) {
          case "IMAGE":
            if (!picName2) {
              textData = "untitled.jpg";
            } else {
              textData = picName2;
            }
            //テキストデータが大きすぎる場合カット
            if (textData.length > TXTLEN) {
              textSummary = textData.substring(0, TXTLEN);
            } else {
              textSummary = textData;
            }
            break;
          case "FILE":
            textData = data.join("\n");
            //テキストデータが大きすぎる場合カット
            if (textData.length > TXTLEN) {
              textSummary = textData.substring(0, TXTLEN);
            } else {
              textSummary = textData;
            }
            break;
          default:
            break;
        }
      }

      const clipData = {
        mainFormat: mainFormat,
        dataList: otherDataList,
        textData: textData,
        textSummary: textSummary,
        textForSort: textForSort,
        imageSummary: imageSummary
      };

      return clipData;
    }

    function readFile() {
      if (!openClipboard()) return "ng";
      const filecf = 15;
      var handle = user32.GetClipboardData(filecf);
      var result;
      var gRef = kernel32.GlobalLock(handle);
      if (ref.isNull(gRef)) {
      } else {
        var data = [];
        var tmp = Buffer.alloc(512);
        tmp.type = ref.types.CString;
        var fileLength = shell32.DragQueryFileA(gRef, 0xffffffff, tmp, 512);
        for (var i = 0; i < fileLength; i++) {
          var charNum = shell32.DragQueryFileA(gRef, i, ref.NULL_POINTER, 0);
          var fileName = Buffer.alloc(charNum + 1);
          fileName.type = ref.types.CString;
          shell32.DragQueryFileA(gRef, i, fileName, charNum + 1);
          data.push(
            iconv.decode(ref.reinterpretUntilZeros(fileName, 1, 0), "Shift_JIS")
          );
        }
        // result = { type: type, format: filecf, data: data };
        result = data;
      }
      kernel32.GlobalUnlock(handle);
      closeClipboard();
      return result;
    }

    function readHTML() {
      if (!openClipboard()) return "ng";
      const formatNameHTML = ref.allocCString("HTML Format", "utf8");
      const htmlcf = user32.RegisterClipboardFormatA(formatNameHTML);
      var handle = user32.GetClipboardData(htmlcf);
      var reuslt;
      var gRef = kernel32.GlobalLock(handle);
      if (ref.isNull(gRef)) {
      } else {
        var buf = ref.reinterpretUntilZeros(gRef, 1, 0);
        var text = iconv.decode(buf, "utf8");
        reuslt = text;
      }
      kernel32.GlobalUnlock(handle);
      closeClipboard();
      return reuslt;
    }

    function readCFList() {
      const formatNameHTML = ref.allocCString("HTML Format", "utf8");
      const formatNameEXCEL = ref.allocCString("XML Spreadsheet", "utf8");

      const textcf = 1;
      const imagecf = 2;
      const filecf = 15;
      const htmlcf = user32.RegisterClipboardFormatA(formatNameHTML);
      const excelcf = user32.RegisterClipboardFormatA(formatNameEXCEL);

      if (!openClipboard()) return;
      var result = [];
      var iterator = getNextFormatInfo();
      while ((iterator = iterator.next())) {
        if (iterator.formatName) {
          result.push({
            formatName: iterator.formatName,
            formatPriority: iterator.priority
          });
        }
      }
      var sortedResult = [].slice.call(result).sort(function(x, y) {
        return x.formatPriority > y.formatPriority;
      });
      closeClipboard();
      return sortedResult;

      function getNextFormatInfo() {
        var format = 0,
          formatNameSize = 512;
        return {
          format: format,
          formatName: "",
          next: next
        };

        function next() {
          format = user32.EnumClipboardFormats(format);
          if (format) {
            var r = { format: format };
            switch (format) {
              case excelcf:
                r.formatName = "EXCEL";
                r.priority = 1;
                break;
              case textcf:
                r.formatName = "TEXT";
                r.priority = 2;
                break;
              case imagecf:
                r.formatName = "IMAGE";
                r.priority = 3;
                break;
              case htmlcf:
                r.formatName = "HTML";
                r.priority = 4;
                break;
              case filecf:
                r.formatName = "FILE";
                r.priority = 5;
                break;
              default:
                break;
            }
            r.next = next;
            return r;
          } else {
            return false;
          }
        }
      }
    }

    function openClipboard() {
      var open = user32.OpenClipboard(0);
      return open;
    }

    function closeClipboard() {
      var close = user32.CloseClipboard();
      return close;
    }

    // レンダラーにてキー入力時の処理
    ipcMain.on("sendPasteValue", (event, arg) => {
      showLastActiveWindow();
      win.hide();
    });

    // 初回レンダー時にフィルター取得
    ipcMain.on("getFilterFirst", (event, arg) => {
      filter.count({}, function(err, count) {
        //デフォルトフィルターが存在しない場合、作成
        if (count === 0) {
          function Filter() {
            this.db = "filter";
            this.name = "Default S/F";
            this.isHotkeyApplied = false;
            this.keywordsIncludes = "";
            this.keywordsExcludes = "";
            this.isPeriodAllDay = true;
            this.startPeriod = null;
            this.endPeriod = null;
            this.fileType = {
              text: false,
              image: false,
              file: false,
              excel: false
            };
            this.apps = [];
            this.tags = null;
            this.order = false;
            this.sortBy = "time";
          }

          const newFilter = new Filter();

          filter.insert(newFilter, (err, doc) => {
            win.webContents.send("sendFilterFirst", doc);
          });
          //デフォルトフィルターが存在する場合、読み込み
        } else {
          filter.findOne({ name: "Default S/F" }, (err, doc) => {
            win.webContents.send("sendFilterFirst", doc);
          });
        }
      });
    });

    // 初回レンダー時にアイテム取得
    ipcMain.on("getItem", (event, itemFilter, db) => {
      if (db === "filter") {
        eval(db).count({}, (err, itemCount) => {
          eval(db).find({ name: { $ne: "Default S/F" } }, function(err, docs) {
            win.webContents.send("getItem", docs, itemCount - 1, db);
          });
        });
      } else {
        const q = createQuery(itemFilter);
        eval(db).count({}, (err, itemCount) => {
          eval(db)
            .find(q.findkey)
            .sort(q.sort)
            .limit(20)
            .exec((err, docs) => {
              const itemSummary = [];
              docs.forEach(doc => itemSummary.push(createItemSummary(doc)));
              win.webContents.send("getItem", itemSummary, itemCount, db);
            });
        });
      }
    });

    // 表示中の取得時間以降のアイテムを追加取得
    ipcMain.on("getOldItem", (event, itemFilter, itemLoadCount, db) => {
      if (db === "filter") {
        eval(db).count({}, (err, itemCount) => {
          eval(db)
            .find({ name: { $ne: "Default S/F" } })
            .skip(itemLoadCount)
            .limit(20)
            .exec((err, docs) => {
              win.webContents.send("sendOldItem", docs, itemCount - 1, db);
            });
        });
      } else {
        const q = createQuery(itemFilter);
        eval(db).count({}, (err, itemCount) => {
          eval(db)
            .find(q.findkey)
            .sort(q.sort)
            .skip(itemLoadCount)
            .limit(20)
            .exec((err, docs) => {
              const itemSummary = [];
              docs.forEach(doc => itemSummary.push(createItemSummary(doc)));
              win.webContents.send("sendOldItem", itemSummary, itemCount, db);
            });
        });
      }
    });

    //クエリ作成
    function createQuery(filter) {
      const query = {};
      query.findkey = {};

      // ソート
      const key =
        filter.sortBy === "textSummary" ? "textForSort" : filter.sortBy;
      const order = !filter.order ? -1 : 1;
      query.sort = { [key]: order };

      // キーワードフィルタ
      const keylistIn = [];
      const keyInSplit = filter.keywordsIncludes.split(" ");
      keyInSplit.forEach(v => {
        if (v !== "") {
          const escaped = v.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
          const key = `(?=.*${escaped})`;
          keylistIn.push(key);
        }
      });

      const keylistEx = [];
      const keyExSplit = filter.keywordsExcludes.split(" ");
      keyExSplit.forEach(v => {
        if (v !== "") {
          const escaped = v.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
          const key = `(?!.*${escaped})`;
          keylistEx.push(key);
        }
      });

      const keyIn = keylistIn.length === 0 ? "" : `(${keylistIn.join("")})`;
      const keyEx = keylistEx.length === 0 ? "" : `(${keylistEx.join("")})`;

      if (keyIn !== "" || keyEx !== "") {
        const pattern = `^${keyIn}${keyEx}.*$`;
        const regex = new RegExp(pattern, "i");
        query.findkey.textForFind = { $regex: regex };
      }

      //ファイルタイプフィルタ
      const fileType = [];
      FILETYPE.forEach(v => {
        if (filter.fileType[v]) {
          fileType.push(v.toUpperCase());
        }
      });
      if (fileType.length > 0) {
        query.findkey.mainFormat = { $in: fileType };
      }

      //アプリケーションフィルタ
      if (filter.apps.length > 0) {
        query.findkey.sourceApp = { $in: filter.apps };
      }

      return query;
    }

    // ペーストデータの詳細取得
    ipcMain.on("showDetail", (event, id, db, tabChanged) => {
      eval(db).findOne({ _id: id }, (err, doc) => {
        win.webContents.send("showDetail", doc, db, tabChanged);
      });
    });

    // アイテムの削除
    ipcMain.on("deleteItem", (event, id, item, index) => {
      eval(item).remove({ _id: id }, (err, doc) => {
        eval(item).count({}, (err, itemCount) => {
          win.webContents.send("deleteItem", id, item, itemCount, index);
        });
      });
    });
    // アイテムの保存
    ipcMain.on("saveItem", (event, id, db) => {
      eval(db).findOne({ _id: id }, (err, doc) => {
        delete doc._id;
        doc.db = "save";
        doc.time = new Date().getTime();
        save.insert(doc, (err, newDocs) => {
          save.count({}, (err, itemCount) => {
            const itemSummary = createItemSummary(newDocs);
            win.webContents.send("sendNewItem", itemSummary, itemCount, db);
          });
        });
      });
    });

    ipcMain.on("pasteItem", (event, id, db) => {
      eval(db).findOne({ _id: id }, (err, doc) => {
        clipboard.writeText(doc.textData);
        const appName = showLastActiveWindow();
        win.webContents.send("test", appName);
        win.hide();
        robot.keyTap("v", "control");
      });
    });
  }

  ready() {
    app.on("before-quit", function(e) {
      force_quit = true;
    });
    app.on("ready", this.createWindow);
    app.on("window-all-closed", () => {});
    // app.on('activate', () => {
    //     if (this.mainWindow === null) {
    //         this.createWindow();
    //     }
    // });
  }

  run() {
    this.ready();
  }
};
