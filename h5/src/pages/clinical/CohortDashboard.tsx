import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ClinicalLayout } from '../../components/layout'
import { Icon, RiskBadge } from '../../components/ui'
import { MOCK_PATIENTS, type RiskLevel } from '../../data/mock'

type Filter = 'all' | RiskLevel

export default function CohortDashboard() {
  const { tr, locale, interventions, logout } = useApp()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const critical = MOCK_PATIENTS.filter(p => p.risk === 'critical').length
  const elevated = MOCK_PATIENTS.filter(p => p.risk === 'elevated').length
  const stable = MOCK_PATIENTS.filter(p => p.risk === 'stable').length

  const filtered = MOCK_PATIENTS
    .filter(p => filter === 'all' || p.risk === filter)
    .filter(p => !query || p.id.toLowerCase().includes(query.toLowerCase()) || p.alias.includes(query) || p.aliasEn.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const order = { critical: 0, elevated: 1, stable: 2 }
      return order[a.risk] - order[b.risk]
    })

  const filters: { id: Filter; label: string; count?: number }[] = [
    { id: 'all', label: tr.filterAll, count: MOCK_PATIENTS.length },
    { id: 'critical', label: tr.critical, count: critical },
    { id: 'elevated', label: tr.elevated, count: elevated },
    { id: 'stable', label: tr.stable, count: stable },
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <ClinicalLayout>
      <section className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-variant flex justify-between items-center gap-2 mb-4">
        <div className="flex flex-col items-center flex-1">
          <span className="text-xs text-on-surface-variant">{tr.activePatients}</span>
          <span className="text-2xl font-bold text-primary">{MOCK_PATIENTS.length}</span>
        </div>
        <div className="w-px h-8 bg-surface-variant" />
        <div className="flex flex-col items-center flex-1">
          <span className="text-xs text-risk-critical">{tr.critical}</span>
          <span className="text-2xl font-bold text-risk-critical">{critical}</span>
        </div>
        <div className="w-px h-8 bg-surface-variant" />
        <div className="flex flex-col items-center flex-1">
          <span className="text-xs text-risk-elevated">{tr.elevated}</span>
          <span className="text-2xl font-bold text-risk-elevated">{elevated}</span>
        </div>
        <div className="w-px h-8 bg-surface-variant" />
        <div className="flex flex-col items-center flex-1">
          <span className="text-xs text-risk-stable">{tr.stable}</span>
          <span className="text-2xl font-bold text-risk-stable">{stable}</span>
        </div>
      </section>

      <div className="relative mb-4">
        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl" />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={tr.searchPlaceholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-variant bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {filters.map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${filter === f.id ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-on-surface-variant border-surface-variant'}`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3">{tr.triageQueue}</h2>

      <div className="flex flex-col gap-3 mb-6">
        {filtered.length === 0 ? (
          <p className="text-center text-on-surface-variant py-8 text-sm">{tr.searchPlaceholder}</p>
        ) : filtered.map(patient => (
          <button
            key={patient.id}
            type="button"
            onClick={() => navigate(`/clinical/patient/${patient.id}`)}
            className="bg-white rounded-2xl p-4 border border-surface-variant shadow-sm text-left flex items-center gap-4 active:scale-[0.99] min-h-[var(--spacing-touch-target-min)]"
          >
            <div className={`w-1.5 h-12 rounded-full shrink-0 ${patient.risk === 'critical' ? 'bg-risk-critical' : patient.risk === 'elevated' ? 'bg-risk-elevated' : 'bg-risk-stable'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-on-surface">{locale === 'zh' ? patient.alias : patient.aliasEn}</span>
                <RiskBadge level={patient.risk} />
              </div>
              <p className="text-xs text-on-surface-variant">
                {tr.lastAssessment}: {locale === 'zh' ? patient.lastAssessment : patient.lastAssessmentEn} · {patient.lastScore}
              </p>
            </div>
            <Icon name="chevron_right" className="text-outline shrink-0" />
          </button>
        ))}
      </div>

      {interventions.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3">{tr.recentInterventions}</h2>
          <div className="flex flex-col gap-2">
            {interventions.slice(0, 3).map(int => (
              <div key={int.id} className="bg-primary/5 border border-primary/10 rounded-xl p-3 text-sm">
                <span className="font-medium text-on-surface">{int.patientAlias}</span>
                <span className="text-on-surface-variant"> · {int.type === 'teleConsult' ? tr.teleConsult : int.type === 'pathwayUpdate' ? tr.pathwayUpdate : tr.medicationAdjust}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <button type="button" onClick={handleLogout} className="w-full min-h-[48px] rounded-xl border border-outline-variant text-sm font-medium text-on-surface-variant">
        {tr.logout}
      </button>
    </ClinicalLayout>
  )
}
