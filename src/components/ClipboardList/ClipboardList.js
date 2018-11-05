import React from "react";
import GridItemListContainer from "./GridItemListContainer";
import GridItemFormatImage from "./GridItemFormatImage";
import GridItemMenu from "./GridItemMenu";
import GridItemTextDetail from "./GridItemTextDetail";
import GridItemImageDetail from "./GridItemImageDetail";
import FormatImage from "./FormatImage";
import TextDetail from "./TextDetail";
import ImageDetail from "./ImageDetail";
import styled from "styled-components";

const List = styled.ul`
  text-align: left;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  border-bottom: solid #e3f3f7 1px;
  margin: 0;
  padding-top: 5px;
  user-select: none;
  cursor: default;
  &:hover {
    background-color: #f3f3f7;
  }
`;

const ClipboardList = React.forwardRef((props, ref) => {
  if (!props.list) {
    return null;
  } else {
    return (
      <List>
        {props.list.map((item, idx) => {
          return (
            <Item
              key={item.id}
              tabIndex="0"
              onClick={props.showDetail}
              onFocus={props.showDetail}
              onDoubleClick={props.pasteTarget}
              onKeyDown={props.onKeyDownAtItemList}
              data-id={item.id}
              data-index={idx}
              data-item={props.item}
              data-detailtype="item"
            >
              <GridItemListContainer>
                <GridItemFormatImage>
                  <FormatImage format={item.format} />
                </GridItemFormatImage>
                <GridItemMenu
                  item={props.item}
                  time={item.time}
                  id={item.id}
                  togglePopup={props.togglePopup}
                  popoverOpen={item.popoverOpen}
                  deleteItem={props.deleteItem}
                  saveItem={props.saveItem}
                />
                <GridItemTextDetail>
                  <TextDetail text={item.text} />
                </GridItemTextDetail>
                <GridItemImageDetail>
                  <ImageDetail p={"test"} image={item.image} />
                  {/* <ImageDetail /> */}
                </GridItemImageDetail>
                {/* <TextData>{findTextData(item.content)}</TextData> */}
                {/* <ImageArea imageData={findImageData(item.content)} /> */}
              </GridItemListContainer>
            </Item>
          );
        })}
      </List>
    );
  }
});

export default ClipboardList;
