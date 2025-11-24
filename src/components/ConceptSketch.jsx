import React from "react";

const ConceptSketch = () => {
  const styles = {
    wrapper: {
      position: "absolute",
      top: "15%",
      right: "6%",
      height: "70vh",
      width: "28vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 5,
      pointerEvents: "none",
    },

    figure: {
      position: "relative",
      width: "140px",
      height: "420px",
    },

    // Head
    head: {
      width: "40px",
      height: "40px",
      background: "#D7C7B6",               // Warm Beige
      borderRadius: "50%",
      position: "absolute",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      boxShadow: "0 0 25px rgba(154,175,136,0.4)", // Sage Glow
    },

    body: {
      position: "absolute",
      top: "40px",
      left: "50%",
      width: "6px",
      height: "180px",
      background: "#4A4A48",               // Charcoal Gray line
      transform: "translateX(-50%)",
      borderRadius: "10px",
      opacity: 0.9,
    },

    shoulders: {
      position: "absolute",
      top: "65px",
      left: "50%",
      width: "110px",
      height: "40px",
      background: "rgba(196,166,159,0.25)", // Dusty Rose haze
      transform: "translateX(-50%) skewY(-10deg)",
      borderRadius: "50% 50% 10% 10%",
      boxShadow: "0 0 20px rgba(196,166,159,0.25)",
    },

    drape: {
      position: "absolute",
      top: "80px",
      left: "50%",
      width: "140px",
      height: "260px",
      transform: "translateX(-50%)",
      background:
        "linear-gradient(180deg, rgba(159,175,136,0.25), rgba(215,199,182,0.1))",
      borderRadius: "60% 20% 0% 0%",
      clipPath: "polygon(30% 0, 100% 0, 80% 100%, 0 100%)",
      filter: "blur(1px)",
    },

    legs: {
      position: "absolute",
      top: "210px",
      left: "50%",
      width: "4px",
      height: "200px",
      background: "#4A4A48",
      transform: "translateX(-50%) rotate(8deg)",
      borderRadius: "10px",
      opacity: 0.7,
    },

    legs2: {
      position: "absolute",
      top: "220px",
      left: "50%",
      width: "4px",
      height: "180px",
      background: "#C4A69F",
      transform: "translateX(-5px) rotate(-6deg)",
      borderRadius: "10px",
      opacity: 0.4,
    },

    brush: {
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      width: "200px",
      height: "50px",
      transform: "translateX(-50%)",
      background:
        "radial-gradient(circle, rgba(159,175,136,0.25), rgba(0,0,0,0))",
      filter: "blur(6px)",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.figure}>
        <div style={styles.head}></div>
        <div style={styles.body}></div>
        <div style={styles.shoulders}></div>
        <div style={styles.drape}></div>
        <div style={styles.legs}></div>
        <div style={styles.legs2}></div>
        <div style={styles.brush}></div>
      </div>
    </div>
  );
};

export default ConceptSketch;
