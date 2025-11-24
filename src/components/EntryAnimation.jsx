import React, { useEffect, useState } from "react";

const ColorPalette = {
  IVORY: "#FFFFF0",
  CHARCOAL: "#4A4A48",
  SAGE_GREEN: "#9CAF88",
  DUSTY_ROSE: "#C4A69F",
};

const DURATION = 3200; // total animation duration
const STAGGER = 400; // stagger delay for swatches

const swatchKeyframes = `
@keyframes moveOut1 {
  0%, 30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-120vw, -110vh) scale(1.8); opacity: 0; }
}
@keyframes moveOut2 {
  0%, 30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(130vw, 120vh) scale(1.8); opacity: 0; }
}
@keyframes moveOut3 {
  0%, 30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(120vw, -110vh) scale(1.8); opacity: 0; }
}
@keyframes moveOut4 {
  0%, 30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-120vw, 115vh) scale(1.8); opacity: 0; }
}
@keyframes logoPulse {
  0%, 100% { opacity: 1; transform: scale(1); text-shadow: 0 0 6px #9CAF88cc; }
  50% { opacity: 0.7; transform: scale(1.1); text-shadow: 0 0 15px #9CAF8877; }
}
@keyframes screenFadeOut {
  0%, 85% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
}
@keyframes fadeInContent {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes spinnerPulse {
  0%, 100% { box-shadow: 0 0 10px 2px #9CAF88cc; }
  50% { box-shadow: 0 0 20px 6px #9CAF8855; }
}
`;

const styles = {
  screen: {
    position: "fixed",
    inset: 0,
    backgroundColor: ColorPalette.CHARCOAL,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    animation: `screenFadeOut 0.7s ease forwards`,
    animationDelay: `${DURATION / 1000}s`,
  },

  swatchBase: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "12vw",
    height: "12vw",
    minWidth: "140px",
    minHeight: "140px",
    borderRadius: "50%",
    opacity: 1,
    mixBlendMode: "screen",
    boxShadow: "0 0 20px 5px",
  },

  swatch1: {
    backgroundColor: ColorPalette.DUSTY_ROSE,
    animation: `moveOut1 ${DURATION / 1000}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
    animationDelay: `${STAGGER * 0}s`,
    boxShadow: `0 0 45px 12px ${ColorPalette.DUSTY_ROSE}bb`,
  },

  swatch2: {
    backgroundColor: ColorPalette.SAGE_GREEN,
    animation: `moveOut2 ${DURATION / 1000}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
    animationDelay: `${STAGGER * 1}s`,
    boxShadow: `0 0 45px 12px ${ColorPalette.SAGE_GREEN}bb`,
  },

  swatch3: {
    backgroundColor: ColorPalette.DUSTY_ROSE,
    animation: `moveOut3 ${DURATION / 1000}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
    animationDelay: `${STAGGER * 2}s`,
    boxShadow: `0 0 45px 12px ${ColorPalette.DUSTY_ROSE}bb`,
  },

  swatch4: {
    backgroundColor: ColorPalette.SAGE_GREEN,
    animation: `moveOut4 ${DURATION / 1000}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
    animationDelay: `${STAGGER * 3}s`,
    boxShadow: `0 0 45px 12px ${ColorPalette.SAGE_GREEN}bb`,
  },

  logoWrapper: {
    position: "relative",
    zIndex: 20,
    marginBottom: "3rem",
    animation: `logoPulse 2.4s ease-in-out infinite`,
  },

  text: {
    color: ColorPalette.IVORY,
    fontSize: "3.8rem",
    fontWeight: "900",
    fontFamily: "'Playfair Display', serif",
    letterSpacing: "0.15em",
    userSelect: "none",
  },

  spinner: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: ColorPalette.SAGE_GREEN,
    animation: `spinnerPulse 2s ease-in-out infinite`,
    boxShadow: `0 0 18px 6px ${ColorPalette.SAGE_GREEN}cc`,
  },

  fadeIn: {
    animation: `fadeInContent 0.9s ease forwards`,
    opacity: 0,
  },
};

const EntryAnimation = ({ children }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), DURATION + STAGGER * 3);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{swatchKeyframes}</style>

      {showAnimation ? (
        <div style={styles.screen}>
          <div style={{ ...styles.swatchBase, ...styles.swatch1 }} />
          <div style={{ ...styles.swatchBase, ...styles.swatch2 }} />
          <div style={{ ...styles.swatchBase, ...styles.swatch3 }} />
          <div style={{ ...styles.swatchBase, ...styles.swatch4 }} />

          <div style={styles.logoWrapper}>
            <h1 style={styles.text}>JIYA VEGAD</h1>
          </div>

          <div style={styles.spinner} />
        </div>
      ) : (
        <div style={styles.fadeIn}>{children}</div>
      )}
    </>
  );
};

export default EntryAnimation;
