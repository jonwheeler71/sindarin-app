import { useProgress } from '../state/ProgressContext'
import { allBadgeDefs } from '../data/badges'
import { units } from '../data/units'
import Mascot from '../components/Mascot'

export default function Profile() {
  const { state, setDailyGoal } = useProgress()
  const earned = new Set(state.badges)
  const totalWords = units.reduce((sum, u) => sum + u.words.length, 0)
  const wordsSeen = Object.keys(state.wordStats).length

  return (
    <div className="max-w-lg mx-auto px-5 pt-6 pb-16">
      <div className="flex items-center gap-4 mb-6">
        <Mascot mood="happy" className="w-16 h-20" />
        <div>
          <h1 className="text-xl font-extrabold text-forest-900">Your Journey</h1>
          <p className="text-sm text-forest-700">Keep tending the grove, one word at a time.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Streak" value={state.streak} suffix="days" />
        <StatCard label="Total XP" value={state.xpTotal} />
        <StatCard label="Words seen" value={`${wordsSeen}/${totalWords}`} />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-forest-800 mb-2">Daily goal (XP)</label>
        <div className="flex gap-2">
          {[10, 20, 30, 50].map((g) => (
            <button
              key={g}
              onClick={() => setDailyGoal(g)}
              className={`px-4 py-2 rounded-lg font-semibold border-2 transition-colors ${
                state.dailyGoal === g
                  ? 'bg-forest-600 text-white border-forest-600'
                  : 'border-forest-200 text-forest-700 hover:border-forest-400'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-lg font-bold text-forest-900 mb-3">Badges</h2>
      <div className="grid grid-cols-2 gap-3">
        {allBadgeDefs.map((b) => {
          const has = earned.has(b.id)
          return (
            <div
              key={b.id}
              className={`p-3 rounded-xl border-2 ${
                has ? 'bg-gold-50 border-gold-400' : 'bg-forest-50 border-forest-100 opacity-50'
              }`}
            >
              <div className="text-2xl mb-1">{has ? '🏅' : '🔒'}</div>
              <div className="font-semibold text-sm text-forest-900">{b.label}</div>
              <div className="text-xs text-forest-600">{b.description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({ label, value, suffix }: { label: string; value: string | number; suffix?: string }) {
  return (
    <div className="rounded-xl border-2 border-forest-100 bg-white p-3 text-center">
      <div className="text-xl font-extrabold text-forest-900">{value}</div>
      <div className="text-xs text-forest-600">
        {label}
        {suffix ? ` (${suffix})` : ''}
      </div>
    </div>
  )
}
