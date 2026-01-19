import React, { useState, useEffect } from "react";
import {
  Mail, Phone, MapPin,
  Briefcase, BookOpen, Award, Trophy,
  Star, ChevronRight, Instagram,
  FileText, Palette, Users, Target, Cpu,
  Zap, Download, Printer, Home,
  Menu, X,
  User, Grid,
  Linkedin, Sparkles, Eye, ExternalLink
} from "lucide-react";

import ProfilePic from "../assets/cv.jpg";
import CVPDF from "../assets/cvpdf.pdf";

const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setViewport({
        width,
        height: window.innerHeight,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
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
  SECONDARY_ACCENT: "#D4A574",
  LIGHT_ACCENT: "rgba(156, 175, 136, 0.1)",
  BORDER: "#E4E1D9",
  SHADOW: "0 20px 60px rgba(0, 0, 0, 0.08)",
  NAVBAR_BG: "rgba(252, 250, 245, 0.95)",
};

const CVPage = () => {
  const viewport = useViewport();
  const [hoverState, setHoverState] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeNav, setActiveNav] = useState("cv");

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

  // View PDF in new tab
  const handleViewPDF = () => {
    window.open(CVPDF, '_blank');
  };

  // Download PDF
  const handleDownloadPDF = () => {
    setIsProcessing(true);
    
    try {
      // Create a link element
      const link = document.createElement('a');
      link.href = CVPDF;
      link.download = 'Jiya_Vegad_CV.pdf';
      link.target = '_blank';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setIsProcessing(false);
      alert('Error downloading PDF. Please try again.');
    }
  };

  // Print PDF
  const handlePrintPDF = () => {
    setIsProcessing(true);
    
    // Open PDF in new tab for printing
    const printWindow = window.open(CVPDF, '_blank');
    
    if (printWindow) {
      // Wait for PDF to load, then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          try {
            printWindow.print();
          } catch (e) {
            // If print fails, fall back to download
            handleDownloadPDF();
          }
          setTimeout(() => {
            setIsProcessing(false);
          }, 500);
        }, 1000);
      };
    } else {
      // Fallback: download
      handleDownloadPDF();
      setIsProcessing(false);
    }
  };

  const handleNavClick = (navItem) => {
    setActiveNav(navItem.id);
    
    if (navItem.type === "external") {
      window.location.href = navItem.path;
    }
    
    if (viewport.isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const styles = getResponsiveStyles(viewport);

  return (
    <div style={styles.pageContainer}>
      <style>{GlobalStyles}</style>
      
      <header style={styles.navbar} className="no-print">
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
                  }}
                  onClick={() => handleNavClick(item)}
                  className="nav-link"
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
              className="menu-toggle no-print"
              style={styles.mobileMenuToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {viewport.isDesktop && (
              <div style={styles.actionButtons}>
                <button
                  style={{
                    ...styles.actionButton,
                    ...styles.viewButton,
                    transform: hoverState.viewButton ? "translateY(-2px)" : "translateY(0)",
                  }}
                  onClick={handleViewPDF}
                  onMouseEnter={() => setHoverState(prev => ({ ...prev, viewButton: true }))}
                  onMouseLeave={() => setHoverState(prev => ({ ...prev, viewButton: false }))}
                  className="no-print"
                >
                  <Eye size={14} />
                  <span>View PDF</span>
                </button>

                <button
                  style={{
                    ...styles.actionButton,
                    ...styles.printButton,
                    transform: hoverState.printButton ? "translateY(-2px)" : "translateY(0)",
                    opacity: isProcessing ? 0.7 : 1,
                  }}
                  onClick={handlePrintPDF}
                  onMouseEnter={() => setHoverState(prev => ({ ...prev, printButton: true }))}
                  onMouseLeave={() => setHoverState(prev => ({ ...prev, printButton: false }))}
                  disabled={isProcessing}
                  className="no-print"
                >
                  <Printer size={14} />
                  <span>{isProcessing ? "Processing..." : "Print PDF"}</span>
                </button>

                <button
                  style={{
                    ...styles.actionButton,
                    ...styles.downloadButton,
                    transform: hoverState.downloadButton ? "translateY(-2px)" : "translateY(0)",
                    opacity: isProcessing ? 0.7 : 1,
                  }}
                  onClick={handleDownloadPDF}
                  onMouseEnter={() => setHoverState(prev => ({ ...prev, downloadButton: true }))}
                  onMouseLeave={() => setHoverState(prev => ({ ...prev, downloadButton: false }))}
                  disabled={isProcessing}
                  className="no-print"
                >
                  <Download size={14} />
                  <span>{isProcessing ? "Downloading..." : "Download PDF"}</span>
                </button>
              </div>
            )}

            <div style={styles.statusBadge} className="no-print">
              <Zap size={12} />
              <span>Professional CV</span>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu no-print" style={styles.mobileNavMenu}>
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
                  style={styles.mobileViewButton}
                  onClick={handleViewPDF}
                >
                  <Eye size={16} />
                  <span>View PDF</span>
                </button>
                <button
                  style={styles.mobileDownloadButton}
                  onClick={handleDownloadPDF}
                  disabled={isProcessing}
                >
                  <Download size={16} />
                  <span>{isProcessing ? "Processing..." : "Download PDF"}</span>
                </button>
                <button
                  style={styles.mobilePrintButton}
                  onClick={handlePrintPDF}
                  disabled={isProcessing}
                >
                  <Printer size={16} />
                  <span>{isProcessing ? "Processing..." : "Print PDF"}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

        {/* CV Preview Section */}
        <div style={styles.cvPreviewSection}>
          <h2 style={styles.previewTitle}>CV Preview</h2>
          <p style={styles.previewSubtitle}>
            Below is a preview of the CV content. For the complete professionally formatted document, 
            use the download options above.
          </p>
          
          <div style={styles.layoutContainer}>
            {/* SIDEBAR */}
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
                        e.target.src = "https://via.placeholder.com/300x400?text=Profile+Image";
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
              <div style={styles.sectionContainer}>
                <div style={styles.sectionHeader}>
                  <Mail size={18} />
                  <h3 style={styles.sectionTitle}>Contact</h3>
                </div>
                <div style={styles.contactSection}>
                  <InfoRow icon={<Mail size={16} />} text="jiyavegad15@gmail.com" />
                  <InfoRow icon={<Phone size={16} />} text="+91 77648 34208" />
                  <InfoRow icon={<MapPin size={16} />} text="Chaibasa, Jharkhand, India" />
                </div>
              </div>

              {/* Education */}
              <div style={styles.sectionContainer}>
                <div style={styles.sectionHeader}>
                  <BookOpen size={18} />
                  <h3 style={styles.sectionTitle}>Education</h3>
                </div>
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
              </div>

              {/* Achievements */}
              <div style={styles.sectionContainer}>
                <div style={styles.sectionHeader}>
                  <Trophy size={18} />
                  <h3 style={styles.sectionTitle}>Achievements</h3>
                </div>
                <div style={styles.achievementSection}>
                  {[
                    "1st Prize – Face Painting, FDDI",
                    "2nd Prize – Fashion Show, NIFT Spectrum 2023",
                    "2nd Prize – National Gujarati Drawing Competition"
                  ].map((item, idx) => (
                    <AchievementItem key={idx} item={item} />
                  ))}
                </div>
              </div>

              {/* Software Skills */}
              <div style={styles.sectionContainer}>
                <div style={styles.sectionHeader}>
                  <Cpu size={18} />
                  <h3 style={styles.sectionTitle}>Software</h3>
                </div>
                <div style={styles.skillSection}>
                  {["Procreate", "Illustrator", "Microsoft Excel"].map((skill) => (
                    <div key={skill} style={styles.softwareSkill}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div style={styles.sectionContainer}>
                <div style={styles.sectionHeader}>
                  <Users size={18} />
                  <h3 style={styles.sectionTitle}>Soft Skills</h3>
                </div>
                <div style={styles.skillSection}>
                  {[
                    "Surface Embellishment", "Pattern Making", "Trend Analysis", 
                    "Team Communication", "Problem Solving"
                  ].map((skill) => (
                    <div key={skill} style={styles.softSkill}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links - Hidden in print */}
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
              <section style={styles.contentBlock}>
                <div style={styles.quoteCard}>
                  <div style={styles.quoteIcon}>
                    <Sparkles size={20} color={Theme.ACCENT} />
                  </div>
                  <p style={styles.profileQuote}>
                    A creative fashion designer drawn to fantasy-driven storytelling and sustainable design. 
                    I experiment, learn, and create through hands-on processes, while travel, music, dance, 
                    and sports keep my mind open, balanced, and inspired to develop innovative design solutions.
                  </p>
                </div>
              </section>

              {/* Work Experience */}
              <section style={styles.contentBlock}>
                <div style={styles.sectionHeaderMain}>
                  <Briefcase size={20} />
                  <h2 style={styles.sectionTitleMain}>Work Experience</h2>
                </div>

                {/* AMIT AGGARWAL */}
                <div className="page-break-avoid">
                  <ExperienceCard
                    company="Amit Aggarwal"
                    role="Design Intern"
                    time="Sept – Dec 2025"
                    sections={[
                      {
                        title: "AM.IT – Pret Collection (1 Month)",
                        points: [
                          "Assisted the design and product development teams for the pret collection",
                          "Coordinated muslins for initial samples and prototypes",
                          "Supported R&D focused on materials, surface development, and design feasibility",
                          "Handled material sourcing as per design requirements",
                          "Prepared and updated tech packs for sampling accuracy",
                          "Created line sheets and maintained the master sheet",
                          "Worked closely with pattern masters and technical teams during construction"
                        ]
                      },
                      {
                        title: "CULT – Spring/Summer 2026 Collection (2 Months)",
                        points: [
                          "Contributed to design and R&D for the SS'26 collection",
                          "Developed swatches exploring materials, textures, and finishes",
                          "Assisted in textile and embroidery exploration aligned with the brand language",
                          "Coordinated with karigars and artisans for sample execution",
                          "Prepared detailed tech packs for production consistency",
                          "Created line sheets and swatch boards for reviews and presentations",
                          "Contributed to world-record experimental projects as a motif designer"
                        ]
                      }
                    ]}
                  />
                </div>

                {/* TOIE */}
                <ExperienceCard
                  company="TOIE"
                  role="Brand Development Assistant"
                  time="June 2025 – Aug 2025"
                  sections={[
                    {
                      title: "Brand Development Projects",
                      points: [
                        "Supported end-to-end brand development: research, ideation, design, and sourcing",
                        "Worked on garment segmentation, market research, tech packs, and PR packages",
                        "Assisted with content creation and sales planning",
                        "Strengthened teamwork and professional communication skills",
                        "Participated in strategic planning sessions and client presentations"
                      ]
                    }
                  ]}
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
                        "Assisted in fashion collection showcased in khadi festival organized by FDCB",
                        "Contributed in design process, pattern making, and construction",
                        "Supported surface embellishments and textile development",
                        "Worked as social media manager for the collection's promotion",
                        "Coordinated photoshoots in various locations across Kolkata streets"
                      ]
                    },
                    {
                      title: "MIMOSA – Collection for Bharat Tex 2024",
                      points: [
                        "Assisted in designing, surface embellishments and trend research",
                        "Supported material sourcing and sample development",
                        "Contributed to exhibition preparation and display planning",
                        "Participated in client meetings and design presentations"
                      ]
                    }
                  ]}
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
                        "Worked in fashion department for the magazine",
                        "Provided content for regular Instagram posts and digital campaigns",
                        "Contributed to digital projects and online publication content",
                        "Assisted in editorial planning and content strategy development",
                        "Supported photo shoot coordination and styling sessions"
                      ]
                    }
                  ]}
                />
              </section>

              {/* Craft Cluster */}
              <section style={styles.contentBlock} className="page-break-avoid">
                <div style={styles.sectionHeaderMain}>
                  <Palette size={20} />
                  <h2 style={styles.sectionTitleMain}>Craft Cluster Research</h2>
                </div>
                
                <div style={styles.craftCard}>
                  <div style={styles.craftHeader}>
                    <div>
                      <h3 style={styles.craftTitle}>BLUE ART POTTERY</h3>
                      <span style={styles.craftLocation}>Jaipur, Rajasthan</span>
                    </div>
                    <div style={styles.craftBadge}>
                      <Target size={14} />
                      <span>Traditional Craft Innovation</span>
                    </div>
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
            </main>
          </div>
        </div>
      <div style={styles.wrapper} className="cv-container">
        {/* PDF Download Section */}
        <div style={styles.pdfDownloadSection}>
          <div style={styles.pdfDownloadHeader}>
            <div style={styles.pdfDownloadHeaderContent}>
              <FileText size={24} color={Theme.ACCENT} />
              <h2 style={styles.pdfDownloadTitle}>Professional CV Document</h2>
              <p style={styles.pdfDownloadSubtitle}>
                Download or print the professionally formatted CV document for job applications and professional use.
              </p>
            </div>
          </div>

          <div style={styles.pdfDownloadGrid}>
            <div style={styles.pdfDownloadCard}>
              <div style={styles.pdfDownloadIcon}>
                <Eye size={24} color={Theme.ACCENT} />
              </div>
              <h3 style={styles.pdfDownloadCardTitle}>Preview</h3>
              <p style={styles.pdfDownloadCardText}>
                View the complete CV document in PDF format before downloading.
              </p>
              <button
                style={styles.pdfDownloadCardButton}
                onClick={handleViewPDF}
              >
                <Eye size={16} />
                <span>Preview PDF</span>
              </button>
            </div>

            <div style={styles.pdfDownloadCard}>
              <div style={styles.pdfDownloadIcon}>
                <Download size={24} color={Theme.ACCENT} />
              </div>
              <h3 style={styles.pdfDownloadCardTitle}>Download</h3>
              <p style={styles.pdfDownloadCardText}>
                Download the professionally formatted CV document in PDF format.
              </p>
              <button
                style={{
                  ...styles.pdfDownloadCardButton,
                  background: Theme.ACCENT,
                  color: Theme.WHITE,
                  opacity: isProcessing ? 0.7 : 1,
                }}
                onClick={handleDownloadPDF}
                disabled={isProcessing}
              >
                <Download size={16} />
                <span>{isProcessing ? "Downloading..." : "Download PDF"}</span>
              </button>
            </div>

            <div style={styles.pdfDownloadCard}>
              <div style={styles.pdfDownloadIcon}>
                <Printer size={24} color={Theme.ACCENT} />
              </div>
              <h3 style={styles.pdfDownloadCardTitle}>Print</h3>
              <p style={styles.pdfDownloadCardText}>
                Print the CV document directly from your browser with optimized formatting.
              </p>
              <button
                style={{
                  ...styles.pdfDownloadCardButton,
                  border: `1px solid ${Theme.ACCENT}`,
                  color: Theme.ACCENT,
                  background: Theme.WHITE,
                  opacity: isProcessing ? 0.7 : 1,
                }}
                onClick={handlePrintPDF}
                disabled={isProcessing}
              >
                <Printer size={16} />
                <span>{isProcessing ? "Processing..." : "Print PDF"}</span>
              </button>
            </div>
          </div>

          <div style={styles.pdfDownloadInfo}>
            <div style={styles.pdfDownloadInfoItem}>
              <ExternalLink size={16} color={Theme.ACCENT} />
              <span>Professional A4 Format</span>
            </div>
            <div style={styles.pdfDownloadInfoItem}>
              <ExternalLink size={16} color={Theme.ACCENT} />
              <span>Optimized for Print</span>
            </div>
            <div style={styles.pdfDownloadInfoItem}>
              <ExternalLink size={16} color={Theme.ACCENT} />
              <span>Ready for Job Applications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- REUSABLE COMPONENTS ---------- */
