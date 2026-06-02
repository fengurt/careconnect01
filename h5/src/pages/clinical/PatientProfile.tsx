import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ClinicalLayout } from '../../components/layout'
import { Icon, RiskBadge } from '../../components/ui'
import { MOCK_PATIENTS, MDASI_SYMPTOMS } from '../../data/mock'

export default function PatientProfile() {
  const { tr, locale } = useApp()
  const { id } = useParams()
  const navigate = useNavigate()

  const patient = MOCK_PATIENTS.find(p => p.id === id) ?? MOCK_PATIENTS[0]
  const maxTrend = Math.max(...patient.trend, 10)
  const displayName = locale === 'zh' ? patient.alias : patient.aliasEn

  return (
    <ClinicalLayout>
      <div className="bg-white rounded-2xl p-5 border border-surface-variant shadow-sm mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-on-surface">{displayName}</h1>
            <p className="text-sm text-outline mt-1">{patient.id}</p>
          </div>
          <RiskBadge level={patient.risk} />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="text-on-surface-variant block text-xs">{tr.regimen}</span>
            <span className="font-medium">{patient.regimen}</span>
          </div>
          <div>
            <span className="text-on-surface-variant block text-xs">{tr.lastAssessment}</span>
            <span className="font-medium">{locale === 'zh' ? patient.lastAssessment : patient.lastAssessmentEn}</span>
          </div>
        </div>
        {patient.risk === 'critical' && (
          <a href="tel:400-120-0194" className="flex items-center justify-center gap-2 w-full min-h-[48px] rounded-lg bg-risk-critical/10 text-risk-critical font-semibold border border-red-200">
            <Icon name="call" className="text-xl" />
            {tr.callClinic}
          </a>
        )}
      </div>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3">{tr.sevenDayTrend}</h2>
        <div className="bg-white rounded-xl p-5 border border-surface-variant">
          <div className="flex items-end justify-between gap-2 h-32">
            {patient.trend.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-secondary/80" style={{ height: `${(val / maxTrend) * 100}%`, minHeight: '4px' }} />
                <span className="text-[10px] text-outline">D{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3">{tr.symptomBreakdown}</h2>
        <div className="bg-white rounded-xl p-4 border border-surface-variant flex flex-col gap-2">
          {MDASI_SYMPTOMS.map(s => {
            const score = patient.symptoms[s.id] ?? 0
            return (
              <div key={s.id} className="flex items-center gap-3">
                <Icon name={s.icon} className="text-outline text-lg w-6" />
                <span className="flex-1 text-sm text-on-surface">{tr.symptoms[s.id]}</span>
                <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${score >= 7 ? 'bg-risk-critical' : score >= 4 ? 'bg-risk-elevated' : 'bg-risk-stable'}`} style={{ width: `${score * 10}%` }} />
                </div>
                <span className="text-sm font-medium w-8 text-right">{score}</span>
              </div>
            )
          })}
        </div>
      </section>

      <button
        type="button"
        onClick={() => navigate(`/clinical/patient/${patient.id}/intervention`)}
        className="w-full min-h-[56px] rounded-xl bg-primary-container text-white font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
      >
        <Icon name="edit_note" className="text-xl" />
        {tr.logIntervention}
      </button>
    </ClinicalLayout>
  )
}
