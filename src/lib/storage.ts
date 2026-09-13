import type { ProgressState } from '../types'
import { units } from '../data/units'

const STORAGE_KEY = 'sindarin-progress-v1'

export function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function dateKeyOffset(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function defaultProgress(): ProgressState {
  const unitsRecord: ProgressState['units'] = {}
  units.forEach((u, i) => {
    unitsRecord[u.id] = { unlocked: i === 0, levelsPassed: 0 }
  })
  return {
    xpTotal: 0,
    dailyGoal: 20,
    dailyXp: {},
    streak: 0,
    lastPracticedDate: null,
    units: unitsRecord,
    wordStats: {},
    badges: [],
  }
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    const base = defaultProgress()
    return {
      ...base,
      ...parsed,
      units: { ...base.units, ...(parsed.units ?? {}) },
      dailyXp: parsed.dailyXp ?? {},
      wordStats: parsed.wordStats ?? {},
      badges: parsed.badges ?? [],
    }
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage unavailable (private browsing, quota) — progress just won't persist
  }
}

export function wordKey(unit: string, word: string): string {
  return `${unit}:${word}`
}
