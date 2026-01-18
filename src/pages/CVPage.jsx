import React, { useState, useRef, useEffect } from "react";
import {
  Github, Linkedin, Mail, Phone, MapPin,
  Briefcase, BookOpen, Award, Trophy,
  Music, Plane, Star, ChevronRight, Instagram,
  FileText, Palette, Users, Target, Cpu,
  ArrowLeft, Zap, Download, Printer, Home,
  Menu, X, ChevronDown, ChevronUp,
  User, Settings, LogOut, Bell, Search, Grid, MessageSquare
} from "lucide-react";

import ProfilePic from "../assets/cv.jpg";

const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLandscape: false,
    isExtraSmall: false,
    isPortrait: true,
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isLandscape: width > height,
        isPortrait: width <= height,
        isExtraSmall: width < 400,
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return viewport;
};

const Theme = {
  BG: "#FCFAF5",
  SIDEBAR: "#1A1A18",
  WHITE: "#FFFFFF",
  TEXT_DARK: "#1A1A18",
  TEXT_LIGHT: "#F5F5EE",
  MUTED: "#6F6F68",
  ACCENT: "#9CAF88",
  LIGHT_ACCENT: "rgba(156, 175, 136, 0.1)",
  BORDER: "#E4E1D9",
  SHADOW: "0 20px 60px rgba(0, 0, 0, 0.08)",
  NAVBAR_BG: "rgba(252, 250, 245, 0.95)",
};

