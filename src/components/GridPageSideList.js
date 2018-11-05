import React from "react";
import styled from "styled-components";

const SideList = styled.div`
  grid-area: nav;
  /* background-color: aqua; */
  overflow: auto;
`;

const GridPageSideList = props => {
  return <SideList id="sidebar">{props.children}</SideList>;
};

export default GridPageSideList;
