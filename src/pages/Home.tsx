import { units } from '../data/units'
import { useProgress } from '../state/ProgressContext'
import UnitNode from '../components/UnitNode'
import Mascot from '../components/Mascot'

export default function Home() {
  const { state } = useProgress()

  return (
    <div className="max-w-lg mx-auto pb-16">
      <div className="flex items-center gap-4 px-5 pt-6 pb-4">
        <Mascot mood="happy" className="w-16 h-20 shrink-0" />
        <div>
          <h1 className="text-xl font-extrabold text-forest-900">Lassui</h1>
          <p className="text-sm text-forest-700">
            Galbor says: <em>Mae govannen!</em> Ready for today's lesson?
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 py-4">
        {units.map((unit, i) => (
          <UnitNode key={unit.id} unit={unit} index={i} progress={state.units[unit.id]} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 mt-6 text-forest-600">
        <Mascot mood="neutral" className="w-14 h-16" />
        <p className="text-sm">More paths through Middle-earth are coming soon.</p>
      </div>
    </div>
  )
}
