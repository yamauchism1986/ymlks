import React from "react";
import styled from "styled-components";

const Component = styled.div``;

const Default = props => {
  if (!props.detail) {
    return "aaa";
  } else {
    return <Component />;
  }
};

export default Default;
