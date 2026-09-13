import { useMemo, useState } from 'react'
import type { WordMatchQuestion, Word } from '../../types'

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function WordMatchView({
  question,
  onWrongAttempt,
  onComplete,
}: {
  question: WordMatchQuestion
  onWrongAttempt: () => void
  onComplete: (results: { word: Word; correct: boolean }[]) => void
}) {
  const left = useMemo(() => shuffle(question.pairs), [question])
  const right = useMemo(() => shuffle(question.pairs), [question])

  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongPairs, setWrongPairs] = useState<Record<string, boolean>>({})
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [flash, setFlash] = useState<'left' | 'right' | null>(null)

  function tryMatch(leftId: string, rightId: string) {
    if (leftId === rightId) {
      const next = new Set(matched)
      next.add(leftId)
      setMatched(next)
      setSelectedLeft(null)
      setSelectedRight(null)
      if (next.size === question.pairs.length) {
        onComplete(question.pairs.map((p) => ({ word: p.word, correct: !wrongPairs[p.id] })))
      }
    } else {
      setWrongPairs((w) => ({ ...w, [leftId]: true, [rightId]: true }))
      onWrongAttempt()
      setFlash('left')
      setTimeout(() => {
        setSelectedLeft(null)
        setSelectedRight(null)
        setFlash(null)
      }, 400)
    }
  }

  function pickLeft(id: string) {
    if (matched.has(id) || flash) return
    setSelectedLeft(id)
    if (selectedRight) tryMatch(id, selectedRight)
  }

  function pickRight(id: string) {
    if (matched.has(id) || flash) return
    setSelectedRight(id)
    if (selectedLeft) tryMatch(selectedLeft, id)
  }

  return (
    <div>
      <p className="text-sm uppercase tracking-wide text-forest-500 font-semibold mb-4">
        Match the pairs
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          {left.map((p) => {
            const isMatched = matched.has(p.id)
            const isSelected = selectedLeft === p.id
            return (
              <button
                key={p.id}
                disabled={isMatched}
                onClick={() => pickLeft(p.id)}
                className={`px-3 py-3 rounded-xl border-2 font-medium text-left transition-colors ${
                  isMatched
                    ? 'border-forest-500 bg-forest-100 text-forest-400'
                    : isSelected
                      ? flash
                        ? 'border-red-400 bg-red-50'
                        : 'border-gold-500 bg-gold-50'
                      : 'border-forest-200 bg-white hover:border-forest-400'
                }`}
              >
                {p.word.word}
              </button>
            )
          })}
        </div>
        <div className="flex flex-col gap-2">
          {right.map((p) => {
            const isMatched = matched.has(p.id)
            const isSelected = selectedRight === p.id
            return (
              <button
                key={p.id}
                disabled={isMatched}
                onClick={() => pickRight(p.id)}
                className={`px-3 py-3 rounded-xl border-2 font-medium text-left transition-colors ${
                  isMatched
                    ? 'border-forest-500 bg-forest-100 text-forest-400'
                    : isSelected
                      ? flash
                        ? 'border-red-400 bg-red-50'
                        : 'border-gold-500 bg-gold-50'
                      : 'border-forest-200 bg-white hover:border-forest-400'
                }`}
              >
                {p.word.meaning}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
