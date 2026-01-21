# How to Add Your Resume PDF

## Step 1: Add Your Resume PDF

1. **Prepare your resume PDF file**
   - Name it: `Manish_Singh_Rana_Resume.pdf` (or any name you prefer)

2. **Place it in this directory:**
   ```
   public/assets/Manish_Singh_Rana_Resume.pdf
   ```

3. **Or simply replace the placeholder:**
   - Copy your resume PDF to: `public/assets/resume.pdf`

## Step 2: Test Locally

Run your dev server:
```bash
npm run dev
```

Click the "Resume" button in the navbar to test the download.

## Step 3: Deploy

Once your resume is added, commit and push:
```bash
git add public/assets/
git commit -m "Add resume PDF"
git push origin main
```

GitHub Actions will automatically deploy with your resume included!

## File Location

Your resume should be at:
```
animated-portfolio/
└── public/
    └── assets/
        └── resume.pdf  ← Place your PDF here
```

## Note

The resume button is already configured to download the file from:
`/assets/resume.pdf`

Just replace the placeholder with your actual resume!
