function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={filled ? '#d9463c' : 'none'} stroke={filled ? '#d9463c' : '#b0a99e'} strokeWidth="2">
      <path d="M12 20s-7-4.35-9.5-9C1 8 2.5 4 6.2 4 8.6 4 10.6 5.5 12 7.5 13.4 5.5 15.4 4 17.8 4 21.5 4 23 8 21.5 11 19 15.65 12 20 12 20z" />
    </svg>
  )
}

export default function HeartsBar({ hearts, max = 5 }: { hearts: number; max?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${hearts} of ${max} hearts remaining`}>
      {Array.from({ length: max }).map((_, i) => (
        <HeartIcon key={i} filled={i < hearts} />
      ))}
    </div>
  )
}
