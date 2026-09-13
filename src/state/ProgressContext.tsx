import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import type { ProgressState } from '../types'
import { loadProgress, saveProgress, todayKey, dateKeyOffset, wordKey } from '../lib/storage'
import { units, getUnitIndex } from '../data/units'

export const XP_PER_CORRECT = 10
export const LESSON_COMPLETE_BONUS = 20

type Action =
  | { type: 'ANSWER_WORD'; unit: string; word: string; correct: boolean }
  | { type: 'COMPLETE_LESSON'; unitId: string; level: number; passed: boolean; correctCount: number }
  | { type: 'SET_DAILY_GOAL'; goal: number }
  | { type: 'RESET' }

function checkAndAwardBadges(state: ProgressState): string[] {
  const badges = new Set(state.badges)
  if (state.xpTotal >= 1) badges.add('first-lesson')
  if (state.xpTotal >= 50) badges.add('xp-50')
  if (state.xpTotal >= 200) badges.add('xp-200')
  if (state.xpTotal >= 500) badges.add('xp-500')
  if (state.streak >= 3) badges.add('streak-3')
  if (state.streak >= 7) badges.add('streak-7')
  if (state.streak >= 30) badges.add('streak-30')
  for (const u of units) {
    const p = state.units[u.id]
    if (p && p.levelsPassed >= u.levels) badges.add(`completed-${u.id}`)
  }
  return Array.from(badges)
}

function reducer(state: ProgressState, action: Action): ProgressState {
  switch (action.type) {
    case 'ANSWER_WORD': {
      const key = wordKey(action.unit, action.word)
      const prev = state.wordStats[key] ?? { correct: 0, incorrect: 0, lastSeen: null }
      const next = {
        ...prev,
        correct: prev.correct + (action.correct ? 1 : 0),
        incorrect: prev.incorrect + (action.correct ? 0 : 1),
        lastSeen: Date.now(),
      }
      return { ...state, wordStats: { ...state.wordStats, [key]: next } }
    }
    case 'COMPLETE_LESSON': {
      const today = todayKey()
      const yesterday = dateKeyOffset(-1)
      let streak = state.streak
      if (state.lastPracticedDate === today) {
        // already practiced today, streak unchanged
      } else if (state.lastPracticedDate === yesterday) {
        streak = state.streak + 1
      } else {
        streak = 1
      }

      const xpEarned = action.correctCount * XP_PER_CORRECT + (action.passed ? LESSON_COMPLETE_BONUS : 0)
      const dailyXp = { ...state.dailyXp, [today]: (state.dailyXp[today] ?? 0) + xpEarned }

      const unitsCopy = { ...state.units }
      if (action.passed) {
        const cur = unitsCopy[action.unitId] ?? { unlocked: true, levelsPassed: 0 }
        const levelsPassed = Math.max(cur.levelsPassed, action.level)
        unitsCopy[action.unitId] = { ...cur, levelsPassed }

        const unit = units.find((u) => u.id === action.unitId)
        if (unit && levelsPassed >= unit.levels) {
          const idx = getUnitIndex(action.unitId)
          const next = units[idx + 1]
          if (next) {
            unitsCopy[next.id] = { ...(unitsCopy[next.id] ?? { levelsPassed: 0 }), unlocked: true }
          }
        }
      }

      const nextState: ProgressState = {
        ...state,
        xpTotal: state.xpTotal + xpEarned,
        dailyXp,
        streak,
        lastPracticedDate: today,
        units: unitsCopy,
      }
      return { ...nextState, badges: checkAndAwardBadges(nextState) }
    }
    case 'SET_DAILY_GOAL':
      return { ...state, dailyGoal: action.goal }
    case 'RESET':
      return loadProgress()
    default:
      return state
  }
}

interface ProgressContextValue {
  state: ProgressState
  answerWord: (unit: string, word: string, correct: boolean) => void
  completeLesson: (unitId: string, level: number, passed: boolean, correctCount: number) => void
  setDailyGoal: (goal: number) => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadProgress)

  useEffect(() => {
    saveProgress(state)
  }, [state])

  const value: ProgressContextValue = {
    state,
    answerWord: (unit, word, correct) => dispatch({ type: 'ANSWER_WORD', unit, word, correct }),
    completeLesson: (unitId, level, passed, correctCount) =>
      dispatch({ type: 'COMPLETE_LESSON', unitId, level, passed, correctCount }),
    setDailyGoal: (goal) => dispatch({ type: 'SET_DAILY_GOAL', goal }),
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
