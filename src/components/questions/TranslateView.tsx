import { useState } from 'react'
import type { TranslateQuestion } from '../../types'

export default function TranslateView({
  question,
  disabled,
  onSubmit,
}: {
  question: TranslateQuestion
  disabled: boolean
  onSubmit: (value: string) => void
}) {
  const [value, setValue] = useState('')

  return (
    <div>
      <p className="text-sm uppercase tracking-wide text-forest-500 font-semibold mb-2">
        Translate {question.direction === 'sindarin-to-english' ? 'to English' : 'to Sindarin'}
      </p>
      <p className="text-xl font-semibold text-forest-900 mb-5">{question.source}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!disabled && value.trim()) onSubmit(value)
        }}
      >
        <input
          autoFocus
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your answer"
          className="w-full px-4 py-3 rounded-xl border-2 border-forest-200 focus:border-forest-500 outline-none text-forest-900 disabled:opacity-60"
        />
        {!disabled && (
          <button
            type="submit"
            disabled={!value.trim()}
            className="mt-3 w-full py-3 rounded-xl bg-forest-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-forest-700 transition-colors"
          >
            Check
          </button>
        )}
      </form>
      {disabled && (
        <p className="mt-3 text-sm text-forest-700">
          Correct answer: <span className="font-semibold">{question.answer}</span>
        </p>
      )}
    </div>
  )
}
