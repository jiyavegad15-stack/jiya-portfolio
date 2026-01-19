import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Zap,
  Instagram,
  Linkedin,
  ArrowRight,
  Eye,
  Sparkles,
  X,
  Aperture,
  BookOpen,
  Menu,
  Home,
  User,
  Code,
  Briefcase,
  FileText,
  Mail,
  FileCheck
} from "lucide-react";

const ColorPalette = {
    DARK_TEAL: "#244855",
    WARM_RED: "#E64833",
    MUDDY_BROWN: "#874F41",
    MUTED_AQUA: "#90AEAD",
    SOFT_BEIGE: "#FBE9D0",
    CREAM_WHITE: "#FFFDF8"
};

const Theme = {
    background: ColorPalette.SOFT_BEIGE,
    cardBg: ColorPalette.CREAM_WHITE,
    accent: ColorPalette.MUDDY_BROWN,
    secondary: ColorPalette.MUDDY_BROWN,
    tertiary: ColorPalette.MUTED_AQUA,
    text: ColorPalette.DARK_TEAL,
    dark: ColorPalette.DARK_TEAL,
    red: ColorPalette.WARM_RED
};

const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('work');

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, href: '/jiya-portfolio/#/main2' },
        { id: 'about', label: 'About', icon: User, href: '/jiya-portfolio/#about' },
        { id: 'portfolio', label: 'Portfolio', icon: Aperture, href: '/jiya-portfolio/#portfolio' },
        { id: 'work', label: 'Experience', icon: Briefcase, href: '/jiya-portfolio/#work' },
        { id: 'skills', label: 'Skills', icon: Code, href: '/jiya-portfolio/#skills' },
        { id: 'education', label: 'Education', icon: BookOpen, href: '/jiya-portfolio/#education' },
        { id: 'cv', label: 'CV', icon: FileCheck, href: '/jiya-portfolio/#cv' },
        { id: 'contact', label: 'Contact', icon: Mail, href: '/jiya-portfolio/#contact' }
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNavClick = (itemId, href) => {
        setActiveSection(itemId);
        setIsMenuOpen(false);
        if (href.startsWith('/')) {
            window.location.href = href;
        } else {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <nav style={NavStyles.navbar}>
                <div style={NavStyles.navContainer} className="nav-container">
                    <div style={NavStyles.logo}>
                        <div style={NavStyles.logoIcon}>✦</div>
                        <span style={NavStyles.logoText}>JV</span>
                    </div>

                    <div style={NavStyles.navItems} className="nav-items">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    style={{
                                        ...NavStyles.navItem,
                                        ...(activeSection === item.id ? NavStyles.navItemActive : {})
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.id, item.href);
                                    }}
                                    className="nav-item"
                                >
                                    <IconComponent size={16} />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </div>

                    <button style={NavStyles.menuButton} onClick={toggleMenu} className="menu-button">
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <div style={NavStyles.mobileOverlay}>
                    <div style={NavStyles.mobileMenu} className="mobile-menu">
                        <div style={NavStyles.mobileHeader}>
                            <div style={NavStyles.logo}>
                                <div style={NavStyles.logoIcon}>✦</div>
                                <span style={NavStyles.logoText}>JV</span>
                            </div>
                            <button style={NavStyles.closeButton} onClick={toggleMenu}>
                                <X size={24} />
                            </button>
                        </div>
                        <div style={NavStyles.mobileNavItems}>
                            {navItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        style={{
                                            ...NavStyles.mobileNavItem,
                                            ...(activeSection === item.id ? NavStyles.mobileNavItemActive : {})
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.id, item.href);
                                        }}
                                        className="mobile-nav-item"
                                    >
                                        <IconComponent size={20} />
                                        <span>{item.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const NavStyles = {
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: `${Theme.cardBg}e6`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${Theme.dark}10`,
    },
    navContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
    },
    logo: { display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Playfair Display', serif" },
    logoIcon: { fontSize: '1.2rem', color: Theme.red },
    logoText: { fontSize: '1.5rem', fontWeight: 800, color: Theme.dark, letterSpacing: '1px' },
    navItems: { display: 'flex', gap: '1rem', alignItems: 'center' },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0.5rem 0.75rem',
        borderRadius: '25px',
        textDecoration: 'none',
        color: Theme.text,
        fontSize: '0.85rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        fontFamily: "'Lora', serif",
    },
    navItemActive: {
        background: `linear-gradient(135deg, ${Theme.accent}, ${Theme.secondary})`,
        color: Theme.cardBg,
    },
    menuButton: {
        display: 'none',
        background: 'transparent',
        border: 'none',
        color: Theme.dark,
        cursor: 'pointer',
    },
    mobileOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `${Theme.dark}80`,
        backdropFilter: 'blur(10px)',
        zIndex: 1001,
    },
    mobileMenu: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: Theme.cardBg,
        boxShadow: `0 5px 40px rgba(0,0,0,0.2)`,
    },
    mobileHeader: { display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: `1px solid ${Theme.dark}10` },
    closeButton: { background: 'transparent', border: 'none', color: Theme.dark },
    mobileNavItems: { display: 'flex', flexDirection: 'column', padding: '1rem 0' },
    mobileNavItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 2rem', textDecoration: 'none', color: Theme.text, fontFamily: "'Lora', serif" },
    mobileNavItemActive: { background: `${Theme.accent}15`, color: Theme.accent, borderRight: `4px solid ${Theme.accent}` }
};

const BASE_PLACEHOLDER_URL = "https://placehold.co";

const collectionImages = {};
function importAll(r) {
  r.keys().forEach((key) => {
    const path = key.replace("./", ""); 
    const [folder] = path.split("/");  
    if (!collectionImages[folder]) collectionImages[folder] = [];
    collectionImages[folder].push(r(key));
  });
}

try {
  importAll(require.context("../assets/projects", true, /\.(jpg|jpeg|png)$/));
} catch (error) {
  console.log("Images not found");
}

Object.keys(collectionImages).forEach(folder => {
  collectionImages[folder].sort((a, b) => {
    const getNum = (file) => parseInt(file.split("/").pop().split(".")[0]);
    return getNum(a) - getNum(b);
  });
});

const getCollectionImages = (projectId) => {
  const images = collectionImages[`${projectId}X`] || [];
  if (images.length === 0) {
    return [
      `${BASE_PLACEHOLDER_URL}/600x800/${Theme.dark.substring(1)}/${Theme.cardBg.substring(1)}?text=Img+1`,
      `${BASE_PLACEHOLDER_URL}/600x800/${Theme.dark.substring(1)}/${Theme.cardBg.substring(1)}?text=Img+2`
    ];
  }
  return images;
};

const Work = [
    {
        id: 1,
        name: "Amit Agarwal",
        description: "Gained hands-on industry experience at Amit Aggarwal, assisting pret and couture teams in design development, material research, sampling processes, surface exploration, and coordination with artisans.",
        tags: ["Research", "Exploration", "Coordination"],
        Instagram: "#",
        image: getCollectionImages(1)[0],
        collectionPath: "1X",
    },
    {
        id: 2,
        name: "Sayantan Sarkar",
        description: "Gained hands-on experience under Sayantan Sarkar, assisting in design development, surface detailing, sampling, and construction for collections showcased at Khadi Festival and Bharat Tex",
        tags: ["Textile", "Reserach", "Execuation"],
        Instagram: "#",
        image: getCollectionImages(2)[0],
        collectionPath: "2X",
    },
    {
        id: 3,
        name: "TOIE",
        description: "At TOIE, a startup brand, contributed to end-to-end early product development, market analysis, promotional planning, and operational groundwork required to build the brand identity.",
        tags: ["Techpacks", "Designing", "Brand Research"],
        Instagram: "#",
        image: getCollectionImages(3)[0],
        collectionPath: "3X",
    }
];

const Card = ({ data, index, onExplore, onViewCollection }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="fashion-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${index * 0.15}s` }}
        >
            <div style={CardStyles.imageContainer}>
                <img src={data.image} alt={data.name} style={CardStyles.image} />
                <div className="card-overlay" style={{...CardStyles.overlay, opacity: isHovered ? 1 : 0}}>
                    <button onClick={() => onViewCollection(data.id)} style={CardStyles.viewButton}>
                        <Eye size={18} /> View Collection
                    </button>
                </div>
            </div>
            <div style={CardStyles.content}>
                <h3 style={CardStyles.title}>{data.name}</h3>
                <p style={CardStyles.description}>{data.description}</p>
                <div style={CardStyles.tags}>
                    {data.tags.map(tag => <span key={tag} style={CardStyles.tag}>{tag}</span>)}
                </div>
                <button onClick={() => onExplore(data.id)} style={CardStyles.exploreBtn}>
                    Explore Project <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

const CardStyles = {
    imageContainer: { position: 'relative', height: '60%', overflow: 'hidden' },
    image: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' },
    overlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' },
    viewButton: { padding: '10px 20px', borderRadius: '25px', border: 'none', background: Theme.cardBg, color: Theme.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' },
    content: { padding: '1.5rem', height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    title: { margin: 0, fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: Theme.dark },
    description: { fontSize: '0.85rem', color: Theme.text, opacity: 0.8, margin: '10px 0', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' },
    tags: { display: 'flex', gap: '5px', flexWrap: 'wrap' },
    tag: { fontSize: '0.7rem', padding: '4px 10px', background: `${Theme.accent}15`, color: Theme.accent, borderRadius: '15px' },
    exploreBtn: { marginTop: 'auto', background: 'none', border: 'none', color: Theme.red, fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: 0 }
};

const ModalBase = ({ children, onClose }) => (
    <div style={ModalStyles.overlay} onClick={onClose}>
        <div style={ModalStyles.container} onClick={e => e.stopPropagation()}>
            <button style={ModalStyles.closeBtn} onClick={onClose}><X size={24} /></button>
            {children}
        </div>
    </div>
);

const ImageGalleryModal = ({ project, onClose }) => {
    const images = getCollectionImages(project.id);
    const [idx, setIdx] = useState(0);
    return (
        <ModalBase onClose={onClose}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }}>{project.name}</h2>
                <div style={ModalStyles.galleryMain}>
                    <button onClick={() => setIdx((idx - 1 + images.length) % images.length)} style={ModalStyles.navBtn}><ArrowRight style={{ transform: 'rotate(180deg)' }} /></button>
                    <img src={images[idx]} alt="gallery" style={ModalStyles.mainImg} />
                    <button onClick={() => setIdx((idx + 1) % images.length)} style={ModalStyles.navBtn}><ArrowRight /></button>
                </div>
                <div style={ModalStyles.thumbStrip}>
                    {images.map((img, i) => (
                        <img key={i} src={img} onClick={() => setIdx(i)} style={{...ModalStyles.thumb, border: i === idx ? `2px solid ${Theme.red}` : 'none'}} />
                    ))}
                </div>
            </div>
        </ModalBase>
    );
};

const ModalStyles = {
    overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    container: { background: Theme.cardBg, padding: '30px', borderRadius: '20px', position: 'relative', width: '100%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto' },
    closeBtn: { position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' },
    galleryMain: { display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center', margin: '20px 0' },
    mainImg: { maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '10px' },
    navBtn: { background: Theme.dark, color: '#fff', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    thumbStrip: { display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px', overflowX: 'auto' },
    thumb: { width: '60px', height: '60px', objectFit: 'cover', cursor: 'pointer', borderRadius: '5px' }
};

const WorkPage = () => {
    const [viewingProject, setViewingProject] = useState(null);
    const [viewingCollection, setViewingCollection] = useState(null);
    const scrollRef = useRef(null);

    const selectedProject = viewingProject ? Work.find(p => p.id === viewingProject) : null;
    const selectedCollection = viewingCollection ? Work.find(p => p.id === viewingCollection) : null;

    return (
        <div style={{ background: Theme.background, minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Playfair+Display:wght@700;900&display=swap');
                .work-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    padding: 8rem 2rem 4rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .fashion-card {
                    background: ${Theme.cardBg};
                    border-radius: 20px;
                    height: 500px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease;
                    opacity: 0;
                    animation: fadeInUp 0.6s forwards;
                }
                .fashion-card:hover { transform: translateY(-10px); }
                .fashion-card:hover img { transform: scale(1.05); }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 768px) {
                    .nav-items { display: none !important; }
                    .menu-button { display: block !important; }
                    .work-grid { grid-template-columns: 1fr; padding-top: 6rem; }
                    .fashion-card { height: 450px; }
                }
            `}</style>
            
            <NavigationBar />
            
            <div className="work-grid">
                {Work.map((item, idx) => (
                    <Card 
                        key={item.id} 
                        data={item} 
                        index={idx} 
                        onExplore={setViewingProject} 
                        onViewCollection={setViewingCollection} 
                    />
                ))}
            </div>

            {selectedProject && (
                <ModalBase onClose={() => setViewingProject(null)}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif" }}>{selectedProject.name}</h2>
                    <p style={{ fontFamily: "'Lora', serif", lineHeight: '1.6' }}>{selectedProject.description}</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        {selectedProject.tags.map(t => <span key={t} style={CardStyles.tag}>{t}</span>)}
                    </div>
                </ModalBase>
            )}

            {selectedCollection && (
                <ImageGalleryModal project={selectedCollection} onClose={() => setViewingCollection(null)} />
            )}
            
            <a href="/jiya-portfolio/#/main2" style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: Theme.red, color: '#fff', padding: '15px', borderRadius: '50%', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', zIndex: 100 }}>
                <Zap size={24} />
            </a>
        </div>
    );
};

export default WorkPage;