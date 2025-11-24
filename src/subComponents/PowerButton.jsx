import React from "react";
import styled from "styled-components";
import { PowerBtn } from "../components/AllSvgs";
import { NavLink } from "react-router-dom";

const Power = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 5;
`;

const PowerButton = () => {
  return (
    <Power>
      <NavLink to="/">
        <PowerBtn width={30} height={30} fill="currentColor" />
      </NavLink>
    </Power>
  );
};

export default PowerButton;
