import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: item-image;
  margin-bottom: 8px;
`;

const GridItemImageDetail = props => {
  return <Container>{props.children}</Container>;
};

export default GridItemImageDetail;
