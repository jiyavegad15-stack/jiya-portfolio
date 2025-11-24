import React, { useState } from "react";
import { Zap, Github, Linkedin, Sparkles, Palette, Scissors, Heart, ArrowRight, BookOpen, MapPin, Code, Briefcase, GraduationCap, Grid, Instagram } from "lucide-react";

// 🎨 REFINED COLOR PALETTE
const Theme = {
    DARK_TEAL: "#244855",
    WARM_RED: "#E64833",
    MUDDY_BROWN: "#874F41",
    MUTED_AQUA: "#90AEAD",
    SOFT_BEIGE: "#FBE9D0",
    CREAM_WHITE: "#FFFDF8"
};

// 🌿 ELEGANT ANIMATIONS (Custom CSS is kept for complex animations)
const animationsCSS = `
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInLeft {
  0% { opacity: 0; transform: translateX(-40px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
  0% { opacity: 0; transform: translateX(40px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
.animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
.animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
.animate-pulse { animation: gentlePulse 3s ease-in-out infinite; }

/* Hover effects */
.social-hover:hover {
    transform: translateY(-3px);
    background: rgba(251, 233, 208, 0.15);
    border-color: rgba(230, 72, 51, 0.4);
    box-shadow: 0 10px 30px rgba(230, 72, 51, 0.3);
}

.power-hover:hover {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 0 15px 40px rgba(230, 72, 51, 0.5);
}

.content-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 35px 70px rgba(36, 72, 85, 0.5);
}

.nav-item:hover {
    color: ${Theme.WARM_RED};
    transform: scale(1.05);
}

/* Backdrop fallback */
.backdrop-fallback {
    background: rgba(36, 72, 85, 0.6);
}

/* Base link reset */
a {
    text-decoration: none;
}
`;

// 🌿 COMPLEX INLINE STYLES (For non-Tailwindable effects like custom glass, gradients, and filters)
const ComplexStyles = {
    // Floating orb component style helper
    FloatingOrb: (size, color, top, left, opacity) => ({
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}${opacity} 0%, transparent 70%)`,
        filter: "blur(50px)",
        top,
        left,
    }),

    // Main Bio Box style
    MainContentBox: {
        background: `linear-gradient(135deg, 
            rgba(251, 233, 208, 0.08) 0%, 
            rgba(144, 174, 173, 0.05) 50%,
            rgba(135, 79, 65, 0.03) 100%)`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: `
            0 25px 50px rgba(36, 72, 85, 0.3),
            inset 0 1px 0 rgba(251, 233, 208, 0.1),
            inset 0 0 0 1px rgba(251, 233, 208, 0.05)
        `,
    },

    // Interests Box style
    InterestsContentBox: {
        background: `linear-gradient(135deg, 
            rgba(135, 79, 65, 0.08) 0%, 
            rgba(144, 174, 173, 0.06) 100%)`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 20px 40px rgba(36, 72, 85, 0.25)",
    },

    // Heading style (for gradient text)
    Heading: {
        background: `linear-gradient(135deg, ${Theme.SOFT_BEIGE} 0%, ${Theme.MUTED_AQUA} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "0.5px",
    },

    // SubHeading style
    SubHeading: {
        color: Theme.WARM_RED,
    },
};

// -----------------------------------------------------------
// UI COMPONENTS - Shared by AboutPageContent
// -----------------------------------------------------------

const BackgroundElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
        {/* Adjusted opacity values in hex for a smoother look */}
        <div style={ComplexStyles.FloatingOrb("400px", Theme.WARM_RED, "15%", "10%", "08")} />
        <div style={ComplexStyles.FloatingOrb("500px", Theme.MUTED_AQUA, "60%", "80%", "06")} />
        <div style={ComplexStyles.FloatingOrb("300px", Theme.MUDDY_BROWN, "75%", "15%", "05")} />
    </div>
);

const BigTitle = ({ title }) => (
    <h1 className="fixed top-[10%] left-1/2 -translate-x-1/2 md:left-[8%] md:translate-x-0 text-[10vh] md:text-[15vh] font-[900] opacity-3 pointer-events-none z-0" 
        style={{ color: Theme.SOFT_BEIGE }}
    >
        {title}
    </h1>
);

