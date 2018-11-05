import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: -webkit-box;
  overflow: hidden;
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal;
`;

const TextDetail = props => {
  return <Wrapper>{props.text}</Wrapper>;
};

export default TextDetail;
