import React, { useState, useRef } from "react";
import {
  Github, Linkedin, Mail, Phone, MapPin,
  Briefcase, BookOpen, Award, Trophy,
  Music, Plane, Star, ChevronRight, Instagram,
  FileText, Palette, Users, Target, Cpu,
  ArrowLeft, Zap, Download, Printer, Home
} from "lucide-react";

import ProfilePic from "../assets/cv.jpg";

/* ---------- ENHANCED THEME ---------- */
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
};

/* ---------- MAIN COMPONENT ---------- */
const CVPage = () => {
  const [hoverState, setHoverState] = useState({
    returnButton: false,
    downloadButton: false,
    printButton: false
  });
  const [isPrinting, setIsPrinting] = useState(false);

  const cvRef = useRef();

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Store original styles
    const originalStyles = {
      bodyOverflow: document.body.style.overflow,
      bodyBackground: document.body.style.background,
      bodyHeight: document.body.style.minHeight,
    };

    // Apply print styles
    document.body.style.overflow = 'visible';
    document.body.style.background = Theme.WHITE;
    document.body.style.minHeight = 'auto';

    // Small delay to ensure DOM updates
    setTimeout(() => {
      window.print();
      
      // Restore original styles
      document.body.style.overflow = originalStyles.bodyOverflow;
      document.body.style.background = originalStyles.bodyBackground;
      document.body.style.minHeight = originalStyles.bodyHeight;
      
      // Reset printing state
      setTimeout(() => setIsPrinting(false), 500);
    }, 100);
  };

  const handleDownloadPDF = () => {
    // Create a print version that looks good as PDF
    handlePrint();
  };

  const handleReturnHome = () => {
    window.location.href = "#/main2";
  };

  return (
    <div style={{ 
      background: Theme.BG, 
      minHeight: "100vh", 
      padding: "0",
      position: "relative"
    }}>
      {/* Print-specific styles */}
      <style>
        {`
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
              padding: 2rem !important;
            }
            
            .main-print {
              background: white !important;
              padding: 2rem !important;
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

          @media (max-width: 768px) {
            .cv-wrapper {
              flex-direction: column !important;
            }
            
            .sidebar-mobile {
              width: 100% !important;
              padding: 2rem !important;
            }
            
            .main-mobile {
              padding: 2rem !important;
            }
            
            .header-mobile {
              flex-direction: column !important;
              gap: 1rem !important;
              text-align: center !important;
            }
            
            .button-group-mobile {
              flex-direction: column !important;
              width: 100% !important;
            }
            
            .button-mobile {
              width: 100% !important;
              justify-content: center !important;
            }
          }
        `}
      </style>

      {/* Fixed Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <button
              style={{
                ...styles.returnButton,
                transform: hoverState.returnButton ? "translateX(-4px)" : "translateX(0)",
              }}
              onClick={handleReturnHome}
              onMouseEnter={() => setHoverState(prev => ({ ...prev, returnButton: true }))}
              onMouseLeave={() => setHoverState(prev => ({ ...prev, returnButton: false }))}
              className="no-print"
            >
              <Home size={16} />
              <span>Home</span>
            </button>
            <button
              style={{
                ...styles.altReturnButton,
                transform: hoverState.returnButton ? "translateX(-4px)" : "translateX(0)",
              }}
              onClick={handleReturnHome}
              className="print-only"
            >
              <ArrowLeft size={16} />
              <span>Return to Portfolio</span>
            </button>
          </div>
          
          <div style={styles.headerRight}>
            <div style={styles.brandBadge}>
              <FileText size={12} />
              <span>Curriculum Vitae</span>
            </div>
            <div style={styles.buttonGroup}>
              <button
                style={{
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
                <span>{isPrinting ? "Preparing..." : "Print CV"}</span>
              </button>
              <button
                style={{
                  ...styles.downloadButton,
                  transform: hoverState.downloadButton ? "translateY(-2px)" : "translateY(0)",
                }}
                onClick={handleDownloadPDF}
                onMouseEnter={() => setHoverState(prev => ({ ...prev, downloadButton: true }))}
                onMouseLeave={() => setHoverState(prev => ({ ...prev, downloadButton: false }))}
                className="no-print"
              >
                <Download size={14} />
                <span>Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main CV Content */}
      <div ref={cvRef} style={styles.wrapper} className="cv-container">
        {/* Print Header */}
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

        {/* SIDEBAR */}
        <aside style={styles.sidebar} className="sidebar-print">
          {/* Profile Section */}
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
          <SectionTitle text="Contact" light />
          <div style={styles.contactSection}>
            <InfoRow icon={<Mail size={16} />} text="jiyavegad15@gmail.com" />
            <InfoRow icon={<Phone size={16} />} text="+91 77648 4208" />
            <InfoRow icon={<MapPin size={16} />} text="Chaibasa, Jharkhand, India" />
          </div>

          {/* Social Links */}
          <div style={styles.socialLinks} className="no-print">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <Linkedin size={18} />
            </a>
            <a href="https://instagram.com/jiya_vegad" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <Instagram size={18} />
            </a>
          </div>

          {/* Education */}
          <SectionTitle text="Education" light />
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

          {/* Achievements */}
          <SectionTitle text="Achievements" light />
          <div style={styles.achievementSection}>
            {[
              "1st Prize – Face Painting, FDDI",
              "2nd Prize – Fashion Show, NIFT Spectrum 2023",
              "2nd Prize – National Gujarati Drawing Competition"
            ].map((item, idx) => (
              <AchievementItem key={idx} item={item} />
            ))}
          </div>

          {/* Software Skills */}
          <SectionTitle text="Software" light />
          <div style={styles.skillSection}>
            {["Procreate", "Illustrator", "Microsoft Excel"].map((skill) => (
              <div key={skill} style={styles.softwareSkill} className="skill-tag-print">
                {skill}
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <SectionTitle text="Soft Skills" light />
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

          {/* Interests */}
          <SectionTitle text="Life & Inspiration" light />
          <div style={styles.interestSection}>
            <InfoRow icon={<Trophy size={14} />} text="Badminton & Sports" />
            <InfoRow icon={<Music size={14} />} text="Dance & Music" />
            <InfoRow icon={<Plane size={14} />} text="Travel & Culture" />
          </div>

          {/* Download Button for Print */}
          <div style={styles.printContact} className="print-only">
            <p style={styles.printContactText}>
              Download digital version: jiyavegad15@gmail.com
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.main} className="main-print">
          {/* Profile Statement */}
          <section style={styles.contentBlock}>
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
          <section style={styles.contentBlock}>
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
            />
          </section>

          {/* Craft Cluster */}
          <section style={styles.contentBlock}>
            <SectionHeader icon={<Palette size={20} />} title="Craft Cluster Research" />
            
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

          {/* Print Footer - Only shows when printing */}
          <div style={styles.printFooter} className="print-only">
            <div style={styles.printFooterContent}>
              <span>Jiya Vegad • Fashion Designer • jiyavegad15@gmail.com</span>
              <span>Page 1 of 1 • Generated on {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </main>
      </div>

      {/* Screen Footer - Hidden in print */}
      <footer style={styles.footer} className="no-print">
        <div style={styles.footerContent}>
          <span style={styles.footerText}>Jiya Vegad Design Studio</span>
          <div style={styles.footerDivider} />
          <span style={styles.footerText}>CV • 2025</span>
        </div>
      </footer>
    </div>
  );
};

/* ---------- REUSABLE COMPONENTS ---------- */

const SectionTitle = ({ text, light }) => (
  <div style={styles.sectionTitle}>
    <h3 style={styles.sectionTitleText}>
      {text}
    </h3>
    <div style={styles.sectionTitleLine} />
  </div>
);

const SectionHeader = ({ icon, title }) => (
  <div style={styles.sectionHeader}>
    <div style={styles.sectionHeaderIcon}>
      {icon}
    </div>
    <h2 style={styles.sectionHeaderText}>{title}</h2>
  </div>
);

const InfoRow = ({ icon, text }) => (
  <div style={styles.infoRow}>
    <div style={styles.infoIcon}>{icon}</div>
    <span style={styles.infoText}>{text}</span>
  </div>
);

const EducationItem = ({ title, subtitle, time, gpa }) => (
  <div style={styles.educationItem}>
    <h4 style={styles.educationTitle}>{title}</h4>
    <p style={styles.educationSubtitle}>{subtitle}</p>
    <p style={styles.educationTime}>{time}</p>
    {gpa && <p style={styles.educationGpa}>{gpa}</p>}
  </div>
);

const AchievementItem = ({ item }) => (
  <div style={styles.achievementItem}>
    <Trophy size={12} style={{ marginRight: "10px", color: Theme.ACCENT }} />
    <span>{item}</span>
  </div>
);

const ExperienceCard = ({ company, role, time, sections }) => (
  <div style={{...styles.experienceCard, ...styles.experienceCardPrint}} className="experience-card-print">
    <div style={styles.experienceHeader}>
      <div>
        <h3 style={styles.experienceCompany}>{company}</h3>
        <p style={styles.experienceRole}>{role}</p>
      </div>
      <span style={styles.experienceTime}>{time}</span>
    </div>
    
    <div style={styles.experienceSections}>
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} style={styles.experienceSection}>
          <h4 style={styles.sectionTitle}>{section.title}</h4>
          <ul style={styles.experienceList}>
            {section.points.map((p, idx) => (
              <li key={idx} style={styles.experienceListItem}>
                <div style={styles.listBullet} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

/* ---------- ENHANCED STYLES ---------- */
const styles = {
  backgroundPattern: {
    position: "fixed",
    inset: 0,
    backgroundImage: `linear-gradient(90deg, transparent 95%, ${Theme.LIGHT_ACCENT} 100%)`,
    zIndex: -1,
    opacity: 0.3,
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(252, 250, 245, 0.9)",
    borderBottom: `1px solid ${Theme.BORDER}`,
  },

  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
  },

  returnButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1.5rem",
    background: "none",
    border: `1px solid ${Theme.ACCENT}`,
    color: Theme.ACCENT,
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  altReturnButton: {
    display: "none",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  buttonGroup: {
    display: "flex",
    gap: "0.75rem",
  },

  brandBadge: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: Theme.LIGHT_ACCENT,
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: Theme.ACCENT,
  },

  downloadButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    background: Theme.ACCENT,
    border: "none",
    color: Theme.WHITE,
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  printButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    background: Theme.WHITE,
    border: `1px solid ${Theme.ACCENT}`,
    color: Theme.ACCENT,
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    background: Theme.WHITE,
    boxShadow: Theme.SHADOW,
    borderRadius: "12px",
    overflow: "hidden",
    marginTop: "2rem",
    marginBottom: "2rem",
    minHeight: "calc(100vh - 4rem)",
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

  sidebar: {
    width: "360px",
    background: Theme.SIDEBAR,
    color: Theme.TEXT_LIGHT,
    padding: "3rem 2.5rem",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },

  profileSection: {
    textAlign: "center",
    marginBottom: "3rem",
  },

  imageContainer: {
    position: "relative",
    marginBottom: "2rem",
  },

  imageWrapper: {
    width: "200px",
    height: "260px",
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
    transition: "filter 0.3s ease",
  },

  imageAccent: {
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "2px",
    backgroundColor: Theme.ACCENT,
  },

  profileText: {
    marginTop: "1.5rem",
  },

  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2rem",
    fontWeight: 500,
    margin: 0,
    letterSpacing: "-0.02em",
  },

  role: {
    fontSize: "0.75rem",
    letterSpacing: "4px",
    textTransform: "uppercase",
    opacity: 0.7,
    marginTop: "0.5rem",
  },

  tagline: {
    fontSize: "0.875rem",
    color: Theme.TEXT_LIGHT,
    opacity: 0.8,
    marginTop: "1rem",
    lineHeight: 1.5,
  },

  titleDivider: {
    width: "40px",
    height: "1px",
    backgroundColor: Theme.ACCENT,
    margin: "1rem auto 0",
    opacity: 0.5,
  },

  sectionTitle: {
    margin: "2.5rem 0 1.5rem",
  },

  sectionTitleText: {
    fontSize: "0.75rem",
    letterSpacing: "4px",
    textTransform: "uppercase",
    color: Theme.ACCENT,
    marginBottom: "0.5rem",
    fontWeight: 500,
  },

  sectionTitleLine: {
    width: "24px",
    height: "1px",
    backgroundColor: "rgba(156, 175, 136, 0.3)",
  },

  contactSection: {
    marginBottom: "1.5rem",
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.75rem",
    fontSize: "0.875rem",
    opacity: 0.9,
  },

  infoIcon: {
    color: Theme.ACCENT,
  },

  infoText: {
    fontSize: "0.875rem",
  },

  socialLinks: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
  },

  socialLink: {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid rgba(156, 175, 136, 0.3)`,
    borderRadius: "50%",
    color: Theme.TEXT_LIGHT,
    transition: "all 0.3s ease",
    textDecoration: "none",
  },

  educationSection: {
    marginBottom: "2rem",
  },

  educationItem: {
    marginBottom: "1.5rem",
  },

  educationTitle: {
    fontSize: "0.875rem",
    fontWeight: 600,
    marginBottom: "0.25rem",
    color: Theme.ACCENT,
    letterSpacing: "1px",
  },

  educationSubtitle: {
    fontSize: "0.8125rem",
    opacity: 0.9,
    marginBottom: "0.25rem",
    lineHeight: 1.4,
  },

  educationTime: {
    fontSize: "0.75rem",
    opacity: 0.7,
    marginBottom: "0.25rem",
  },

  educationGpa: {
    fontSize: "0.75rem",
    color: Theme.ACCENT,
    fontWeight: 500,
  },

  achievementSection: {
    marginBottom: "2rem",
  },

  achievementItem: {
    display: "flex",
    alignItems: "flex-start",
    fontSize: "0.875rem",
    marginBottom: "0.75rem",
    lineHeight: 1.4,
  },

  skillSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "2rem",
  },

  softwareSkill: {
    background: "rgba(255, 255, 255, 0.1)",
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
    color: Theme.TEXT_LIGHT,
  },

  skillTagPrint: {
    borderColor: "#666 !important",
    color: "#333 !important",
    background: "#f8f8f8 !important",
  },

  interestSection: {
    marginBottom: "1rem",
  },

  printContact: {
    marginTop: "2rem",
    paddingTop: "1rem",
    borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
  },

  printContactText: {
    fontSize: "0.75rem",
    color: Theme.TEXT_LIGHT,
    opacity: 0.7,
  },

  main: {
    flex: 1,
    padding: "3rem",
  },

  contentBlock: {
    marginBottom: "3rem",
  },

  quoteCard: {
    borderLeft: `4px solid ${Theme.ACCENT}`,
    paddingLeft: "1.5rem",
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
    fontSize: "1.5rem",
    lineHeight: 1.6,
    color: Theme.TEXT_DARK,
    fontWeight: 300,
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },

  sectionHeaderIcon: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.LIGHT_ACCENT,
    borderRadius: "8px",
    color: Theme.ACCENT,
  },

  sectionHeaderText: {
    fontSize: "1rem",
    letterSpacing: "4px",
    textTransform: "uppercase",
    color: Theme.MUTED,
    fontWeight: 500,
  },

  experienceCard: {
    backgroundColor: "rgba(156, 175, 136, 0.03)",
    border: `1px solid ${Theme.BORDER}`,
    borderRadius: "8px",
    padding: "2rem",
    marginBottom: "1.5rem",
    transition: "all 0.3s ease",
  },

  experienceCardPrint: {
    backgroundColor: "#f8f8f8 !important",
    border: "1px solid #ddd !important",
  },

  experienceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },

  experienceCompany: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.25rem",
    color: Theme.TEXT_DARK,
    marginBottom: "0.25rem",
  },

  experienceRole: {
    fontSize: "0.875rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: Theme.ACCENT,
    fontWeight: 500,
  },

  experienceTime: {
    fontSize: "0.75rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: Theme.MUTED,
    fontWeight: 500,
  },

  experienceSections: {
    marginTop: '1rem',
  },
  
  experienceSection: {
    marginBottom: '1.5rem',
  },
  
  sectionTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: Theme.ACCENT,
    margin: '0 0 0.75rem 0',
    letterSpacing: '0.5px',
  },
  
  experienceList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  
  experienceListItem: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: Theme.MUTED,
    alignItems: 'flex-start',
  },
  
  listBullet: {
    width: '4px',
    height: '4px',
    backgroundColor: Theme.ACCENT,
    borderRadius: '50%',
    marginTop: '0.5rem',
    flexShrink: 0,
  },

  craftCard: {
    backgroundColor: Theme.LIGHT_ACCENT,
    border: `1px solid ${Theme.ACCENT}30`,
    borderRadius: "8px",
    padding: "2rem",
  },

  craftHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
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
    marginBottom: "2rem",
    paddingLeft: "1rem",
  },

  craftHighlights: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  craftHighlight: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.875rem",
    color: Theme.TEXT_DARK,
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

  footer: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: Theme.WHITE,
    borderTop: `1px solid ${Theme.BORDER}`,
  },

  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    fontSize: "0.75rem",
    color: Theme.MUTED,
  },

  footerText: {
    fontWeight: 500,
    letterSpacing: "2px",
  },

  footerDivider: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    backgroundColor: Theme.BORDER,
  },
};

export default CVPage;