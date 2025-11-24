import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Box = styled(motion.div)`
  width: 20rem;
  padding: 1rem;
  background: ${(p) => p.theme.body};
  border: 2px solid ${(p) => p.theme.text};
  color: ${(p) => p.theme.text};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${(p) => p.theme.text};
    color: ${(p) => p.theme.body};
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  border-bottom: 1px solid ${(p) => p.theme.text};
  margin-bottom: 1rem;

  ${Box}:hover & {
    border-bottom: 1px solid ${(p) => p.theme.body};
  }
`;

const Img = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;

  border-bottom: 1px solid ${(p) => p.theme.text};
`;

const BlogComponent = ({ blog }) => {
  return (
    <Box whileHover={{ scale: 1.05 }}>
      <Img src={blog.imgSrc} alt={blog.name} />
      <Title>{blog.name}</Title>
      <p>{blog.tags}</p>
    </Box>
  );
};

export default BlogComponent;
