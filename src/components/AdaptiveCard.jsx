import { useEffect } from 'react'

export default function AdaptiveCard({ profile, strings, onConfirm }) {
  const { preferred_mode, high_contrast, large_text, language } = profile || {}

  useEffect(() => {
    // Apply document-level accessibility tweaks
    const html = document.documentElement
    html.dir = language === 'ar' ? 'rtl' : 'ltr'
    html.style.scrollBehavior = 'smooth'
  }, [language])

  const base = `rounded-xl shadow-lg p-6 transition-colors ${high_contrast ? 'bg-black text-white' : 'bg-white text-gray-900'}`
  const text = `${large_text ? 'text-lg' : 'text-base'}`
  const btn = `${high_contrast ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-500'} font-semibold py-2 px-4 rounded-lg`
  const label = `${large_text ? 'text-base' : 'text-sm'} opacity-80`

  return (
    <div className={`${base} ${text}`}>
      <h2 className={`font-bold ${large_text ? 'text-2xl' : 'text-xl'} mb-2`}>
        {strings.title}
      </h2>
      <p className={`mb-4 ${large_text ? 'text-lg' : 'text-sm'}`}>
        {strings.subtitle}
      </p>

      <div className="space-y-3 mb-6">
        <p className={label}>Mode: {preferred_mode}</p>
        <p className={label}>{strings.high_contrast}: {high_contrast ? 'On' : 'Off'}</p>
        <p className={label}>{strings.large_text}: {large_text ? 'On' : 'Off'}</p>
        <p className={label}>{strings.language}: {language === 'ar' ? 'العربية' : 'English'}</p>
      </div>

      <button className={btn} onClick={onConfirm}>
        {strings.get_started}
      </button>
    </div>
  )
}
