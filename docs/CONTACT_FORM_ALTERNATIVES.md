# Contact Form Implementation Options

Your portfolio now has a fully functional contact form! Here are the implementation options:

## Option 1: EmailJS (Currently Implemented) ⭐ RECOMMENDED

**Pros:**
- ✅ No backend required
- ✅ Free tier (200 emails/month)
- ✅ Easy setup (5 minutes)
- ✅ Reliable email delivery
- ✅ Already integrated in your code

**Setup:** See `EMAILJS_SETUP.md` for detailed instructions

---

## Option 2: Formspree (Alternative - No Code Changes Needed)

**Pros:**
- ✅ No backend required
- ✅ Simple HTML form
- ✅ Free tier (50 submissions/month)

**Setup:**
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up and create a new form
3. Get your form endpoint (e.g., `https://formspree.io/f/your-form-id`)
4. Update Contact.tsx:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const response = await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
    })

    if (response.ok) {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }
  } catch (error) {
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## Option 3: Web3Forms (Free Alternative)

**Pros:**
- ✅ Completely free
- ✅ No backend required
- ✅ Unlimited submissions
- ✅ No registration needed

**Setup:**
1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email to get an access key
3. Update Contact.tsx:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  const formData = new FormData()
  formData.append('access_key', 'YOUR_ACCESS_KEY_HERE')
  formData.append('name', formData.name)
  formData.append('email', formData.email)
  formData.append('message', formData.message)

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }
  } catch (error) {
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## Option 4: Custom Backend with Node.js + Nodemailer

**Pros:**
- ✅ Full control
- ✅ No third-party dependencies
- ✅ Custom email templates

**Cons:**
- ❌ Requires server/hosting
- ❌ More complex setup

**Quick Backend Setup:**

1. Create a simple Express server:

```javascript
// server.js
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // Use App Password for Gmail
  }
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: 'manishsinghrana469@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.listen(3000, () => console.log('Server running on port 3000'))
```

2. Deploy to:
   - Vercel (serverless functions)
   - Railway.app (free tier)
   - Render (free tier)
   - DigitalOcean ($5/month)

---

## Option 5: Vercel Serverless Function (Best for Vercel Deployment)

If you're deploying to Vercel, create an API route:

**File:** `api/contact.ts`

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'manishsinghrana469@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' })
  }
}
```

Add environment variables in Vercel dashboard:
- `EMAIL_USER`: your-email@gmail.com
- `EMAIL_PASS`: your-app-password

---

## Comparison Table

| Feature | EmailJS | Formspree | Web3Forms | Custom Backend |
|---------|---------|-----------|-----------|----------------|
| Setup Time | 5 min | 3 min | 2 min | 30+ min |
| Free Tier | 200/mo | 50/mo | Unlimited | Yes |
| Backend Needed | No | No | No | Yes |
| Reliability | High | High | High | Depends |
| Customization | Medium | Low | Low | High |
| Cost | Free/Paid | Free/Paid | Free | Hosting cost |

---

## Recommendation

✅ **For quick deployment:** Use EmailJS (already set up!)
✅ **For unlimited free:** Use Web3Forms
✅ **For full control:** Use Vercel Serverless Functions

Your current implementation uses **EmailJS** - just follow the setup guide in `EMAILJS_SETUP.md` to activate it!
