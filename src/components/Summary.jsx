import { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Summary() {
  const [userId] = useState(localStorage.getItem('snus_user_id') || '')
  const [summary, setSummary] = useState(null)
  const [tips, setTips] = useState([])

  useEffect(() => {
    if (!userId) return
    api.getSummary(userId).then(setSummary).catch(()=>{})
    api.getTips().then(setTips).catch(()=>{})
  }, [userId])

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-3">Progress</h3>
        {summary ? (
          <div className="text-blue-200 grid sm:grid-cols-2 gap-4">
            <Metric label="Total check-ins" value={summary.total_checkins} />
            <Metric label="Nicotine-free days" value={summary.nicotine_free_days} />
            <Metric label="Current streak" value={`${summary.current_streak} days`} />
            <Metric label="Avg portions/day" value={summary.avg_portions} />
            {summary.adherence_percent != null && (
              <Metric label="Plan adherence" value={`${summary.adherence_percent}%`} />
            )}
          </div>
        ) : (
          <p className="text-blue-300">No data yet. Log your first day!</p>
        )}
      </div>

      <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-3">Tips</h3>
        <ul className="space-y-3">
          {tips.map(t => (
            <li key={t.id || t.title} className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-3">
              <p className="text-white font-medium">{t.title}</p>
              <p className="text-blue-200 text-sm">{t.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-4">
      <p className="text-blue-200 text-sm">{label}</p>
      <p className="text-white text-2xl font-semibold">{value}</p>
    </div>
  )
}
