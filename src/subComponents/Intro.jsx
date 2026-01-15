import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import profile from "../assets/profile.jpg";

const Box = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 65vw;
  height: 55vh;
  transform: translate(-50%, -50%);
  display: flex;

  background: linear-gradient(
      to right,
      ${(props) => props.theme.body} 50%,
      ${(props) => props.theme.text} 50%
    )
    bottom,
    linear-gradient(
      to right,
      ${(props) => props.theme.body} 50%,
      ${(props) => props.theme.text} 50%
    )
    top;
  background-repeat: no-repeat;
  background-size: 100% 2px;

  border-left: 2px solid ${(props) => props.theme.body};
  border-right: 2px solid ${(props) => props.theme.text};
`;

const SubBox = styled.div`
  width: 50%;
  position: relative;

  .pic {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
  }
`;

const Text = styled.div`
  color: ${(props) => props.theme.body};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h1 {
    font-size: calc(2rem + 1vw);
  }
  h6 {
    color: rgba(${(props) => props.theme.bodyRgba}, 0.6);
    font-size: calc(0.5rem + 1.5vw);
  }
`;

const Intro = () => {
  return (
    <Box
      initial={{ height: 0 }}
      animate={{ height: "55vh" }}
      transition={{ duration: 2, type: "spring" }}
    >
      <SubBox>
        <Text>
          <h1>Hello,</h1>
          <h3>I'm Jiya Vegad</h3>
          <h6>A fashion designer blending comfort, creativity & culture.</h6>
        </Text>
      </SubBox>

      <SubBox>
        <motion.img
          className="pic"
          src={profile}
          alt="jiya"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />
      </SubBox>
    </Box>
  );
};

export default Intro;
