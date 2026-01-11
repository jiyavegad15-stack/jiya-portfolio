import React, { useRef, useEffect, useState } from "react";
import { 
  Zap, Instagram, Linkedin, ArrowRight, Eye, 
  Sparkles, X, Aperture, BookOpen, Menu, 
  Home, User, Code, Briefcase, FileText, 
  ChevronLeft, ChevronRight, Maximize2 
} from "lucide-react";

// ---- NEW EDITORIAL COLOR PALETTE ----
const Palette = {
    BG: "#FDFCF8",
    TEXT_MAIN: "#1B2A2F",
    TEXT_MUTED: "#6C757D",
    TEXT_LIGHT: "#8A9EA6",
    ACCENT: "#D66E53",
    LINE: "rgba(27, 42, 47, 0.1)",
    WHITE: "#FFFFFF",
    DARK_BG: "#0F1A1E",
};

// ---- IMAGE IMPORT FUNCTION ----
// This function will import all images from ../assets/projects
const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => {
    const path = key.replace("./", "");
    const [folder, filename] = path.split("/");
    if (!images[folder]) images[folder] = [];
    images[folder].push(r(key));
  });
  return images;
};

// Import all images from projects directory
let collectionImages = {};
try {
  collectionImages = importAll(require.context("../assets/projects", true, /\.(jpg|jpeg|png|webp)$/));
} catch (error) {
  console.log("Using placeholder images. Ensure images are in ../assets/projects/ folder");
  
  // Fallback placeholder images
  collectionImages = {
    "1X": [
      "https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ],
    "2X": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
    ],
    "3X": [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ],
    "4X": [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ]
  };
}

// Sort images numerically (1.jpg, 2.jpg, etc.)
Object.keys(collectionImages).forEach(folder => {
  collectionImages[folder].sort((a, b) => {
    const getNum = (path) => {
      const match = path.toString().match(/(\d+)\.(jpg|jpeg|png|webp)$/i);
      return match ? parseInt(match[1]) : 0;
    };
    return getNum(a) - getNum(b);
  });
});

// Helper function to get images for a collection
const getCollectionImages = (collectionId) => {
  const collectionKey = `${collectionId}X`;
  return collectionImages[collectionKey] || collectionImages["1X"] || [];
};

