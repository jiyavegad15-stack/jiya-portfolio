import React from "react";
import styled from "styled-components";
import { Anchor as AnchorSvg } from "../components/AllSvgs";

const Box = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 2;
`;

const AnchorComponent = ({ number }) => {
  return (
    <Box>
      <AnchorSvg width={50} height={50} fill="currentColor" />
      <h4>{number}</h4>
    </Box>
  );
};

export default AnchorComponent;
