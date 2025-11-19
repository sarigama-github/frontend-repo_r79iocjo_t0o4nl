import { useState, useEffect } from 'react'
import { api } from '../utils/api'

export default function Hero() {
  const [userId, setUserId] = useState(localStorage.getItem('snus_user_id') || '')
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (userId) return
    // create anonymous user on first load
    const create = async () => {
      try {
        setCreating(true)
        const res = await api.createUser({ name: name || 'Anonymous' })
        localStorage.setItem('snus_user_id', res.id)
        setUserId(res.id)
      } catch (e) {
        console.error(e)
      } finally {
        setCreating(false)
      }
    }
    create()
  }, [])

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
        Quit snus, one day at a time
      </h1>
      <p className="text-blue-200/90 max-w-xl mx-auto">
        Track cravings, log your days, and follow a personalized plan to stay nicotine-free.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="px-3 py-2 rounded-lg bg-slate-900/60 border border-blue-500/30 text-white placeholder:text-blue-200/60"
        />
        <button
          disabled={creating}
          onClick={async () => {
            try {
              setCreating(true)
              const res = await api.createUser({ name: name || 'Anonymous' })
              localStorage.setItem('snus_user_id', res.id)
              setUserId(res.id)
            } catch (e) {
              alert('Failed to create user')
            } finally {
              setCreating(false)
            }
          }}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-50"
        >
          {userId ? 'User created' : (creating ? 'Creating...' : 'Get Started')}
        </button>
      </div>
      {userId && (
        <p className="text-green-300 mt-2 text-sm">Your progress will be saved on this device</p>
      )}
    </div>
  )
}
