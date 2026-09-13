import type {
  Unit,
  Word,
  WordStat,
  Question,
  MultipleChoiceQuestion,
  WordMatchQuestion,
  FillBlankQuestion,
  TranslateQuestion,
} from '../types'
import { units, getUnitIndex } from '../data/units'
import { wordKey } from './storage'

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function pickDistractors(correct: string, candidates: string[], count: number): string[] {
  const pool = shuffle(candidates.filter((c) => c !== correct))
  const unique = Array.from(new Set(pool))
  return unique.slice(0, count)
}

function fallbackPool(field: 'word' | 'meaning', excludeUnit: string): string[] {
  return units
    .filter((u) => u.id !== excludeUnit)
    .flatMap((u) => u.words)
    .map((w) => w[field])
}

function makeMultipleChoice(word: Word, unit: Unit): MultipleChoiceQuestion {
  const direction = Math.random() < 0.5 ? 'sindarin-to-english' : 'english-to-sindarin'
  const field = direction === 'sindarin-to-english' ? 'meaning' : 'word'
  const correct = word[field]
  const sameUnit = unit.words.map((w) => w[field])
  let distractors = pickDistractors(correct, sameUnit, 3)
  if (distractors.length < 3) {
    distractors = distractors.concat(
      pickDistractors(correct, fallbackPool(field, unit.id), 3 - distractors.length),
    )
  }
  const options = shuffle([correct, ...distractors])
  const prompt =
    direction === 'sindarin-to-english'
      ? `What does "${word.word}" mean?`
      : `How do you say "${word.meaning}" in Sindarin?`
  return { type: 'multiple-choice', prompt, direction, word, options, answer: correct }
}

function makeWordMatch(words: Word[]): WordMatchQuestion {
  const pairs = words.slice(0, Math.min(4, words.length)).map((word, i) => ({ word, id: `${word.unit}-${i}` }))
  return { type: 'word-match', pairs }
}

function makeFillBlank(word: Word, unit: Unit): FillBlankQuestion {
  if (word.word.includes(' ')) {
    const tokens = word.word.split(' ')
    const candidateIdx = tokens.map((_, i) => i).filter((i) => tokens[i].replace(/,/g, '').length > 1)
    const blankIndex = candidateIdx[Math.floor(Math.random() * candidateIdx.length)]
    const answer = tokens[blankIndex]
    const sentence = tokens.map((t, i) => (i === blankIndex ? '___' : t)).join(' ')
    const otherTokens = unit.words.flatMap((w) => w.word.split(' '))
    let distractors = pickDistractors(answer, otherTokens, 3)
    if (distractors.length < 3) {
      distractors = distractors.concat(
        pickDistractors(answer, fallbackPool('word', unit.id), 3 - distractors.length),
      )
    }
    const options = shuffle([answer, ...distractors])
    return { type: 'fill-blank', sentence, blankIndex, word, options, answer }
  }
  const answer = word.word
  const sentence = `___  —  "${word.meaning}"`
  let distractors = pickDistractors(answer, unit.words.map((w) => w.word), 3)
  if (distractors.length < 3) {
    distractors = distractors.concat(pickDistractors(answer, fallbackPool('word', unit.id), 3 - distractors.length))
  }
  const options = shuffle([answer, ...distractors])
  return { type: 'fill-blank', sentence, blankIndex: 0, word, options, answer }
}

function makeTranslate(word: Word): TranslateQuestion {
  const direction = Math.random() < 0.5 ? 'sindarin-to-english' : 'english-to-sindarin'
  const source = direction === 'sindarin-to-english' ? word.word : word.meaning
  const answer = direction === 'sindarin-to-english' ? word.meaning : word.word
  return { type: 'translate', direction, source, word, answer }
}

const LEVEL_TYPE_SEQUENCES: Record<number, ('multiple-choice' | 'word-match' | 'fill-blank' | 'translate')[]> = {
  1: ['multiple-choice', 'multiple-choice', 'word-match', 'multiple-choice', 'fill-blank', 'multiple-choice', 'fill-blank', 'multiple-choice'],
  2: ['multiple-choice', 'translate', 'fill-blank', 'word-match', 'translate', 'multiple-choice', 'fill-blank', 'translate', 'multiple-choice'],
  3: ['translate', 'multiple-choice', 'fill-blank', 'translate', 'word-match', 'translate', 'multiple-choice', 'fill-blank', 'translate', 'multiple-choice'],
}

interface ReviewCandidate {
  unit: Unit
  word: Word
  score: number
}

function collectReviewCandidates(currentUnitId: string, wordStats: Record<string, WordStat>): ReviewCandidate[] {
  const currentIdx = getUnitIndex(currentUnitId)
  const candidates: ReviewCandidate[] = []
  units.slice(0, currentIdx).forEach((u) => {
    u.words.forEach((w) => {
      const stat = wordStats[wordKey(u.id, w.word)]
      if (!stat) return
      const score = stat.incorrect * 3 - stat.correct
      if (stat.incorrect > 0) candidates.push({ unit: u, word: w, score })
    })
  })
  return candidates.sort((a, b) => b.score - a.score)
}

export function generateLesson(
  unit: Unit,
  level: number,
  wordStats: Record<string, WordStat>,
): Question[] {
  const sequence = LEVEL_TYPE_SEQUENCES[level] ?? LEVEL_TYPE_SEQUENCES[2]
  const pool = shuffle(unit.words)
  const questions: Question[] = []

  sequence.forEach((type, i) => {
    if (type === 'word-match') {
      const start = i % pool.length
      const slice = [...pool.slice(start), ...pool.slice(0, start)]
      questions.push(makeWordMatch(slice))
      return
    }
    const word = pool[i % pool.length]
    if (type === 'multiple-choice') questions.push(makeMultipleChoice(word, unit))
    else if (type === 'fill-blank') questions.push(makeFillBlank(word, unit))
    else questions.push(makeTranslate(word))
  })

  const reviewCandidates = collectReviewCandidates(unit.id, wordStats).slice(0, 2)
  reviewCandidates.forEach((c) => {
    questions.push(makeTranslate(c.word))
  })

  return questions.slice(0, 10)
}
