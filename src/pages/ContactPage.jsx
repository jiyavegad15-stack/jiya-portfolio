import React, { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Zap, Instagram, Mail, Sparkles, ArrowUpRight,
  ChevronRight, Send, Home, User, Briefcase,
  FolderOpen, GraduationCap, Award, FileText, Menu, X
} from "lucide-react";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #FFFFF0;
    color: #1A1A18;
    overflow-x: hidden;
  }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const morph = keyframes`
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 30% / 50% 60% 30% 50%; }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: radial-gradient(circle at top right, #9CAF8815, transparent),
              radial-gradient(circle at bottom left, #D4A57410, transparent);
`;

const NavContainer = styled.nav`
  position: fixed;
  top: 1.5rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  padding: 0.5rem;
  border-radius: 100px;
  border: 1px solid rgba(26, 26, 24, 0.05);
  display: flex;
  gap: 0.25rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  text-decoration: none;
  color: #6F6F68;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: #1A1A18;
    background: rgba(156, 175, 136, 0.1);
  }

  &.active {
    background: #1A1A18;
    color: #FFFFF0;
  }
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1100;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: #1A1A18;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: white;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  padding: 80px 40px;
  gap: 1rem;
  transform: translateY(${({ open }) => (open ? "0" : "-100%")});
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const HeroSection = styled.header`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: #9CAF8820;
  color: #5A6B4D;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  color: #1A1A18;
  line-height: 1.1;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 40px;
  border: 1px solid rgba(26, 26, 24, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeInUp} 0.8s ease-out both;
  animation-delay: ${({ delay }) => delay}s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(26, 26, 24, 0.05);
    border-color: #9CAF88;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ bg }) => bg};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  margin-bottom: 2rem;
  animation: ${morph} 8s ease-in-out infinite, ${float} 4s ease-in-out infinite;
`;

const CardTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: #6F6F68;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  font-size: 1rem;
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  background: #1A1A18;
  color: white;
  border-radius: 100px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #9CAF88;
    gap: 1.2rem;
    box-shadow: 0 10px 20px rgba(156, 175, 136, 0.3);
  }
`;

const Footer = styled.footer`
  margin-top: 6rem;
  text-align: center;
  color: #8A8A82;
  font-size: 0.9rem;
`;

const Navigation = ({ activePath, isOpen, setOpen }) => {
  const items = [
    { path: "#/main2", label: "Home", icon: <Home size={18} /> },
    { path: "#/about", label: "About", icon: <User size={18} /> },
    { path: "#/portfolio", label: "Portfolio", icon: <FolderOpen size={18} /> },
    { path: "#/work", label: "Experience", icon: <Briefcase size={18} /> },
    { path: "#/skills", label: "Skills", icon: <Award size={18} /> },
    { path: "#/education", label: "Education", icon: <GraduationCap size={18} /> },
    { path: "#/cv", label: "CV", icon: <FileText size={18} /> },
    { path: "#/contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  return (
    <>
      <NavContainer>
        {items.map(item => (
          <NavLink 
            key={item.path} 
            href={item.path} 
            className={activePath === item.path ? 'active' : ''}
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </NavContainer>

      <MobileToggle onClick={() => setOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </MobileToggle>

      <MobileMenuOverlay open={isOpen}>
        {items.map(item => (
          <NavLink 
            key={item.path} 
            href={item.path} 
            onClick={() => setOpen(false)}
            style={{ fontSize: '1.2rem', padding: '1rem' }}
            className={activePath === item.path ? 'active' : ''}
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </MobileMenuOverlay>
    </>
  );
};

const ContactPage = () => {
  const [isOpen, setOpen] = useState(false);
  const currentPath = window.location.hash || "#/contact";

  return (
    <PageContainer>
      <GlobalStyle />
      <Navigation activePath={currentPath} isOpen={isOpen} setOpen={setOpen} />

      <HeroSection>
        <Badge>
          <Sparkles size={14} /> Available for new projects
        </Badge>
        <Title>Let's design something <br/> beautiful together.</Title>
      </HeroSection>

      <Grid>
        <Card delay={0.2}>
          <IconWrapper bg="linear-gradient(135deg, #EA4335, #FBBC05)">
            <Mail size={32} />
          </IconWrapper>
          <CardTitle>Email Me</CardTitle>
          <CardText>
            Whether it's a job opportunity or a simple hello, my inbox is always open.
          </CardText>
          <ActionButton href="mailto:jiyavegad15@gmail.com">
            Send Email <Send size={18} />
          </ActionButton>
        </Card>

        <Card delay={0.4}>
          <IconWrapper bg="linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)">
            <Instagram size={32} />
          </IconWrapper>
          <CardTitle>Instagram</CardTitle>
          <CardText>
            Follow my creative journey and check out my latest design explorations.
          </CardText>
          <ActionButton href="https://www.instagram.com/jiya_vegad" target="_blank">
            Follow @jiya_vegad <ArrowUpRight size={18} />
          </ActionButton>
        </Card>
      </Grid>

      <Footer>
        <p>© Jiya Vegad. Built with passion & precision.</p>
      </Footer>
    </PageContainer>
  );
};

export default ContactPage;