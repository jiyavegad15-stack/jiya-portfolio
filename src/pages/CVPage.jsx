import React from "react";
import {
  Github, Linkedin, Mail, Phone, MapPin,
  Briefcase, BookOpen, Award, Trophy,
  Music, Plane, Star, ChevronRight
} from "lucide-react";

import ProfilePic from "../assets/new.jpeg";

/* ---------- THEME ---------- */
const Theme = {
  BG: "#FFFFF0",
  SIDEBAR: "#1A1A18",
  WHITE: "#FFFFFF",
  TEXT_DARK: "#1A1A18",
  TEXT_LIGHT: "#F5F5EE",
  MUTED: "#6F6F68",
  ACCENT: "#9CAF88",
  BORDER: "#E4E1D9",
};

/* ---------- MAIN COMPONENT ---------- */
const CVPage = () => {
  return (
    <div style={{ background: Theme.BG, minHeight: "100vh", padding: "40px 0" }}>
      <div style={styles.wrapper}>

        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          {/* PROFILE */}
          <div style={{ textAlign: "center" }}>
            <div style={styles.imageWrap}>
              <img
                src={ProfilePic}
                alt="Jiya Vegad Portrait"
                style={styles.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/300x400?text=Profile+Image";
                }}
              />
              <div style={styles.imageFrame} />
            </div>

            <h1 style={styles.name}>Jiya Vegad</h1>
            <p style={styles.role}>Fashion Designer</p>
          </div>

          {/* CONTACT */}
          <SectionTitle text="Contact" light />
          <InfoRow icon={<Mail size={14} />} text="jiya.vegad@email.com" />
          <InfoRow icon={<Phone size={14} />} text="+91 98765 43210" />
          <InfoRow icon={<MapPin size={14} />} text="Mumbai / Kolkata, India" />

          <div style={{ display: "flex", gap: "16px", marginTop: "14px" }}>
            <Github size={18} style={styles.iconHover} />
            <Linkedin size={18} style={styles.iconHover} />
          </div>

          {/* INTERESTS */}
          <SectionTitle text="Life & Inspiration" light />
          <InfoRow icon={<Trophy size={14} />} text="Badminton & Sports" />
          <InfoRow icon={<Music size={14} />} text="Dance & Music" />
          <InfoRow icon={<Plane size={14} />} text="Travel & Culture" />
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.main}>
          {/* PROFILE STATEMENT */}
          <section style={styles.block}>
            <p style={styles.profileQuote}>
              Dedicated Fashion Designer bridging traditional craft with
              contemporary silhouettes, sustainable innovation, and precise
              technical execution.
            </p>
          </section>

          {/* EXPERIENCE */}
          <section style={styles.block}>
            <Header icon={<Briefcase size={18} />} title="Design Experience" />

            <Experience
              company="Amit Aggarwal"
              role="Design Intern"
              time="Sept – Dec 2025"
              points={[
                "Design research for CULT SS’26 & AM.IT Pret collections",
                "Material swatches and high-precision tech packs",
              ]}
            />

            <Experience
              company="Sayantan Sarkar"
              role="Design Assistant"
              time="Jan – Mar 2024"
              points={[
                "Contributor to DOMARI Khadi Festival collection",
                "Conceptual shoot coordination and digital presence",
              ]}
            />
          </section>

          {/* EDUCATION */}
          <section style={styles.block}>
            <Header icon={<BookOpen size={18} />} title="Education" />

            <div style={styles.grid}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>B.Des – Footwear & Design</h3>
                <p style={styles.meta}>FDDI · 2021–2025</p>
                <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                  <Star size={14} color={Theme.ACCENT} />
                  <strong>GPA 9.05 / 10</strong>
                </div>
              </div>

              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Craft Cluster Research</h3>
                <p style={styles.meta}>Blue Art Pottery</p>
                <p style={styles.text}>
                  Translating Jaipuri ceramic motifs into contemporary textile
                  surfaces through material-led design exploration.
                </p>
              </div>
            </div>
          </section>

          {/* AWARDS */}
          <section style={styles.block}>
            <Header icon={<Award size={18} />} title="Accolades" />

            <div style={styles.grid3}>
              {[
                ["1st Prize", "Face Painting", "FDDI Annuals"],
                ["2nd Prize", "Fashion Show", "NIFT Spectrum"],
                ["National Rank", "Drawing", "State Competition"],
              ].map(([a, b, c]) => (
                <div key={a} style={styles.award}>
                  <span style={styles.awardTitle}>{a}</span>
                  <span style={styles.awardMain}>{b}</span>
                  <span style={styles.awardSub}>{c}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer style={styles.footer}>
        Crafted by Jiya Vegad Design Studio
      </footer>
    </div>
  );
};

/* ---------- SMALL COMPONENTS ---------- */

const SectionTitle = ({ text, light }) => (
  <h3
    style={{
      fontSize: "11px",
      letterSpacing: "4px",
      textTransform: "uppercase",
      margin: "28px 0 14px",
      color: light ? Theme.ACCENT : Theme.MUTED,
    }}
  >
    {text}
  </h3>
);

const Header = ({ icon, title }) => (
  <div style={styles.header}>
    {icon}
    <h2 style={styles.headerText}>{title}</h2>
  </div>
);

const InfoRow = ({ icon, text }) => (
  <div style={styles.infoRow}>
    {icon}
    <span>{text}</span>
  </div>
);

const Experience = ({ company, role, time, points }) => (
  <div style={styles.expBlock}>
    <div style={styles.timelineDot} />
    <div style={styles.timelineLine} />

    <div style={styles.expHeader}>
      <h3 style={styles.expCompany}>{company}</h3>
      <span style={styles.meta}>{time}</span>
    </div>

    <p style={styles.expRole}>{role}</p>

    <ul style={styles.list}>
      {points.map((p) => (
        <li key={p} style={styles.listItem}>
          <ChevronRight size={14} />
          {p}
        </li>
      ))}
    </ul>
  </div>
);

/* ---------- STYLES ---------- */
const styles = {
  wrapper: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    background: Theme.WHITE,
    boxShadow: "0 30px 80px rgba(0,0,0,0.15)",
  },

  sidebar: {
    width: "320px",
    background: Theme.SIDEBAR,
    color: Theme.TEXT_LIGHT,
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
  },

  main: {
    flex: 1,
    padding: "56px",
  },

  imageWrap: {
    width: "180px",
    height: "240px",
    margin: "0 auto 24px",
    position: "relative",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(100%)",
  },

  imageFrame: {
    position: "absolute",
    inset: 0,
    border: "1px solid rgba(255,255,255,0.3)",
    pointerEvents: "none",
  },

  name: {
    fontFamily: "serif",
    fontSize: "28px",
    margin: 0,
  },

  role: {
    fontSize: "11px",
    letterSpacing: "4px",
    opacity: 0.7,
    marginTop: "8px",
    textTransform: "uppercase",
  },

  block: {
    marginBottom: "64px",
  },

  profileQuote: {
    fontFamily: "serif",
    fontSize: "22px",
    lineHeight: 1.6,
    borderLeft: `4px solid ${Theme.ACCENT}`,
    paddingLeft: "22px",
    color: Theme.TEXT_DARK,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "28px",
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "22px",
  },

  card: {
    borderTop: `2px solid ${Theme.ACCENT}`,
    paddingTop: "18px",
  },

  cardTitle: {
    fontFamily: "serif",
    fontSize: "18px",
    marginBottom: "6px",
  },

  meta: {
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: Theme.MUTED,
  },

  text: {
    fontSize: "14px",
    lineHeight: 1.7,
    marginTop: "10px",
    color: Theme.MUTED,
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "28px",
  },

  headerText: {
    fontSize: "12px",
    letterSpacing: "4px",
    textTransform: "uppercase",
    color: Theme.MUTED,
  },

  expBlock: {
    position: "relative",
    paddingLeft: "28px",
    marginBottom: "44px",
  },

  expHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  expCompany: {
    fontFamily: "serif",
    fontSize: "18px",
  },

  expRole: {
    fontSize: "12px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: Theme.ACCENT,
    margin: "6px 0 14px",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "14px",
    color: Theme.MUTED,
  },

  listItem: {
    display: "flex",
    gap: "8px",
    marginBottom: "8px",
    alignItems: "flex-start",
  },

  timelineDot: {
    position: "absolute",
    left: "0",
    top: "10px",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: Theme.ACCENT,
  },

  timelineLine: {
    position: "absolute",
    left: "3px",
    top: "20px",
    bottom: 0,
    width: "1px",
    background: Theme.BORDER,
  },

  award: {
    border: `1px solid ${Theme.BORDER}`,
    padding: "22px",
    textAlign: "center",
  },

  awardTitle: {
    fontSize: "11px",
    letterSpacing: "2px",
    color: Theme.ACCENT,
    fontWeight: "bold",
  },

  awardMain: {
    fontFamily: "serif",
    fontSize: "16px",
    margin: "8px 0",
  },

  awardSub: {
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: Theme.MUTED,
  },

  infoRow: {
    display: "flex",
    gap: "10px",
    fontSize: "14px",
    opacity: 0.85,
    marginBottom: "6px",
  },

  iconHover: {
    cursor: "pointer",
    opacity: 0.8,
  },

  footer: {
    textAlign: "center",
    fontSize: "10px",
    letterSpacing: "6px",
    opacity: 0.35,
    marginTop: "48px",
  },
};

export default CVPage;
