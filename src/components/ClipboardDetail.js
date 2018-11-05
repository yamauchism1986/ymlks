import React from "react";
import styled from "styled-components";
import FilterDetail from "./FilterDetail";
import ItemDetail from "./ItemDetail";

const Detail = styled.div``;

const ClipboardDetail = props => {
  if (!props.detail) {
    return "";
  } else {
    switch (props.detail.db) {
      case "filter":
        return (
          <FilterDetail
            item={props.item}
            detail={props.detail}
            filter={props.filter}
            updateFilter={props.updateFilter}
            sourceAppOption={props.sourceAppOption}
          />
        );
      default:
        return (
          <ItemDetail
            item={props.item}
            detail={props.detail}
            handleDeleteButton={props.handleDeleteButton}
            handleSaveButton={props.handleSaveButton}
            handlePasteButton={props.handlePasteButton}
            handleItemTabChange={props.handleItemTabChange}
            item={props.item}
            itemTabIndex={props.itemTabIndex}
          />
        );
        break;
    }
  }
};

export default ClipboardDetail;
