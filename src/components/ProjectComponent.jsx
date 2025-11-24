import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Box = styled(motion.a)`
  width: calc(10rem + 15vw);
  height: 20rem;
  padding: 1rem;
  text-decoration: none;

  color: ${(props) => props.theme.text};
  border: 2px solid ${(props) => props.theme.text};
  backdrop-filter: blur(2px);

  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }
`;

const Image = styled.div`
  background: url(${(p) => p.img}) center/cover no-repeat;
  width: 100%;
  height: 60%;
`;

const Title = styled.h3`
  margin: 1rem 0;
  font-family: "Karla", sans-serif;
  border-bottom: 1px solid ${(props) => props.theme.text};

  ${Box}:hover & {
    border-bottom: 1px solid ${(props) => props.theme.body};
  }
`;

const Tag = styled.span`
  padding-right: 0.5rem;
`;

const Category = styled.span``;

const container = {
  hidden: { scale: 0 },
  show: {
    scale: 1,
    transition: { type: "spring", duration: 0.5 },
  },
};

const ProjectComponent = ({ project }) => {
  const { name, tags, category, imgSrc, link } = project;

  return (
    <motion.div variants={container}>
      <Box href={link} target="_blank">
        <Image img={imgSrc} />
        <Title>{name}</Title>
        <div>
          {tags.map((t, i) => (
            <Tag key={i}>#{t}</Tag>
          ))}
        </div>
        <Category>{category}</Category>
      </Box>
    </motion.div>
  );
};

export default ProjectComponent;