const CVPage = () => {
  const viewport = useViewport();
  const [hoverState, setHoverState] = useState({
    returnButton: false,
    downloadButton: false,
    printButton: false,
    navItem: null,
  });
  const [isPrinting, setIsPrinting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeNav, setActiveNav] = useState("cv");

  const cvRef = useRef();

const navItems = [
  { id: "home", label: "Home", icon: <Home size={18} />, type: "external", path: "/jiya-portfolio#/main2" },
  { id: "about", label: "About", icon: <User size={18} />, type: "external", path: "/jiya-portfolio#/about" },
  { id: "portfolio", label: "Portfolio", icon: <Grid size={18} />, type: "external", path: "/jiya-portfolio#/portfolio" },
  { id: "work", label: "Experience", icon: <Briefcase size={18} />, type: "external", path: "/jiya-portfolio#/work" },
  { id: "skills", label: "Skills", icon: <Award size={18} />, type: "external", path: "/jiya-portfolio#/skills" },
  { id: "education", label: "Education", icon: <BookOpen size={18} />, type: "external", path: "/jiya-portfolio#/education" },
  { id: "cv", label: "CV", icon: <FileText size={18} />, type: "external", path: "/jiya-portfolio#/cv" },
  { id: "contact", label: "Contact", icon: <Mail size={18} />, type: "external", path: "/jiya-portfolio#/contact" },
];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handlePrint = () => {
    setIsPrinting(true);
    
    const originalStyles = {
      bodyOverflow: document.body.style.overflow,
      bodyBackground: document.body.style.background,
      bodyHeight: document.body.style.minHeight,
    };

    document.body.style.overflow = 'visible';
    document.body.style.background = Theme.WHITE;
    document.body.style.minHeight = 'auto';

    setTimeout(() => {
      window.print();
      
      document.body.style.overflow = originalStyles.bodyOverflow;
      document.body.style.background = originalStyles.bodyBackground;
      document.body.style.minHeight = originalStyles.bodyHeight;
      
      setTimeout(() => setIsPrinting(false), 500);
    }, 100);
  };

  const handleDownloadPDF = () => {
    handlePrint();
  };

  const handleNavClick = (navItem) => {
    setActiveNav(navItem.id);
    
    if (navItem.type === "section") {
      const section = document.getElementById(navItem.id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (navItem.type === "external") {
      // Navigate to external page
      window.location.href = navItem.path;
    }
    
    // Close mobile menu if open
    if (viewport.isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Scroll to section on mount if hash exists
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
          setActiveNav(hash);
        }, 100);
      }
    }
  }, []);

  // Responsive styles
  const styles = getResponsiveStyles(viewport);

  return (
    <div style={styles.pageContainer}>
      {/* Global Styles */}
      <style>{GlobalStyles(viewport)}</style>
      <style>{PrintStyles}</style>
      <style>{MobileStyles}</style>
      <style>{`
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 1px;
          background: ${Theme.ACCENT};
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-menu { display: flex; }
          .menu-toggle { display: block; }
        }
      `}</style>

      <header style={styles.navbar}>
        <div style={styles.navbarContent}>

          <div style={styles.navbarBrand}>
            <div style={styles.logo}>
              <span style={styles.logoText}>JV</span>
              <div style={styles.logoBadge}>
                <FileText size={10} />
              </div>
            </div>
            <span style={styles.brandText}>Jiya Vegad</span>
          </div>

          {viewport.isDesktop && (
            <nav className="desktop-nav" style={styles.navbarNav}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  style={{
                    ...styles.navItem,
                    color: activeNav === item.id ? Theme.ACCENT : Theme.TEXT_DARK,
                    borderBottom: activeNav === item.id
                      ? `2px solid ${Theme.ACCENT}`
                      : "none",
                    transform: hoverState.navItem === item.id ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => setHoverState(prev => ({ ...prev, navItem: item.id }))}
                  onMouseLeave={() => setHoverState(prev => ({ ...prev, navItem: null }))}
                  className="nav-link no-print"
                >
                  <div style={styles.navIcon}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          <div style={styles.navbarActions}>

            <button
              className="menu-toggle"
              style={styles.mobileMenuToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="noprint"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {viewport.isDesktop && (
              <div style={styles.actionButtons}>
                <button
                  style={{
                    ...styles.actionButton,
                    ...styles.printButton,
                    transform: hoverState.printButton ? "translateY(-2px)" : "translateY(0)",
                    opacity: isPrinting ? 0.7 : 1,
                  }}
                  onClick={handlePrint}
                  onMouseEnter={() => setHoverState(prev => ({ ...prev, printButton: true }))}
                  onMouseLeave={() => setHoverState(prev => ({ ...prev, printButton: false }))}
                  disabled={isPrinting}
                  className="no-print"
                >
                  <Printer size={14} />
                  <span>{isPrinting ? "Preparing..." : "Print"}</span>
                </button>

                <button
                  style={{
                    ...styles.actionButton,
                    ...styles.downloadButton,
                    transform: hoverState.downloadButton ? "translateY(-2px)" : "translateY(0)",
                  }}
                  onClick={handleDownloadPDF}
                  onMouseEnter={() => setHoverState(prev => ({ ...prev, downloadButton: true }))}
                  onMouseLeave={() => setHoverState(prev => ({ ...prev, downloadButton: false }))}
                  className="no-print"
                >
                  <Download size={14} />
                  <span>PDF</span>
                </button>
              </div>
            )}

            <div style={styles.statusBadge} className="no-print">
              <Zap size={12} />
              <span>Online CV</span>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu" style={styles.mobileNavMenu}>
            <div style={styles.mobileNavHeader}>
              <span style={styles.mobileNavTitle}>Navigation</span>
              <button
                style={styles.mobileNavClose}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav style={styles.mobileNavContent}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  style={{
                    ...styles.mobileNavItem,
                    backgroundColor: activeNav === item.id ? Theme.LIGHT_ACCENT : 'transparent',
                    color: activeNav === item.id ? Theme.ACCENT : Theme.TEXT_DARK,
                  }}
                  onClick={() => handleNavClick(item)}
                >
                  <div style={styles.mobileNavIcon}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                  {activeNav === item.id && <ChevronRight size={16} />}
                </button>
              ))}
              
              <div style={styles.mobileNavDivider} />
              
              <div style={styles.mobileActionButtons}>
                <button
                  style={styles.mobileDownloadButton}
                  onClick={handleDownloadPDF}
                >
                  <Download size={16} />
                  <span>Save PDF</span>
                </button>
                <button
                  style={styles.mobilePrintButton}
                  onClick={handlePrint}
                >
                  <Printer size={16} />
                  <span>Print CV</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <div ref={cvRef} style={styles.wrapper} className="cv-container">

        <div style={styles.printHeader} className="print-only">
          <div style={styles.printHeaderContent}>
            <h1 style={styles.printHeaderTitle}>Jiya Vegad</h1>
            <div style={styles.printHeaderInfo}>
              <span>Fashion Designer • Curriculum Vitae • {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>

        <div style={styles.layoutContainer}>

          <aside style={styles.sidebar} className="sidebar-print">
  
            <div style={styles.profileSection}>
              <div style={styles.imageContainer}>
                <div style={styles.imageWrapper}>
                  <img
                    src={ProfilePic}
                    alt="Jiya Vegad Portrait"
                    style={styles.profileImage}
                    className="profile-image-print"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x400?text=Profile+Image";
                    }}
                  />
                </div>
                <div style={styles.imageAccent} />
              </div>

              <div style={styles.profileText}>
                <h1 style={styles.name}>Jiya Vegad</h1>
                <p style={styles.role}>Fashion Designer</p>
                <div style={styles.titleDivider} />
                <p style={styles.tagline}>
                  Creative designer focused on sustainable fashion and traditional craft innovation
                </p>
              </div>
            </div>

            {/* Contact */}
            <SectionHeader 
              icon={<Mail size={18} />} 
              title="Contact" 
              onClick={() => toggleSection('contact')}
              isExpanded={expandedSections.contact}
              isMobile={viewport.isMobile}
            />
            {(!viewport.isMobile || expandedSections.contact) && (
              <div style={styles.contactSection}>
                <InfoRow icon={<Mail size={16} />} text="jiyavegad15@gmail.com" />
                <InfoRow icon={<Phone size={16} />} text="+91 77648 4208" />
                <InfoRow icon={<MapPin size={16} />} text="Chaibasa, Jharkhand, India" />
              </div>
            )}

            {/* Education */}
            <SectionHeader 
              icon={<BookOpen size={18} />} 
              title="Education" 
              onClick={() => toggleSection('education')}
              isExpanded={expandedSections.education}
              isMobile={viewport.isMobile}
            />
            {(!viewport.isMobile || expandedSections.education) && (
              <div style={styles.educationSection}>
                <EducationItem
                  title="BACHELOR OF DESIGN"
                  subtitle="Footwear Design And Development Institute"
                  time="2021 - 2025"
                  gpa="CGPA: 9.05"
                />
                <EducationItem
                  title="HIGHER SECONDARY SCHOOL"
                  subtitle="S.J. DAV Public School"
                  time="2018 - 2020"
                />
              </div>
            )}

            {/* Achievements */}
            <SectionHeader 
              icon={<Trophy size={18} />} 
              title="Achievements" 
              onClick={() => toggleSection('achievements')}
              isExpanded={expandedSections.achievements}
              isMobile={viewport.isMobile}
            />
            {(!viewport.isMobile || expandedSections.achievements) && (
              <div style={styles.achievementSection}>
                {[
                  "1st Prize – Face Painting, FDDI",
                  "2nd Prize – Fashion Show, NIFT Spectrum 2023",
                  "2nd Prize – National Gujarati Drawing Competition"
                ].map((item, idx) => (
                  <AchievementItem key={idx} item={item} />
                ))}
              </div>
            )}

            {/* Software Skills */}
            <SectionHeader 
              icon={<Cpu size={18} />} 
              title="Software" 
              onClick={() => toggleSection('software')}
              isExpanded={expandedSections.software}
              isMobile={viewport.isMobile}
            />
            {(!viewport.isMobile || expandedSections.software) && (
              <div style={styles.skillSection}>
                {["Procreate", "Illustrator", "Microsoft Excel"].map((skill) => (
                  <div key={skill} style={styles.softwareSkill} className="skill-tag-print">
                    {skill}
                  </div>
                ))}
              </div>
            )}

            {/* Soft Skills */}
            <SectionHeader 
              icon={<Users size={18} />} 
              title="Soft Skills" 
              onClick={() => toggleSection('softSkills')}
              isExpanded={expandedSections.softSkills}
              isMobile={viewport.isMobile}
            />
            {(!viewport.isMobile || expandedSections.softSkills) && (
              <div style={styles.skillSection}>
                {[
                  "Surface Embellishment", "Pattern Making", "Trend Analysis", 
                  "Team Communication", "Problem Solving"
                ].map((skill) => (
                  <div key={skill} style={styles.softSkill} className="skill-tag-print">
                    {skill}
                  </div>
                ))}
              </div>
            )}

            {/* Social Links */}
            <div style={styles.socialLinks} className="no-print">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com/jiya_vegad" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                <Instagram size={18} />
              </a>
              <a href="mailto:jiyavegad15@gmail.com" style={styles.socialLink}>
                <Mail size={18} />
              </a>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main style={styles.main} className="main-print">
            {/* Profile Statement */}
            <section id="cv" style={styles.contentBlock}>
              <div style={styles.quoteCard}>
                <div style={styles.quoteIcon}>
                  <Zap size={20} color={Theme.ACCENT} />
                </div>
                <p style={styles.profileQuote}>
                  A creative fashion designer drawn to fantasy-driven storytelling and sustainable design. 
                  I experiment, learn, and create through hands-on processes, 
                  while travel music, dance, and sports keep my mind open, balanced, and inspired to develop innovative design solutions
                </p>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" style={styles.contentBlock}>
              <SectionHeader icon={<Briefcase size={20} />} title="Work Experience" />

              {/* AMIT AGGARWAL */}
              <ExperienceCard
                company="Amit Aggarwal"
                role="Design Intern"
                time="Sept – Dec 2025"
                sections={[
                  {
                    title: "AM.IT – Pret Collection (1 Month)",
                    points: [
                      "Assisted the design and product development teams for the pret collection.",
                      "Coordinated muslins for initial samples and prototypes.",
                      "Supported R&D focused on materials, surface development, and design feasibility.",
                      "Handled material sourcing as per design requirements.",
                      "Prepared and updated tech packs for sampling accuracy.",
                      "Created line sheets and maintained the master sheet.",
                      "Worked closely with pattern masters and technical teams during construction."
                    ]
                  },
                  {
                    title: "CULT – Spring/Summer 2026 Collection (2 Months)",
                    points: [
                      "Contributed to design and R&D for the SS'26 collection.",
                      "Developed swatches exploring materials, textures, and finishes.",
                      "Assisted in textile and embroidery exploration aligned with the brand language.",
                      "Coordinated with karigars and artisans for sample execution.",
                      "Prepared detailed tech packs for production consistency.",
                      "Created line sheets and swatch boards for reviews and presentations.",
                      "Contributed to world-record experimental projects as a motif designer."
                    ]
                  }
                ]}
                viewport={viewport}
              />

              {/* TOIE */}
              <ExperienceCard
                company="TOIE"
                role="Brand Development Assistant"
                time="June 2025 – Aug 2025"
                sections={[
                  {
                    title: "Brand Development Projects",
                    points: [
                      "Supported end-to-end brand development: research, ideation, design, and sourcing.",
                      "Worked on garment segmentation, market research, tech packs, and PR packages.",
                      "Assisted with content creation and sales planning.",
                      "Strengthened teamwork and professional communication skills.",
                      "Participated in strategic planning sessions and client presentations."
                    ]
                  }
                ]}
                viewport={viewport}
              />

              {/* SAYANTAN SARKAR */}
              <ExperienceCard
                company="Sayantan Sarkar"
                role="Design Assistant"
                time="Jan – Mar 2024"
                sections={[
                  {
                    title: "DOMARI – Collection for Khadi Festival 2024 × FDCB",
                    points: [
                      "Assisted in fashion collection showcased in khadi festival organized by FDCB.",
                      "Contributed in design process, pattern making, and construction.",
                      "Supported surface embellishments and textile development.",
                      "Worked as social media manager for the collection's promotion.",
                      "Coordinated photoshoots in various locations across Kolkata streets."
                    ]
                  },
                  {
                    title: "MIMOSA – Collection for Bharat Tex 2024",
                    points: [
                      "Assisted in designing, surface embellishments and trend research.",
                      "Supported material sourcing and sample development.",
                      "Contributed to exhibition preparation and display planning.",
                      "Participated in client meetings and design presentations."
                    ]
                  }
                ]}
                viewport={viewport}
              />

              {/* THE BLUR MAGAZINE */}
              <ExperienceCard
                company="THE BLUR MAGAZINE"
                role="Fashion Department Contributor"
                time="Aug – Sept 2024"
                sections={[
                  {
                    title: "Editorial Contributions",
                    points: [
                      "Worked in fashion department for the magazine.",
                      "Provided content for regular Instagram posts and digital campaigns.",
                      "Contributed to digital projects and online publication content.",
                      "Assisted in editorial planning and content strategy development.",
                      "Supported photo shoot coordination and styling sessions."
                    ]
                  }
                ]}
                viewport={viewport}
              />
            </section>

            {/* Craft Cluster */}
            <section id="skills" style={styles.contentBlock}>
              <SectionHeader icon={<Palette size={20} />} title="Craft Cluster Research" />
              
              <div style={styles.craftCard}>
                <div style={styles.craftHeader}>
                  <div>
                    <h3 style={styles.craftTitle}>BLUE ART POTTERY</h3>
                    <span style={styles.craftLocation}>Jaipur, Rajasthan</span>
                  </div>
                  {!viewport.isMobile && (
                    <div style={styles.craftBadge}>
                      <Target size={14} />
                      <span>Traditional Craft Innovation</span>
                    </div>
                  )}
                </div>
                
                <ul style={styles.craftDescription}>
                  <li>Innovatively merged pottery techniques with garment design</li>
                  <li>Designed contemporary, aesthetic products by upcycling cancelled and waste materials</li>
                  <li>Craft Cluster (Blue Art Pottery): Translated Jaipuri ceramic motifs into contemporary textile surfaces</li>
                  <li>Material-led design exploration bridging traditional craft with modern fashion</li>
                </ul>
                
                <div style={styles.craftHighlights}>
                  <div style={styles.craftHighlight}>
                    <Target size={16} color={Theme.ACCENT} />
                    <span>Traditional to Contemporary Translation</span>
                  </div>
                  <div style={styles.craftHighlight}>
                    <Cpu size={16} color={Theme.ACCENT} />
                    <span>Material Innovation & Upcycling</span>
                  </div>
                  <div style={styles.craftHighlight}>
                    <Users size={16} color={Theme.ACCENT} />
                    <span>Craft Preservation through Modern Design</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Print Footer */}
            <div style={styles.printFooter} className="print-only">
              <div style={styles.printFooterContent}>
                <span>Jiya Vegad • Fashion Designer • jiyavegad15@gmail.com</span>
                <span>Page 1 of 1 • Generated on {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

/* ---------- ENHANCED SECTION HEADER WITH TOGGLE ---------- */
const SectionHeader = ({ icon, title, onClick, isExpanded, isMobile }) => (
  <div
    style={{
      margin: "2rem 0 1rem",
      cursor: isMobile ? "pointer" : "default",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "0.5rem 0" : "0",
    }}
    onClick={onClick}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `${Theme.ACCENT}20`,
          borderRadius: "8px",
          color: Theme.ACCENT,
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: "0.875rem",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: isMobile ? Theme.ACCENT : Theme.ACCENT,
          fontWeight: 600,
          margin: 0,
        }}
      >
        {title}
      </h3>
    </div>

    {isMobile && (
      <div style={{ color: Theme.ACCENT }}>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
    )}
  </div>
);


