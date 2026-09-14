import type { Word } from '../types'
import Mascot from './Mascot'

export default function WordIntroCard({
  word,
  index,
  total,
  onNext,
}: {
  word: Word
  index: number
  total: number
  onNext: () => void
}) {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-5 pt-4 pb-8">
      <p className="text-sm text-forest-500 font-semibold mb-6">
        New word {index + 1} of {total}
      </p>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <Mascot mood="happy" className="w-20 h-24" />
        <p className="text-3xl font-extrabold text-forest-900">{word.word}</p>
        <p className="text-forest-500 italic">{word.pronunciation}</p>
        <p className="text-xl text-forest-700">
          means <span className="font-semibold">"{word.meaning}"</span>
        </p>
        {word.example_sentence && (
          <p className="text-sm text-forest-600 max-w-xs">{word.example_sentence}</p>
        )}
      </div>
      <button
        onClick={onNext}
        className="w-full py-3 rounded-xl bg-forest-600 text-white font-bold hover:bg-forest-700 transition-colors"
      >
        {index + 1 < total ? 'Next word' : "Let's practice"}
      </button>
    </div>
  )
}
