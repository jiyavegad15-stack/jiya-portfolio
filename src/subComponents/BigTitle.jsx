import React from "react";
import styled from "styled-components";

const Text = styled.h1`
  position: fixed;
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  right: ${(p) => p.right};
  z-index: 0;
  font-size: calc(4rem + 5vw);
  color: ${(p) => `rgba(${p.theme.textRgba},0.1)`};
  text-transform: uppercase;
`;

const BigTitle = ({ text, top, left, right }) => {
  return <Text top={top} left={left} right={right}>{text}</Text>;
};

export default BigTitle;
