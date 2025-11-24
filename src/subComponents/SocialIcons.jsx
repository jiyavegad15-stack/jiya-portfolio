import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Github, Twitter, Facebook, YouTube } from "../components/AllSvgs";

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 2rem;
  z-index: 5;
  align-items: center;

  & > *:not(:last-child) {
    margin: 0.5rem 0;
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 8rem;
  background-color: ${(props) => props.theme.text};
`;

const SocialIcons = ({ theme }) => {
  return (
    <Icons>
      <motion.div whileHover={{ scale: 1.2 }}>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          <Github width={25} height={25} fill={theme === "dark" ? "#FCF6F4" : "#000"} />
        </a>
      </motion.div>

      <motion.div whileHover={{ scale: 1.2 }}>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <Twitter width={25} height={25} fill={theme === "dark" ? "#FCF6F4" : "#000"} />
        </a>
      </motion.div>

      <motion.div whileHover={{ scale: 1.2 }}>
        <a href="https://facebook.com/" target="_blank" rel="noreferrer">
          <Facebook width={25} height={25} fill={theme === "dark" ? "#FCF6F4" : "#000"} />
        </a>
      </motion.div>

      <motion.div whileHover={{ scale: 1.2 }}>
        <a href="https://youtube.com/" target="_blank" rel="noreferrer">
          <YouTube width={25} height={25} fill={theme === "dark" ? "#FCF6F4" : "#000"} />
        </a>
      </motion.div>

      <Line
        initial={{ height: 0 }}
        animate={{ height: "8rem" }}
        transition={{ type: "spring", duration: 1, delay: 0.8 }}
      />
    </Icons>
  );
};

export default SocialIcons;