/* ---------- REUSABLE COMPONENTS ---------- */
const InfoRow = ({ icon, text }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.75rem",
    fontSize: "0.875rem",
    opacity: 0.9,
  }}>
    <div style={{ color: Theme.ACCENT }}>{icon}</div>
    <span>{text}</span>
  </div>
);

const EducationItem = ({ title, subtitle, time, gpa }) => (
  <div style={{ marginBottom: "1.5rem" }}>
    <h4 style={{
      fontSize: "0.875rem",
      fontWeight: 600,
      marginBottom: "0.25rem",
      color: Theme.ACCENT,
      letterSpacing: "1px",
    }}>{title}</h4>
    <p style={{
      fontSize: "0.8125rem",
      opacity: 0.9,
      marginBottom: "0.25rem",
      lineHeight: 1.4,
    }}>{subtitle}</p>
    <p style={{
      fontSize: "0.75rem",
      opacity: 0.7,
      marginBottom: "0.25rem",
    }}>{time}</p>
    {gpa && <p style={{
      fontSize: "0.75rem",
      color: Theme.ACCENT,
      fontWeight: 500,
    }}>{gpa}</p>}
  </div>
);

const AchievementItem = ({ item }) => (
  <div style={{
    display: "flex",
    alignItems: "flex-start",
    fontSize: "0.875rem",
    marginBottom: "0.75rem",
    lineHeight: 1.4,
  }}>
    <Trophy size={12} style={{ marginRight: "10px", color: Theme.ACCENT, flexShrink: 0, marginTop: "2px" }} />
    <span>{item}</span>
  </div>
);

