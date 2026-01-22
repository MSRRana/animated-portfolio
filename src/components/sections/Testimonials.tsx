import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight, Linkedin } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'Healiom Inc',
    image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=00d4ff&color=fff&size=200',
    linkedin: 'https://linkedin.com',
    rating: 5,
    text: 'Manish is an exceptional developer who consistently delivers high-quality work. His expertise in React Native helped us launch our mobile app 2 months ahead of schedule. His attention to detail and problem-solving skills are outstanding.',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Senior Developer',
    company: 'Tech Solutions',
    image: 'https://ui-avatars.com/api/?name=David+Chen&background=a855f7&color=fff&size=200',
    linkedin: 'https://linkedin.com',
    rating: 5,
    text: 'Working with Manish has been a pleasure. He brings innovative solutions to complex problems and his code quality is exceptional. His implementation of the Zoom SDK integration was flawless and well-documented.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Engineering Lead',
    company: 'Digital Ventures',
    image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=06b6d4&color=fff&size=200',
    linkedin: 'https://linkedin.com',
    rating: 5,
    text: 'Manish demonstrated exceptional technical skills and leadership. He mentored junior developers while delivering features that increased user engagement by 40%. A true asset to any development team.',
  },
  {
    id: 4,
    name: 'Michael Park',
    role: 'CTO',
    company: 'HealthTech Inc',
    image: 'https://ui-avatars.com/api/?name=Michael+Park&background=ec4899&color=fff&size=200',
    linkedin: 'https://linkedin.com',
    rating: 5,
    text: 'Manish\'s full-stack capabilities and dedication to best practices made him invaluable during our product launch. His implementation of real-time features using WebSockets was robust and scalable.',
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      id="testimonials"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_50%)]" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            What colleagues and clients say about working with me
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 sm:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-20">
              <Quote className="w-16 h-16 text-neon-violet" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed">
                "{currentTestimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Avatar */}
                <motion.img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-neon-cyan"
                  whileHover={{ scale: 1.1 }}
                />

                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </p>
                </div>

                {/* LinkedIn Link */}
                <motion.a
                  href={currentTestimonial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 glass rounded-full"
                  aria-label={`View ${currentTestimonial.name}'s LinkedIn profile`}
                >
                  <Linkedin className="w-5 h-5 text-neon-blue" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 glass rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-neon-cyan" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-neon-cyan w-8'
                      : 'bg-gray-400 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 glass rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-neon-cyan" />
            </motion.button>
          </div>
        </motion.div>

        {/* Auto-rotate indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-sm text-gray-500 dark:text-gray-500 mt-8"
        >
          {currentIndex + 1} of {testimonials.length}
        </motion.p>
      </div>
    </section>
  )
}
