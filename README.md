# Lassui — Learn Sindarin

A Duolingo-style app for learning Sindarin, the Elvish language from *The Lord of the Rings*. Gamified lessons, hearts, XP, streaks, and spaced-repetition review, guided by an original mascot: Galbor, a small Ent.

## Stack

React + TypeScript + Vite, Tailwind CSS v4, React Router. No backend — progress is stored in `localStorage`.

## Running locally

```
npm install
npm run dev
```

## Features

- **Skill tree** of 9 units (Greetings, Nature I & II, Numbers, Family, Phrases, Verbs, Colors, Sentences), unlocked in sequence.
- **Lessons** of 8-10 mixed questions: multiple choice, word match, fill-in-the-blank, and translate.
- **Hearts** (5 per lesson), **XP**, **daily goal** tracking, and **streaks**.
- **Spaced repetition**: words answered incorrectly resurface as review questions in later lessons.
- **Badges** for XP milestones, streaks, and completed units.

## Project structure

- `src/data/units.ts` — vocabulary data for each unit
- `src/lib/lessonGenerator.ts` — dynamic question generation + review word selection
- `src/state/ProgressContext.tsx` — XP/streak/hearts/unlock state, persisted to `localStorage`
- `src/pages/` — Home (skill tree), Lesson, Profile
- `src/components/` — Mascot, hearts/XP UI, question type components