const ExperienceCard = ({ company, role, time, sections, viewport }) => (
  <div style={{
    backgroundColor: "rgba(156, 175, 136, 0.03)",
    border: `1px solid ${Theme.BORDER}`,
    borderRadius: "8px",
    padding: viewport.isMobile ? "1rem" : "1.5rem",
    marginBottom: "1rem",
  }}>
    <div style={{
      display: "flex",
      flexDirection: viewport.isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: viewport.isMobile ? "flex-start" : "flex-start",
      marginBottom: "1rem",
      gap: viewport.isMobile ? "0.5rem" : "0",
    }}>
      <div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: viewport.isMobile ? "1.1rem" : "1.25rem",
          color: Theme.TEXT_DARK,
          marginBottom: "0.25rem",
        }}>{company}</h3>
        <p style={{
          fontSize: "0.875rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: Theme.ACCENT,
          fontWeight: 500,
        }}>{role}</p>
      </div>
      <span style={{
        fontSize: "0.75rem",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: Theme.MUTED,
        fontWeight: 500,
      }}>{time}</span>
    </div>
    
    <div>
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} style={{ marginBottom: "1rem" }}>
          <h4 style={{
            fontSize: viewport.isMobile ? "0.9rem" : "0.95rem",
            fontWeight: '600',
            color: Theme.ACCENT,
            margin: '0 0 0.5rem 0',
          }}>{section.title}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {section.points.map((p, idx) => (
              <li key={idx} style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '0.5rem',
                fontSize: viewport.isMobile ? "0.85rem" : "0.875rem",
                lineHeight: 1.5,
                color: Theme.MUTED,
                alignItems: 'flex-start',
              }}>
                <div style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: Theme.ACCENT,
                  borderRadius: '50%',
                  marginTop: '0.5rem',
                  flexShrink: 0,
                }} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

