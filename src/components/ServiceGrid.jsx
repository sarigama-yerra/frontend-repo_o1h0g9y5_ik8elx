export default function ServiceGrid({ strings, high_contrast }) {
  const tile = `rounded-xl p-4 border ${high_contrast ? 'bg-black/60 text-white border-white/20' : 'bg-white text-gray-900 border-gray-100'} hover:shadow-md transition`;
  const categories = [
    { key: 'healthcare', name: strings.healthcare, emoji: '🏥' },
    { key: 'benefits', name: strings.benefits, emoji: '🛡️' },
    { key: 'community', name: strings.community, emoji: '🤝' },
    { key: 'devices', name: strings.devices, emoji: '🦾' },
    { key: 'education', name: strings.education, emoji: '🎓' },
    { key: 'global', name: strings.global, emoji: '🌍' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {categories.map((c) => (
        <div key={c.key} className={tile} aria-label={c.name} role="button" tabIndex={0}>
          <div className="text-2xl mb-2" aria-hidden>{c.emoji}</div>
          <div className="font-semibold">{c.name}</div>
        </div>
      ))}
    </div>
  )
}
