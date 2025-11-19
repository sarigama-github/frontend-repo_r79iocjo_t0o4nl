import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function PlanForm() {
  const [userId, setUserId] = useState(localStorage.getItem('snus_user_id') || '')
  const [plan, setPlan] = useState(null)
  const [goalType, setGoalType] = useState('quit')
  const [baseline, setBaseline] = useState('')
  const [target, setTarget] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!userId) return
    api.getPlan(userId).then(setPlan).catch(() => {})
  }, [userId])

  const submit = async (e) => {
    e.preventDefault()
    if (!userId) return alert('Create a user first')
    try {
      setSaving(true)
      const payload = {
        user_id: userId,
        goal_type: goalType,
        start_date: new Date().toISOString().slice(0,10),
        baseline_portions_per_day: baseline ? parseFloat(baseline) : null,
        target_portions_per_day: goalType === 'reduce' && target ? parseFloat(target) : null,
      }
      await api.createPlan(payload)
      const p = await api.getPlan(userId)
      setPlan(p)
    } catch (e) {
      alert('Failed to save plan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-3">Your Plan</h3>
      {plan ? (
        <div className="text-blue-200">
          <p><span className="text-white font-medium">Goal:</span> {plan.goal_type === 'quit' ? 'Quit completely' : 'Reduce usage'}</p>
          {plan.baseline_portions_per_day != null && (
            <p><span className="text-white font-medium">Baseline:</span> {plan.baseline_portions_per_day} portions/day</p>
          )}
          {plan.target_portions_per_day != null && (
            <p><span className="text-white font-medium">Target:</span> {plan.target_portions_per_day} portions/day</p>
          )}
        </div>
      ) : (
        <form onSubmit={submit} className="grid md:grid-cols-4 gap-3 text-blue-200">
          <div className="md:col-span-1">
            <label className="block text-sm mb-1">Goal</label>
            <select value={goalType} onChange={(e)=>setGoalType(e.target.value)} className="w-full bg-slate-900/60 border border-blue-500/30 rounded-lg px-3 py-2 text-white">
              <option value="quit">Quit completely</option>
              <option value="reduce">Reduce usage</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Baseline portions/day</label>
            <input value={baseline} onChange={(e)=>setBaseline(e.target.value)} type="number" min="0" step="0.5" className="w-full bg-slate-900/60 border border-blue-500/30 rounded-lg px-3 py-2 text-white" />
          </div>
          {goalType === 'reduce' && (
            <div>
              <label className="block text-sm mb-1">Target portions/day</label>
              <input value={target} onChange={(e)=>setTarget(e.target.value)} type="number" min="0" step="0.5" className="w-full bg-slate-900/60 border border-blue-500/30 rounded-lg px-3 py-2 text-white" />
            </div>
          )}
          <div className="flex items-end">
            <button disabled={saving} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">{saving ? 'Saving...' : 'Save Plan'}</button>
          </div>
        </form>
      )}
    </div>
  )
}
