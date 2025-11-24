import React from "react";

const DarkTheme = {
  body: "#4A4A48",
  text: "#FFFFF0",
  accent: "#9CAF88",
};

const Styles = {
  Container: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: DarkTheme.body,
    color: DarkTheme.text,
    fontFamily: "'Georgia', serif",
    padding: "2rem 1rem",
    position: "relative",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  Title: {
    fontSize: "clamp(2rem, 8vw, 3.5rem)",
    fontWeight: "900",
    marginBottom: "1.5rem",
    letterSpacing: "1px",
    color: DarkTheme.accent,
    textAlign: "center",
    lineHeight: "1.2",
  },
  Section: {
    marginBottom: "2.5rem",
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  SectionTitle: {
    fontSize: "clamp(1.5rem, 5vw, 2rem)",
    fontWeight: "700",
    borderBottom: `3px solid ${DarkTheme.accent}`,
    paddingBottom: "0.5rem",
    marginBottom: "1.5rem",
    lineHeight: "1.3",
  },
  ItemTitle: {
    fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
    fontWeight: "700",
    marginBottom: "0.5rem",
    lineHeight: "1.3",
  },
  ItemSubTitle: {
    fontSize: "clamp(1rem, 3vw, 1.1rem)",
    fontWeight: "600",
    fontStyle: "italic",
    marginBottom: "0.5rem",
    color: DarkTheme.accent,
    lineHeight: "1.4",
  },
  ItemDate: {
    fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
    fontWeight: "400",
    marginBottom: "0.8rem",
    color: "#B1B1B0",
  },
  ItemDescription: {
    fontSize: "clamp(1rem, 3vw, 1.1rem)",
    lineHeight: "1.6",
    whiteSpace: "pre-line",
    marginBottom: "1.5rem",
  },
  List: {
    fontSize: "clamp(1rem, 3vw, 1.1rem)",
    lineHeight: "1.8",
    paddingLeft: "1.2rem",
    margin: "0",
  },
  ContactText: {
    fontSize: "clamp(1rem, 3vw, 1.2rem)",
    lineHeight: "1.6",
    marginBottom: "0.8rem",
  },
  Link: {
    color: DarkTheme.accent,
    textDecoration: "none",
    transition: "color 0.3s ease",
    wordBreak: "break-all",
  },
};

// Responsive CSS for different screen sizes
const ResponsiveCSS = `
  @media (min-width: 768px) {
    .cv-container {
      padding: 4rem 3rem !important;
    }
  }
  
  @media (min-width: 1024px) {
    .cv-container {
      padding: 6rem 8rem !important;
    }
  }
  
  @media (min-width: 1440px) {
    .cv-container {
      padding: 6rem 12rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .cv-container {
      padding: 1.5rem 1rem !important;
    }
  }
  
  @media (max-width: 320px) {
    .cv-container {
      padding: 1rem 0.5rem !important;
    }
  }
  
  /* High zoom level support */
  @media (max-width: 240px) {
    body {
      font-size: 14px;
    }
  }
  
  /* Print styles */
  @media print {
    .cv-container {
      padding: 1rem !important;
      color: #000 !important;
      background: white !important;
    }
    
    .section-title {
      color: #333 !important;
      border-color: #333 !important;
    }
    
    .link {
      color: #333 !important;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
    }
  }
  
  /* High contrast support */
  @media (prefers-contrast: high) {
    .cv-container {
      background: #000 !important;
      color: #fff !important;
    }
    
    .accent {
      color: #fff !important;
      border-color: #fff !important;
    }
  }
  
  /* Link hover effects */
  .link:hover {
    color: #FFFFF0 !important;
    text-decoration: underline;
  }
  
  /* Ensure text remains readable on very small screens */
  @media (max-width: 360px) {
    .item-description {
      text-align: justify;
    }
  }
  
  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    .link {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }
  }
`;

const CV = () => (
  <div style={Styles.Container} className="cv-container">
    <style>{ResponsiveCSS}</style>
    
    <h1 style={Styles.Title}>Curriculum Vitae</h1>

    {/* Education Section */}
    <section style={Styles.Section}>
      <h2 style={Styles.SectionTitle} className="section-title">Education</h2>

      <div>
        <h3 style={Styles.ItemTitle}>Bachelor of Science in Computer Science</h3>
        <div style={Styles.ItemSubTitle} className="accent">Punjab University</div>
        <div style={Styles.ItemDate}>2019 - 2023</div>
        <p style={Styles.ItemDescription} className="item-description">
          Graduated with honors focusing on software engineering, data science, and cybersecurity.{"\n"}
          Relevant Coursework: Machine Learning, Data Structures, Network Security, Power Systems.
        </p>
      </div>
    </section>

    {/* Professional Experience Section */}
    <section style={Styles.Section}>
      <h2 style={Styles.SectionTitle} className="section-title">Professional Experience</h2>

      <div>
        <h3 style={Styles.ItemTitle}>Software Developer Intern</h3>
        <div style={Styles.ItemSubTitle} className="accent">Indian Oil Corporation Limited (IOCL)</div>
        <div style={Styles.ItemDate}>Summer 2022</div>
        <p style={Styles.ItemDescription} className="item-description">
          Developed a Network Status Management System dashboard. Participated in design and implementation of real-time status monitoring for network infrastructure.
        </p>
      </div>

      <div>
        <h3 style={Styles.ItemTitle}>Junior Full-Stack Developer</h3>
        <div style={Styles.ItemSubTitle} className="accent">Central CoalFields Limited</div>
        <div style={Styles.ItemDate}>2023 - 2024</div>
        <p style={Styles.ItemDescription} className="item-description">
          Designed and deployed live link monitoring dashboards utilizing React and Django. Created efficient RESTful APIs and integrated them with frontend components.
        </p>
      </div>
    </section>

    {/* Skills Section */}
    <section style={Styles.Section}>
      <h2 style={Styles.SectionTitle} className="section-title">Technical Skills</h2>
      <ul style={Styles.List}>
        <li><strong>Languages:</strong> Python, JavaScript/TypeScript, Java, SQL, PHP, C++</li>
        <li><strong>Frameworks & Libraries:</strong> React, Django, Flask, Framer Motion</li>
        <li><strong>Tools & Platforms:</strong> Git, Docker, AWS EC2, MySQL, Linux/Ubuntu, VS Code</li>
        <li><strong>Domains:</strong> Full-Stack Development, DevOps, Cybersecurity, Machine Learning</li>
      </ul>
    </section>

    {/* Projects Section */}
    <section style={Styles.Section}>
      <h2 style={Styles.SectionTitle} className="section-title">Projects</h2>

      <div>
        <h3 style={Styles.ItemTitle}>Portfolio Website for Fashion Designer</h3>
        <div style={Styles.ItemSubTitle} className="accent">React, Styled Components, Framer Motion</div>
        <p style={Styles.ItemDescription} className="item-description">
          Developed a highly customized, color-themed portfolio website designed for visual storytelling and unique user interaction experience.
        </p>
      </div>

      <div>
        <h3 style={Styles.ItemTitle}>Network Monitoring Dashboard</h3>
        <div style={Styles.ItemSubTitle} className="accent">React, Django, REST API</div>
        <p style={Styles.ItemDescription} className="item-description">
          Created interactive dashboards to provide real-time ISP network status with intuitive UI and backend integration.
        </p>
      </div>
    </section>

    {/* Contact Section */}
    <section style={Styles.Section}>
      <h2 style={Styles.SectionTitle} className="section-title">Contact</h2>
      <p style={Styles.ContactText}>
        Email: <a href="mailto:jiya@example.com" style={Styles.Link} className="link">jiya@example.com</a>
      </p>
      <p style={Styles.ContactText}>
        GitHub: <a href="https://github.com/jiya" target="_blank" rel="noopener noreferrer" style={Styles.Link} className="link">github.com/jiya</a>
      </p>
      <p style={Styles.ContactText}>
        LinkedIn: <a href="https://linkedin.com/in/jiya" target="_blank" rel="noopener noreferrer" style={Styles.Link} className="link">linkedin.com/in/jiya</a>
      </p>
    </section>
  </div>
);

export default CV;