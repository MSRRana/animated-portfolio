# EmailJS Setup Guide for Contact Form

The contact form is now fully integrated with EmailJS. Follow these steps to set it up:

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## 2. Add an Email Service

1. Go to **Email Services** in the EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. **Copy the Service ID** (e.g., `service_abc123`)

## 3. Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Content:**
```
You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your Portfolio Contact Form
```

4. **Copy the Template ID** (e.g., `template_xyz789`)

## 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `AbCdEfGh1234567890`)
3. Copy this key

## 5. Update the Contact Component

Open `src/components/sections/Contact.tsx` and replace the placeholder values:

```typescript
// Replace these lines (around line 30-32):
const serviceId = 'service_your_service_id'      // Replace with your Service ID
const templateId = 'template_your_template_id'   // Replace with your Template ID
const publicKey = 'your_public_key'              // Replace with your Public Key
```

With your actual values:

```typescript
const serviceId = 'service_abc123'      // Your actual Service ID
const templateId = 'template_xyz789'    // Your actual Template ID
const publicKey = 'AbCdEfGh1234567890'  // Your actual Public Key
```

## 6. Test the Contact Form

1. Run your portfolio: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email inbox for the message

## Form Features

✅ **Email Integration**: Sends emails directly to your inbox via EmailJS
✅ **Form Validation**: All fields are required
✅ **Loading State**: Shows spinner while sending
✅ **Success Message**: Displays confirmation when email is sent
✅ **Error Handling**: Shows error message if sending fails
✅ **Auto-clear**: Form resets after successful submission
✅ **Disabled State**: Form is disabled while submitting
✅ **Responsive Design**: Works on all devices

## Alternative: Environment Variables (Recommended)

For better security, create a `.env` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGh1234567890
```

Then update the Contact component to use environment variables:

```typescript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
```

**Important:** Add `.env` to your `.gitignore` file to keep your keys private!

## Troubleshooting

### Email not sending?
- Check that all three IDs are correct
- Verify your EmailJS service is connected
- Check browser console for error messages
- Make sure you haven't exceeded the free tier limit (200 emails/month)

### Getting CORS errors?
- EmailJS handles CORS automatically
- Make sure you're using the correct public key
- Check that your EmailJS account is verified

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- Free tier includes 200 emails/month
- Paid plans available for higher volumes

---

Your contact form is now ready to receive messages! 🎉
