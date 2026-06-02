import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ResearchLayout } from '../../components/layout'
import { Icon } from '../../components/ui'
import { MDASI_SYMPTOMS, MOCK_PATIENTS } from '../../data/mock'

export default function Analytics() {
  const { tr, logout } = useApp()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const complianceData = [82, 85, 88, 86, 90, 91, 89]
  const healthIndex = [72, 74, 71, 73, 75, 76, 78]

  const riskCounts = {
    critical: MOCK_PATIENTS.filter(p => p.risk === 'critical').length,
    elevated: MOCK_PATIENTS.filter(p => p.risk === 'elevated').length,
    stable: MOCK_PATIENTS.filter(p => p.risk === 'stable').length,
  }

  const avgSymptoms = MDASI_SYMPTOMS.map(s => ({
    id: s.id,
    avg: Math.round(MOCK_PATIENTS.reduce((sum, p) => sum + (p.symptoms[s.id] ?? 0), 0) / MOCK_PATIENTS.length * 10) / 10,
  })).sort((a, b) => b.avg - a.avg)

  return (
    <ResearchLayout>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-surface-variant shadow-sm">
          <span className="text-xs text-on-surface-variant">{tr.complianceRate}</span>
          <p className="text-3xl font-bold text-primary mt-1">89%</p>
          <span className="text-xs text-risk-stable flex items-center gap-1 mt-1">
            <Icon name="trending_up" className="text-sm" /> +3%
          </span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-surface-variant shadow-sm">
          <span className="text-xs text-on-surface-variant">{tr.cohortHealth}</span>
          <p className="text-3xl font-bold text-secondary mt-1">78</p>
          <span className="text-xs text-outline mt-1 block">/ 100</span>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3">{tr.triageQueue}</h2>
        <div className="bg-white rounded-xl p-4 border border-surface-variant flex gap-3">
          {(['critical', 'elevated', 'stable'] as const).map(risk => (
            <div key={risk} className="flex-1 text-center p-3 rounded-lg bg-surface-container-low">
              <span className={`text-2xl font-bold block ${risk === 'critical' ? 'text-risk-critical' : risk === 'elevated' ? 'text-risk-elevated' : 'text-risk-stable'}`}>
                {riskCounts[risk]}
              </span>
              <span className="text-xs text-on-surface-variant">{tr[risk]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3">{tr.symptomBreakdown}</h2>
        <div className="bg-white rounded-xl p-4 border border-surface-variant flex flex-col gap-3">
          {avgSymptoms.slice(0, 5).map(s => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="text-sm text-on-surface flex-1">{tr.symptoms[s.id]}</span>
              <div className="w-32 h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary-container/70 rounded-full" style={{ width: `${s.avg * 10}%` }} />
              </div>
              <span className="text-sm font-medium w-8 text-right">{s.avg}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3">{tr.complianceRate}</h2>
        <div className="bg-white rounded-xl p-5 border border-surface-variant">
          <div className="flex items-end justify-between gap-2 h-28">
            {complianceData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t bg-primary-container/80" style={{ height: `${val}%` }} />
                <span className="text-[10px] text-outline">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3">{tr.cohortHealth}</h2>
        <div className="bg-white rounded-xl p-5 border border-surface-variant">
          <div className="flex items-end justify-between gap-2 h-28">
            {healthIndex.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t bg-secondary/70" style={{ height: `${val}%` }} />
                <span className="text-[10px] text-outline">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <button type="button" onClick={() => navigate('/research/export')} className="w-full min-h-[56px] rounded-xl bg-primary-container text-white font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] mb-4">
        <Icon name="download" className="text-xl" />
        {tr.exportTitle}
      </button>

      <button type="button" onClick={handleLogout} className="w-full min-h-[48px] rounded-xl border border-outline-variant text-sm font-medium text-on-surface-variant">
        {tr.logout}
      </button>
    </ResearchLayout>
  )
}
