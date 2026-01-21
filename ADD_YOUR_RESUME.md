# 📄 Add Your Resume - Quick Guide

## ✨ Resume Download Feature is Ready!

Your portfolio now has a **Resume button** in the navbar that will automatically download your PDF when clicked.

---

## 🚀 3 Easy Ways to Add Your Resume

### Method 1: Using the Script (Easiest!)

```bash
# Navigate to project directory
cd /Users/manishsinghrana/Downloads/data/Projects/Portfolio/animated-portfolio

# Run the script with your resume path
./add-resume.sh ~/Downloads/Your-Resume.pdf

# The script will:
# ✅ Copy your resume to the correct location
# ✅ Show file info
# ✅ Give you next steps
```

### Method 2: Manual Copy (Simple)

```bash
# Copy your resume to the assets folder
cp ~/Downloads/Your-Resume.pdf public/assets/resume.pdf
```

### Method 3: Using Finder (GUI)

1. Open Finder
2. Navigate to: `animated-portfolio/public/assets/`
3. Copy your resume PDF into this folder
4. Rename it to: `resume.pdf`

---

## 🧪 Test It Locally

```bash
# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
# Click the "Resume" button in the navbar
# Your resume should download!
```

---

## 🚀 Deploy to Live Site

Once you've tested and it works:

```bash
# Add the resume file
git add public/assets/resume.pdf

# Commit
git commit -m "Add resume PDF"

# Push to GitHub
git push origin main
```

**GitHub Actions will automatically deploy in ~1-2 minutes!** ✨

---

## ✅ Current Status

- ✅ Resume button added to navbar (desktop & mobile)
- ✅ Download icon displayed
- ✅ Automatic download functionality configured
- ✅ Custom download filename: `Manish_Singh_Rana_Resume.pdf`
- ⚠️ **Action needed:** Add your actual resume PDF

---

## 📍 Where to Place Your Resume

```
animated-portfolio/
└── public/
    └── assets/
        └── resume.pdf  ← Your resume goes HERE
```

---

## 💡 Tips

- **File format:** PDF only
- **File size:** Keep it under 2-3 MB
- **Filename:** The file must be named `resume.pdf`
- **Content:** Make sure it's your latest, most updated resume

---

## 🆘 Need Help?

See full documentation: [docs/RESUME_SETUP.md](./docs/RESUME_SETUP.md)

---

## 🎯 Quick Commands Reference

```bash
# Add resume using script
./add-resume.sh ~/path/to/your/resume.pdf

# Or manually
cp ~/path/to/your/resume.pdf public/assets/resume.pdf

# Test locally
npm run dev

# Deploy
git add public/assets/resume.pdf
git commit -m "Add resume PDF"
git push origin main
```

---

**Your portfolio will be live at:** https://msrrana.github.io/animated-portfolio/

**Just add your resume and push!** 🚀
