import { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Code, Zap, Trophy, Target, Gamepad2 } from 'lucide-react'
import { TerminalGame } from '../games/TerminalGame'
import { TypingChallenge } from '../games/TypingChallenge'

export function Games() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [showTypingChallenge, setShowTypingChallenge] = useState(false)

  const games = [
    {
      id: 'terminal',
      title: 'Terminal Explorer',
      description: 'Explore my portfolio through a real terminal interface. Use Unix commands to discover information about my skills, projects, and experience.',
      icon: Terminal,
      color: 'cyan',
      features: ['Real CLI Commands', 'Secret Files', 'Achievement System', 'Command History'],
      onClick: () => setShowTerminal(true),
    },
    {
      id: 'typing',
      title: 'Code Typing Challenge',
      description: 'Test your typing speed with real code snippets. Choose from multiple programming languages and compete against yourself.',
      icon: Code,
      color: 'violet',
      features: ['Multiple Languages', 'WPM Tracking', 'Accuracy Score', 'Personal Best'],
      onClick: () => setShowTypingChallenge(true),
    },
  ]

  const stats = [
    { icon: Target, label: 'Challenges', value: '2' },
    { icon: Trophy, label: 'Achievements', value: '5+' },
    { icon: Zap, label: 'Interactive', value: '100%' },
  ]

  return (
    <section id="games" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-black dark:via-gray-900 dark:to-black" />
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-violet rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-neon-cyan" />
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient">
              Interactive Games
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience my portfolio in a unique way. Play games, explore with terminal commands,
            and test your coding skills.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex items-center gap-3"
            >
              <div className="p-3 glass rounded-lg">
                <stat.icon className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 h-full flex flex-col hover:border-neon-cyan transition-all duration-300">
                {/* Icon */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${
                      game.color === 'cyan'
                        ? 'from-neon-cyan/20 to-neon-blue/20 border-2 border-neon-cyan/30'
                        : 'from-neon-violet/20 to-neon-pink/20 border-2 border-neon-violet/30'
                    }`}
                  >
                    <game.icon
                      className={`w-8 h-8 ${
                        game.color === 'cyan' ? 'text-neon-cyan' : 'text-neon-violet'
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{game.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{game.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {game.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          game.color === 'cyan' ? 'bg-neon-cyan' : 'bg-neon-violet'
                        }`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={game.onClick}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    game.color === 'cyan'
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-blue hover:shadow-lg hover:shadow-neon-cyan/50'
                      : 'bg-gradient-to-r from-neon-violet to-neon-pink hover:shadow-lg hover:shadow-neon-violet/50'
                  } text-black`}
                >
                  Play Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Easter Egg Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="text-neon-cyan">Pro tip:</span> Click my name in the Hero section 3 times for a secret! 🎮
            </p>
          </div>
        </motion.div>
      </div>

      {/* Game Modals */}
      {showTerminal && <TerminalGame onClose={() => setShowTerminal(false)} />}
      {showTypingChallenge && <TypingChallenge onClose={() => setShowTypingChallenge(false)} />}
    </section>
  )
}
