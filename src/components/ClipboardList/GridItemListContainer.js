import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: 20px auto 1fr;
  grid-template-columns: 60px 1fr;
  grid-template-areas:
    "item-format-image item-summary"
    "item-format-image item-content"
    "...               item-image";
`;

const GridItemListContainer = props => {
  return <Container>{props.children}</Container>;
};

export default GridItemListContainer;