// ---- WORK DATA ----
const Work = [
    { 
        id: 1, 
        name: "Chittah", 
        type: "CONCEPTUAL COUTUR", 
        description: "Minimalist evening wear exploring form and void. Featured in Vogue India. The collection is characterized by clean lines and exaggerated volumes. Structured silks and innovative synthetic materials create dramatic silhouettes that play with light and shadow in unique ways.", 
        tags: ["Raw Emotion", "Primal Instinct", "Expressive Forms", "Conceptual Couture", "Art-Led Fashion"], 
        image: getCollectionImages(1)[0] || "https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&w=1200&q=80",
        collectionPath: "1X",
        year: "2023",
        status: "Featured"
    },
    { 
        id: 2, 
        name: "Herdesher", 
        type: "CONCEPTUAL STORYTELLING",
        tags: ["Feminist Narrative", "Speculative Fashion", "Sustainable Systems", "Power & Hierarchy", "Fantasy Aesthetics"],
        description:"Herdesher presents a cohesive collection merging fantasy, feminism, sustainability, and speculative storytelling through fashion narratives design systems power hierarchy",
        image: getCollectionImages(2)[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
        collectionPath: "2X",
        year: "2023",
        status: "Active"
    },
    { 
        id: 3, 
        name: "Mycelium Fantasy", 
        type: "BIO-INSPIRED FANTASY", 
        description:"Mycelium Fantasy presents a cohesive fungal fashion world inspired by Helvella vespertina, merging biology, fantasy, sustainability, and craft.",
        tags: ["Mycelium Forms", "Fantasy Worldbuilding", "Organic Textures", "Eco-Futurism", "Conceptual Craft"], 
        image: getCollectionImages(3)[0] || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
        collectionPath: "3X",
        year: "2022",
        status: "Limited"
    },
    { 
        id: 4, 
        name: "Accessories Capsule: Echo", 
        type: "LEATHER GOODS", 
        description: "A limited-edition line of leather goods and metallic jewelry emphasizing raw texture. Features hand-burnished leather and oxidized brass, reflecting an organic, industrial aesthetic with meticulous attention to detail.", 
        tags: ["Leather", "Brass", "Accessories", "Handmade"], 
        image: getCollectionImages(4)[0] || "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
        collectionPath: "4X",
        year: "2023",
        status: "Limited"
    },
];

// ---- ENHANCED GALLERY MODAL COMPONENT ----
// ---- ENHANCED GALLERY MODAL COMPONENT ----
const GalleryModal = ({ project, onClose }) => {
  if (!project) return null;

  const images = getCollectionImages(project.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch handling for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isZoomed]);

  const handleClose = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setTimeout(() => onClose(), 300);
    } else {
      onClose();
    }
  };

  return (
    <>
      <div style={responsiveModalStyles.overlay} onClick={() => !isZoomed && handleClose()}>
        {/* Main Modal Container */}
        <div 
          style={responsiveModalStyles.modal}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Modal Header - Responsive */}
          <div style={responsiveModalStyles.header}>
            <div style={responsiveModalStyles.headerContent}>
              <div style={responsiveModalStyles.branding}>
                <div style={responsiveModalStyles.brandIcon}>
                  <Aperture size={20} />
                </div>
                <div>
                  <h2 style={responsiveModalStyles.title}>{project.name}</h2>
                  <div style={responsiveModalStyles.meta}>
                    <span style={responsiveModalStyles.metaItem}>
                      <Sparkles size={14} /> {project.type}
                    </span>
                    <span style={responsiveModalStyles.metaItem}>•</span>
                    <span style={responsiveModalStyles.metaItem}>
                      {project.year}
                    </span>
                    <span style={responsiveModalStyles.metaItem}>•</span>
                    <span style={responsiveModalStyles.statusBadge(project.status)}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={responsiveModalStyles.controls}>
                <div style={responsiveModalStyles.counter}>
                  <span style={responsiveModalStyles.counterCurrent}>
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <span style={responsiveModalStyles.counterDivider}>/</span>
                  <span style={responsiveModalStyles.counterTotal}>
                    {String(images.length).padStart(2, '0')}
                  </span>
                </div>
                
                <button
                  onClick={() => setIsZoomed(true)}
                  style={responsiveModalStyles.iconButton}
                  aria-label="Fullscreen view"
                  title="Fullscreen"
                >
                  <Maximize2 size={20} />
                </button>
                
                <button
                  onClick={handleClose}
                  style={responsiveModalStyles.closeButton}
                  aria-label="Close gallery"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area - Split Layout */}
          <div style={responsiveModalStyles.contentGrid}>
            {/* Left Column - Gallery */}
            <div style={responsiveModalStyles.galleryColumn}>
              {/* Main Image Area */}
              <div style={responsiveModalStyles.mainImageSection}>
                <div 
                  style={responsiveModalStyles.imageWrapper}
                  onClick={() => setIsZoomed(true)}
                >
                  <img
                    src={images[currentIndex]}
                    alt={`${project.name} - Image ${currentIndex + 1}`}
                    style={responsiveModalStyles.mainImage}
                    loading="eager"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/800x600/${Palette.ACCENT.substring(1)}/ffffff?text=${project.name}&font=playfair`;
                    }}
                  />
                  
                  {/* Image Overlay Effects */}
                  <div style={responsiveModalStyles.imageOverlay} />
                  
                  {/* Navigation Overlay */}
                  <div style={responsiveModalStyles.navOverlay}>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      style={responsiveModalStyles.navButton}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      style={responsiveModalStyles.navButton}
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                  
                  {/* Fullscreen Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsZoomed(true); }}
                    style={responsiveModalStyles.fullscreenButton}
                    aria-label="View fullscreen"
                    title="Fullscreen"
                  >
                    <Maximize2 size={20} />
                  </button>
                </div>
                
                {/* Image Counter */}
                <div style={responsiveModalStyles.imageCounter}>
                  <span style={responsiveModalStyles.counterText}>
                    Image {currentIndex + 1} of {images.length}
                  </span>
                </div>
              </div>
              
              {/* Thumbnail Strip */}
              <div style={responsiveModalStyles.thumbnailContainer}>
                <div style={responsiveModalStyles.thumbnailTrack}>
                  {images.map((src, index) => (
                    <div
                      key={index}
                      style={{
                        ...responsiveModalStyles.thumbnail,
                        border: `2px solid ${index === currentIndex ? Palette.ACCENT : 'transparent'}`,
                        opacity: index === currentIndex ? 1 : 0.7
                      }}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <img 
                        src={src} 
                        alt={`Thumbnail ${index + 1}`} 
                        style={responsiveModalStyles.thumbnailImage}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/80x60/${Palette.ACCENT.substring(1)}/ffffff?text=${index + 1}`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Details */}
            <div style={responsiveModalStyles.detailsColumn}>
              <div style={responsiveModalStyles.detailsContent}>
                {/* Project Details Card */}
                <div style={responsiveModalStyles.detailsCard}>
                  <div style={responsiveModalStyles.sectionHeader}>
                    <BookOpen size={24} color={Palette.ACCENT} />
                    <h3 style={responsiveModalStyles.sectionTitle}>Collection Story</h3>
                  </div>
                  <div style={responsiveModalStyles.descriptionSection}>
                    <p style={responsiveModalStyles.description}>
                      {project.description}
                    </p>
                  </div>
                </div>
                
                {/* Tags & Meta Card */}
                <div style={responsiveModalStyles.metaCard}>
                  <div style={responsiveModalStyles.metaSection}>
                    <h4 style={responsiveModalStyles.metaTitle}>Key Tags</h4>
                    <div style={responsiveModalStyles.tagsList}>
                      {project.tags.map((tag, i) => (
                        <span key={i} style={responsiveModalStyles.tagChip}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={responsiveModalStyles.statsTable}>
                    <div style={responsiveModalStyles.tableHeader}>
                      <span style={responsiveModalStyles.tableHeaderCell}>YEAR</span>
                      <span style={responsiveModalStyles.tableHeaderCell}>IMAGES</span>
                      <span style={responsiveModalStyles.tableHeaderCell}>STATUS</span>
                    </div>
                    <div style={responsiveModalStyles.tableRow}>
                      <span style={responsiveModalStyles.tableCell}>{project.year}</span>
                      <span style={responsiveModalStyles.tableCell}>{images.length}</span>
                      <span style={responsiveModalStyles.tableCell}>
                        <span style={responsiveModalStyles.statBadge(project.status)}>
                          {project.status}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Close Button for Mobile */}
                <button
                  onClick={handleClose}
                  style={responsiveModalStyles.mobileCloseButton}
                  aria-label="Close gallery"
                >
                  Close Gallery <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom View */}
      {isZoomed && (
        <div style={responsiveModalStyles.zoomContainer}>
          <div style={responsiveModalStyles.zoomControls}>
            <button
              onClick={() => setIsZoomed(false)}
              style={responsiveModalStyles.zoomCloseButton}
              aria-label="Exit fullscreen"
            >
              <X size={24} />
            </button>
            <div style={responsiveModalStyles.zoomCounter}>
              {currentIndex + 1} / {images.length}
            </div>
          </div>
          
          <img
            src={images[currentIndex]}
            alt={`Fullscreen view - ${project.name}`}
            style={responsiveModalStyles.zoomImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/1920x1080/${Palette.ACCENT.substring(1)}/ffffff?text=${project.name}+Collection`;
            }}
          />
          
          <div style={responsiveModalStyles.zoomNavigation}>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              style={responsiveModalStyles.zoomNavButton}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              style={responsiveModalStyles.zoomNavButton}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ---- UPDATED RESPONSIVE MODAL STYLES ----
const responsiveModalStyles = {
  // Overlay
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 26, 30, 0.98)',
    backdropFilter: 'blur(20px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
    animation: 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflowY: 'auto',
  },
  
  // Main Modal Container
  modal: {
    width: '100%',
    maxWidth: '1400px',
    height: '90vh',
    maxHeight: '900px',
    backgroundColor: Palette.BG,
    borderRadius: '24px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 50px 100px rgba(0,0,0,0.3)',
    position: 'relative',
  },
  
  // Header
  header: {
    padding: '24px 32px',
    borderBottom: `1px solid ${Palette.LINE}`,
    backgroundColor: Palette.WHITE,
    flexShrink: 0,
  },
  
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },
  
  branding: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  
  brandIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    backgroundColor: `${Palette.ACCENT}15`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  
  title: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: Palette.TEXT_MAIN,
    margin: '0 0 4px 0',
    fontFamily: "'Playfair Display', serif",
    lineHeight: '1.2',
  },
  
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  
  metaItem: {
    fontSize: '0.875rem',
    color: Palette.TEXT_LIGHT,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  
  statusBadge: (status) => ({
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    backgroundColor: status === 'Featured' ? `${Palette.ACCENT}20` : 
                    status === 'Active' ? '#4CAF5020' : 
                    '#9C27B020',
    color: status === 'Featured' ? Palette.ACCENT : 
           status === 'Active' ? '#4CAF50' : 
           '#9C27B0',
  }),
  
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0,
  },
  
  counter: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: "'Playfair Display', serif",
  },
  
  counterCurrent: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: Palette.ACCENT,
  },
  
  counterDivider: {
    fontSize: '1rem',
    color: Palette.TEXT_LIGHT,
    margin: '0 4px',
  },
  
  counterTotal: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: Palette.TEXT_MAIN,
  },
  
  iconButton: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    border: `1px solid ${Palette.LINE}`,
    background: Palette.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: Palette.TEXT_MAIN,
  },
  
  closeButton: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    border: `1px solid ${Palette.LINE}`,
    background: Palette.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: Palette.TEXT_MAIN,
  },
  
  // Content Grid - Split Layout
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    flex: 1,
    overflow: 'hidden',
  },
  
  // Gallery Column
  galleryColumn: {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
    borderRight: `1px solid ${Palette.LINE}`,
    overflow: 'hidden',
  },
  
  mainImageSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  
  imageWrapper: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: Palette.DARK_BG,
    height: '400px', // Fixed height for better control
    cursor: 'pointer',
    flex: 1,
  },
  
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // Changed to contain to prevent cropping
    backgroundColor: Palette.DARK_BG,
    display: 'block',
  },
  
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  
  navOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    pointerEvents: 'none',
  },
  
  navButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    color: Palette.TEXT_MAIN,
    pointerEvents: 'auto',
    transition: 'all 0.3s ease',
  },
  
  fullscreenButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.9)',
    border: `1px solid ${Palette.LINE}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: Palette.TEXT_MAIN,
    pointerEvents: 'auto',
    transition: 'all 0.3s ease',
  },
  
  imageCounter: {
    textAlign: 'center',
    padding: '8px 0',
  },
  
  counterText: {
    fontSize: '0.875rem',
    color: Palette.TEXT_LIGHT,
    fontWeight: '500',
  },
  
  thumbnailContainer: {
    paddingTop: '16px',
    borderTop: `1px solid ${Palette.LINE}`,
    overflowX: 'auto',
  },
  
  thumbnailTrack: {
    display: 'flex',
    gap: '12px',
    padding: '4px 0',
  },
  
  thumbnail: {
    width: '80px',
    height: '60px',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flexShrink: 0,
  },
  
  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  
  // Details Column
  detailsColumn: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  
  detailsContent: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'auto',
    height: '100%',
  },
  
  detailsCard: {
    backgroundColor: Palette.WHITE,
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${Palette.LINE}`,
  },
  
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: Palette.TEXT_MAIN,
    margin: 0,
    fontFamily: "'Playfair Display', serif",
  },
  
  descriptionSection: {
    maxHeight: '200px',
    overflowY: 'auto',
    paddingRight: '8px',
  },
  
  description: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: Palette.TEXT_MUTED,
    margin: 0,
    fontFamily: "'Lora', serif",
  },
  
  metaCard: {
    backgroundColor: Palette.WHITE,
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${Palette.LINE}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  
  metaSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  
  metaTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: Palette.TEXT_MAIN,
    margin: 0,
    fontFamily: "'Playfair Display', serif",
  },
  
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  
  tagChip: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500',
    background: `${Palette.ACCENT}15`,
    color: Palette.TEXT_MAIN,
    display: 'inline-block',
  },
  
  statsTable: {
    border: `1px solid ${Palette.LINE}`,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    backgroundColor: `${Palette.BG}`,
    borderBottom: `1px solid ${Palette.LINE}`,
  },
  
  tableHeaderCell: {
    padding: '12px 16px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: Palette.TEXT_LIGHT,
    textAlign: 'center',
  },
  
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    backgroundColor: Palette.WHITE,
  },
  
  tableCell: {
    padding: '16px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: Palette.TEXT_MAIN,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  statBadge: (status) => ({
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '700',
    backgroundColor: status === 'Featured' ? `${Palette.ACCENT}20` : 
                    status === 'Active' ? '#4CAF5020' : 
                    '#9C27B020',
    color: status === 'Featured' ? Palette.ACCENT : 
           status === 'Active' ? '#4CAF50' : 
           '#9C27B0',
    display: 'inline-block',
  }),
  
  mobileCloseButton: {
    display: 'none',
    width: '100%',
    padding: '16px',
    backgroundColor: Palette.ACCENT,
    color: Palette.WHITE,
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  },
  
  // Zoom View Styles
  zoomContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 26, 30, 0.98)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2001,
  },
  
  zoomControls: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    zIndex: 10,
  },
  
  zoomCloseButton: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: Palette.WHITE,
  },
  
  zoomCounter: {
    fontSize: '1rem',
    color: Palette.WHITE,
    fontWeight: '600',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '8px 16px',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
  },
  
  zoomImage: {
    maxWidth: '90%',
    maxHeight: '80%',
    objectFit: 'contain',
  },
  
  zoomNavigation: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '20px',
    zIndex: 10,
  },
  
  zoomNavButton: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: Palette.WHITE,
    backdropFilter: 'blur(10px)',
  },
};

// ---- RESPONSIVE MEDIA QUERIES ----
const ResponsiveCSS = `
  /* Responsive Gallery Modal */
  @media (max-width: 1024px) {
    .gallery-modal .content-grid {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto auto !important;
    }
    
    .gallery-modal .gallery-column {
      border-right: none !important;
      border-bottom: 1px solid ${Palette.LINE} !important;
      height: 50vh !important;
    }
    
    .gallery-modal .image-wrapper {
      height: 300px !important;
    }
    
    .gallery-modal .details-column {
      overflow-y: auto !important;
    }
    
    .gallery-modal .description-section {
      max-height: 150px !important;
    }
  }
  
  @media (max-width: 768px) {
    .gallery-modal {
      padding: 10px !important;
    }
    
    .gallery-modal .modal {
      max-height: 95vh !important;
      height: 95vh !important;
    }
    
    .gallery-modal .header {
      padding: 16px 20px !important;
    }
    
    .gallery-modal .header-content {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 12px !important;
    }
    
    .gallery-modal .controls {
      width: 100% !important;
      justify-content: space-between !important;
    }
    
    .gallery-modal .gallery-column {
      padding: 20px !important;
      height: 40vh !important;
    }
    
    .gallery-modal .image-wrapper {
      height: 250px !important;
    }
    
    .gallery-modal .details-content {
      padding: 20px !important;
    }
    
    .gallery-modal .mobile-close-button {
      display: flex !important;
    }
    
    .gallery-modal .close-button {
      display: none !important;
    }
    
    .gallery-modal .nav-button {
      width: 40px !important;
      height: 40px !important;
    }
    
    .gallery-modal .thumbnail {
      width: 60px !important;
      height: 45px !important;
    }
  }
  
  @media (max-width: 480px) {
    .gallery-modal .modal {
      max-height: 100vh !important;
      height: 100vh !important;
      border-radius: 0 !important;
    }
    
    .gallery-modal .title {
      font-size: 1.5rem !important;
    }
    
    .gallery-modal .meta {
      gap: 8px !important;
      font-size: 0.8rem !important;
    }
    
    .gallery-modal .gallery-column {
      height: 35vh !important;
      padding: 16px !important;
    }
    
    .gallery-modal .image-wrapper {
      height: 200px !important;
    }
    
    .gallery-modal .details-card,
    .gallery-modal .meta-card {
      padding: 16px !important;
    }
    
    .gallery-modal .section-title {
      font-size: 1.25rem !important;
    }
    
    .gallery-modal .meta-title {
      font-size: 1.1rem !important;
    }
    
    .gallery-modal .table-cell {
      padding: 12px !important;
      font-size: 1rem !important;
    }
    
    .gallery-modal .tag-chip {
      padding: 6px 12px !important;
      font-size: 0.8rem !important;
    }
  }
  
  /* Landscape Mode */
  @media (max-height: 600px) and (orientation: landscape) {
    .gallery-modal .modal {
      max-height: 95vh !important;
      height: 95vh !important;
    }
    
    .gallery-modal .gallery-column {
      height: 60vh !important;
    }
    
    .gallery-modal .image-wrapper {
      height: 300px !important;
    }
    
    .gallery-modal .details-content {
      max-height: 40vh !important;
      overflow-y: auto !important;
    }
  }
  
  /* Large Screens */
  @media (min-width: 1600px) {
    .gallery-modal .modal {
      max-width: 1600px !important;
      max-height: 1000px !important;
    }
    
    .gallery-modal .image-wrapper {
      height: 500px !important;
    }
  }
  
  /* Touch Device Optimizations */
  @media (hover: none) and (pointer: coarse) {
    .gallery-modal .nav-button {
      background: rgba(255, 255, 255, 0.95) !important;
    }
    
    .gallery-modal .thumbnail {
      min-width: 70px !important;
    }
  }
  
  /* Scrollbar Styling */
  .gallery-modal ::-webkit-scrollbar {
    width: 6px;
  }
  
  .gallery-modal ::-webkit-scrollbar-track {
    background: ${Palette.BG};
  }
  
  .gallery-modal ::-webkit-scrollbar-thumb {
    background: ${Palette.TEXT_LIGHT}40;
    border-radius: 10px;
  }
  
  .gallery-modal ::-webkit-scrollbar-thumb:hover {
    background: ${Palette.ACCENT}60;
  }
`;

// ---- MAIN PORTFOLIO PAGE ----
const PortfolioPage = () => {
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
        // Add responsive CSS to head
        const styleSheet = document.createElement("style");
        styleSheet.textContent = ResponsiveCSS;
        document.head.appendChild(styleSheet);
        
        // Add responsive classes to modal
        const modalOverlay = document.querySelector('.gallery-modal');
        if (modalOverlay) {
            modalOverlay.classList.add('gallery-modal');
        }

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <div style={Styles.pageContainer}>
            <style>{Animations}</style>
            
            {/* Header / Nav */}
            <nav style={Styles.nav}>
                <div style={Styles.navBrand}>JV <span style={{color: Palette.ACCENT}}>✦</span></div>
                <div style={Styles.navLinks}>
                    <a href="/jiya-portfolio/#work" style={Styles.navLink}>Work</a>
                    <a href="/jiya-portfolio/#about" style={Styles.navLink}>About</a>
                    <div style={Styles.navIcon}><Zap size={18} fill={Palette.ACCENT} stroke={Palette.ACCENT} /></div>
                </div>
            </nav>

            {/* Vertical Stacked Scrolling Content */}
            <main style={Styles.main}>
                {Work.map((project, index) => (
                    <ProjectSection 
                        key={project.id} 
                        project={project} 
                        index={index}
                        onExplore={() => setActiveProject(project)}
                    />
                ))}
            </main>

            {/* Fixed Sidebar Decor */}
            <div style={Styles.sidebarDecor}>
                <div style={Styles.verticalLine} />
                <div style={Styles.socialLink}><Instagram size={18} /></div>
                <div style={Styles.socialLink}><Linkedin size={18} /></div>
            </div>

            {/* Gallery Modal */}
            {activeProject && (
                <GalleryModal 
                    project={activeProject} 
                    onClose={() => setActiveProject(null)} 
                />
            )}
        </div>
    );
};

const ProjectSection = ({ project, index, onExplore }) => {
    return (
        <section style={Styles.section}>
            <div style={Styles.stickyContainer}>
                {/* Text Content Area */}
                <div style={Styles.contentWrapper}>
                    <div className="reveal-text" style={{...Styles.projectIndex, color: Palette.ACCENT}}>
                        0{index + 1}
                    </div>
                    <span style={Styles.projectType}>{project.type}</span>
                    <h2 style={Styles.projectTitle}>{project.name}</h2>
                    <p style={Styles.projectDesc}>{project.description}</p>
                    
                    <div style={Styles.tagContainer}>
                        {project.tags.map(tag => (
                            <span key={tag} style={Styles.tag}>#{tag}</span>
                        ))}
                    </div>

                    <button 
                        style={Styles.exploreBtn}
                        onClick={onExplore}
                    >
                        EXPLORE CASE STUDY <ArrowRight size={16} />
                    </button>
                </div>

                {/* Parallax Image Area */}
                <div style={Styles.imageWrapper}>
                    <div style={Styles.imageFrame} className="image-hover-trigger">
                        <img 
                            src={project.image} 
                            alt={project.name} 
                            style={Styles.image}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/800x1000/${Palette.ACCENT.substring(1)}/${Palette.BG.substring(1)}?text=Project+${project.id}`;
                            }}
                        />
                        <div style={Styles.imageOverlay} />
                        <div className="view-badge" style={Styles.viewBadge}>
                            <Eye size={20} color={Palette.WHITE} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ---- STYLES ----
const Styles = {
    pageContainer: {
        backgroundColor: Palette.BG,
        color: Palette.TEXT_MAIN,
        fontFamily: "'Playfair Display', serif",
        minHeight: "100vh",
        position: 'relative',
    },
    nav: {
        position: "fixed",
        top: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 60px",
        zIndex: 100,
        mixBlendMode: "difference",
    },
    navBrand: {
        fontSize: "1.5rem",
        fontWeight: "800",
        letterSpacing: "2px",
        color: Palette.WHITE,
    },
    navLinks: {
        display: "flex",
        alignItems: "center",
        gap: "40px",
    },
    navLink: {
        textDecoration: "none",
        color: Palette.WHITE,
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontWeight: "600",
    },
    navIcon: {
        cursor: "pointer",
        transition: "transform 0.3s ease",
    },
    main: {
        width: "100%",
    },
    section: {
        height: "100vh",
        width: "100%",
        position: "relative",
        borderBottom: `1px solid ${Palette.LINE}`,
    },
    stickyContainer: {
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10% 0 15%",
        overflow: "hidden",
    },
    contentWrapper: {
        maxWidth: "450px",
        zIndex: 2,
    },
    projectIndex: {
        fontSize: "0.9rem",
        fontWeight: "700",
        marginBottom: "20px",
        display: "block",
    },
    projectType: {
        fontSize: "0.75rem",
        color: Palette.TEXT_LIGHT,
        letterSpacing: "3px",
        textTransform: "uppercase",
        display: "block",
        marginBottom: "10px",
    },
    projectTitle: {
        fontSize: "3.5rem",
        lineHeight: "1.1",
        marginBottom: "25px",
        fontWeight: "700",
    },
    projectDesc: {
        fontFamily: "'Lora', serif",
        color: Palette.TEXT_MUTED,
        lineHeight: "1.8",
        fontSize: "1rem",
        marginBottom: "30px",
    },
    tagContainer: {
        display: "flex",
        gap: "15px",
        marginBottom: "40px",
    },
    tag: {
        fontSize: "0.8rem",
        color: Palette.ACCENT,
        fontWeight: "500",
        fontStyle: "italic",
    },
    exploreBtn: {
        background: "transparent",
        border: "none",
        borderBottom: `2px solid ${Palette.TEXT_MAIN}`,
        padding: "10px 0",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        fontSize: "0.8rem",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontFamily: "'Playfair Display', serif",
        color: Palette.TEXT_MAIN,
    },
    imageWrapper: {
        width: "45%",
        height: "70vh",
        position: "relative",
    },
    imageFrame: {
        width: "100%",
        height: "100%",
        backgroundColor: Palette.DARK_BG,
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: "0.9",
        transition: "transform 0.8s ease",
    },
    imageOverlay: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: `linear-gradient(to bottom, transparent 60%, ${Palette.DARK_BG}aa 100%)`,
    },
    viewBadge: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(0)",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        backgroundColor: Palette.ACCENT,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        zIndex: 5,
    },
    sidebarDecor: {
        position: "fixed",
        left: "50px",
        bottom: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        zIndex: 10,
    },
    verticalLine: {
        width: "1px",
        height: "100px",
        backgroundColor: Palette.LINE,
        marginBottom: "10px",
    },
    socialLink: {
        color: Palette.TEXT_LIGHT,
        cursor: "pointer",
        transition: "color 0.3s ease",
    }
};

