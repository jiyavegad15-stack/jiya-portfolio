import React from "react";
import styled from "styled-components";
import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";
import ParticleComponent from "../subComponents/ParticleComponent";
import BigTitle from "../subComponents/BigTitle";

import bg from "../assets/contact-bg.jpg";

const Box = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background: rgba(0, 0, 0, 0.6);
  padding: 3rem;
  border-radius: 10px;
  color: white;
  width: 40vw;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 7rem;
  padding: 0.7rem;
`;

const Button = styled.button`
  background: white;
  color: black;
  padding: 0.7rem 2rem;
  border: none;
  cursor: pointer;
`;

const ContactPage = () => {
  return (
    <Box>
      <LogoComponent />
      <SocialIcons />
      <PowerButton />
      <ParticleComponent />

      <Form>
        <h2>Contact Me</h2>
        <Input type="text" placeholder="Your Name" />
        <Input type="email" placeholder="Your Email" />
        <TextArea placeholder="Your Message" />
        <Button>Send Message</Button>
      </Form>

      <BigTitle text="CONTACT" top="80%" left="5%" />
    </Box>
  );
};

export default ContactPage;
