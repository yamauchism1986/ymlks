import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: 20px 63px 20px calc(100vh - 151px); /* height limitation on second row */
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "filter-header content"
    "filter        content"
    "list-header   content"
    "nav           content";
`;

const GridPageContainer = props => {
  return <Container>{props.children}</Container>;
};

export default GridPageContainer;
