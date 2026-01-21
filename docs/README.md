# Portfolio Documentation

Welcome to your animated portfolio documentation! This folder contains all the guides and resources you need to set up and customize your portfolio.

## 📚 Documentation Files

### 🎯 Quick Start
**[CONTACT_FORM_README.md](./CONTACT_FORM_README.md)** - Start here!
- Overview of contact form features
- Quick 3-step setup guide
- Form states and user experience
- Troubleshooting tips

### 📧 Contact Form Setup
**[EMAILJS_SETUP.md](./EMAILJS_SETUP.md)** - Detailed EmailJS setup
- Step-by-step EmailJS account creation
- Email template configuration
- Getting your Service ID, Template ID, and Public Key
- Environment variables setup
- Testing instructions

### 🔄 Alternative Solutions
**[CONTACT_FORM_ALTERNATIVES.md](./CONTACT_FORM_ALTERNATIVES.md)** - Other options
- Formspree integration
- Web3Forms (unlimited free)
- Custom backend with Nodemailer
- Vercel serverless functions
- Comparison table of all options

---

## 🚀 Quick Setup Guide

Your portfolio is **ready to go**! Just follow these 3 steps to activate the contact form:

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com
2. Sign up (free tier - 200 emails/month)
3. Verify your email address

### Step 2: Get Your Credentials
1. **Add Email Service** → Copy your Service ID
2. **Create Email Template** → Copy your Template ID
3. **Account Settings** → Copy your Public Key

### Step 3: Update the Code
Open `src/components/sections/Contact.tsx` (lines 30-32) and replace:

```typescript
const serviceId = 'service_your_service_id'      // ← Your Service ID
const templateId = 'template_your_template_id'   // ← Your Template ID
const publicKey = 'your_public_key'              // ← Your Public Key
```

**Done!** Your contact form will start working immediately. 🎉

---

## ✨ Portfolio Features

### Hero Section
- ✅ 3D animated floating orb with Three.js
- ✅ Letter-by-letter name animation
- ✅ Rotating role titles
- ✅ Particle effects background
- ✅ Smooth scroll indicator

### About Section
- ✅ Interactive timeline with your education & experience
- ✅ Profile card with bio
- ✅ Tech stack badges
- ✅ Glassmorphism design

### Skills Section
- ✅ 4 skill categories with animated progress bars
- ✅ Mobile Development, Web Development, Backend & Tools, Testing & Collaboration
- ✅ Development tools showcase
- ✅ Hover effects and animations

### Projects Section
- ✅ Featured projects grid
- ✅ Hover animations with image zoom
- ✅ Live project links
- ✅ GitHub integration
- ✅ Technology tags

### Contact Section
- ✅ **Fully functional email form** with EmailJS
- ✅ Loading states and success/error messages
- ✅ Social media links (LinkedIn, GitHub, Email, Phone)
- ✅ Responsive design

### Additional Features
- ✅ Custom cursor (desktop only)
- ✅ Responsive navbar with mobile menu
- ✅ Smooth scroll animations
- ✅ Glassmorphism UI throughout
- ✅ Neon gradient accents
- ✅ **Fully responsive** for mobile, tablet, and desktop

---

## 📱 Device Support

Your portfolio is optimized for:
- 📱 Mobile phones (320px - 640px)
- 📱 Tablets (640px - 1024px)
- 💻 iPads (768px - 1024px)
- 💻 Laptops (1024px - 1440px)
- 🖥️ Desktops (1440px+)

---

## 🎨 Customization

### Colors
The portfolio uses a neon color scheme defined in `tailwind.config.js`:
- **neon-blue**: `#00d4ff`
- **neon-violet**: `#a855f7`
- **neon-cyan**: `#06b6d4`
- **neon-pink**: `#ec4899`

### Personal Information
All your personal information is already filled in:
- Name: Manish Singh Rana
- LinkedIn: https://linkedin.com/in/manish-singh-rana-b8008b163
- GitHub: https://github.com/MSRRana
- Email: manishsinghrana469@gmail.com
- Phone: +91 7078470684

### Projects
Your real projects are showcased:
1. Healiom Workspace
2. Healiom CareSpace
3. SnapMeal - Eat Smarter
4. Portfolio Website

---

## 🛠️ Tech Stack

### Frontend
- React 19 with TypeScript
- Vite (build tool)
- Tailwind CSS v3
- Framer Motion (animations)
- Three.js + @react-three/fiber (3D graphics)

### Contact Form
- EmailJS (@emailjs/browser)
- Form validation
- Loading states
- Success/Error handling

### Icons
- Lucide React

---

## 📦 Project Structure

```
animated-portfolio/
├── docs/                          # Documentation folder
│   ├── README.md                  # This file
│   ├── CONTACT_FORM_README.md     # Contact form overview
│   ├── EMAILJS_SETUP.md          # EmailJS setup guide
│   └── CONTACT_FORM_ALTERNATIVES.md  # Alternative solutions
├── src/
│   ├── components/
│   │   ├── 3d/                   # 3D components
│   │   │   ├── FloatingOrb.tsx
│   │   │   └── Scene.tsx
│   │   ├── sections/             # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx       # ← Contact form here
│   │   └── ui/                   # UI components
│   │       ├── Navbar.tsx
│   │       └── CustomCursor.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
└── tailwind.config.js
```

---

## 🚀 Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Your portfolio will be available at: http://localhost:5175

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Go to https://netlify.com
3. Connect your repository
4. Deploy

### GitHub Pages
```bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

---

## 📝 Next Steps

1. ✅ **Activate Contact Form** - Follow [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)
2. 🎨 **Customize Colors** - Edit `tailwind.config.js`
3. 📸 **Add Your Photo** - Replace the "MR" avatar in About section
4. 📄 **Add Resume** - Link your resume PDF to the Resume button
5. 🚀 **Deploy** - Choose a hosting platform and deploy

---

## 🆘 Need Help?

- **Contact Form Issues**: See [CONTACT_FORM_README.md](./CONTACT_FORM_README.md)
- **EmailJS Setup**: See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)
- **Alternative Solutions**: See [CONTACT_FORM_ALTERNATIVES.md](./CONTACT_FORM_ALTERNATIVES.md)

---

## 🎉 Your Portfolio is Ready!

Everything is set up and personalized with your information. Just add your EmailJS credentials and you're ready to deploy!

**Happy coding!** 🚀