const InfoRow = ({ icon, text }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.75rem",
    fontSize: "0.875rem",
    color: "inherit",
    opacity: 0.9,
  }}>
    <div style={{ color: Theme.ACCENT, flexShrink: 0 }}>{icon}</div>
    <span style={{ wordBreak: "break-word" }}>{text}</span>
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
    <div style={{ marginRight: "10px", color: Theme.ACCENT, flexShrink: 0, marginTop: "2px" }}>
      <Star size={12} fill={Theme.ACCENT} color={Theme.ACCENT} />
    </div>
    <span>{item}</span>
  </div>
);

const ExperienceCard = ({ company, role, time, sections }) => (
  <div style={{
    backgroundColor: "rgba(156, 175, 136, 0.03)",
    border: `1px solid ${Theme.BORDER}`,
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    breakInside: "avoid",
  }}>
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem",
    }}>
      <div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.25rem",
          color: Theme.TEXT_DARK,
          marginBottom: "0.25rem",
        }}>{company}</h3>
        <p style={{
          fontSize: "0.875rem",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: Theme.ACCENT,
          fontWeight: 500,
        }}>{role}</p>
      </div>
      <span style={{
        fontSize: "0.75rem",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: Theme.MUTED,
        fontWeight: 500,
        backgroundColor: Theme.LIGHT_ACCENT,
        padding: "0.25rem 0.75rem",
        borderRadius: "4px",
      }}>{time}</span>
    </div>
    
    <div>
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} style={{ marginBottom: "1rem" }}>
          <h4 style={{
            fontSize: "0.95rem",
            fontWeight: '600',
            color: Theme.SECONDARY_ACCENT,
            margin: '0 0 0.5rem 0',
            fontStyle: 'italic',
          }}>{section.title}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {section.points.map((p, idx) => (
              <li key={idx} style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '0.5rem',
                fontSize: "0.875rem",
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

/* ---------- RESPONSIVE STYLES ---------- */
const getResponsiveStyles = (viewport) => ({
  pageContainer: {
    background: Theme.BG,
    minHeight: "100vh",
    position: "relative",
  },

  // Navbar
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
    gap: "1rem",
    flex: 1,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 0.75rem",
    background: "none",
    border: "none",
    fontSize: "0.8rem",
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
    gap: "1rem",
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

  viewButton: {
    background: Theme.WHITE,
    border: `1px solid ${Theme.BORDER}`,
    color: Theme.TEXT_DARK,
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

  // Mobile Navigation
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
    flexDirection: "column",
    gap: "0.75rem",
    marginTop: "1rem",
  },

  mobileViewButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "1rem",
    background: Theme.WHITE,
    border: `1px solid ${Theme.BORDER}`,
    color: Theme.TEXT_DARK,
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    minHeight: "44px",
  },

  mobileDownloadButton: {
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

  // PDF Download Section
  pdfDownloadSection: {
    padding: viewport.isMobile ? "1.5rem" : "2.5rem",
    background: "linear-gradient(135deg, rgba(156, 175, 136, 0.05) 0%, rgba(212, 165, 116, 0.05) 100%)",
    borderBottom: `1px solid ${Theme.BORDER}`,
  },

  pdfDownloadHeader: {
    textAlign: "center",
    marginBottom: "2rem",
  },

  pdfDownloadHeaderContent: {
    maxWidth: "600px",
    margin: "0 auto",
  },

  pdfDownloadTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: viewport.isMobile ? "1.5rem" : "2rem",
    color: Theme.TEXT_DARK,
    margin: "1rem 0 0.5rem 0",
  },

  pdfDownloadSubtitle: {
    fontSize: viewport.isMobile ? "0.9rem" : "1rem",
    color: Theme.MUTED,
    lineHeight: 1.6,
  },

  pdfDownloadGrid: {
    display: "grid",
    gridTemplateColumns: viewport.isMobile ? "1fr" : "repeat(3, 1fr)",
    gap: "1.5rem",
    marginBottom: "2rem",
  },

  pdfDownloadCard: {
    background: Theme.WHITE,
    border: `1px solid ${Theme.BORDER}`,
    borderRadius: "12px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  pdfDownloadIcon: {
    width: "56px",
    height: "56px",
    backgroundColor: Theme.LIGHT_ACCENT,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },

  pdfDownloadCardTitle: {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: Theme.TEXT_DARK,
    margin: "0 0 0.5rem 0",
  },

  pdfDownloadCardText: {
    fontSize: "0.875rem",
    color: Theme.MUTED,
    lineHeight: 1.5,
    marginBottom: "1.5rem",
    flex: 1,
  },

  pdfDownloadCardButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    border: `1px solid ${Theme.BORDER}`,
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
    minHeight: "44px",
    background: Theme.WHITE,
    color: Theme.TEXT_DARK,
  },

  pdfDownloadInfo: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1.5rem",
    fontSize: "0.875rem",
    color: Theme.MUTED,
  },

  pdfDownloadInfoItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  // CV Preview Section
  cvPreviewSection: {
    padding: viewport.isMobile ? "1.5rem" : "2.5rem",
  },

  previewTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: viewport.isMobile ? "1.5rem" : "2rem",
    color: Theme.TEXT_DARK,
    margin: "0 0 0.5rem 0",
  },

  previewSubtitle: {
    fontSize: viewport.isMobile ? "0.9rem" : "1rem",
    color: Theme.MUTED,
    lineHeight: 1.6,
    marginBottom: "2rem",
    maxWidth: "800px",
  },

  // Main CV Layout
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

  // Sidebar Styles
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
    marginBottom: "2rem",
  },

  imageContainer: {
    position: "relative",
    marginBottom: "1.5rem",
  },

  imageWrapper: {
    width: viewport.isMobile ? "120px" : "200px",
    height: viewport.isMobile ? "160px" : "260px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    borderRadius: "4px",
    border: `1px solid ${Theme.BORDER}`,
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
    color: "inherit",
  },

  role: {
    fontSize: viewport.isMobile ? "0.7rem" : "0.75rem",
    letterSpacing: "3px",
    textTransform: "uppercase",
    opacity: 0.7,
    marginTop: "0.25rem",
    color: "inherit",
  },

  tagline: {
    fontSize: viewport.isMobile ? "0.8rem" : "0.875rem",
    color: "inherit",
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

  sectionContainer: {
    marginBottom: "2rem",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
    color: Theme.ACCENT,
  },

  sectionTitle: {
    fontSize: "0.875rem",
    letterSpacing: "3px",
    textTransform: "uppercase",
    fontWeight: 600,
    margin: 0,
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
    background: "rgba(156, 175, 136, 0.1)",
    border: `1px solid ${Theme.ACCENT}`,
    padding: "0.5rem 1rem",
    fontSize: "0.75rem",
    borderRadius: "4px",
    color: Theme.ACCENT,
  },

  softSkill: {
    background: "rgba(255, 255, 255, 0.05)",
    border: `1px solid rgba(255, 255, 255, 0.2)`,
    padding: "0.5rem 1rem",
    fontSize: "0.75rem",
    borderRadius: "4px",
    color: "inherit",
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
    border: `1px solid rgba(156, 175, 136, 0.3)`,
    borderRadius: "50%",
    color: "inherit",
    transition: "all 0.3s ease",
    textDecoration: "none",
    backgroundColor: 'transparent',
  },

  // Main Content Styles
  main: {
    flex: 1,
    padding: viewport.isMobile ? "1.5rem" : "3rem",
    overflowY: "auto",
  },

  sectionHeaderMain: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1.5rem",
    color: Theme.ACCENT,
  },

  sectionTitleMain: {
    fontSize: "1.25rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontWeight: 600,
    margin: 0,
    color: Theme.TEXT_DARK,
  },

  contentBlock: {
    marginBottom: "3rem",
  },

  quoteCard: {
    borderLeft: `4px solid ${Theme.ACCENT}`,
    paddingLeft: "1.25rem",
    marginBottom: "2rem",
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
    fontSize: viewport.isMobile ? "0.9rem" : "1.1rem",
    lineHeight: 1.6,
    color: Theme.TEXT_DARK,
    fontWeight: 200,
    fontStyle: "italic",
  },

  craftCard: {
    backgroundColor: Theme.LIGHT_ACCENT,
    border: `1px solid ${Theme.ACCENT}30`,
    borderRadius: "8px",
    padding: "1.5rem",
  },

  craftHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },

  craftTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.25rem",
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
    marginBottom: "1.5rem",
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
});

/* ---------- GLOBAL STYLES ---------- */
const GlobalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  padding: 0;
  background: ${Theme.BG};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 500;
  margin-top: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Selection */
::selection {
  background-color: ${Theme.ACCENT}40;
  color: ${Theme.TEXT_DARK};
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
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

/* Hover Effects */
.nav-link:hover {
  background-color: ${Theme.LIGHT_ACCENT};
}

.social-link:hover {
  background-color: ${Theme.ACCENT};
  color: ${Theme.WHITE};
  transform: translateY(-2px);
}

.pdf-download-card-button:hover:not(:disabled) {
  background: ${Theme.ACCENT} !important;
  color: ${Theme.WHITE} !important;
  border-color: ${Theme.ACCENT} !important;
}
`;

export default CVPage;