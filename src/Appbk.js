import React, { Component } from "react";
import ReactDOM from "react-dom";
// import logo from './logo.svg';
import "./App.css";
import isElectron from "is-electron";
import ClipboardList from "./components/ClipboardList";
import {
  Tabs,
  TabList,
  Tab,
  PanelList,
  Panel,
  ExtraButton
} from "react-tabtab";
import { FaPlus } from "react-icons/fa";

import * as customStyle from "react-tabtab/lib/themes/material-design";

require("@fortawesome/fontawesome");
require("@fortawesome/fontawesome-free-solid");
require("@fortawesome/fontawesome-free-regular");
require("@fortawesome/fontawesome-free-brands");

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
    this.handleExtraButton = this.handleExtraButton.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    const tabs = makeData(3);

    this.state = {
      pasteList: null,
      tabs,
      activeIndex: 0
    };
  }

  handleExtraButton() {
    const { tabs } = this.state;
    const newTabs = [...tabs, { title: "New Tab", content: "New Content" }];
    this.setState({ tabs: newTabs, activeIndex: newTabs.length - 1 });
  }

  handleTabChange(index) {
    this.setState({ activeIndex: index });
  }

  handleEdit({ type, index }) {
    let { tabs, activeIndex } = this.state;
    if (type === "delete") {
      tabs.splice(index, 1);
    }
    if (index - 1 >= 0) {
      activeIndex = index - 1;
    } else {
      activeIndex = 0;
    }
    this.setState({ tabs, activeIndex });
  }

  componentDidMount() {
    let input = ReactDOM.findDOMNode(this.refs.nameInput);
    input && input.focus();
    if (isElectron()) {
      window.ipcRenderer.send("getPasteList");
      window.ipcRenderer.on("clipboard", (event, clipboard) => {
        console.log(clipboard);
        this.setState({ pasteList: clipboard });
        input && input.focus();
      });
      window.ipcRenderer.on("test", (event, clipboard) => {
        console.log(clipboard);
      });
      window.ipcRenderer.on("launch", event => {
        input && input.focus();
        window.ipcRenderer.send("focused");
      });
    }
  }

  pasteTarget(e) {
    e.target.value = "";
    window.ipcRenderer.send("sendPasteValue", "test");
  }

  render() {
    const { tabs, activeIndex } = this.state;
    const tabTemplate = [];
    const panelTemplate = [];

    tabs.forEach((tab, i) => {
      const closable = tabs.length > 1;
      tabTemplate.push(
        <Tab key={i} closable={closable}>
          {tab.title}
        </Tab>
      );
      panelTemplate.push(<Panel key={i}>{tab.content}</Panel>);
    });

    return (
      <Tabs
        onTabEdit={this.handleEdit}
        onTabChange={this.handleTabChange}
        activeIndex={activeIndex}
        customStyle={this.props.customStyle}
        ExtraButton={
          <ExtraButton onClick={this.handleExtraButton}>
            <FaPlus />
          </ExtraButton>
        }
      >
        <TabList>
          <Tab>{tabTemplate}</Tab>
        </TabList>
        <PanelList>
          <Panel>
            <div className="App">
              <header className="App-header">
                <h1 className="App-title">Pastify</h1>
                <input ref="nameInput" type="text" onInput={this.pasteTarget} />
              </header>
              <p>{this.state.content}</p>
              <ClipboardList
                list={this.state.pasteList}
                pasteTarget={this.pasteTarget}
              />
            </div>
          </Panel>
          <Panel>{panelTemplate}</Panel>
        </PanelList>
      </Tabs>
    );
  }
}

export default App;
