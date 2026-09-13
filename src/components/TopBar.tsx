import { useProgress } from '../state/ProgressContext'
import { todayKey } from '../lib/storage'

function LeafIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 3c6 2 9 6.5 9 11.5C21 19 17 21 12 21S3 19 3 14.5C3 9.5 6 5 12 3z"
        fill="currentColor"
      />
      <path d="M12 21V9" stroke="#22391e" strokeOpacity="0.4" strokeWidth="1.2" />
    </svg>
  )
}

export default function TopBar() {
  const { state } = useProgress()
  const todayXp = state.dailyXp[todayKey()] ?? 0
  const goalPct = Math.min(100, Math.round((todayXp / state.dailyGoal) * 100))

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-forest-800/90 text-forest-50 shadow-md sticky top-0 z-10">
      <div className="flex items-center gap-1.5">
        <LeafIcon className={`w-6 h-6 ${state.streak > 0 ? 'text-gold-400' : 'text-forest-400'}`} />
        <span className="font-bold text-lg tabular-nums">{state.streak}</span>
      </div>

      <div className="flex-1 max-w-40">
        <div className="flex justify-between text-xs mb-0.5 text-forest-200">
          <span>Daily goal</span>
          <span className="tabular-nums">
            {todayXp}/{state.dailyGoal} XP
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-forest-700 overflow-hidden">
          <div
            className="h-full bg-gold-400 rounded-full transition-all"
            style={{ width: `${goalPct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-gold-400 font-bold text-lg">✦</span>
        <span className="font-bold text-lg tabular-nums">{state.xpTotal}</span>
      </div>
    </div>
  )
}
