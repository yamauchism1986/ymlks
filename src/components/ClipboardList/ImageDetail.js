import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-right: 5px;
  padding-bottom: 5px;
`;
const Img = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 100px;
  vertical-align: middle;
  border-radius: 3px;
`;

const ImageDetail = props => {
  if (!props.image) {
    return null;
  } else {
    return (
      <Wrapper>
        <Img src={props.image} />
      </Wrapper>
    );
  }
};

export default ImageDetail;
