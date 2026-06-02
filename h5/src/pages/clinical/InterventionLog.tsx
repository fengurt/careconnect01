import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ClinicalLayout } from '../../components/layout'
import { Icon } from '../../components/ui'
import { MOCK_PATIENTS, type InterventionType } from '../../data/mock'

export default function InterventionLog() {
  const { tr, locale, logIntervention } = useApp()
  const { id } = useParams()
  const navigate = useNavigate()
  const patient = MOCK_PATIENTS.find(p => p.id === id) ?? MOCK_PATIENTS[0]
  const displayName = locale === 'zh' ? patient.alias : patient.aliasEn

  const [type, setType] = useState<InterventionType>('teleConsult')
  const [notes, setNotes] = useState('')
  const [followUp, setFollowUp] = useState(true)

  const types: { id: InterventionType; label: string; icon: string }[] = [
    { id: 'teleConsult', label: tr.teleConsult, icon: 'videocam' },
    { id: 'pathwayUpdate', label: tr.pathwayUpdate, icon: 'route' },
    { id: 'medicationAdjust', label: tr.medicationAdjust, icon: 'medication' },
  ]

  const handleSubmit = () => {
    logIntervention(patient.id, displayName, type, notes, followUp)
    navigate('/clinical/intervention/success', { state: { patientId: patient.id } })
  }

  return (
    <ClinicalLayout>
      <h1 className="text-xl font-bold text-on-surface mb-1">{tr.interventionTitle}</h1>
      <p className="text-sm text-on-surface-variant mb-6">{displayName} · {patient.id}</p>

      <div className="bg-white rounded-xl p-5 border border-surface-variant flex flex-col gap-5 mb-6">
        <div>
          <label className="text-xs text-on-surface-variant block mb-3 font-semibold uppercase tracking-wider">{tr.interventionType}</label>
          <div className="flex flex-col gap-2">
            {types.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors min-h-[var(--spacing-touch-target-min)] ${
                  type === t.id ? 'border-secondary bg-secondary/5 text-secondary' : 'border-surface-variant bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <Icon name={t.icon} className="text-xl" />
                <span className="font-medium">{t.label}</span>
                {type === t.id && <Icon name="check_circle" filled className="ml-auto text-secondary" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-on-surface-variant block mb-2 font-semibold uppercase tracking-wider">{tr.notes}</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full rounded-xl border border-surface-variant p-4 text-sm min-h-[120px] bg-surface-container-low resize-none"
            placeholder={locale === 'zh' ? '记录会诊要点、医嘱调整、患者反馈…' : 'Consult notes, orders, patient feedback…'}
          />
        </div>

        <button
          type="button"
          onClick={() => setFollowUp(f => !f)}
          className={`flex items-center gap-3 p-4 rounded-xl border text-left ${followUp ? 'border-primary bg-primary/5' : 'border-surface-variant'}`}
        >
          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${followUp ? 'bg-primary border-primary' : 'border-outline-variant'}`}>
            {followUp && <Icon name="check" className="text-white text-sm" />}
          </div>
          <span className="text-sm font-medium text-on-surface">{tr.scheduleFollowUp}</span>
        </button>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!notes.trim()}
        className="w-full min-h-[56px] rounded-xl bg-primary-container text-white font-semibold disabled:opacity-40 active:scale-[0.98]"
      >
        {tr.submitIntervention}
      </button>
    </ClinicalLayout>
  )
}
