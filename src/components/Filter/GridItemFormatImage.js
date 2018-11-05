import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: item-format-image;
  text-align: center;
`;

const Wrapper = styled.div`
  height: 40px;
  width: 40px;
  margin-left: 10px;
`;
const GridItemFormatImage = props => {
  return (
    <Container>
      <Wrapper>{props.children}</Wrapper>
    </Container>
  );
};

export default GridItemFormatImage;
