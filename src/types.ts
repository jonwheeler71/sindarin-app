export interface Word {
  word: string
  meaning: string
  unit: string
  pronunciation: string
  example_sentence: string | null
}

export interface Unit {
  id: string
  title: string
  description: string
  levels: 2 | 3
  words: Word[]
}

export type QuestionType = 'multiple-choice' | 'word-match' | 'fill-blank' | 'translate'

export interface MultipleChoiceQuestion {
  type: 'multiple-choice'
  prompt: string
  direction: 'sindarin-to-english' | 'english-to-sindarin'
  word: Word
  options: string[]
  answer: string
}

export interface WordMatchQuestion {
  type: 'word-match'
  pairs: { word: Word; id: string }[]
}

export interface FillBlankQuestion {
  type: 'fill-blank'
  sentence: string
  blankIndex: number
  word: Word
  options: string[]
  answer: string
}

export interface TranslateQuestion {
  type: 'translate'
  direction: 'sindarin-to-english' | 'english-to-sindarin'
  source: string
  word: Word
  answer: string
}

export type Question =
  | MultipleChoiceQuestion
  | WordMatchQuestion
  | FillBlankQuestion
  | TranslateQuestion

export interface WordStat {
  correct: number
  incorrect: number
  lastSeen: number | null
}

export interface UnitProgress {
  unlocked: boolean
  levelsPassed: number
}

export interface ProgressState {
  xpTotal: number
  dailyGoal: number
  dailyXp: Record<string, number>
  streak: number
  lastPracticedDate: string | null
  units: Record<string, UnitProgress>
  wordStats: Record<string, WordStat>
  badges: string[]
}
