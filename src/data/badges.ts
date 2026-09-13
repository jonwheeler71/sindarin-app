import { units } from './units'

export interface BadgeDef {
  id: string
  label: string
  description: string
}

export const staticBadges: BadgeDef[] = [
  { id: 'first-lesson', label: 'First Steps', description: 'Complete your first lesson' },
  { id: 'xp-50', label: 'Sapling', description: 'Earn 50 total XP' },
  { id: 'xp-200', label: 'Young Grove', description: 'Earn 200 total XP' },
  { id: 'xp-500', label: 'Elder Wood', description: 'Earn 500 total XP' },
  { id: 'streak-3', label: '3-Day Streak', description: 'Practice 3 days in a row' },
  { id: 'streak-7', label: '7-Day Streak', description: 'Practice 7 days in a row' },
  { id: 'streak-30', label: '30-Day Streak', description: 'Practice 30 days in a row' },
]

export const unitBadges: BadgeDef[] = units.map((u) => ({
  id: `completed-${u.id}`,
  label: `${u.title} Mastered`,
  description: `Complete all levels of ${u.title}`,
}))

export const allBadgeDefs: BadgeDef[] = [...staticBadges, ...unitBadges]
