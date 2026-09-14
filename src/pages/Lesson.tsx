import { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getUnit } from '../data/units'
import { generateLesson } from '../lib/lessonGenerator'
import { useProgress } from '../state/ProgressContext'
import { wordKey } from '../lib/storage'
import type { Word } from '../types'
import Mascot from '../components/Mascot'
import HeartsBar from '../components/HeartsBar'
import WordIntroCard from '../components/WordIntroCard'
import MultipleChoiceView from '../components/questions/MultipleChoiceView'
import FillBlankView from '../components/questions/FillBlankView'
import TranslateView from '../components/questions/TranslateView'
import WordMatchView from '../components/questions/WordMatchView'

const MAX_HEARTS = 5

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[.,!?]/g, '')
}

export default function Lesson() {
  const { unitId = '', level = '1' } = useParams()
  const levelNum = Number(level)
  const unit = getUnit(unitId)
  const navigate = useNavigate()
  const { state, answerWord, completeLesson } = useProgress()

  const questions = useMemo(() => {
    if (!unit) return []
    return generateLesson(unit, levelNum, state.wordStats)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit?.id, levelNum])

  // Words never answered before get a quick flashcard intro before they're quizzed.
  const introWords = useMemo(() => {
    const seen = new Map<string, Word>()
    questions.forEach((q) => {
      if (q.type === 'word-match') q.pairs.forEach((p) => seen.set(wordKey(p.word.unit, p.word.word), p.word))
      else seen.set(wordKey(q.word.unit, q.word.word), q.word)
    })
    return Array.from(seen.values()).filter((w) => !state.wordStats[wordKey(w.unit, w.word)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions])

  const [screen, setScreen] = useState<'intro' | 'quiz'>(() => (introWords.length > 0 ? 'intro' : 'quiz'))
  const [introIndex, setIntroIndex] = useState(0)

  const [index, setIndex] = useState(0)
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [correctCount, setCorrectCount] = useState(0)
  const [phase, setPhase] = useState<'answering' | 'feedback'>('answering')
  const [lastCorrect, setLastCorrect] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)
  const [status, setStatus] = useState<'active' | 'passed' | 'failed'>('active')
  const [hintShown, setHintShown] = useState(false)

  if (!unit) {
    return (
      <div className="p-6 text-center">
        <p>Unknown unit.</p>
        <Link to="/" className="text-forest-600 underline">
          Back home
        </Link>
      </div>
    )
  }

  const question = questions[index]
  const progressPct = Math.round((index / questions.length) * 100)

  if (screen === 'intro') {
    return (
      <WordIntroCard
        word={introWords[introIndex]}
        index={introIndex}
        total={introWords.length}
        onNext={() => {
          if (introIndex + 1 < introWords.length) setIntroIndex(introIndex + 1)
          else setScreen('quiz')
        }}
      />
    )
  }

  function finishLesson(finalHearts: number, finalCorrect: number) {
    const passed = finalHearts > 0
    completeLesson(unitId, levelNum, passed, finalCorrect)
    setStatus(passed ? 'passed' : 'failed')
  }

  function advance(wasCorrect: boolean, finalHeartsOverride?: number) {
    const nextCorrect = correctCount + (wasCorrect ? 1 : 0)
    setCorrectCount(nextCorrect)
    const heartsNow = finalHeartsOverride ?? hearts
    if (heartsNow <= 0) {
      finishLesson(heartsNow, nextCorrect)
      return
    }
    if (index + 1 >= questions.length) {
      finishLesson(heartsNow, nextCorrect)
      return
    }
    setIndex(index + 1)
    setPhase('answering')
    setSelected(null)
    setHintShown(false)
  }

  function handleSingleAnswer(userValue: string, word: Word, correctValue: string) {
    const isCorrect = normalize(userValue) === normalize(correctValue)
    answerWord(word.unit, word.word, isCorrect)
    setSelected(userValue)
    setLastCorrect(isCorrect)
    setPhase('feedback')
    if (!isCorrect) setHearts((h) => Math.max(0, h - 1))
  }

  function handleWordMatchWrongAttempt() {
    setHearts((h) => {
      const next = Math.max(0, h - 1)
      if (next <= 0) {
        setTimeout(() => finishLesson(0, correctCount), 450)
      }
      return next
    })
  }

  function handleWordMatchComplete(results: { word: Word; correct: boolean }[]) {
    results.forEach((r) => answerWord(r.word.unit, r.word.word, r.correct))
    const anyWrong = results.some((r) => !r.correct)
    const gained = results.filter((r) => r.correct).length
    setCorrectCount((c) => c + gained)
    setLastCorrect(!anyWrong)
    setPhase('feedback')
  }

  function handleContinue() {
    advance(lastCorrect, hearts)
  }

  if (status === 'passed' || status === 'failed') {
    const passed = status === 'passed'
    return (
      <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
        <Mascot mood={passed ? 'excited' : 'sad'} className="w-32 h-40" />
        <h2 className="text-2xl font-extrabold text-forest-900">
          {passed ? 'Lesson complete!' : 'Out of hearts'}
        </h2>
        <p className="text-forest-700">
          {passed
            ? `Well done! You earned ${correctCount * 10 + 20} XP.`
            : `You earned ${correctCount * 10} XP for what you got right. Try again to pass the level.`}
        </p>
        <div className="flex gap-3">
          <Link
            to="/"
            className="px-5 py-3 rounded-xl bg-forest-600 text-white font-bold hover:bg-forest-700 transition-colors"
          >
            Back to path
          </Link>
          {!passed && (
            <button
              onClick={() => navigate(0)}
              className="px-5 py-3 rounded-xl border-2 border-forest-500 text-forest-700 font-bold hover:bg-forest-50 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-5 pt-4 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-forest-500 text-2xl leading-none" aria-label="Exit lesson">
          &times;
        </Link>
        <div className="flex-1 h-3 rounded-full bg-forest-100 overflow-hidden">
          <div className="h-full bg-forest-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <HeartsBar hearts={hearts} />
      </div>

      {question.type !== 'word-match' && (
        <div className="mb-4">
          {!hintShown ? (
            <button
              onClick={() => setHintShown(true)}
              className="text-sm font-semibold text-forest-500 hover:text-forest-700 flex items-center gap-1"
            >
              💡 Show translation
            </button>
          ) : (
            <p className="text-sm text-forest-600">
              <span className="font-semibold">{question.word.word}</span> ({question.word.pronunciation}) means{' '}
              <span className="font-semibold">"{question.word.meaning}"</span>
            </p>
          )}
        </div>
      )}

      <div className="flex-1">
        {question.type === 'multiple-choice' && (
          <MultipleChoiceView
            question={question}
            disabled={phase === 'feedback'}
            selected={selected}
            onSelect={(val) => handleSingleAnswer(val, question.word, question.answer)}
          />
        )}
        {question.type === 'fill-blank' && (
          <FillBlankView
            question={question}
            disabled={phase === 'feedback'}
            selected={selected}
            onSelect={(val) => handleSingleAnswer(val, question.word, question.answer)}
          />
        )}
        {question.type === 'translate' && (
          <TranslateView
            question={question}
            disabled={phase === 'feedback'}
            onSubmit={(val) => handleSingleAnswer(val, question.word, question.answer)}
          />
        )}
        {question.type === 'word-match' && (
          <WordMatchView
            question={question}
            onWrongAttempt={handleWordMatchWrongAttempt}
            onComplete={handleWordMatchComplete}
          />
        )}
      </div>

      {phase === 'feedback' && (
        <div
          className={`fixed left-0 right-0 bottom-0 px-5 py-4 border-t-4 ${
            lastCorrect ? 'bg-forest-100 border-forest-500' : 'bg-red-50 border-red-400'
          }`}
        >
          <div className="max-w-md mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mascot mood={lastCorrect ? 'happy' : 'sad'} className="w-10 h-12" />
              <span className={`font-bold ${lastCorrect ? 'text-forest-700' : 'text-red-600'}`}>
                {lastCorrect ? 'Correct!' : 'Not quite'}
              </span>
            </div>
            <button
              onClick={handleContinue}
              className={`px-6 py-3 rounded-xl font-bold text-white ${
                lastCorrect ? 'bg-forest-600 hover:bg-forest-700' : 'bg-red-500 hover:bg-red-600'
              } transition-colors`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
