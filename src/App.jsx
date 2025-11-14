import { useEffect, useMemo, useState } from 'react'
import AdaptiveCard from './components/AdaptiveCard'
import ServiceGrid from './components/ServiceGrid'

export default function App() {
  const [strings, setStrings] = useState(null)
  const [profile, setProfile] = useState({
    disability_type: ['visual'],
    preferred_mode: 'auto',
    language: 'en',
    high_contrast: false,
    large_text: false,
  })
  const [saved, setSaved] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const container = useMemo(() => (
    `min-h-screen ${profile.high_contrast ? 'bg-black' : 'bg-gradient-to-br from-blue-50 to-purple-50'} ${profile.language === 'ar' ? 'font-[system-ui]' : ''}`
  ), [profile.high_contrast, profile.language])

  useEffect(() => {
    const lang = profile.language
    fetch(`${baseUrl}/api/i18n/${lang}`).then(res => res.json()).then(setStrings).catch(() => setStrings(null))
  }, [profile.language, baseUrl])

  const saveProfile = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { profile, documents_submitted: [] } }),
      })
      const data = await response.json()
      if (response.ok) {
        setSaved(true)
        alert(strings?.profile_saved || 'Profile saved')
      } else {
        alert(data.detail || 'Failed to save')
      }
    } catch (e) {
      alert('Network error')
    }
  }

  return (
    <div className={container}>
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${profile.high_contrast ? 'bg-yellow-400' : 'bg-blue-600'}`}></div>
            <h1 className={`font-bold ${profile.large_text ? 'text-2xl' : 'text-xl'} ${profile.high_contrast ? 'text-white' : 'text-gray-900'}`}>NUJJUM</h1>
          </div>
          <div className="flex items-center gap-2">
            <select
              aria-label="Language"
              className="border rounded px-2 py-1"
              value={profile.language}
              onChange={(e) => setProfile(p => ({ ...p, language: e.target.value }))}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={profile.high_contrast} onChange={(e) => setProfile(p => ({ ...p, high_contrast: e.target.checked }))} />
              <span>{strings?.high_contrast || 'High Contrast'}</span>
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={profile.large_text} onChange={(e) => setProfile(p => ({ ...p, large_text: e.target.checked }))} />
              <span>{strings?.large_text || 'Large Text'}</span>
            </label>
          </div>
        </header>

        <main className="grid md:grid-cols-2 gap-6 items-start">
          <AdaptiveCard profile={profile} strings={strings || { title: 'NUJJUM', subtitle: 'Loading...', get_started: '...' }} onConfirm={saveProfile} />
          <div className="space-y-4">
            <ServiceGrid strings={strings || { healthcare: 'Healthcare', benefits: 'Benefits', community: 'Community', devices: 'Devices', education: 'Education & Employment', global: 'Global' }} high_contrast={profile.high_contrast} />
            <div className={`rounded-xl p-4 ${profile.high_contrast ? 'bg-black/60 text-white' : 'bg-white text-gray-900'} shadow`}>
              <h3 className="font-semibold mb-2">SOS</h3>
              <button
                className={`${profile.high_contrast ? 'bg-red-400 text-black hover:bg-red-300' : 'bg-red-600 text-white hover:bg-red-500'} px-4 py-2 rounded-lg`}
                onClick={async () => {
                  const res = await fetch(`${baseUrl}/api/sos`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ emergency_type: 'medical', notes: 'Quick test' })
                  })
                  const data = await res.json()
                  alert(`SOS: ${data.status}`)
                }}
              >
                {strings?.sos || 'SOS'}
              </button>
            </div>
          </div>
        </main>

        {saved && (
          <div className={`mt-6 rounded-lg p-3 ${profile.high_contrast ? 'bg-green-700 text-white' : 'bg-green-50 text-green-800'} border ${profile.high_contrast ? 'border-green-400' : 'border-green-200'}`}>
            {strings?.profile_saved || 'Profile saved successfully'}
          </div>
        )}
      </div>
    </div>
  )
}
