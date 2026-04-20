import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ArrowRight,
  User,
  Code2,
  FolderKanban,
  Gamepad2,
  FileText,
  Mail,
  Github,
  Linkedin,
  Command,
  CornerDownLeft,
  X,
} from 'lucide-react'

type Item = {
  id: string
  label: string
  hint?: string
  keywords: string
  group: 'Jump to' | 'Projects' | 'Elsewhere'
  icon: React.ComponentType<{ className?: string }>
  action: () => void
}

/* Build the item index once. Sections and projects are the primary payload;
   socials and external links sit under "Elsewhere". The `keywords` field
   widens fuzzy matches beyond what's shown in the label. */
function buildItems(close: () => void): Item[] {
  const go = (hash: string) => () => {
    close()
    // slight delay so the close animation plays before the scroll
    requestAnimationFrame(() => {
      const el = document.querySelector(hash)
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
  const open = (href: string) => () => {
    close()
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return [
    { id: 'hero',     group: 'Jump to', icon: User,         label: 'Hero',        hint: 'Top of page',       keywords: 'top home intro start',                   action: go('#hero') },
    { id: 'about',    group: 'Jump to', icon: User,         label: 'About',       hint: 'Background + timeline', keywords: 'bio timeline experience career',    action: go('#about') },
    { id: 'skills',   group: 'Jump to', icon: Code2,        label: 'Skills',      hint: 'Tech stack',        keywords: 'tech stack languages frameworks tools',  action: go('#skills') },
    { id: 'projects', group: 'Jump to', icon: FolderKanban, label: 'Projects',    hint: 'Case studies',      keywords: 'work portfolio case studies',            action: go('#projects') },
    { id: 'games',    group: 'Jump to', icon: Gamepad2,     label: 'Play',        hint: 'Terminal + typing', keywords: 'games arcade terminal typing',           action: go('#games') },
    { id: 'resume',   group: 'Jump to', icon: FileText,     label: 'Résumé',      hint: 'Long form',         keywords: 'cv resume pdf download',                 action: go('#resume') },
    { id: 'contact',  group: 'Jump to', icon: Mail,         label: 'Contact',     hint: 'Say hello',         keywords: 'email message reach hire',               action: go('#contact') },

    { id: 'p-workspace', group: 'Projects', icon: FolderKanban, label: 'Healiom Workspace', hint: 'Telehealth · React Native', keywords: 'zoom stream chat detox healthcare', action: go('#projects') },
    { id: 'p-carespace', group: 'Projects', icon: FolderKanban, label: 'Healiom CareSpace', hint: 'Care coordination',        keywords: 'websockets realtime react native', action: go('#projects') },
    { id: 'p-snapmeal',  group: 'Projects', icon: FolderKanban, label: 'SnapMeal',          hint: 'iOS + Android · nutrition', keywords: 'app store play store food nutrition', action: go('#projects') },
    { id: 'p-portfolio', group: 'Projects', icon: FolderKanban, label: 'This portfolio',    hint: 'React + Three.js',         keywords: 'three.js framer motion fraunces',   action: go('#projects') },

    { id: 'github',   group: 'Elsewhere', icon: Github,   label: 'GitHub',    hint: 'github.com/MSRRana',                keywords: 'code repos source open source', action: open('https://github.com/MSRRana') },
    { id: 'linkedin', group: 'Elsewhere', icon: Linkedin, label: 'LinkedIn',  hint: 'Professional',                      keywords: 'network profile cv',             action: open('https://www.linkedin.com/in/msrrana/') },
    { id: 'email',    group: 'Elsewhere', icon: Mail,     label: 'Email',     hint: 'Direct message',                    keywords: 'write reach out hire contact',   action: open('mailto:manish.rana@healiom.com') },
  ]
}

function matches(item: Item, q: string): boolean {
  if (!q) return true
  const needle = q.toLowerCase().trim()
  if (!needle) return true
  const hay = `${item.label} ${item.hint ?? ''} ${item.keywords}`.toLowerCase()
  // every space-separated token must appear somewhere
  return needle.split(/\s+/).every(tok => hay.includes(tok))
}

export const CommandPalette = memo(function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActive(0)
  }, [])

  const items = useMemo(() => buildItems(close), [close])
  const filtered = useMemo(() => items.filter(i => matches(i, query)), [items, query])

  // Global hotkeys — ⌘K / Ctrl+K open; / opens when nothing is focused; Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
        return
      }
      if (!open && e.key === '/' && document.activeElement === document.body) {
        e.preventDefault()
        setOpen(true)
      }
      if (open && e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  // Focus input whenever opened
  useEffect(() => {
    if (open) {
      // next tick so the animation has mounted the input
      const id = window.setTimeout(() => inputRef.current?.focus(), 10)
      return () => window.clearTimeout(id)
    }
  }, [open])

  // Clamp active as results shrink
  useEffect(() => {
    if (active >= filtered.length) setActive(Math.max(0, filtered.length - 1))
  }, [filtered.length, active])

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(filtered.length - 1, a + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      filtered[active]?.action()
    }
  }

  // Scroll active row into view
  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current.querySelector<HTMLElement>(`[data-idx="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  // Group filtered items preserving the original order
  const grouped = useMemo(() => {
    const groups: Record<string, { item: Item; globalIdx: number }[]> = {}
    filtered.forEach((item, idx) => {
      ;(groups[item.group] ||= []).push({ item, globalIdx: idx })
    })
    return groups
  }, [filtered])

  return (
    <>
      {/* Floating hint button — small, always visible, cursor-none site still shows it via pointer-events */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-6 right-6 z-40 hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70 dark:text-parchment/70 bg-parchment/70 dark:bg-ink/60 ring-1 ring-ink/15 dark:ring-parchment/15 rounded-full backdrop-blur-md transition hover:text-ink dark:hover:text-parchment hover:ring-ink/30 dark:hover:ring-parchment/30"
      >
        <Command className="w-3.5 h-3.5" aria-hidden="true" />
        <span>K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="cmdk-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
          >
            <div className="absolute inset-0 bg-ink/50 dark:bg-ink/70 backdrop-blur-md" />

            <motion.div
              role="document"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,   scale: 1 }}
              exit={{    opacity: 0, y: -8,  scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full max-w-xl rounded-2xl overflow-hidden ring-1 ring-ink/15 dark:ring-parchment/15 bg-parchment/95 dark:bg-ink/90 shadow-2xl backdrop-blur-xl"
            >
              {/* Input row */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-ink/10 dark:border-parchment/10">
                <Search className="w-4 h-4 text-ash-400 dark:text-ash-300" aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActive(0) }}
                  onKeyDown={onInputKey}
                  placeholder="Search sections, projects, links…"
                  className="flex-1 bg-transparent outline-none text-[15px] font-medium text-ink dark:text-parchment placeholder:text-ash-400 dark:placeholder:text-ash-300"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="p-1 rounded-md text-ash-400 hover:text-ink dark:hover:text-parchment transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <div className="px-5 py-10 text-center text-sm text-ash-400 dark:text-ash-300">
                    Nothing matches <span className="italic text-ink/80 dark:text-parchment/80">&ldquo;{query}&rdquo;</span>.
                  </div>
                )}

                {Object.entries(grouped).map(([group, rows]) => (
                  <div key={group} className="mb-1">
                    <div className="px-5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ash-400 dark:text-ash-300">
                      {group}
                    </div>
                    <ul>
                      {rows.map(({ item, globalIdx }) => {
                        const Icon = item.icon
                        const isActive = globalIdx === active
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              data-idx={globalIdx}
                              onMouseEnter={() => setActive(globalIdx)}
                              onClick={() => item.action()}
                              className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                                isActive
                                  ? 'bg-ink/[0.06] dark:bg-parchment/[0.06]'
                                  : 'hover:bg-ink/[0.04] dark:hover:bg-parchment/[0.04]'
                              }`}
                            >
                              <Icon className="w-4 h-4 text-ash-500 dark:text-ash-200 shrink-0" aria-hidden="true" />
                              <span className="flex-1 text-[14px] text-ink dark:text-parchment">
                                {item.label}
                                {item.hint && (
                                  <span className="ml-2 text-ash-400 dark:text-ash-300 text-[13px]">{item.hint}</span>
                                )}
                              </span>
                              {isActive && (
                                <ArrowRight className="w-4 h-4 text-ash-400 dark:text-ash-300" aria-hidden="true" />
                              )}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-4 px-4 py-2 border-t border-ink/10 dark:border-parchment/10 text-[11px] text-ash-400 dark:text-ash-300">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><span className="px-1.5 py-0.5 rounded bg-ink/5 dark:bg-parchment/10 ring-1 ring-ink/10 dark:ring-parchment/10">↑↓</span> navigate</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-ink/5 dark:bg-parchment/10 ring-1 ring-ink/10 dark:ring-parchment/10">
                      <CornerDownLeft className="w-3 h-3" />
                    </span>
                    open
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-ink/5 dark:bg-parchment/10 ring-1 ring-ink/10 dark:ring-parchment/10">esc</span>
                  <span>to close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})