const IconBullet = ({ icon: Icon, text }) => (
    <li className="flex gap-4 mb-4 py-3 border-b border-white/10 last:border-b-0 items-start">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0" style={{
            background: `linear-gradient(135deg, ${Theme.WARM_RED}20, ${Theme.MUTED_AQUA}25)`,
            border: `1px solid ${Theme.WARM_RED}30`,
        }}>
            <Icon size={16} color={Theme.WARM_RED} />
        </div>
        <span className="text-base md:text-lg leading-relaxed">{text}</span>
    </li>
);

const HighlightText = ({ children }) => (
    <strong className="font-semibold" style={{
        background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    }}>
        {children}
    </strong>
);

const ScrollIndicator = () => (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 p-3 px-6 rounded-full text-sm font-medium" style={{
        color: Theme.MUTED_AQUA,
        opacity: 0.8,
        background: "rgba(36, 72, 85, 0.6)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${Theme.MUTED_AQUA}25`,
    }}>
        <span>Scroll to explore</span>
        <div style={{ animation: "gentlePulse 2s ease-in-out infinite" }}>
            <ArrowRight size={18} style={{ transform: "rotate(90deg)" }} />
        </div>
    </div>
);


// -----------------------------------------------------------
// PAGE: ABOUT (RE-RESPONSIVE)
// -----------------------------------------------------------
const AboutPageContent = () => {
    return (
        <>
            <BigTitle title="ABOUT" />

            {/* MAIN CONTENT AREA - Responsive and Centered */}
            <div className="relative z-10 mx-auto px-6 py-28 md:px-12 lg:max-w-4xl lg:py-36">
                
                {/* 1. BIO BOX */}
                <div style={ComplexStyles.MainContentBox} 
                     className="animate-fadeInUp content-hover mb-12 rounded-3xl p-8 md:p-14 lg:p-16 transition-all duration-500 hover:scale-[1.005] backdrop-fallback border-l-4"
                     style={{...ComplexStyles.MainContentBox, borderLeftColor: Theme.WARM_RED}}
                >

                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{
                        background: `linear-gradient(90deg, transparent, ${Theme.WARM_RED}50, transparent)`
                    }} />

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 md:mb-10 leading-snug" style={ComplexStyles.Heading}>
                        About Me
                    </h2>

                    <p className="text-xl mb-6 opacity-95 leading-relaxed">
                        I'm <HighlightText>Jiya Vegad</HighlightText>, a designer who weaves emotion, culture, 
                        and modern silhouettes into expressive fashion that tells compelling stories through fabric and form.
                    </p>

                    <p className="mb-8 opacity-90 text-lg leading-relaxed">
                        My work explores identity, movement, and transformation through rich earth tones, 
                        sculptural lines, and artisanal techniques that bridge <HighlightText>traditional craftsmanship</HighlightText> 
                        with <HighlightText>contemporary design</HighlightText> sensibilities.
                    </p>
                    
                    <h3 className="text-2xl md:text-3xl font-semibold mt-10 mb-6 flex items-center gap-4" style={ComplexStyles.SubHeading}>
                        <Palette size={28} />
                        Design Philosophy
                    </h3>
                    
                    <ul className="list-none p-0">
                        <IconBullet icon={Sparkles} text="Concept-based couture that tells emotional stories and explores human experiences" />
                        <IconBullet icon={Scissors} text="Craft-inspired silhouettes with modern sensibilities and sustainable practices" />
                        <IconBullet icon={BookOpen} text="Sustainable textile reinterpretation and innovation through traditional techniques" />
                    </ul>

                    {/* Philosophy Quote */}
                    <div className="mt-12 p-6 md:p-8 rounded-2xl relative" style={{
                        background: `linear-gradient(135deg, ${Theme.MUDDY_BROWN}12, ${Theme.WARM_RED}08)`,
                        border: `1px solid ${Theme.MUTED_AQUA}25`,
                    }}>
                        <Heart size={24} className="absolute -top-3 left-6 p-1.5 rounded-full" style={{
                            color: Theme.WARM_RED,
                            background: Theme.DARK_TEAL,
                        }} />
                        <p className="text-xl italic m-0 opacity-90 leading-relaxed">
                            "True fashion is <HighlightText>emotion woven into form</HighlightText> — 
                            where every stitch carries intention, every silhouette tells a story, 
                            and every garment becomes a canvas for personal expression."
                        </p>
                    </div>
                </div>

                {/* 2. PERSONAL INTERESTS */}
                <div style={ComplexStyles.InterestsContentBox} 
                     className="animate-fadeInRight content-hover p-8 md:p-12 rounded-2xl transition-all duration-500 hover:scale-[1.005] backdrop-fallback"
                >

                    <h3 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-4" style={ComplexStyles.SubHeading}>
                        <Sparkles size={24} />
                        Personal Interests
                    </h3>
                    
                    <ul className="list-none p-0">
                        <IconBullet icon={MapPin} text="Exploring architectural geometry and urban textures in Mumbai's diverse neighborhoods" />
                        <IconBullet icon={Heart} text="Collecting vintage silk scarves and traditional embroidery samples from various cultures" />
                        <IconBullet icon={Sparkles} text="Digital illustration and 3D modeling for fashion visualization and concept development" />
                    </ul>

                    {/* Current Inspiration Box */}
                    <div className="mt-8 p-4 md:p-6 rounded-xl" style={{
                        background: `linear-gradient(135deg, ${Theme.MUTED_AQUA}10, transparent)`,
                        border: `1px solid ${Theme.MUTED_AQUA}25`,
                    }}>
                        <div className="flex items-center gap-3 mb-2">
                            <ArrowRight size={18} color={Theme.MUTED_AQUA} />
                            <span className="font-semibold text-base" style={{ color: Theme.MUTED_AQUA }}>Current Inspiration</span>
                        </div>
                        <p className="text-base italic opacity-85 m-0">
                            "Finding inspiration in the intersection of traditional crafts and digital innovation, 
                            where heritage techniques meet contemporary design thinking."
                        </p>
                    </div>
                </div>
            </div>

            <ScrollIndicator />
        </>
    );
};


