import React from "react";
import styled from "styled-components";

const Header = styled.div`
  grid-area: header-right;
  background-color: pink;
`;

const GridPageHeaderRight = props => {
  return <Header>{props.children}</Header>;
};

export default GridPageHeaderRight;
