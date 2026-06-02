import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { FlowShell, PrimaryButton, SecondaryButton } from '../../components/layout'
import { Icon } from '../../components/ui'

export default function InterventionSuccess() {
  const { tr } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const patientId = (location.state as { patientId?: string })?.patientId

  return (
    <FlowShell
      backTo="/clinical/cohort"
      backLabel={tr.viewQueue}
      footer={
        <div className="flex flex-col gap-3">
          <PrimaryButton onClick={() => navigate('/clinical/cohort')}>{tr.viewQueue}</PrimaryButton>
          {patientId && (
            <SecondaryButton onClick={() => navigate(`/clinical/patient/${patientId}`)}>{tr.backToPatient}</SecondaryButton>
          )}
        </div>
      }
    >
      <div className="px-[var(--spacing-container-padding)] py-12 max-w-md mx-auto flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center mb-6 shadow-lg">
          <Icon name="check_circle" filled className="text-primary text-5xl" />
        </div>
        <h1 className="text-2xl font-bold text-on-surface mb-3">{tr.interventionSuccessTitle}</h1>
        <p className="text-on-surface-variant leading-relaxed">{tr.interventionSuccessBody}</p>
      </div>
    </FlowShell>
  )
}
