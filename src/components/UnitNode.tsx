import { Link } from 'react-router-dom'
import type { Unit, UnitProgress } from '../types'

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  )
}

export default function UnitNode({
  unit,
  index,
  progress,
}: {
  unit: Unit
  index: number
  progress: UnitProgress
}) {
  const isComplete = progress.levelsPassed >= unit.levels
  const nextLevel = progress.unlocked ? Math.min(progress.levelsPassed + 1, unit.levels) : 1
  const align = index % 2 === 0 ? 'self-start ml-4 sm:ml-12' : 'self-end mr-4 sm:mr-12'

  const circleClasses = !progress.unlocked
    ? 'bg-forest-200 text-forest-400 border-forest-300'
    : isComplete
      ? 'bg-gold-400 text-forest-900 border-gold-600'
      : 'bg-forest-500 text-white border-forest-700'

  const content = (
    <div className="flex flex-col items-center gap-1.5 w-24">
      <div
        className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg ${circleClasses} ${progress.unlocked ? 'hover:scale-105 active:scale-95 transition-transform' : ''}`}
      >
        {!progress.unlocked ? (
          <LockIcon />
        ) : (
          <span className="text-2xl font-extrabold">{index + 1}</span>
        )}
      </div>
      <div className="text-center text-sm font-semibold text-forest-800">{unit.title}</div>
      <div className="flex gap-1">
        {Array.from({ length: unit.levels }).map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i < progress.levelsPassed ? 'bg-gold-500' : 'bg-forest-200'}`}
          />
        ))}
      </div>
    </div>
  )

  if (!progress.unlocked) {
    return <div className={`inline-block opacity-70 cursor-not-allowed ${align}`}>{content}</div>
  }

  return (
    <Link to={`/unit/${unit.id}/level/${nextLevel}`} className={`inline-block ${align}`}>
      {content}
    </Link>
  )
}
