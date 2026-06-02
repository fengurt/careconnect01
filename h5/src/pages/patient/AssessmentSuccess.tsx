import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { MDASI_SYMPTOMS, avgScore, highestSymptom } from '../../data/mock'
import { FlowShell, PrimaryButton, SecondaryButton } from '../../components/layout'
import { GlassCard, Icon } from '../../components/ui'

export default function AssessmentSuccess() {
  const { tr, lastScores } = useApp()
  const navigate = useNavigate()
  const avg = avgScore(lastScores)
  const highId = highestSymptom(lastScores)

  return (
    <FlowShell
      backTo="/patient/home"
      backLabel={tr.backHome}
      footer={
        <div className="flex flex-col gap-3">
          <PrimaryButton onClick={() => navigate('/patient/home')}>{tr.backHome}</PrimaryButton>
          <SecondaryButton onClick={() => navigate('/patient/wisdom/1')}>{tr.viewWisdom}</SecondaryButton>
        </div>
      }
    >
      <div className="px-[var(--spacing-container-padding)] py-8 max-w-md mx-auto flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center mb-6 pulse-glow shadow-lg">
          <Icon name="check_circle" filled className="text-primary text-5xl" />
        </div>
        <h1 className="text-2xl font-bold text-on-surface mb-2">{tr.successTitle}</h1>
        <p className="text-on-surface-variant max-w-xs mb-8">{tr.successBody}</p>

        <GlassCard className="w-full p-5 mb-6 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-outline">{tr.avgScore}</span>
            <span className="text-2xl font-light text-primary">{avg}</span>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-surface-variant">
            <span className="text-sm text-outline">{tr.highestSymptom}</span>
            <span className="font-medium text-sm">{tr.symptoms[highId]} · {lastScores[highId]}/10</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {MDASI_SYMPTOMS.map(s => (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <div className="w-full h-8 rounded-md bg-surface-container flex items-end overflow-hidden">
                  <div className="w-full bg-primary-container/70 rounded-t-sm" style={{ height: `${(lastScores[s.id] ?? 0) * 10}%`, minHeight: lastScores[s.id] ? 4 : 0 }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <p className="text-on-surface-variant text-sm italic">{tr.reflectionPrompt}</p>
      </div>
    </FlowShell>
  )
}
