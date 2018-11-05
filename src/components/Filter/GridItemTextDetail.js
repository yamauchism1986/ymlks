import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: item-content;
`;

const GridItemTextDetail = props => {
  return <Container>{props.children}</Container>;
};

export default GridItemTextDetail;
