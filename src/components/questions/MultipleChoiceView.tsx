import type { MultipleChoiceQuestion } from '../../types'

export default function MultipleChoiceView({
  question,
  disabled,
  selected,
  onSelect,
}: {
  question: MultipleChoiceQuestion
  disabled: boolean
  selected: string | null
  onSelect: (value: string) => void
}) {
  return (
    <div>
      <p className="text-lg font-semibold text-forest-900 mb-5">{question.prompt}</p>
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((opt) => {
          const isSelected = selected === opt
          const isCorrectOpt = opt === question.answer
          let stateClasses = 'border-forest-200 bg-white hover:border-forest-400'
          if (disabled && isSelected && isCorrectOpt) stateClasses = 'border-forest-500 bg-forest-100'
          else if (disabled && isSelected && !isCorrectOpt) stateClasses = 'border-red-400 bg-red-50'
          else if (disabled && isCorrectOpt) stateClasses = 'border-forest-500 bg-forest-100'
          else if (disabled) stateClasses = 'border-forest-100 bg-white opacity-60'

          return (
            <button
              key={opt}
              disabled={disabled}
              onClick={() => onSelect(opt)}
              className={`text-left px-4 py-3 rounded-xl border-2 font-medium text-forest-900 transition-colors ${stateClasses} disabled:cursor-default`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
