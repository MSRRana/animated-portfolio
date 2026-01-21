import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Github, Linkedin, Phone, Send, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/manish-singh-rana-b8008b163', label: 'LinkedIn', color: 'hover:text-blue-500' },
  { icon: Github, href: 'https://github.com/MSRRana', label: 'GitHub', color: 'hover:text-white' },
  { icon: Mail, href: 'mailto:manishsinghrana469@gmail.com', label: 'Email', color: 'hover:text-red-500' },
  { icon: Phone, href: 'tel:+917078470684', label: 'Phone', color: 'hover:text-green-500' },
]

// Validation schema with Zod
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
  // Honeypot field - should remain empty
  _gotcha: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [focused, setFocused] = useState<string | null>(null)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle')

    // Check honeypot - if filled, it's likely a bot
    if (data._gotcha) {
      console.log('Bot detected')
      return
    }

    try {
      // Web3Forms configuration - FREE unlimited emails!
      const accessKey = '0ec939dc-388c-4479-a139-c36a496db6c2'

      // Prepare form data
      const formDataToSend = new FormData()
      formDataToSend.append('access_key', accessKey)
      formDataToSend.append('name', data.name)
      formDataToSend.append('email', data.email)
      formDataToSend.append('message', data.message)
      formDataToSend.append('subject', `Portfolio Contact from ${data.name}`)
      // Enable auto-reply
      formDataToSend.append('from_name', 'Manish Singh Rana')
      formDataToSend.append('replyto', 'manishsinghrana469@gmail.com')

      // Send email using Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        reset()

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }
  }

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neon-violet/5 to-black" />

      <div ref={ref} className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Looking for a skilled React Native & Full Stack Developer? Let's build something extraordinary together
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-12"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            {/* Honeypot field - hidden from users */}
            <input
              {...register('_gotcha')}
              type="text"
              name="_gotcha"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Name Input */}
            <div className="relative">
              <motion.input
                {...register('name')}
                type="text"
                id="name"
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                disabled={isSubmitting}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border ${
                  errors.name ? 'border-red-500' : 'border-white/10'
                } rounded-xl focus:outline-none focus:border-neon-cyan transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                placeholder=" "
              />
              <motion.label
                htmlFor="name"
                className={`absolute left-3 sm:left-4 top-2.5 sm:top-3 text-sm sm:text-base pointer-events-none origin-left transition-all ${
                  errors.name ? 'text-red-500' : focused === 'name' ? 'text-neon-cyan' : 'text-gray-400'
                }`}
              >
                Your Name *
              </motion.label>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-red-400"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <motion.input
                {...register('email')}
                type="email"
                id="email"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                disabled={isSubmitting}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border ${
                  errors.email ? 'border-red-500' : 'border-white/10'
                } rounded-xl focus:outline-none focus:border-neon-cyan transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                placeholder=" "
              />
              <motion.label
                htmlFor="email"
                className={`absolute left-3 sm:left-4 top-2.5 sm:top-3 text-sm sm:text-base pointer-events-none origin-left transition-all ${
                  errors.email ? 'text-red-500' : focused === 'email' ? 'text-neon-cyan' : 'text-gray-400'
                }`}
              >
                Your Email *
              </motion.label>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-red-400"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Message Input */}
            <div className="relative">
              <motion.textarea
                {...register('message')}
                id="message"
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                rows={5}
                disabled={isSubmitting}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border ${
                  errors.message ? 'border-red-500' : 'border-white/10'
                } rounded-xl focus:outline-none focus:border-neon-cyan transition-all text-white resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
                placeholder=" "
              />
              <motion.label
                htmlFor="message"
                className={`absolute left-3 sm:left-4 top-2.5 sm:top-3 text-sm sm:text-base pointer-events-none origin-left transition-all ${
                  errors.message ? 'text-red-500' : focused === 'message' ? 'text-neon-cyan' : 'text-gray-400'
                }`}
              >
                Your Message *
              </motion.label>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-red-400"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.message.message}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className="w-full py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-neon-blue to-neon-violet rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-neon transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </motion.button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm sm:text-base">Message sent successfully! I'll get back to you soon.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
              >
                <XCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm sm:text-base">Failed to send message. Please try again or email me directly.</p>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">Or connect with me on</p>
          <div className="flex justify-center gap-3 sm:gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 sm:p-4 glass rounded-full ${social.color} transition-all hover:shadow-neon`}
              >
                <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-xs sm:text-sm text-gray-500 mt-12 sm:mt-16 px-4"
        >
          © 2026 Manish Singh Rana. Transforming ideas into reality, one commit at a time.
        </motion.p>
      </div>
    </section>
  )
}
