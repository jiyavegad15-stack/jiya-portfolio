import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Logo = styled.h1`
  display: inline-block;
  color: ${(props) => props.theme.text};
  font-family: "Karla", sans-serif;
  position: fixed;
  left: 2rem;
  top: 2rem;
  z-index: 3;
  font-size: calc(1rem + 1.5vw);
  cursor: pointer;
`;

const LogoComponent = ({ theme }) => {
  return (
    <NavLink to="/">
      <Logo theme={theme === "dark" ? { text: "#FCF6F4" } : { text: "#000" }}>
        JV
      </Logo>
    </NavLink>
  );
};

export default LogoComponent;
