import Hero from './components/Hero'
import PlanForm from './components/PlanForm'
import DailyCheckin from './components/DailyCheckin'
import Summary from './components/Summary'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative max-w-5xl mx-auto px-6 py-12 space-y-10">
        <Hero />
        <PlanForm />
        <DailyCheckin />
        <Summary />
        <div className="text-center text-blue-300/60 text-sm">Made for everyone quitting snus</div>
      </div>
    </div>
  )
}

export default App
