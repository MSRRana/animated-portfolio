import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Terminal as TerminalIcon } from 'lucide-react'

interface Command {
  input: string
  output: string[]
  timestamp: string
}

export function TerminalGame({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Command[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const commands: Record<string, string[]> = {
    help: [
      'Available commands:',
      '',
      '  whoami          - Display information about me',
      '  ls              - List available files',
      '  cat <file>      - Read file contents',
      '  skills          - Show my technical skills',
      '  projects        - List my projects',
      '  contact         - Get contact information',
      '  achievements    - View achievements and stats',
      '  clear           - Clear terminal',
      '  exit            - Close terminal',
      '',
    ],
    whoami: [
      'Manish Singh Rana',
      '',
      'Full Stack Developer | Software Engineer',
      'Location: [Your Location]',
      'Status: Available for freelance work',
      '',
      'Passionate about building modern web applications',
      'and creating exceptional user experiences.',
      '',
    ],
    ls: [
      'about.txt',
      'experience.json',
      'skills.md',
      'projects.yaml',
      'contact.vcf',
      'secret.txt',
      '',
    ],
    'cat about.txt': [
      'ABOUT ME',
      '========',
      '',
      'Hi! I\'m Manish, a Full Stack Developer who loves turning',
      'ideas into reality through clean, efficient code.',
      '',
      'I specialize in:',
      '- Modern web technologies (React, Node.js, TypeScript)',
      '- Building scalable applications',
      '- Creating pixel-perfect UIs',
      '- Problem-solving and optimization',
      '',
      'When I\'m not coding, you can find me exploring new',
      'technologies, contributing to open source, or enjoying',
      'a good cup of coffee.',
      '',
    ],
    'cat experience.json': [
      '{',
      '  "total_years": "3+",',
      '  "companies_worked": 5,',
      '  "projects_completed": 25,',
      '  "technologies": [',
      '    "React", "Node.js", "TypeScript",',
      '    "Next.js", "MongoDB", "PostgreSQL",',
      '    "AWS", "Docker", "Git"',
      '  ],',
      '  "currently_learning": ["Three.js", "WebGL", "Rust"]',
      '}',
      '',
    ],
    'cat skills.md': [
      '# Technical Skills',
      '',
      '## Frontend',
      '- React, Next.js, TypeScript',
      '- Tailwind CSS, Framer Motion',
      '- HTML5, CSS3, JavaScript ES6+',
      '',
      '## Backend',
      '- Node.js, Express.js',
      '- RESTful APIs, GraphQL',
      '- MongoDB, PostgreSQL',
      '',
      '## DevOps & Tools',
      '- Git, GitHub Actions',
      '- Docker, AWS',
      '- VS Code, Figma',
      '',
    ],
    'cat projects.yaml': [
      'projects:',
      '  - name: E-Commerce Platform',
      '    tech: [React, Node.js, MongoDB]',
      '    status: completed',
      '',
      '  - name: Social Media Dashboard',
      '    tech: [Next.js, TypeScript, PostgreSQL]',
      '    status: completed',
      '',
      '  - name: Real-time Chat App',
      '    tech: [React, Socket.io, Express]',
      '    status: completed',
      '',
      '  - name: Portfolio Website',
      '    tech: [React, Tailwind, Framer Motion]',
      '    status: active',
      '',
    ],
    'cat contact.vcf': [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Manish Singh Rana',
      'EMAIL:your.email@example.com',
      'URL:https://your-portfolio.com',
      'GITHUB:https://github.com/yourusername',
      'LINKEDIN:https://linkedin.com/in/yourusername',
      'END:VCARD',
      '',
    ],
    'cat secret.txt': [
      '🎉 Congratulations! You found the secret file!',
      '',
      '   ╔═══════════════════════════════╗',
      '   ║    ACHIEVEMENT UNLOCKED!      ║',
      '   ║     "Terminal Master"         ║',
      '   ╚═══════════════════════════════╝',
      '',
      'You have successfully demonstrated your',
      'curiosity and command-line skills!',
      '',
      'Pro tip: Try "achievements" to see more!',
      '',
    ],
    skills: [
      '⚡ SKILL MATRIX',
      '═══════════════',
      '',
      'React         ████████████████░░ 90%',
      'TypeScript    ███████████████░░░ 85%',
      'Node.js       ██████████████░░░░ 80%',
      'Next.js       ██████████████░░░░ 80%',
      'Tailwind CSS  ████████████████░░ 90%',
      'MongoDB       █████████████░░░░░ 75%',
      'Docker        ████████████░░░░░░ 70%',
      'AWS           ███████████░░░░░░░ 65%',
      '',
    ],
    projects: [
      '📂 FEATURED PROJECTS',
      '═══════════════════',
      '',
      '1. E-Commerce Platform',
      '   └─ Full-stack online store with payment integration',
      '   └─ Tech: React, Node.js, Stripe, MongoDB',
      '',
      '2. Social Media Dashboard',
      '   └─ Analytics platform for social media management',
      '   └─ Tech: Next.js, TypeScript, PostgreSQL',
      '',
      '3. Real-time Chat Application',
      '   └─ WebSocket-based chat with rooms and private messages',
      '   └─ Tech: React, Socket.io, Express',
      '',
      'Type "cat projects.yaml" for more details',
      '',
    ],
    contact: [
      '📧 GET IN TOUCH',
      '═══════════════',
      '',
      'Email:    your.email@example.com',
      'GitHub:   github.com/yourusername',
      'LinkedIn: linkedin.com/in/yourusername',
      'Website:  your-portfolio.com',
      '',
      'Available for:',
      '  ✓ Freelance projects',
      '  ✓ Full-time opportunities',
      '  ✓ Collaboration',
      '  ✓ Consulting',
      '',
    ],
    achievements: [
      '🏆 ACHIEVEMENTS',
      '═══════════════',
      '',
      '✓ Terminal Master   - Found the secret file',
      '✓ Code Warrior      - Completed 25+ projects',
      '✓ Stack Expert      - Mastered full-stack development',
      '✓ Team Player       - Collaborated on 10+ team projects',
      '✓ Open Source       - Contributed to 5+ repositories',
      '✓ Fast Learner      - Learned 3 new technologies this year',
      '',
      '📊 STATS',
      '───────',
      'Total Commands Executed: ' + commandHistory.length,
      'Files Explored: ' + commandHistory.filter(c => c.startsWith('cat')).length,
      'Sessions Completed: 1',
      '',
    ],
    clear: [],
  }

  useEffect(() => {
    // Welcome message
    setHistory([
      {
        input: '',
        output: [
          '╔═══════════════════════════════════════════╗',
          '║   Welcome to Manish\'s Terminal v1.0     ║',
          '║   Interactive Portfolio Experience       ║',
          '╚═══════════════════════════════════════════╝',
          '',
          'Type "help" to see available commands.',
          'Type "exit" to close terminal.',
          '',
        ],
        timestamp: new Date().toLocaleTimeString(),
      },
    ])

    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const cmd = input.trim().toLowerCase()
    const timestamp = new Date().toLocaleTimeString()

    // Add to command history
    setCommandHistory([...commandHistory, input])
    setHistoryIndex(-1)

    // Handle special commands
    if (cmd === 'exit') {
      onClose()
      return
    }

    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    // Execute command
    let output: string[]
    if (commands[cmd]) {
      output = commands[cmd]
    } else if (cmd.startsWith('cat ')) {
      const file = cmd.substring(4)
      if (commands[`cat ${file}`]) {
        output = commands[`cat ${file}`]
      } else {
        output = [`cat: ${file}: No such file or directory`, '']
      }
    } else {
      output = [
        `Command not found: ${cmd}`,
        'Type "help" for available commands.',
        '',
      ]
    }

    setHistory([...history, { input, output, timestamp }])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Arrow up/down for command history
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-4xl h-[85vh] sm:h-[600px] my-auto bg-black border-2 border-neon-cyan rounded-lg shadow-2xl shadow-neon-cyan/20 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-neon-cyan/30">
          <div className="flex items-center gap-3">
            <TerminalIcon className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm font-mono text-neon-cyan">terminal@manish:~</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-5 h-5 text-red-400" />
          </button>
        </div>

        {/* Terminal Output */}
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto p-3 sm:p-4 font-mono text-xs sm:text-sm text-green-400 bg-black/50"
        >
          {history.map((cmd, i) => (
            <div key={i} className="mb-4">
              {cmd.input && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-neon-cyan">➜</span>
                  <span className="text-white">{cmd.input}</span>
                  <span className="text-gray-500 text-xs ml-auto">{cmd.timestamp}</span>
                </div>
              )}
              <div className="ml-4 whitespace-pre-wrap">
                {cmd.output.map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className="border-t border-neon-cyan/30 bg-gray-900">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3">
            <span className="text-neon-cyan font-mono text-sm sm:text-base">➜</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white font-mono outline-none text-sm sm:text-base"
              placeholder="Type 'help' for commands..."
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