/* ---------- RESPONSIVE STYLES GENERATOR ---------- */
const getResponsiveStyles = (viewport) => ({
  pageContainer: {
    background: Theme.BG,
    minHeight: "100vh",
    position: "relative",
    padding: viewport.isMobile ? "0" : "0",
    overflowX: "hidden",
  },

  // Navbar Styles
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(20px)",
    backgroundColor: Theme.NAVBAR_BG,
    borderBottom: `1px solid ${Theme.BORDER}`,
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.05)",
  },

  navbarContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: viewport.isMobile ? "0.75rem 1rem" : "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: viewport.isMobile ? "0.5rem" : "2rem",
  },

  navbarBrand: {
    display: "flex",
    alignItems: "center",
    gap: viewport.isMobile ? "0.75rem" : "1rem",
    flexShrink: 0,
  },

  logo: {
    position: "relative",
    width: viewport.isMobile ? "36px" : "40px",
    height: viewport.isMobile ? "36px" : "40px",
    borderRadius: "10px",
    backgroundColor: Theme.ACCENT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: Theme.WHITE,
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: viewport.isMobile ? "1rem" : "1.1rem",
  },

  logoBadge: {
    position: "absolute",
    bottom: "-4px",
    right: "-4px",
    width: "16px",
    height: "16px",
    backgroundColor: Theme.WHITE,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: Theme.ACCENT,
    border: `1px solid ${Theme.ACCENT}`,
  },

  logoText: {
    zIndex: 1,
  },

  brandText: {
    fontSize: viewport.isMobile ? "0.9rem" : "1.1rem",
    fontWeight: 600,
    color: Theme.TEXT_DARK,
    letterSpacing: "0.5px",
    display: viewport.isMobile ? "none" : "block",
  },

  navbarNav: {
    display: "flex",
    alignItems: "center",
    gap: viewport.isMobile ? "0.5rem" : "1rem",
    flex: 1,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: viewport.isMobile ? "0.5rem" : "0.5rem 0.75rem",
    background: "none",
    border: "none",
    fontSize: viewport.isMobile ? "0.75rem" : "0.8rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "6px",
    color: Theme.TEXT_DARK,
    minHeight: "36px",
    whiteSpace: "nowrap",
  },

  navIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  navbarActions: {
    display: "flex",
    alignItems: "center",
    gap: viewport.isMobile ? "0.5rem" : "1rem",
    flexShrink: 0,
  },

  mobileMenuToggle: {
    display: viewport.isMobile ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    color: Theme.TEXT_DARK,
    cursor: "pointer",
    padding: "0.5rem",
    minHeight: "44px",
    minWidth: "44px",
  },

  actionButtons: {
    display: viewport.isMobile ? "none" : "flex",
    alignItems: "center",
    gap: "0.75rem",
  },

  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "8px",
    border: "none",
    minHeight: "36px",
    whiteSpace: "nowrap",
  },

  downloadButton: {
    background: Theme.ACCENT,
    color: Theme.WHITE,
  },

  printButton: {
    background: Theme.WHITE,
    border: `1px solid ${Theme.ACCENT}`,
    color: Theme.ACCENT,
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: Theme.LIGHT_ACCENT,
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: Theme.ACCENT,
  },

  // Mobile Navigation Menu
  mobileNavMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: Theme.WHITE,
    borderTop: `1px solid ${Theme.BORDER}`,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    zIndex: 999,
  },

  mobileNavHeader: {
    padding: "1rem",
    borderBottom: `1px solid ${Theme.BORDER}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mobileNavTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    color: Theme.TEXT_DARK,
  },

  mobileNavClose: {
    background: "none",
    border: "none",
    color: Theme.TEXT_DARK,
    cursor: "pointer",
    padding: "0.5rem",
  },

  mobileNavContent: {
    padding: "1rem",
  },

  mobileNavItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    background: "none",
    border: "none",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    width: "100%",
    borderRadius: "8px",
    marginBottom: "0.5rem",
    color: Theme.TEXT_DARK,
  },

  mobileNavIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "0.75rem",
  },

  mobileNavDivider: {
    height: "1px",
    backgroundColor: Theme.BORDER,
    margin: "1rem 0",
  },

  mobileActionButtons: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },

  mobileDownloadButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "1rem",
    background: Theme.ACCENT,
    border: "none",
    color: Theme.WHITE,
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    minHeight: "44px",
  },

  mobilePrintButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "1rem",
    background: Theme.WHITE,
    border: `1px solid ${Theme.ACCENT}`,
    color: Theme.ACCENT,
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    minHeight: "44px",
  },

  wrapper: {
    maxWidth: "1400px",
    margin: viewport.isMobile ? "0" : "2rem auto",
    display: "flex",
    flexDirection: "column",
    background: Theme.WHITE,
    boxShadow: viewport.isMobile ? "none" : Theme.SHADOW,
    borderRadius: viewport.isMobile ? "0" : "12px",
    overflow: "hidden",
    minHeight: viewport.isMobile ? "calc(100vh - 60px)" : "calc(100vh - 4rem)",
  },

  layoutContainer: {
    display: "flex",
    flexDirection: viewport.isMobile ? "column" : "row",
    flex: 1,
  },

  sidebar: {
    width: viewport.isMobile ? "100%" : "360px",
    background: viewport.isMobile ? Theme.WHITE : Theme.SIDEBAR,
    color: viewport.isMobile ? Theme.TEXT_DARK : Theme.TEXT_LIGHT,
    padding: viewport.isMobile ? "1.5rem" : "3rem 2.5rem",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    borderRight: viewport.isMobile ? "none" : `1px solid ${Theme.BORDER}`,
    borderBottom: viewport.isMobile ? `1px solid ${Theme.BORDER}` : "none",
  },

  profileSection: {
    textAlign: "center",
    marginBottom: viewport.isMobile ? "1.5rem" : "2rem",
  },

  imageContainer: {
    position: "relative",
    marginBottom: viewport.isMobile ? "1rem" : "1.5rem",
  },

  imageWrapper: {
    width: viewport.isMobile ? "120px" : "200px",
    height: viewport.isMobile ? "160px" : "260px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    borderRadius: "4px",
  },

  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "none",
  },

  imageAccent: {
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "2px",
    backgroundColor: Theme.ACCENT,
  },

  profileText: {
    marginTop: "1rem",
  },

  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: viewport.isMobile ? "1.5rem" : "2rem",
    fontWeight: 500,
    margin: 0,
    letterSpacing: "-0.02em",
  },

  role: {
    fontSize: viewport.isMobile ? "0.7rem" : "0.75rem",
    letterSpacing: "3px",
    textTransform: "uppercase",
    opacity: 0.7,
    marginTop: "0.25rem",
    color: viewport.isMobile ? Theme.MUTED : Theme.TEXT_LIGHT,
  },

  tagline: {
    fontSize: viewport.isMobile ? "0.8rem" : "0.875rem",
    color: viewport.isMobile ? Theme.MUTED : Theme.TEXT_LIGHT,
    opacity: 0.8,
    marginTop: "0.75rem",
    lineHeight: 1.5,
  },

  titleDivider: {
    width: "30px",
    height: "1px",
    backgroundColor: Theme.ACCENT,
    margin: "0.75rem auto",
    opacity: 0.5,
  },

  contactSection: {
    marginBottom: "1rem",
  },

  educationSection: {
    marginBottom: "1rem",
  },

  achievementSection: {
    marginBottom: "1rem",
  },

  skillSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1rem",
  },

  softwareSkill: {
    background: viewport.isMobile ? Theme.LIGHT_ACCENT : "rgba(255, 255, 255, 0.1)",
    border: `1px solid ${Theme.ACCENT}`,
    padding: viewport.isMobile ? "0.375rem 0.75rem" : "0.5rem 1rem",
    fontSize: viewport.isMobile ? "0.7rem" : "0.75rem",
    borderRadius: "4px",
    color: Theme.ACCENT,
  },

  softSkill: {
    background: viewport.isMobile ? Theme.LIGHT_ACCENT : "rgba(255, 255, 255, 0.05)",
    border: viewport.isMobile ? `1px solid ${Theme.ACCENT}30` : `1px solid rgba(255, 255, 255, 0.2)`,
    padding: viewport.isMobile ? "0.375rem 0.75rem" : "0.5rem 1rem",
    fontSize: viewport.isMobile ? "0.7rem" : "0.75rem",
    borderRadius: "4px",
    color: viewport.isMobile ? Theme.TEXT_DARK : Theme.TEXT_LIGHT,
  },

  socialLinks: {
    display: "flex",
    gap: "1rem",
    marginTop: "auto",
    paddingTop: "2rem",
    justifyContent: "center",
  },

  socialLink: {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${viewport.isMobile ? Theme.ACCENT : 'rgba(156, 175, 136, 0.3)'}`,
    borderRadius: "50%",
    color: viewport.isMobile ? Theme.TEXT_DARK : Theme.TEXT_LIGHT,
    transition: "all 0.3s ease",
    textDecoration: "none",
    backgroundColor: viewport.isMobile ? Theme.LIGHT_ACCENT : 'transparent',
  },

  main: {
    flex: 1,
    padding: viewport.isMobile ? "1.5rem" : "3rem",
    overflowY: "auto",
  },

  contentBlock: {
    marginBottom: viewport.isMobile ? "2rem" : "3rem",
  },

  quoteCard: {
    borderLeft: `4px solid ${Theme.ACCENT}`,
    paddingLeft: "1.25rem",
    marginBottom: viewport.isMobile ? "1.5rem" : "2rem",
    position: "relative",
  },

  quoteIcon: {
    position: "absolute",
    top: "-10px",
    left: "-12px",
    width: "24px",
    height: "24px",
    backgroundColor: Theme.WHITE,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 0 0 4px ${Theme.WHITE}`,
  },

  profileQuote: {
    fontFamily: "'Playfair Display', serif",
    fontSize: viewport.isMobile ? "1.1rem" : "1.5rem",
    lineHeight: 1.6,
    color: Theme.TEXT_DARK,
    fontWeight: 300,
  },

  craftCard: {
    backgroundColor: Theme.LIGHT_ACCENT,
    border: `1px solid ${Theme.ACCENT}30`,
    borderRadius: "8px",
    padding: viewport.isMobile ? "1rem" : "1.5rem",
  },

  craftHeader: {
    display: "flex",
    flexDirection: viewport.isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: viewport.isMobile ? "flex-start" : "flex-start",
    marginBottom: "1rem",
    gap: viewport.isMobile ? "0.5rem" : "0",
  },

  craftTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: viewport.isMobile ? "1.1rem" : "1.25rem",
    color: Theme.TEXT_DARK,
    marginBottom: "0.25rem",
  },

  craftLocation: {
    fontSize: "0.875rem",
    color: Theme.MUTED,
  },

  craftBadge: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: Theme.WHITE,
    border: `1px solid ${Theme.ACCENT}`,
    borderRadius: "100px",
    fontSize: "0.75rem",
    color: Theme.ACCENT,
  },

  craftDescription: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
    color: Theme.MUTED,
    marginBottom: viewport.isMobile ? "1rem" : "1.5rem",
    paddingLeft: "1rem",
  },

  craftHighlights: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },

  craftHighlight: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.875rem",
    color: Theme.TEXT_DARK,
  },

  printHeader: {
    display: "none",
    padding: "1rem 0",
    borderBottom: "2px solid #333",
    marginBottom: "2rem",
  },

  printHeaderContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  printHeaderTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
    textAlign: "center",
  },

  printHeaderInfo: {
    textAlign: "center",
    marginTop: "0.5rem",
    fontSize: "14px",
    color: "#666",
  },

  printFooter: {
    display: "none",
    marginTop: "3rem",
    paddingTop: "1rem",
    borderTop: "1px solid #ddd",
    fontSize: "12px",
    color: "#666",
  },

  printFooterContent: {
    display: "flex",
    justifyContent: "space-between",
  },
});

/* ---------- GLOBAL STYLES ---------- */
const GlobalStyles = (viewport) => `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  padding: 0;
  background: ${Theme.BG};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Responsive Typography */
html {
  font-size: ${viewport.isExtraSmall ? '14px' : 
              viewport.isMobile ? '14px' : 
              viewport.isTablet ? '15px' : '16px'};
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
  button, a {
    min-height: 44px;
    min-width: 44px;
  }
  
  .experience-card,
  .craft-card {
    padding: 1rem !important;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Selection */
::selection {
  background-color: ${Theme.ACCENT}40;
  color: ${Theme.TEXT_DARK};
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: ${Theme.BG};
}
::-webkit-scrollbar-thumb {
  background: ${Theme.ACCENT}60;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: ${Theme.ACCENT};
}

/* Navbar Hover Effects */
.nav-item:hover {
  background-color: ${Theme.LIGHT_ACCENT};
}

.social-link:hover {
  background-color: ${Theme.ACCENT};
  color: ${Theme.WHITE};
  transform: translateY(-2px);
}

/* Print Styles */
@media print {
  @page {
    size: A4;
    margin: 0.5in;
  }
  
  body {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
    min-height: auto !important;
  }
  
  .no-print {
    display: none !important;
  }
  
  .cv-container {
    box-shadow: none !important;
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
    min-height: auto !important;
  }
  
  .sidebar-print {
    background: white !important;
    color: black !important;
    border-right: 1px solid #ddd !important;
    padding: 1.5rem !important;
  }
  
  .main-print {
    background: white !important;
    padding: 1.5rem !important;
  }
  
  .profile-image-print {
    filter: grayscale(100%) !important;
  }
  
  .experience-card-print,
  .craft-card-print {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  .skill-tag-print {
    border: 1px solid #333 !important;
    background: white !important;
    color: #333 !important;
  }
  
  .section-header-icon {
    background: #f5f5f5 !important;
    color: #333 !important;
  }
  
  .contact-button-print {
    background: #f5f5f5 !important;
    color: #333 !important;
    border: 1px solid #ddd !important;
  }
  
  a {
    color: black !important;
    text-decoration: none !important;
  }
  
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}

@media screen {
  .print-only {
    display: none !important;
  }
}
`;

/* ---------- MOBILE STYLES ---------- */
const MobileStyles = `
@media (max-width: 768px) {
  .navbar-brand {
    flex: 1;
  }
  
  .brand-text {
    display: block !important;
  }
  
  .navbar-nav {
    display: none !important;
  }
}

@media (max-width: 480px) {
  html {
    font-size: 14px !important;
  }
  
  .profile-name {
    font-size: 1.5rem !important;
  }
  
  .profile-role {
    font-size: 0.7rem !important;
    letter-spacing: 2px !important;
  }
  
  .experience-company {
    font-size: 1rem !important;
  }
  
  .experience-point {
    font-size: 0.85rem !important;
    line-height: 1.4 !important;
  }
}

/* Landscape Mode */
@media (max-height: 600px) and (orientation: landscape) {
  .sidebar {
    padding: 1rem !important;
  }
  
  .main {
    padding: 1rem !important;
  }
  
  .profile-image-wrapper {
    width: 100px !important;
    height: 130px !important;
  }
  
  .profile-name {
    font-size: 1.25rem !important;
  }
}

/* Tablet Styles */
@media (min-width: 768px) and (max-width: 1024px) {
  .wrapper {
    margin: 1rem auto !important;
  }
  
  .sidebar {
    width: 300px !important;
    padding: 2rem 1.5rem !important;
  }
  
  .main {
    padding: 2rem !important;
  }
  
  .profile-image-wrapper {
    width: 180px !important;
    height: 240px !important;
  }
  
  .profile-name {
    font-size: 1.75rem !important;
  }
}

/* Large Screens */
@media (min-width: 1600px) {
  .wrapper {
    max-width: 1400px !important;
  }
  
  .sidebar {
    width: 400px !important;
  }
  
  .main {
    padding: 4rem !important;
  }
}
`;

/* ---------- PRINT STYLES ---------- */
const PrintStyles = `
@media print {
  @page {
    size: A4;
    margin: 0.5in;
  }
  
  body {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .no-print {
    display: none !important;
  }
  
  .cv-container {
    box-shadow: none !important;
    border: none !important;
    margin: 0 !important;
    max-width: 100% !important;
    min-height: auto !important;
  }
  
  .sidebar-print {
    background: white !important;
    color: black !important;
    border-right: 1px solid #ddd !important;
    padding: 1.5rem !important;
    width: 35% !important;
  }
  
  .main-print {
    background: white !important;
    padding: 1.5rem !important;
    width: 65% !important;
  }
  
  .profile-image-print {
    filter: grayscale(100%) !important;
  }
  
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .print-header {
    display: block !important;
  }
  
  .print-footer {
    display: flex !important;
  }
}
`;

export default CVPage;