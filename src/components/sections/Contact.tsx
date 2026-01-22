import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field'
import { cn } from '@/lib/utils'

const socialLinks = [
  { icon: FaLinkedin, href: 'https://linkedin.com/in/manish-singh-rana-b8008b163', label: 'LinkedIn', color: 'hover:text-blue-500' },
  { icon: FaGithub, href: 'https://github.com/MSRRana', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
  { icon: Mail, href: 'mailto:manishsinghrana469@gmail.com', label: 'Email', color: 'hover:text-red-500' },
  { icon: Phone, href: 'tel:+917078470684', label: 'Phone', color: 'hover:text-green-500' },
]

interface FormData {
  name: string
  email: string
  message: string
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const accessKey = '0ec939dc-388c-4479-a139-c36a496db6c2'

      const formDataToSend = new FormData()
      formDataToSend.append('access_key', accessKey)
      formDataToSend.append('name', data.name.trim())
      formDataToSend.append('email', data.email.trim())
      formDataToSend.append('message', data.message.trim())

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        reset()
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-violet-50/50 to-gray-50 dark:from-black dark:via-neon-violet/5 dark:to-black" />

      <div ref={ref} className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Looking for a skilled React Native & Full Stack Developer? Let's build something extraordinary together
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink rounded-[28px] opacity-20 blur-lg" />

          <div className="glass p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 rounded-full"
                  style={{
                    background: i === 0 ? 'radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)' :
                               i === 1 ? 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' :
                                         'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 25}%`,
                  }}
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10" autoComplete="off">
              <FieldGroup>
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Field>
                    <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                    <Input
                      id="contact-name"
                      placeholder="Jordan Lee"
                      {...register('name', {
                        required: 'Please enter your name',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      disabled={isSubmitting}
                      autoComplete="off"
                      className={cn(
                        errors.name && "ring-1 ring-red-500/50"
                      )}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <FieldError>{errors.name.message}</FieldError>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Field>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Field>
                    <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="name@example.com"
                      {...register('email', {
                        required: 'Please enter your email',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email'
                        }
                      })}
                      disabled={isSubmitting}
                      autoComplete="off"
                      className={cn(
                        errors.email && "ring-1 ring-red-500/50"
                      )}
                    />
                    <FieldDescription>We'll send updates to this address.</FieldDescription>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <FieldError>{errors.email.message}</FieldError>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Field>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Field>
                    <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell me about your project..."
                      {...register('message', {
                        required: 'Please enter your message',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' }
                      })}
                      disabled={isSubmitting}
                      autoComplete="off"
                      className={cn(
                        "min-h-[140px]",
                        errors.message && "ring-1 ring-red-500/50"
                      )}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <FieldError>{errors.message.message}</FieldError>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Field>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Field orientation="horizontal" className="justify-end pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full sm:w-auto h-12 px-8 text-sm font-semibold gap-2 relative overflow-hidden group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </Field>
                </motion.div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-green-400 font-medium text-sm">Message sent successfully!</p>
                        <p className="text-green-400/70 text-xs">I'll get back to you soon.</p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                      <XCircle className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-red-400 font-medium text-sm">Failed to send message</p>
                        <p className="text-red-400/70 text-xs">Please try again or email me directly.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FieldGroup>
            </form>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">Or connect with me on</p>
          <div className="flex justify-center gap-3 sm:gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 5,
                }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-3 sm:p-4 glass rounded-full transition-all duration-300",
                  "hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]",
                  social.color
                )}
              >
                <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
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
