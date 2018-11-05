import React from "react";
import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import {
  Header,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Divider,
  Dropdown,
  TextArea,
  List,
  Tab,
  Image
} from "semantic-ui-react";

const Wrapper = styled.div`
  padding: 30px;
`;
const Bold = styled.span`
  font-size: 13px;
  margin-left: 5px;
`;

const printButtonName = item => {
  const buttonName = item === "history" ? "SAVE" : "CLONE";
  return buttonName;
};

const detectDefaultActiveIndex = format => {
  let index = 0;
  switch (format) {
    case "TEXT":
      index = 0;
      break;
    default:
      index = 1;
      break;
  }
  console.log(index);
  return index;
};

const createPanes = detail => {
  const panes = [];
  const mainPane = {};
  if (detail.mainFormat === "TEXT") {
    mainPane.menuItem = detail.mainFormat;
    mainPane.render = () => (
      <Tab.Pane attached={false}>
        <TextArea
          readOnly
          autoHeight
          value={detail.textData}
          style={{ maxHeight: 500, fontSize: "12px" }}
        />
      </Tab.Pane>
    );
    panes.push(mainPane);
    //メインフォーマットがテキスト以外
  } else {
    detail.content.forEach((v, i, a) => {
      const pane = {};
      pane.menuItem = v.format;
      pane.render = () => {
        let paneContent;
        switch (v.format) {
          case "IMAGE":
            paneContent = <Image src={v.data} style={{ maxHeight: 500 }} />;
            break;
          case "FILE":
            paneContent = 1;
            break;
          case "EXCEL":
            paneContent = <Image src={v.data} style={{ maxHeight: 500 }} />;
            break;
          case "HTML":
            paneContent = (
              <TextArea
                readOnly
                autoHeight
                value={v.data}
                style={{ maxHeight: 500, fontSize: "12px" }}
              />
            );
            break;

          default:
            paneContent = i;
            break;
        }
        return <Tab.Pane attached={false}>{paneContent}</Tab.Pane>;
      };
      panes.push(pane);
    });
    //テキストフォーマットの追加
    const textPane = {};
    textPane.menuItem = "TEXT";
    textPane.render = () => (
      <Tab.Pane attached={false}>
        <TextArea
          readOnly
          autoHeight
          value={detail.textData}
          style={{ maxHeight: 500, fontSize: "12px" }}
        />
      </Tab.Pane>
    );
    panes.push(textPane);
  }

  return panes;
};

const ItemDetail = props => {
  return (
    <Wrapper>
      <Form size="tiny">
        <Form.Field>
          <Button
            compact
            size="tiny"
            onClick={props.handlePasteButton}
            id={props.detail._id}
            item={props.item}
          >
            PASTE
          </Button>
          <Button
            compact
            size="tiny"
            onClick={props.handleSaveButton}
            id={props.detail._id}
            item={props.item}
          >
            {printButtonName(props.item)}
          </Button>
          <Button
            compact
            size="tiny"
            onClick={props.handleDeleteButton}
            id={props.detail._id}
            item={props.item}
          >
            DELETE
          </Button>
        </Form.Field>
        <Divider> </Divider>
        <Form.Field>
          <Tab
            activeIndex={props.itemTabIndex}
            menu={{ secondary: true, pointing: true }}
            panes={createPanes(props.detail)}
            onTabChange={props.handleItemTabChange}
          />
        </Form.Field>
        <Form.Field>
          <Header as="h3">ITEM Information</Header>
          <List>
            <List.Item>
              <span>
                <List.Icon name="calendar alternate outline" size="large" />
                <Bold>
                  {moment(props.detail.time).format("YYYY-MM-DD HH:mm:ss")}
                </Bold>
              </span>
            </List.Item>
            <List.Item>
              <span>
                <List.Icon name="paperclip" size="large" />
                <Bold>{props.detail.mainFormat}</Bold>
              </span>
            </List.Item>
            <List.Item>
              <span>
                <List.Icon name="map marker alternate" size="large" />
                <Bold>{props.detail.sourceApp}</Bold>
              </span>
            </List.Item>
          </List>
        </Form.Field>
      </Form>
    </Wrapper>
  );
};

export default ItemDetail;
