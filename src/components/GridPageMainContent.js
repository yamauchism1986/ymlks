import React from "react";
import styled from "styled-components";

const MainContent = styled.div`
  grid-area: content;
  background-color: #f1f3fa;
  overflow: auto;
`;

const GridPageMainContent = props => {
  return <MainContent>{props.children}</MainContent>;
};

export default GridPageMainContent;
