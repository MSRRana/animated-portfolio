import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Clock, Zap, RefreshCw } from 'lucide-react'

interface CodeSnippet {
  language: string
  code: string
  title: string
}

const codeSnippets: CodeSnippet[] = [
  {
    language: 'JavaScript',
    title: 'Array Filter',
    code: 'const numbers = [1, 2, 3, 4, 5];\nconst evens = numbers.filter(n => n % 2 === 0);',
  },
  {
    language: 'JavaScript',
    title: 'Async Function',
    code: 'async function fetchData(url) {\n  const response = await fetch(url);\n  return response.json();\n}',
  },
  {
    language: 'TypeScript',
    title: 'Interface',
    code: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n}',
  },
  {
    language: 'React',
    title: 'Component',
    code: 'const Button = ({ onClick, children }) => (\n  <button onClick={onClick}>{children}</button>\n);',
  },
  {
    language: 'Python',
    title: 'List Comprehension',
    code: 'squares = [x**2 for x in range(10)]',
  },
  {
    language: 'Python',
    title: 'Function',
    code: 'def greet(name: str) -> str:\n    return f"Hello, {name}!"',
  },
]

export function TypingChallenge({ onClose }: { onClose: () => void }) {
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null)
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isComplete, setIsComplete] = useState(false)
  const [errors, setErrors] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const startChallenge = (snippet: CodeSnippet) => {
    setSelectedSnippet(snippet)
    setUserInput('')
    setStartTime(null)
    setEndTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
    setErrors(0)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const resetChallenge = () => {
    setSelectedSnippet(null)
    setUserInput('')
    setStartTime(null)
    setEndTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
    setErrors(0)
  }

  useEffect(() => {
    if (!selectedSnippet || isComplete) return

    const targetCode = selectedSnippet.code
    const currentLength = userInput.length

    // Start timer on first character
    if (currentLength === 1 && !startTime) {
      setStartTime(Date.now())
    }

    // Calculate accuracy
    let errorCount = 0
    for (let i = 0; i < currentLength; i++) {
      if (userInput[i] !== targetCode[i]) {
        errorCount++
      }
    }
    setErrors(errorCount)
    const acc = currentLength > 0 ? ((currentLength - errorCount) / currentLength) * 100 : 100
    setAccuracy(Math.max(0, acc))

    // Check if complete
    if (userInput === targetCode) {
      const end = Date.now()
      setEndTime(end)
      setIsComplete(true)

      if (startTime) {
        const timeInMinutes = (end - startTime) / 1000 / 60
        const words = targetCode.split(' ').length
        const calculatedWpm = Math.round(words / timeInMinutes)
        setWpm(calculatedWpm)

        // Save to localStorage
        saveScore(calculatedWpm, accuracy, selectedSnippet.language)
      }
    }
  }, [userInput, selectedSnippet, startTime, isComplete])

  const saveScore = (wpm: number, accuracy: number, language: string) => {
    const scores = JSON.parse(localStorage.getItem('typingScores') || '[]')
    scores.push({
      wpm,
      accuracy: Math.round(accuracy),
      language,
      date: new Date().toISOString(),
    })
    // Keep only last 10 scores
    if (scores.length > 10) scores.shift()
    localStorage.setItem('typingScores', JSON.stringify(scores))
  }

  const getBestScore = () => {
    const scores = JSON.parse(localStorage.getItem('typingScores') || '[]')
    if (scores.length === 0) return null
    return scores.reduce((best: any, current: any) =>
      current.wpm > best.wpm ? current : best
    )
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isComplete) return
    const value = e.target.value
    // Prevent deleting once character is typed
    if (value.length >= userInput.length) {
      setUserInput(value)
    }
  }

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return 'text-gray-500'
    if (userInput[index] === selectedSnippet?.code[index]) {
      return 'text-green-400'
    }
    return 'text-red-400 bg-red-400/20'
  }

  const bestScore = getBestScore()

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
        className="w-full max-w-4xl max-h-[90vh] my-auto bg-gray-900 border-2 border-neon-cyan rounded-lg shadow-2xl shadow-neon-cyan/20 overflow-hidden overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-black border-b border-neon-cyan/30">
          <div className="flex items-center gap-2 sm:gap-3">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-neon-cyan" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Code Typing Challenge</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
            aria-label="Close challenge"
          >
            <X className="w-5 h-5 text-red-400" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {!selectedSnippet ? (
            // Language Selection
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">Choose Your Challenge</h3>
                <p className="text-gray-400">Test your typing speed with real code snippets</p>
              </div>

              {bestScore && (
                <div className="glass rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Your Best Score</div>
                      <div className="text-xl font-bold text-white">{bestScore.wpm} WPM</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Accuracy</div>
                    <div className="text-xl font-bold text-green-400">{bestScore.accuracy}%</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {codeSnippets.map((snippet, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startChallenge(snippet)}
                    className="glass rounded-lg p-6 text-left hover:border-neon-cyan transition-colors"
                  >
                    <div className="text-sm text-neon-cyan mb-2">{snippet.language}</div>
                    <div className="text-white font-semibold mb-2">{snippet.title}</div>
                    <div className="text-xs text-gray-400 font-mono">
                      {snippet.code.length} characters
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            // Typing Challenge
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-neon-cyan" />
                  <div>
                    <div className="text-xs text-gray-400">Time</div>
                    <div className="text-lg font-bold text-white">
                      {startTime
                        ? Math.round(((endTime || Date.now()) - startTime) / 1000)
                        : 0}s
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-xs text-gray-400">WPM</div>
                    <div className="text-lg font-bold text-white">{wpm || '--'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-xs text-gray-400">Accuracy</div>
                    <div className="text-lg font-bold text-white">{Math.round(accuracy)}%</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-red-400">
                    <div className="text-xs text-gray-400">Errors</div>
                    <div className="text-lg font-bold">{errors}</div>
                  </div>
                </div>
              </div>

              {/* Code Display */}
              <div className="glass rounded-lg p-4 sm:p-6 relative">
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 text-xs text-neon-cyan px-2 sm:px-3 py-1 bg-neon-cyan/10 rounded-full">
                  {selectedSnippet.language}
                </div>
                <pre className="font-mono text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap mb-4">
                  {selectedSnippet.code.split('').map((char, index) => (
                    <span key={index} className={getCharacterClass(index)}>
                      {char}
                    </span>
                  ))}
                </pre>
              </div>

              {/* Input Area */}
              <div>
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInput}
                  disabled={isComplete}
                  className="w-full h-24 sm:h-32 bg-black border-2 border-neon-cyan/30 rounded-lg p-3 sm:p-4 font-mono text-sm sm:text-base lg:text-lg text-white resize-none focus:outline-none focus:border-neon-cyan transition-colors disabled:opacity-50"
                  placeholder="Start typing the code above..."
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </div>

              {/* Complete Message */}
              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-lg p-6 text-center"
                  >
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Challenge Complete!</h3>
                    <p className="text-gray-400 mb-4">
                      You typed at <span className="text-neon-cyan font-bold">{wpm} WPM</span> with{' '}
                      <span className="text-green-400 font-bold">{Math.round(accuracy)}%</span> accuracy
                    </p>
                    <div className="flex gap-3 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetChallenge}
                        className="px-6 py-3 bg-neon-cyan text-black font-semibold rounded-lg hover:bg-neon-blue transition-colors flex items-center gap-2"
                      >
                        <RefreshCw className="w-5 h-5" />
                        Try Another
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              {!isComplete && (
                <div className="flex gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetChallenge}
                    className="px-6 py-3 glass rounded-lg hover:border-neon-cyan transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Change Challenge
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
