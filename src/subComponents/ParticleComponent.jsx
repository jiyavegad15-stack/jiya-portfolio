import React from "react";
import styled from "styled-components";

const Dot = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: ${(p) => p.theme.text};
  border-radius: 50%;
  opacity: 0.4;
  animation: float 6s ease-in-out infinite alternate;

  @keyframes float {
    from { transform: translateY(0px); }
    to { transform: translateY(-30px); }
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const ParticleComponent = () => {
  const dots = Array.from({ length: 30 });

  return (
    <Container>
      {dots.map((_, i) => (
        <Dot key={i} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
      ))}
    </Container>
  );
};

export default ParticleComponent;
