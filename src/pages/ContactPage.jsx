import React from "react";
import styled, { keyframes } from "styled-components";
import {
  Zap, Instagram, Mail, Sparkles, ArrowUpRight,
  ChevronRight, Heart, Send, PenTool, MapPin
} from "lucide-react";

/* ================= ENHANCED ANIMATIONS ================= */
const fadeInUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const floatGentle = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-6px) rotate(1deg); }
  66% { transform: translateY(-12px) rotate(-1deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(156, 175, 136, 0.3); }
  50% { box-shadow: 0 0 40px rgba(156, 175, 136, 0.6); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

/* ================= ENHANCED STYLED COMPONENTS ================= */
const PageContainer = styled.div`
  background: linear-gradient(135deg, #FFFFF0 0%, #F8F7F2 50%, #FFFFF0 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
`;

const AnimatedBackground = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(156,175,136,0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${floatGentle} 20s ease-in-out infinite;
  }
  
  &::before {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    bottom: 20%;
    right: 15%;
    animation-delay: -10s;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 800px;
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
`;

const PowerReturnButton = styled.button`
  position: fixed;
  top: 2.5rem;
  left: 2.5rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(145deg, #1A1A18, #2D2D2A);
  color: #FFFFF0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 
    0 12px 40px rgba(26,26,24,0.4),
    0 0 0 1px rgba(156,175,136,0.2) inset;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);

  &:hover {
    background: linear-gradient(145deg, #9CAF88, #8BB677);
    transform: translateY(-4px) scale(1.08);
    box-shadow: 
      0 25px 60px rgba(156,175,136,0.4),
      0 0 30px rgba(156,175,136,0.3);
    animation: ${pulseGlow} 1.5s infinite;
  }

  &:active {
    transform: scale(0.95);
  }
`;

/* ===== ENHANCED BRAND IDENTITY ===== */
const BrandHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 5rem;
`;

const BrandLogo = styled.div`
  width: 90px;
  height: 90px;
  background: linear-gradient(145deg, #1A1A18, #2D2D2A);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFF0;
  font-size: 2.2rem;
  font-weight: 900;
  position: relative;
  box-shadow: 0 20px 60px rgba(26,26,24,0.3);
  animation: ${floatGentle} 6s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, rgba(156,175,136,0.4), transparent);
    animation: ${shimmer} 3s linear infinite;
    z-index: -1;
  }
`;

const BrandTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 4.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #1A1A18 0%, #2D2D2A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

const BrandSubtitle = styled.p`
  font-size: 1rem;
  color: #8A8A82;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  font-weight: 500;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #9CAF8815, #9CAF8820);
  backdrop-filter: blur(10px);
  color: #9CAF88;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: 1px solid rgba(156,175,136,0.2);
  box-shadow: 0 8px 32px rgba(156,175,136,0.1);
`;

/* ===== GLASSMORPHISM CONTACT CARDS ===== */
const ContactCard = styled.div`
  margin: 4rem 0;
  padding: 4rem 3rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(228, 225, 217, 0.4);
  border-radius: 32px;
  box-shadow: 
    0 25px 60px rgba(0,0,0,0.1),
    0 0 0 1px rgba(255,255,255,0.2) inset;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 1s ease-out ${({ index }) => index * 0.2}s both;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.6s;
  }

  &:hover {
    transform: translateY(-12px);
    box-shadow: 
      0 40px 80px rgba(0,0,0,0.15),
      0 0 0 1px rgba(156,175,136,0.3) inset;
    
    &::before {
      left: 100%;
    }
  }
`;

const ContactIcon = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem;
  background: linear-gradient(135deg, ${({ color }) => color.start}, ${({ color }) => color.end});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 20px 60px ${({ color }) => color.shadow};
  animation: ${floatGentle} 4s ease-in-out infinite;
`;

const ContactTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #1A1A18;
  margin: 0 0 1rem;
  font-weight: 600;
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #1A1A18 0%, #2D2D2A 100%);
  color: #FFFFFF;
  padding: 1.25rem 2.5rem;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  box-shadow: 0 12px 40px rgba(26,26,24,0.3);

  &:hover {
    background: linear-gradient(135deg, #9CAF88 0%, #8BB677 100%);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 20px 60px rgba(156,175,136,0.4);
    color: #FFFFFF;
  }
`;

const InstagramHandle = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #1A1A18;
  text-decoration: none;
  padding: 1.25rem 2rem;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(228,225,217,0.5);
  border-radius: 16px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #1A1A18 0%, #2D2D2A 100%);
    color: #FFFFFF;
    transform: translateY(-3px);
    box-shadow: 0 20px 50px rgba(26,26,24,0.3);
  }
`;

const EnhancedFooter = styled.footer`
  margin-top: 6rem;
  padding: 3rem 0;
  border-top: 1px solid rgba(228,225,217,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  div:first-child {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1A1A18;
    letter-spacing: 0.1em;
  }
  
  div:last-child {
    font-size: 0.8rem;
    color: #8A8A82;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

/* ================= MAIN COMPONENT ================= */
const ContactPage = () => {
  const email = "jiyavegad15@gmail.com";
  const instagramUrl = "https://www.instagram.com/jiya_vegad";

  const gmailColors = {
    start: '#EA4335',
    end: '#4285F4',
    shadow: 'rgba(234, 67, 53, 0.4)'
  };

  const instagramColors = {
    start: '#E4405F',
    end: '#F77737',
    shadow: 'rgba(228, 64, 95, 0.4)'
  };

  return (
    <PageContainer>
      <PowerReturnButton onClick={() => window.location.href = "#/main2"}>
        <Zap size={24} />
      </PowerReturnButton>

      <AnimatedBackground />

      <ContentWrapper>
        <BrandHeader>
          <BrandLogo>
            <Zap size={32} />
          </BrandLogo>
          <BrandTitle>Jiya Vegad</BrandTitle>
          <BrandSubtitle>FASHION DESIGNER</BrandSubtitle>
          <HeroBadge>
            <Sparkles size={16} />
            Available for Collaboration
          </HeroBadge>
        </BrandHeader>

        <ContactCard index={1} color={gmailColors}>
          <ContactIcon color={gmailColors}>
            <Mail size={44} />
          </ContactIcon>
          <ContactTitle>Let's Connect</ContactTitle>
          <p style={{ fontSize: '1.1rem', color: '#8A8A82', margin: '0 0 2rem', maxWidth: '400px', lineHeight: 1.6 }}>
            Ready to bring your vision to life? Send me a message and let's create something extraordinary together.
          </p>
          <ContactButton href={`mailto:${email}`}>
            <Send size={20} />
            Send Message
            <ChevronRight size={20} />
          </ContactButton>
        </ContactCard>

        <ContactCard index={2} color={instagramColors}>
          <ContactIcon color={instagramColors}>
            <Instagram size={44} />
          </ContactIcon>
          <ContactTitle>Follow the Journey</ContactTitle>
          <p style={{ fontSize: '1.1rem', color: '#8A8A82', margin: '0 0 2rem', maxWidth: '400px', lineHeight: 1.6 }}>
            See my latest designs, behind-the-scenes, and creative process on Instagram.
          </p>
          <InstagramHandle href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <Instagram size={20} />
            @jiya_vegad
            <ArrowUpRight size={18} />
          </InstagramHandle>
        </ContactCard>

        <EnhancedFooter>
          <div>JIYA VEGAD DESIGN STUDIO</div>
          <div>
            © 2026 • Designed with <Heart size={14} fill="currentColor" /> in India
          </div>
        </EnhancedFooter>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ContactPage;