const Animations = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

body { 
    margin: 0; 
    padding: 0; 
    background: ${Palette.BG}; 
    overflow-x: hidden;
}

.reveal-text {
    animation: fadeInUp 1s ease both;
}

.image-hover-trigger:hover img {
    transform: scale(1.05);
}

.image-hover-trigger:hover .view-badge {
    transform: translate(-50%, -50%) scale(1);
}

.image-hover-trigger:hover {
    transform: translateY(-10px);
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes zoomIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: ${Palette.BG};
}
::-webkit-scrollbar-thumb {
    background: ${Palette.TEXT_LIGHT};
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: ${Palette.ACCENT};
}

/* Selection Color */
::selection {
    background-color: ${Palette.ACCENT}40;
    color: ${Palette.TEXT_MAIN};
}

/* Smooth Scrolling */
html {
    scroll-behavior: smooth;
}

/* Responsive Typography */
@media (max-width: 768px) {
    h1 { font-size: 2.5rem !important; }
    h2 { font-size: 2rem !important; }
    p { font-size: 0.9rem !important; }
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
    .image-hover-trigger:hover {
        transform: none !important;
    }
    
    .image-hover-trigger:hover img {
        transform: none !important;
    }
}

/* Print Styles */
@media print {
    .gallery-modal {
        display: none !important;
    }
}
`;

export default PortfolioPage;