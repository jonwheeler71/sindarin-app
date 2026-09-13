type Mood = 'happy' | 'sad' | 'neutral' | 'excited'

const MOUTHS: Record<Mood, string> = {
  happy: 'M 40 62 Q 50 72 60 62',
  excited: 'M 38 60 Q 50 76 62 60',
  neutral: 'M 42 64 L 58 64',
  sad: 'M 40 68 Q 50 58 60 68',
}

const EYE_R: Record<Mood, number> = {
  happy: 3.5,
  excited: 4.5,
  neutral: 3,
  sad: 2.5,
}

export default function Mascot({ mood = 'happy', className = '' }: { mood?: Mood; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      role="img"
      aria-label={`Galbor the Ent, feeling ${mood}`}
    >
      {/* legs / roots */}
      <path d="M35 110 Q30 100 38 92" stroke="#5b4a30" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M65 110 Q70 100 62 92" stroke="#5b4a30" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* body / trunk */}
      <path
        d="M30 95 C25 70 28 45 50 40 C72 45 75 70 70 95 C70 105 30 105 30 95 Z"
        fill="#6b5335"
        stroke="#4a3a24"
        strokeWidth="2"
      />
      {/* bark texture */}
      <path d="M42 55 L42 88" stroke="#4a3a24" strokeWidth="1.5" opacity="0.5" />
      <path d="M58 55 L58 88" stroke="#4a3a24" strokeWidth="1.5" opacity="0.5" />
      {/* arms / branches */}
      <path d="M30 60 Q10 55 8 35" stroke="#5b4a30" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M70 60 Q90 55 92 35" stroke="#5b4a30" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* leafy hair */}
      <g>
        <circle cx="35" cy="25" r="12" fill="#588c46" />
        <circle cx="50" cy="16" r="14" fill="#6ea350" />
        <circle cx="66" cy="25" r="12" fill="#588c46" />
        <circle cx="8" cy="30" r="7" fill="#78a862" />
        <circle cx="92" cy="30" r="7" fill="#78a862" />
      </g>
      {/* face */}
      <circle cx="40" cy="58" r={EYE_R[mood]} fill="#22391e" />
      <circle cx="60" cy="58" r={EYE_R[mood]} fill="#22391e" />
      <path d={MOUTHS[mood]} stroke="#22391e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
