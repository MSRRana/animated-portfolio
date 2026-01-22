import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string
  height?: string
}

export function Skeleton({ className = '', variant = 'rectangular', width, height }: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-800 animate-pulse'

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  const style = {
    width: width || '100%',
    height: height || '100%',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden p-6">
      {/* Image placeholder */}
      <Skeleton className="w-full h-48 mb-4" />

      {/* Title */}
      <Skeleton className="w-3/4 h-8 mb-3" variant="text" />

      {/* Description lines */}
      <Skeleton className="w-full h-4 mb-2" variant="text" />
      <Skeleton className="w-5/6 h-4 mb-4" variant="text" />

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-4">
        <Skeleton className="w-16 h-6" variant="text" />
        <Skeleton className="w-20 h-6" variant="text" />
        <Skeleton className="w-14 h-6" variant="text" />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Skeleton className="w-24 h-10" variant="text" />
        <Skeleton className="w-24 h-10" variant="text" />
      </div>
    </div>
  )
}

export function SkillCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6">
      {/* Icon */}
      <Skeleton className="w-12 h-12 mb-4" variant="circular" />

      {/* Title */}
      <Skeleton className="w-32 h-6 mb-4" variant="text" />

      {/* Skills */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <Skeleton className="w-24 h-4" variant="text" />
              <Skeleton className="w-8 h-4" variant="text" />
            </div>
            <Skeleton className="w-full h-2" variant="text" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TestimonialSkeleton() {
  return (
    <div className="glass rounded-2xl p-12">
      {/* Stars */}
      <div className="flex gap-1 justify-center mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="w-5 h-5" variant="circular" />
        ))}
      </div>

      {/* Quote */}
      <div className="space-y-3 mb-8">
        <Skeleton className="w-full h-6 mx-auto" variant="text" />
        <Skeleton className="w-5/6 h-6 mx-auto" variant="text" />
        <Skeleton className="w-4/6 h-6 mx-auto" variant="text" />
      </div>

      {/* Author */}
      <div className="flex items-center justify-center gap-4">
        <Skeleton className="w-16 h-16" variant="circular" />
        <div>
          <Skeleton className="w-32 h-5 mb-2" variant="text" />
          <Skeleton className="w-40 h-4" variant="text" />
        </div>
      </div>
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="w-24 h-4 mb-2" variant="text" />
        <Skeleton className="w-full h-12" />
      </div>
      <div>
        <Skeleton className="w-24 h-4 mb-2" variant="text" />
        <Skeleton className="w-full h-12" />
      </div>
      <div>
        <Skeleton className="w-24 h-4 mb-2" variant="text" />
        <Skeleton className="w-full h-32" />
      </div>
      <Skeleton className="w-32 h-12" />
    </div>
  )
}
