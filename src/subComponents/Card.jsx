import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Box = styled(motion.li)`
  width: 20rem;
  height: 40vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  border: 2px solid ${(props) => props.theme.text};
  list-style: none;
  padding: 1rem;
  margin-right: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: calc(1rem + 0.5vw);
  border-bottom: 1px solid ${(props) => props.theme.text};
`;

const Description = styled.p`
  font-size: calc(0.8rem + 0.3vw);
`;

const Img = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
`;

const Card = ({ data }) => {
  return (
    <Box whileHover={{ scale: 1.05 }}>
      <Img src={data.imgSrc} alt={data.title} />
      <Title>{data.title}</Title>
      <Description>{data.description}</Description>
    </Box>
  );
};

export default Card;
