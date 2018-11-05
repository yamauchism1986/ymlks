import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import isElectron from "is-electron";
import Waypoint from "react-waypoint";
import deepcopy from "deepcopy";
import ClipboardList from "./components/ClipboardList/ClipboardList";
import ClipboardDetail from "./components/ClipboardDetail";
import GridPageContainer from "./components/GridPageContainer";
import GridPageFilterContainer from "./components/GridPageFilterContainer";
import GridPageHeaderLeft from "./components/GridPageHeaderLeft";
import GridPageSideList from "./components/GridPageSideList";
import GridPageSideListHeader from "./components/GridPageSideListHeader";
import GridPageFilterHeader from "./components/GridPageFilterHeader";
import GridPageMainContent from "./components/GridPageMainContent";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Toast } from "react-onsenui";
// import "onsenui/css/onsenui.css";
// import "onsenui/css/onsen-css-components.css";

let timer;

const makeData = (number, titlePrefix = "Tab") => {
  const data = [];
  for (let i = 0; i < number; i++) {
    data.push({
      title: `${titlePrefix} ${i}`,
      content: (
        <div>
          Content {i}: Accusamus enim nisi itaque voluptas nesciunt repudiandae
          velit. <br />
          Ad molestiae magni quidem saepe et quia voluptatibus minima. <br />
          Omnis autem distinctio tempore. Qui omnis eum illum adipisci ab.{" "}
          <br />
        </div>
      )
    });
  }
  return data;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.showComplexNotification = this.showComplexNotification.bind(this);
    this.removeToast = this.removeToast.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleSideScroll = this.handleSideScroll.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handlePasteButton = this.handlePasteButton.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleSelectTab = this.handleSelectTab.bind(this);
    this.handleItemTabChange = this.handleItemTabChange.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.onItemFocus = this.onItemFocus.bind(this);
    this.onItemBlur = this.onItemBlur.bind(this);
    this.onKeyDownAtItemList = this.onKeyDownAtItemList.bind(this);
    this.updateFilter = this.updateFilter.bind(this);

    const tabs = makeData(0);

    this.state = {
      historyFilter: null,
      historyList: null,
      historyItemCount: 0,

      saveFilter: null,
      saveList: null,
      saveItemCount: 0,

      filterList: null,
      filterItemCount: 0,

      ClipboardDetail: null,
      tabs,
      tabIndex: 0,
      itemTabIndex: 0,
      toastShown: false,
      currentSelectedID: null,
      currentFocusedID: null,
      sourceAppOption: []
    };
  }

  handleTabChange(index) {
    this.setState({ activeIndex: index });
    console.log(this.state.activeIndex);
  }

  handleItemTabChange = (e, data) => {
    this.setState({ itemTabIndex: data.activeIndex });
  };

  componentDidMount() {
    // let sidebarHandle = ReactDOM.findDOMNode(this.refs.sidebar);
    let sidebarHandle = document.getElementById("sidebar");
    sidebarHandle.addEventListener("scroll", this.handleSideScroll);
    let input = ReactDOM.findDOMNode(this.refs.nameInput);
    input && input.focus();
    if (isElectron()) {
      //source appオプションの取得
      window.ipcRenderer.send("getSourceAppOption");
      window.ipcRenderer.on("getSourceAppOption", (event, option) => {
        this.setState({ sourceAppOption: option });
      });
      //フィルター初回取得
      window.ipcRenderer.send("getFilterFirst");
      //フィルターの初回表示
      window.ipcRenderer.on("sendFilterFirst", (event, filter) => {
        this.setState({ historyFilter: filter, saveFilter: filter });
        //クリップボード履歴の初回取得
        window.ipcRenderer.send("getItem", filter, "history");
        window.ipcRenderer.send("getItem", filter, "save");
        window.ipcRenderer.send("getItem", filter, "filter");
      });
      //クリップボード履歴の初回表示
      window.ipcRenderer.on("getItem", (event, item, itemCount, db) => {
        console.log("getItem");
        console.log("itemCount : " + itemCount);
        this.setState({
          [db + "List"]: item,
          [db + "ItemCount"]: itemCount
        });

        console.log(this.state.filterList);
      });

      //使ってる？？
      window.ipcRenderer.on("clipboard", (event, clipboard) => {
        this.setState({ historyList: clipboard });
        input && input.focus();
      });

      //アイテム選択時に詳細表示
      window.ipcRenderer.on("showDetail", (event, detail, db, tabChanged) => {
        this.setState({ ClipboardDetail: detail, itemTabIndex: 0 });
        // this.setState({ ClipboardDetail: detail });
        if (tabChanged) {
          this.refs[db].childNodes[0].childNodes[0].focus();
        }
      });

      //アイテム削除
      window.ipcRenderer.on("deleteItem", (event, id, db, itemCount, index) => {
        console.log("deleteItem");
        console.log("itemCount : " + itemCount);
        const itemList = this.state[db + "List"];
        const updatedItem = itemList.concat();
        updatedItem.some((v, i) => {
          if (v.id == id) updatedItem.splice(i, 1);
        });
        this.setState({
          [db + "List"]: updatedItem,
          [db + "ItemCount"]: itemCount
        });
        console.log(index);
        console.log(updatedItem.length);

        if (updatedItem.length !== 0) {
          if (updatedItem.length === index) {
            //最後のアイテムを削除した場合、フォーカスを削除アイテムの手前アイテムにセット
            this.refs[db].childNodes[0].childNodes[index - 1].focus();
          } else {
            //削除したアイテムの位置にフォーカスをセット
            this.refs[db].childNodes[0].childNodes[index].focus();
          }
        }
      });
      //クリップボード登録時にアイテムをリストに追加
      window.ipcRenderer.on("sendNewItem", (event, item, itemCount, db) => {
        console.log("sendNewItem");
        console.log("itemCount : " + itemCount);
        const itemList = this.state[item.db + "List"];
        let updatedItem;
        if (itemList) {
          updatedItem = [item].concat(itemList);
        } else {
          updatedItem = [item];
        }
        this.setState({
          [item.db + "List"]: updatedItem,
          [item.db + "ItemCount"]: itemCount
        });

        //クローン時の処理（セーブ画面からクローンした場合、クローンデータにフォーカスする）
        if (db === "save") {
          this.refs[db].childNodes[0].childNodes[0].focus();
        }
      });

      //スクロール最下部に来た時古いアイテムを追加表示
      window.ipcRenderer.on("sendOldItem", (event, item, itemCount, dbType) => {
        console.log("sendOldItem");
        console.log("itemCount : " + itemCount);

        const itemList = this.state[dbType + "List"];
        const updatedItem = itemList.concat(item);
        this.setState({ [dbType + "List"]: updatedItem });
      });

      //テスト表示用
      window.ipcRenderer.on("test", (event, clipboard) => {
        console.log(clipboard);
      });

      window.ipcRenderer.on("launch", event => {
        input && input.focus();
        window.ipcRenderer.send("focused");
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleSideScroll);
  }

  componentDidUpdate() {}

  pasteTarget(e) {
    e.target.value = "";
    window.ipcRenderer.send("sendPasteValue", "test");
  }

  showDetail(e) {
    const type = e.currentTarget.getAttribute("data-detailtype");
    const id = e.currentTarget.getAttribute("data-id");
    const item = e.currentTarget.getAttribute("data-item");
    let db;
    if (type === "filter") {
      db = "filter";
    } else {
      if (item === "history") {
        db = "history";
      } else {
        db = "save";
      }
    }
    window.ipcRenderer.send("showDetail", id, db);
  }

  //スクロール最下部に来た時古いアイテムを追加表示
  handleWaypointEnter() {
    let dbType;
    switch (this.state.tabIndex) {
      case 0:
        dbType = "history";
        break;
      case 1:
        dbType = "save";
        break;
      case 2:
        dbType = "filter";
        break;
      default:
        break;
    }
    if (
      this.state[dbType + "List"] !== null &&
      this.state[dbType + "List"].length < this.state[dbType + "ItemCount"]
    ) {
      window.ipcRenderer.send(
        "getOldItem",
        this.state[dbType + "Filter"],
        this.state[dbType + "List"].length,
        dbType
      );
    }
  }

  showComplexNotification() {
    Toast.push("Successfully saved", {
      label: "Cancel",
      handler: () => Toast.push("Canceled")
    });
  }

  handleShow() {
    if (this.state.toastShown) {
      this.setState({ toastShown: false });
      clearTimeout(timer);
      setTimeout(() => {
        this.setState({ toastShown: true });
        timer = setTimeout(() => {
          this.setState({ toastShown: false });
        }, 5000);
      }, 100);
    } else {
      this.setState({ toastShown: true });
      timer = setTimeout(() => {
        this.setState({ toastShown: false });
      }, 5000);
    }
  }

  handleDismiss() {
    this.setState({ toastShown: false });
  }

  removeToast() {
    setTimeout(() => {
      this.setState({ toastShown: false });
    }, 5000);
  }

  //ポップアップトグル
  togglePopup(e) {
    let id;
    if (!this.state.currentSelectedID) {
      id = e.currentTarget.getAttribute("data-id");
      this.setState({ currentSelectedID: id });
    } else {
      id = this.state.currentSelectedID;
      this.setState({ currentSelectedID: null });
    }
    const historyListCopy = Object.assign([], this.state.historyList); //creating copy of object
    const idx = historyListCopy.findIndex(elm => elm.id === id);
    historyListCopy[idx].popoverOpen = !this.state.historyList[idx].popoverOpen; //updating value
    this.setState({ historyListCopy });
  }

  //アイテムリストスクロール時にポップアップを閉じる
  handleSideScroll(event) {
    this.closePopup();
  }

  //アイテム削除
  deleteItem(id, item, index) {
    //アイテムリストが10以下になった場合、古いアイテムを取得する。
    //react-waypointがdelボタンで削除した場合、作動しない為
    if (
      this.state[item + "List"].length < 10 &&
      this.state[item + "List"].length < this.state[item + "ItemCount"]
    ) {
      window.ipcRenderer.send(
        "getOldItem",
        this.state[item + "Filter"],
        8,
        item
      );
    }
    window.ipcRenderer.send("deleteItem", id, item, index);
  }

  //DELETEボタン押下時
  handleDeleteButton(e, data) {
    const id = data.id;
    const item = data.item;
    const itemList = this.state[item + "List"];
    const index = itemList.findIndex(v => v.id == id);
    this.deleteItem(id, item, index);
  }

  handleSaveButton(e, data) {
    console.log("handleSaveButton");
    window.ipcRenderer.send("saveItem", data.id, data.item);
  }

  handlePasteButton(e, data) {
    console.log("handlePasteButton");
    window.ipcRenderer.send("pasteItem", data.id, data.item);
  }

  //ポップアップを閉じる
  closePopup() {
    if (this.state.currentSelectedID) {
      console.log("close popup");
      const id = this.state.currentSelectedID;
      this.setState({ currentSelectedID: null });
      const historyListCopy = Object.assign([], this.state.historyList); //creating copy of object
      const idx = historyListCopy.findIndex(elm => elm.id === id);
      historyListCopy[idx].popoverOpen = !this.state.historyList[idx]
        .popoverOpen; //updating value
      this.setState({ historyListCopy });
    }
  }
  //アイテムフォーカス時にフォーカスされているアイテムIDを取得
  onItemFocus(e) {
    console.log("onItemFocus");
  }

  //アイテムブラー時にフォーカスされているアイテムIDを解除
  onItemBlur(e) {
    console.log("onItemBlur");
  }

  //アイテムリストでキー押下時のイベント
  onKeyDownAtItemList(e) {
    console.log("onKeyDown");
    const id = e.currentTarget.getAttribute("data-id");
    const item = e.currentTarget.getAttribute("data-item");
    const index = e.currentTarget.getAttribute("data-index");
    if (e.keyCode === 46) {
      this.deleteItem(id, item, index);
    }
  }

  //フィルターの更新
  updateFilter(e, data = null) {
    const dbType = data ? data.item : e.target.className;
    // console.log(dbType);
    const debounceInputValue = e.target.value;
    const filter = deepcopy(this.state[dbType + "Filter"]);
    if (data) {
      switch (data.id) {
        case dbType + "SortKey":
          filter.sortBy = data.value;
          break;
        case dbType + "Order":
          if (!data.checked) {
            filter.order = false;
          } else {
            filter.order = true;
          }
          break;
        case dbType + "TypeText":
          filter.fileType.text = !this.state[dbType + "Filter"].fileType.text;
          break;
        case dbType + "TypeImage":
          filter.fileType.image = !this.state[dbType + "Filter"].fileType.image;
          break;
        case dbType + "TypeFile":
          filter.fileType.file = !this.state[dbType + "Filter"].fileType.file;
          break;
        case dbType + "TypeExcel":
          filter.fileType.excel = !this.state[dbType + "Filter"].fileType.excel;
          break;
        case dbType + "SourceApp":
          filter.apps = data.value;
          break;
        default:
          break;
      }
    } else {
      //react debounce inputがdataプロパティを持たない為
      if (e.target.id === dbType + "KeywordsIncludes") {
        filter.keywordsIncludes = debounceInputValue;
      } else {
        filter.keywordsExcludes = debounceInputValue;
      }
    }
    this.setState({ [dbType + "Filter"]: filter });
    window.ipcRenderer.send("getItem", filter, dbType);
  }

  handleSelectTab(index, last) {
    let db;
    switch (index) {
      case 0:
        db = "history";
        break;
      case 1:
        db = "save";
        break;
      case 2:
        db = "filter";
        break;
      default:
        break;
    }

    if (this.state[db + "List"].length !== 0) {
      const id = this.state[db + "List"][0].id;
      const tabChanged = true;
      window.ipcRenderer.send("showDetail", id, db, tabChanged);
    }
    this.setState({ tabIndex: index });

    if (this.state[db + "List"].length !== 0) {
      // this.refs[db].childNodes[0].childNodes[0].focus();
    }
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <Tabs onSelect={this.handleSelectTab}>
        <TabList>
          <Tab>History</Tab>
          <Tab>Save</Tab>
          <Tab>Filter</Tab>
        </TabList>
        <div>serarh bar</div>

        <TabPanel>
          <GridPageContainer>
            <GridPageFilterHeader />
            <GridPageHeaderLeft
              filter={this.state.historyFilter}
              showDetail={this.showDetail}
            >
              {/* <input ref="nameInput" type="text" onInput={this.pasteTarget} /> */}
            </GridPageHeaderLeft>
            <GridPageSideListHeader />
            <GridPageSideList>
              <div ref="history">
                <ClipboardList
                  item="history"
                  list={this.state.historyList}
                  pasteTarget={this.pasteTarget}
                  showDetail={this.showDetail}
                  togglePopup={this.togglePopup}
                  deleteItem={this.deleteItem}
                  onKeyDownAtItemList={this.onKeyDownAtItemList}
                  popoverOpen={this.state.popoverOpen}
                />
                <Waypoint onEnter={this.handleWaypointEnter} />
              </div>
            </GridPageSideList>
            <GridPageMainContent>
              <ClipboardDetail
                item="history"
                detail={this.state.ClipboardDetail}
                filter={this.state.historyFilter}
                updateFilter={this.updateFilter}
                handleDeleteButton={this.handleDeleteButton}
                handleSaveButton={this.handleSaveButton}
                handlePasteButton={this.handlePasteButton}
                sourceAppOption={this.state.sourceAppOption}
                handleItemTabChange={this.handleItemTabChange}
                itemTabIndex={this.state.itemTabIndex}
              />
            </GridPageMainContent>
          </GridPageContainer>
        </TabPanel>
        <TabPanel>
          <GridPageContainer>
            <GridPageFilterHeader />
            <GridPageHeaderLeft
              filter={this.state.saveFilter}
              showDetail={this.showDetail}
            />
            <GridPageSideListHeader />
            <GridPageSideList>
              <div ref="save">
                <ClipboardList
                  item="save"
                  list={this.state.saveList}
                  pasteTarget={this.pasteTarget}
                  showDetail={this.showDetail}
                  togglePopup={this.togglePopup}
                  deleteItem={this.deleteItem}
                  onKeyDownAtItemList={this.onKeyDownAtItemList}
                  popoverOpen={this.state.popoverOpen}
                />
                <Waypoint onEnter={this.handleWaypointEnter} />
              </div>
            </GridPageSideList>
            <GridPageMainContent>
              <ClipboardDetail
                item="save"
                detail={this.state.ClipboardDetail}
                filter={this.state.saveFilter}
                updateFilter={this.updateFilter}
                handleDeleteButton={this.handleDeleteButton}
                handleSaveButton={this.handleSaveButton}
                handlePasteButton={this.handlePasteButton}
                sourceAppOption={this.state.sourceAppOption}
                handleItemTabChange={this.handleItemTabChange}
                itemTabIndex={this.state.itemTabIndex}
              />
            </GridPageMainContent>
          </GridPageContainer>
        </TabPanel>
        <TabPanel>
          <GridPageFilterContainer>
            <GridPageSideListHeader />
            <GridPageSideList>
              <div ref="filter">
                <ClipboardList
                  item="filter"
                  list={this.state.filterList}
                  pasteTarget={this.pasteTarget}
                  showDetail={this.showDetail}
                  togglePopup={this.togglePopup}
                  deleteItem={this.deleteItem}
                  onKeyDownAtItemList={this.onKeyDownAtItemList}
                  popoverOpen={this.state.popoverOpen}
                />
                <Waypoint onEnter={this.handleWaypointEnter} />
              </div>
            </GridPageSideList>
            <GridPageMainContent>
              <ClipboardDetail
                item="filter"
                detail={this.state.ClipboardDetail}
                filter={this.state.saveFilter}
                updateFilter={this.updateFilter}
                handleDeleteButton={this.handleDeleteButton}
                handleSaveButton={this.handleSaveButton}
                handlePasteButton={this.handlePasteButton}
                sourceAppOption={this.state.sourceAppOption}
                handleItemTabChange={this.handleItemTabChange}
                itemTabIndex={this.state.itemTabIndex}
              />
            </GridPageMainContent>
          </GridPageFilterContainer>
        </TabPanel>
      </Tabs>
    );
  }
}

export default App;
