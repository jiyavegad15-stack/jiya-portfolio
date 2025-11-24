import React from "react";
import { Link } from "react-router-dom";
import { 
    Zap, Instagram, Linkedin, Sparkles, 
    Palette, Scissors, Heart, ArrowRight, 
    BookOpen, MapPin 
} from "lucide-react";
import ConceptSketch from "../components/ConceptSketch";

/* -------------------------------------
   THEME COLORS
------------------------------------- */
const Theme = {
  DARK_TEAL: "#244855",
  WARM_RED: "#E64833",
  MUDDY_BROWN: "#874F41",
  MUTED_AQUA: "#90AEAD",
  SOFT_BEIGE: "#FBE9D0",
  CREAM_WHITE: "#FFFDF8",
};

/* -------------------------------------
   STYLESHEET (Optimized)
------------------------------------- */
const styles = {
  page: {
    background: `linear-gradient(135deg, ${Theme.DARK_TEAL} 0%, #1a3a47 100%)`,
    width: "100vw",
    minHeight: "100vh",
    color: Theme.SOFT_BEIGE,
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Georgia','Times New Roman', serif",
  },

  logo: {
    position: "fixed",
    top: "3rem",
    left: "4rem",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "2.4rem",
    fontWeight: "700",
    color: Theme.SOFT_BEIGE,
    textDecoration: "none",
  },

  socialContainer: {
    position: "fixed",
    top: "3rem",
    right: "4rem",
    display: "flex",
    gap: "1rem",
    zIndex: 50,
  },

  socialIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "rgba(251,233,208,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1.5px solid ${Theme.SOFT_BEIGE}20`,
    backdropFilter: "blur(12px)",
    transition: "0.3s",
    cursor: "pointer",
  },

  powerBtn: {
    position: "fixed",
    top: "1.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
    boxShadow: `0 8px 30px ${Theme.WARM_RED}30`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 60,
  },

  contentWrapper: {
    width: "52vw",
    position: "relative",
    left: "10%",
    paddingTop: "12%",
    paddingBottom: "5rem",
    zIndex: 2,
  },

  mainBox: {
    padding: "4rem 4.5rem",
    background: `rgba(255,255,255,0.05)`,
    backdropFilter: "blur(16px)",
    borderLeft: `4px solid ${Theme.WARM_RED}`,
    borderRadius: "24px",
    boxShadow: "0 25px 50px rgba(36,72,85,0.3)",
    marginBottom: "3rem",
    lineHeight: "1.7",
    fontSize: "1.15rem",
    position: "relative",
  },

  sectionTitle: {
    fontSize: "3.5rem",
    fontWeight: 700,
    marginBottom: "2rem",
    background: `linear-gradient(135deg, ${Theme.SOFT_BEIGE}, ${Theme.MUTED_AQUA})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
  },

  subheading: {
    fontSize: "1.8rem",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    margin: "2rem 0 1.3rem",
    gap: "14px",
    color: Theme.WARM_RED,
  },

  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "16px",
  },

  interestsBox: {
    padding: "3rem",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    border: `1.5px solid ${Theme.MUTED_AQUA}25`,
    backdropFilter: "blur(12px)",
  },

  bigWatermark: {
    position: "fixed",
    top: "10%",
    left: "8%",
    fontSize: "15vh",
    fontWeight: 900,
    opacity: 0.04,
    letterSpacing: "5px",
    pointerEvents: "none",
  },
};

/* -------------------------------------
   REUSABLE COMPONENTS
------------------------------------- */

const Logo = () => (
  <Link to="/" style={styles.logo}>
    <div style={{
      width: 14, height: 14, borderRadius: "50%",
      background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
      boxShadow: `0 0 25px ${Theme.WARM_RED}40`,
    }} />
    JV
  </Link>
);

const SocialIcons = () => (
  <div style={styles.socialContainer}>
    <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialIcon}>
      <Instagram size={20} />
    </a>

    <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.socialIcon}>
      <Linkedin size={20} />
    </a>
  </div>
);

const PowerButton = () => (
  <Link
    to="/jiya-portfolio/#/main2"
    style={styles.powerBtn}
  >
    <Zap size={26} color="white" />
  </Link>
);

const Bullet = ({ icon: Icon, text }) => (
  <li style={styles.listItem}>
    <div style={{
      width: 28, height: 28, borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(135deg, ${Theme.WARM_RED}20, ${Theme.MUTED_AQUA}25)`,
      border: `1px solid ${Theme.WARM_RED}30`,
      flexShrink: 0,
    }}>
      <Icon size={16} color={Theme.WARM_RED} />
    </div>
    <span style={{ fontSize: "1.1rem" }}>{text}</span>
  </li>
);

/* -------------------------------------
   MAIN ABOUT PAGE
------------------------------------- */

export default function AboutPage() {
  return (
    <div style={styles.page}>

      <Logo />
      <SocialIcons />
      <PowerButton />
      <div style={styles.bigWatermark}>ABOUT</div>

      <ConceptSketch />

      <div style={styles.contentWrapper}>

        {/* -------------------- 1. ABOUT BOX -------------------- */}
        <div style={styles.mainBox}>
          <h2 style={styles.sectionTitle}>About Me</h2>

          <p>
            I'm <b style={{ color: Theme.WARM_RED }}>Jiya Vegad</b>, a designer who blends
            emotion, culture, and modern silhouettes to create expressive fashion
            narratives.
          </p>

          <p>
            My work explores identity, movement, and transformation using rich tones,
            sculptural forms, and artisanal craftsmanship.
          </p>

          <h3 style={styles.subheading}><Palette size={26} /> Design Philosophy</h3>

          <ul style={{ listStyle: "none", padding: 0 }}>
            <Bullet icon={Sparkles} text="Concept-based couture exploring emotional and human stories" />
            <Bullet icon={Scissors} text="Craft-inspired silhouettes blending tradition with modernity" />
            <Bullet icon={BookOpen} text="Textile innovation rooted in sustainable heritage techniques" />
          </ul>

          {/* Quote Box */}
          <div style={{
            marginTop: "2.5rem",
            padding: "2rem",
            background: `rgba(135,79,65,0.12)`,
            borderRadius: 16,
            border: `1px solid ${Theme.MUTED_AQUA}25`,
            fontStyle: "italic",
            position: "relative",
          }}>
            <Heart size={24} style={{
              position: "absolute",
              top: -12,
              left: 24,
              color: Theme.WARM_RED,
            }} />
            "Fashion is emotion made visible — each stitch a story, each silhouette
            a moment of expression."
          </div>
        </div>

        {/* -------------------- 2. INTERESTS BOX -------------------- */}
        <div style={styles.interestsBox}>
          <h3 style={styles.subheading}>
            <Sparkles size={26} /> Personal Interests
          </h3>

          <ul style={{ listStyle: "none", padding: 0 }}>
            <Bullet icon={MapPin} text="Exploring architectural forms & textures in Mumbai" />
            <Bullet icon={Heart} text="Collecting vintage scarves & international embroidery" />
            <Bullet icon={Sparkles} text="3D fashion modeling & digital illustration" />
          </ul>

          <div style={{
            marginTop: "2rem",
            padding: "1.5rem",
            borderRadius: 12,
            border: `1px solid ${Theme.MUTED_AQUA}25`,
            background: `rgba(144,174,173,0.08)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ArrowRight size={18} color={Theme.MUTED_AQUA} />
              <b style={{ color: Theme.MUTED_AQUA }}>Current Inspiration</b>
            </div>
            <p style={{ opacity: 0.85, fontStyle: "italic" }}>
              "Where traditional craft meets digital innovation."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
