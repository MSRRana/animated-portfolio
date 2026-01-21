# Resume Download Setup Guide

## Overview

Your portfolio has a **Resume button** in the navbar (both desktop and mobile) that automatically downloads your resume PDF when clicked.

## 🚀 Quick Setup

### Step 1: Prepare Your Resume

1. **Export your resume as PDF**
   - Make sure it's professionally formatted
   - Keep file size reasonable (< 5MB recommended)
   - Use a clear filename

2. **Rename your file (optional but recommended):**
   ```
   Manish_Singh_Rana_Resume.pdf
   ```

### Step 2: Add Resume to Your Project

**Place your resume PDF in this exact location:**
```
animated-portfolio/
└── public/
    └── assets/
        └── resume.pdf  ← Your resume goes here
```

**Using Terminal:**
```bash
# Navigate to your project
cd /path/to/animated-portfolio

# Copy your resume to the assets folder
cp ~/Downloads/your-resume.pdf public/assets/resume.pdf
```

**Using Finder (macOS):**
1. Open your project folder: `animated-portfolio`
2. Navigate to: `public` → `assets`
3. Copy your resume PDF into this folder
4. Rename it to: `resume.pdf`

### Step 3: Test Locally

```bash
# Start the dev server
npm run dev

# Open http://localhost:5173 in your browser
# Click the "Resume" button to test the download
```

### Step 4: Deploy

Once your resume is added and tested:

```bash
# Stage the new file
git add public/assets/resume.pdf

# Commit
git commit -m "Add resume PDF for download"

# Push to GitHub
git push origin main
```

**GitHub Actions will automatically deploy your portfolio with the resume!** ✅

---

## 📋 What's Already Configured

### Resume Button Features:
- ✅ **Download Icon** - Visual indicator with download icon
- ✅ **Auto Download** - Clicking triggers immediate download
- ✅ **Custom Filename** - Downloads as `Manish_Singh_Rana_Resume.pdf`
- ✅ **Responsive** - Works on desktop, tablet, and mobile
- ✅ **Hover Effects** - Smooth animations on hover

### Technical Details:
- Resume path: `/assets/resume.pdf`
- Download name: `Manish_Singh_Rana_Resume.pdf`
- File location: `public/assets/resume.pdf`

---

## 🎨 Customization

### Change Download Filename

Edit `src/components/ui/Navbar.tsx` (line 29):

```typescript
const handleResumeDownload = () => {
  const link = document.createElement('a')
  link.href = '/assets/resume.pdf'
  link.download = 'Your_Custom_Name.pdf'  // ← Change this
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
```

### Use Different File Path

If you want to use a different filename:

1. **Update the href** in `Navbar.tsx`:
   ```typescript
   link.href = '/assets/my-custom-resume.pdf'  // ← Change this
   ```

2. **Name your file accordingly:**
   ```
   public/assets/my-custom-resume.pdf
   ```

---

## 🔍 Troubleshooting

### Resume Button Doesn't Download

**Check 1: File Location**
```bash
# Verify file exists
ls -la public/assets/resume.pdf
```

**Check 2: File Permissions**
```bash
# Make sure file is readable
chmod 644 public/assets/resume.pdf
```

**Check 3: Browser Console**
- Open Developer Tools (F12)
- Click Resume button
- Check Console for errors

### File Not Found (404) After Deployment

**Solution:** Ensure the file is committed to Git:
```bash
git add public/assets/resume.pdf
git commit -m "Add resume PDF"
git push origin main
```

### Resume Opens in Browser Instead of Downloading

**This is browser-dependent behavior:**
- Some browsers (Chrome) open PDFs inline
- Others (Safari) may download automatically
- Both behaviors are normal and acceptable

To force download, the code already uses the `download` attribute.

---

## 📱 Testing on Different Devices

### Desktop:
- Click "Resume" button in navbar
- File should download to Downloads folder

### Mobile:
- Tap hamburger menu (☰)
- Tap "Resume" button
- File downloads to device

### Tablet:
- Same as desktop for large tablets
- Same as mobile for small tablets

---

## 🎯 Best Practices

### Resume File Recommendations:
- ✅ **Format:** PDF (not Word or image)
- ✅ **Size:** Under 2-3 MB
- ✅ **Pages:** 1-2 pages (max)
- ✅ **Filename:** Professional, no spaces
- ✅ **Content:** Up-to-date information
- ✅ **Design:** Clean, ATS-friendly

### File Naming:
- ✅ Good: `Manish_Singh_Rana_Resume.pdf`
- ✅ Good: `ManishRana_Resume_2026.pdf`
- ❌ Avoid: `my resume final final v3.pdf`
- ❌ Avoid: `resume (1).pdf`

---

## 🚀 Live Example

Your resume will be downloadable at:
**https://msrrana.github.io/animated-portfolio/**

Just click the "Resume" button in the top-right corner!

---

## 📝 Current Status

- ✅ Resume button configured
- ✅ Download functionality implemented
- ✅ Responsive design (mobile + desktop)
- ✅ Download icon added
- ⚠️ **Need to add:** Your actual resume PDF file

**Next step:** Add your `resume.pdf` to `public/assets/` directory!

---

## 💡 Alternative: Online Resume Link

If you prefer linking to an online resume (Google Drive, Dropbox, etc.):

**Edit `Navbar.tsx`:**
```typescript
const handleResumeDownload = () => {
  window.open('https://your-online-resume-url.com', '_blank')
}
```

Then you don't need the PDF file locally!
