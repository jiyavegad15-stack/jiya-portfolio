# 🌟 Jiya Vegad - Fashion Design Portfolio

A stunning, interactive portfolio website showcasing Jiya Vegad's fashion design work, creative process, and professional journey. Built with modern React and featuring elegant animations, this portfolio represents the intersection of traditional craftsmanship and contemporary digital design.

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-success) ![React](https://img.shields.io/badge/React-18.2+-61DAFB) ![Responsive](https://img.shields.io/badge/Design-Responsive-green)

## ✨ Features

- **🎨 Immersive Design**: Elegant color palette and sophisticated typography
- **⚡ Smooth Animations**: Custom CSS animations and hover effects
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🎯 Interactive Elements**: Engaging user interactions and transitions
- **🌈 Modern Stack**: Built with React, React Router, and Lucide icons
- **🚀 Performance Optimized**: Fast loading and smooth scrolling

## 🛠 Tech Stack

**Frontend:**
- React 18.2+
- React Router DOM
- Lucide React (Beautiful icons)
- CSS3 with Custom Properties
- Modern CSS Grid & Flexbox

**Development:**
- JavaScript (ES6+)
- CSS Animations & Transitions
- Responsive Design Principles
- Component-Based Architecture

## 📦 Project Structure

```
src/
├── pages/                 # Main page components
│   ├── AboutPage.jsx     # About me section
│   ├── workPage.jsx      # Portfolio showcase
│   ├── Process.jsx       # Design psychology & process
│   └── main2.jsx         # Home/Landing page
├── components/           # Reusable components
│   ├── Navigation/       # Navbars & menus
│   ├── Animations/       # Custom animation components
│   └── UI/              # Button, cards, etc.
├── subcomponents/        # Smaller UI elements
│   ├── IconBullet.jsx   # Icon + text components
│   ├── ProfileImage.jsx # Enhanced image display
│   └── SocialIcons.jsx  # Social media links
├── assets/              # Static files
│   ├── images/
│   │   └── profile.jpg  # Portfolio images
│   └── styles/          # Additional CSS
└── utilities/           # Helper functions
    └── theme.js         # Color scheme & constants
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pratikxop/jiya-vegad-portfolio.git
   cd jiya-vegad-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Design System

### Color Palette
```css
--dark-teal: #52aacdff;    /* Primary brand color */
--warm-red: #F16D55;       /* Accent & highlights */
--muddy-brown: #A96B58;    /* Secondary accents */
--muted-aqua: #A9C4C3;     /* Supporting colors */
--soft-beige: #FAF0E0;     /* Text on dark */
--cream-white: #FFFEFB;    /* Pure white */
```

### Typography
- **Headings**: Georgia, serif
- **Body**: System fonts with Georgia fallback
- **Weights**: 400 (regular), 600 (semibold), 700 (bold), 900 (black)

### Animations
- **Entrance**: Fade-in, slide-in transitions
- **Interactive**: Hover lifts, glow effects
- **Background**: Floating orbs, gradient shifts

## 📱 Pages Overview

### 🏠 Home (`main2.jsx`)
- Hero section with brand statement
- Featured work preview
- Quick navigation to key sections

### 👤 About (`AboutPage.jsx`)
- Professional biography
- Design philosophy
- Personal interests
- Interactive profile image with animations

### 💼 Portfolio (`workPage.jsx`)
- Project showcases
- Image galleries
- Case studies
- Filterable categories

### 🎨 Design Process (`Process.jsx`)
- Creative methodology
- Project workflows
- Design psychology insights
- Technical process details

## 🔧 Development

### Making Updates

1. **Edit the relevant component/file**
2. **Stage your changes**
   ```bash
   git add .
   ```
3. **Commit with descriptive message**
   ```bash
   git commit -m "feat: Add new portfolio project section"
   ```
4. **Push to main branch**
   ```bash
   git push origin main --force
   ```

> **⚠️ Important**: The `--force` flag is used as per project specifications. Use with caution in collaborative environments.

### Customization

**To update colors:** Modify the `Theme` object in the component files or create a central `theme.js` utility.

**To add new pages:** 
1. Create component in `pages/`
2. Add route in main App component
3. Update navigation components

**To modify animations:** Edit the `animationsCSS` constant or add new keyframes.

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
1. Build project: `npm run build`
2. Drag `build` folder to Netlify dashboard

### GitHub Pages
Update `package.json` homepath and use GitHub Actions for automatic deployment.

## 📊 Performance

- **Lazy Loading**: Images and components load on demand
- **Optimized Assets**: Compressed images and efficient CSS
- **Smooth Scrolling**: 60fps animations and transitions
- **Mobile First**: Responsive design patterns

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👩‍💻 Author

**Pratik Singh**
- LinkedIn: [Jiya Vegad](https://www.linkedin.com/in/pratik-singh-021336296 )
- Email: [Jiya Vegad](pratiksngh1706@gmail.com)

## 🙏 Acknowledgments

- **Lucide** for beautiful, consistent icons
- **React Team** for the amazing framework
- **Design Inspiration** from contemporary fashion portfolios
- **Color Palette** inspired by natural earth tones and modern design trends

---

<div align="center">

**Crafted with passion for design and code** ✨

*"Where traditional craftsmanship meets contemporary digital expression"*

</div>