// -----------------------------------------------------------
// PAGE PLACEHOLDERS
// -----------------------------------------------------------
const PlaceholderPage = ({ title, icon: Icon }) => (
    <div className="relative z-10 mx-auto px-6 py-32 md:px-12 lg:max-w-4xl lg:py-48 text-center animate-fadeInUp">
        <div className="p-12 md:p-20 rounded-3xl mx-auto backdrop-fallback" style={ComplexStyles.MainContentBox}>
            <Icon size={64} className="mx-auto mb-6" style={{ color: Theme.WARM_RED }} />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={ComplexStyles.Heading}>
                {title}
            </h1>
            <p className="text-lg opacity-80">
                This page is currently under refinement. Check back soon for detailed content on {title.toLowerCase()}.
            </p>
        </div>
    </div>
);

const MainPage = () => <PlaceholderPage title="Designer Home" icon={Zap} />;
const MySkillsPage = () => <PlaceholderPage title="Skills & Techniques" icon={Scissors} />;
const PortfolioPage = () => <PlaceholderPage title="Portfolio Gallery" icon={Grid} />;
const WorkPage = () => <PlaceholderPage title="Work Experience" icon={Briefcase} />;
const CVPage = () => <PlaceholderPage title="Curriculum Vitae" icon={BookOpen} />;
const ProcessPage = () => <PlaceholderPage title="Design Process" icon={Palette} />;
const EducationPage = () => <PlaceholderPage title="Education History" icon={GraduationCap} />;
const ProjectPage = () => <PlaceholderPage title="Project Detail" icon={Code} />;
const FallbackPage = () => <PlaceholderPage title="404 - Page Not Found" icon={MapPin} />;


// -----------------------------------------------------------
// NAVIGATION & HEADER
// -----------------------------------------------------------
const LogoComponent = ({ setPage }) => (
    <div onClick={() => setPage('/')} className="fixed top-8 left-4 sm:left-10 z-50 text-2xl md:text-3xl font-bold flex items-center gap-3 cursor-pointer transition-transform hover:scale-105" style={{ color: Theme.SOFT_BEIGE }}>
        <div className="w-4 h-4 rounded-full" style={{
            background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
            boxShadow: `0 0 25px ${Theme.WARM_RED}40`,
        }} />
        JV
    </div>
);

const SocialIcons = () => (
    <div className="fixed top-8 right-4 sm:right-10 flex gap-4 z-50">
        <a href="https://instagram.com" 
           target="_blank" 
           rel="noopener noreferrer"
           className="social-hover w-11 h-11 rounded-full flex items-center justify-center transition-all"
           style={{
               background: "rgba(251, 233, 208, 0.08)",
               backdropFilter: "blur(12px)",
               border: `1.5px solid ${Theme.SOFT_BEIGE}20`,
               color: Theme.SOFT_BEIGE,
           }}
        >
            <Instagram size={22} />
        </a>
        <a href="https://linkedin.com" 
           target="_blank" 
           rel="noopener noreferrer"
           className="social-hover w-11 h-11 rounded-full flex items-center justify-center transition-all"
           style={{
               background: "rgba(251, 233, 208, 0.08)",
               backdropFilter: "blur(12px)",
               border: `1.5px solid ${Theme.SOFT_BEIGE}20`,
               color: Theme.SOFT_BEIGE,
           }}
        >
            <Linkedin size={22} />
        </a>
    </div>
);

