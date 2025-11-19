import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function DailyCheckin() {
  const [userId] = useState(localStorage.getItem('snus_user_id') || '')
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [nicotineFree, setNicotineFree] = useState(false)
  const [portions, setPortions] = useState('')
  const [craving, setCraving] = useState('5')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!userId) return alert('Create a user first')
    try {
      setSaving(true)
      await api.createCheckin({
        user_id: userId,
        date,
        nicotine_free: nicotineFree,
        portions_used: portions ? parseFloat(portions) : null,
        craving_level: craving ? parseInt(craving) : null,
      })
      alert('Saved!')
    } catch (e) {
      alert('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-3">Daily Check-in</h3>
      <form onSubmit={submit} className="grid md:grid-cols-5 gap-3 text-blue-200">
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full bg-slate-900/60 border border-blue-500/30 rounded-lg px-3 py-2 text-white" />
        </div>
        <div className="flex items-center gap-2 mt-6 md:mt-0">
          <input id="nf" type="checkbox" checked={nicotineFree} onChange={(e)=>setNicotineFree(e.target.checked)} className="w-5 h-5" />
          <label htmlFor="nf" className="text-sm">Nicotine-free day</label>
        </div>
        <div>
          <label className="block text-sm mb-1">Portions used</label>
          <input value={portions} onChange={(e)=>setPortions(e.target.value)} type="number" min="0" step="0.5" className="w-full bg-slate-900/60 border border-blue-500/30 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm mb-1">Craving (1-10)</label>
          <input value={craving} onChange={(e)=>setCraving(e.target.value)} type="number" min="1" max="10" className="w-full bg-slate-900/60 border border-blue-500/30 rounded-lg px-3 py-2 text-white" />
        </div>
        <div className="flex items-end">
          <button disabled={saving} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}
