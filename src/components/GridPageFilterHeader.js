import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: filter-header;
  background-color: #eee;
  overflow: auto;
  font-size: 13px;
  padding-left: 15px;
`;

const GridPageFilterHeader = props => {
  return <Wrapper>SORT/FILTER</Wrapper>;
};

export default GridPageFilterHeader;
