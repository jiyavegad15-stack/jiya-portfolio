// src/utils/animations.js

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const stagger = {
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const zoomIn = {
  hidden: { scale: 0 },
  show: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.7,
    },
  },
};