const PowerButton = ({ setPage }) => (
    <button onClick={() => setPage('/')} 
       className="power-hover fixed top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex justify-center items-center transition-all"
       style={{
           background: `linear-gradient(135deg, ${Theme.WARM_RED} 0%, ${Theme.MUDDY_BROWN} 100%)`,
           boxShadow: `0 8px 30px ${Theme.WARM_RED}30`,
           zIndex: 60,
       }}
    >
        <Zap size={26} style={{ color: Theme.CREAM_WHITE }} />
    </button>
);

const Navigation = ({ currentPage, setPage }) => {
    const navItems = [
        { path: '/', name: 'Home', icon: Zap },
        { path: '/about', name: 'About', icon: Palette },
        { path: '/skills', name: 'Skills', icon: Scissors },
        { path: '/portfolio', name: 'Portfolio', icon: Grid },
        { path: '/work', name: 'Work', icon: Briefcase },
        { path: '/cv', name: 'CV', icon: BookOpen },
    ];

    return (
        <div className="fixed bottom-0 md:top-8 md:bottom-auto left-1/2 transform -translate-x-1/2 z-50 p-3 md:p-0">
            <nav className="flex justify-center rounded-full backdrop-fallback border border-white/20 shadow-lg p-3 md:p-0 md:bg-transparent md:backdrop-filter-none" style={{
                background: "rgba(36, 72, 85, 0.6)",
                backdropFilter: "blur(12px)",
            }}>
                <ul className="flex space-x-4 text-xs md:text-sm lg:text-base font-semibold">
                    {navItems.map(item => (
                        <li key={item.path}>
                            <button 
                                onClick={() => setPage(item.path)}
                                className={`nav-item px-3 py-2 md:px-5 md:py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                                    currentPage === item.path 
                                        ? 'bg-white/10 text-white shadow-inner scale-105' 
                                        : 'text-white/70 hover:text-white'
                                }`}
                                style={{
                                    color: currentPage === item.path ? Theme.SOFT_BEIGE : Theme.SOFT_BEIGE + 'B3'
                                }}
                            >
                                <item.icon size={16} />
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};


// -----------------------------------------------------------
// MAIN APP COMPONENT (Router Implementation)
// -----------------------------------------------------------
const App = () => {
    // Simple state-based routing instead of react-router-dom
    const [currentPage, setCurrentPage] = useState('/about');

    const handleNavigation = (path) => {
        // Simple logic to handle main pages and project pages
        if (path.startsWith('/project')) {
            setCurrentPage('/project/:id');
        } else if (path === '/main2') {
            setCurrentPage('/'); // Treat /main2 as navigating to home
        } else {
            setCurrentPage(path);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case '/':
                return <MainPage />;
            case '/about':
                return <AboutPageContent />;
            case '/skills':
                return <MySkillsPage />;
            case '/portfolio':
                return <PortfolioPage />;
            case '/work':
                return <WorkPage />;
            case '/cv':
                return <CVPage />;
            case '/process':
                return <ProcessPage />;
            case '/education':
                return <EducationPage />;
            case '/project/:id':
                // Note: Real routing would extract the ID, this is a placeholder
                return <ProjectPage />;
            default:
                return <FallbackPage />;
        }
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden font-serif text-white antialiased" style={{ background: `linear-gradient(135deg, ${Theme.DARK_TEAL} 0%, #1a3a47 100%)`, color: Theme.SOFT_BEIGE }}>
            
            {/* Inject Custom Animations */}
            <style>{animationsCSS}</style>

            <BackgroundElements />
            
            {/* Persistent Header Elements */}
            <LogoComponent setPage={handleNavigation} />
            <SocialIcons />
            <PowerButton setPage={handleNavigation} />
            <Navigation currentPage={currentPage} setPage={handleNavigation} />

            {/* Render the current page content */}
            {renderPage()}
        </div>
    );
};

export default App;