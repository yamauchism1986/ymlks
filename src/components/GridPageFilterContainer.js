import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: 20px calc(100vh - 151px); /* height limitation on second row */
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "list-header   content"
    "nav           content";
`;

const GridPageFilterContainer = props => {
  return <Container>{props.children}</Container>;
};

export default GridPageFilterContainer;
