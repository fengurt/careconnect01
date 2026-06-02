import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { MDASI_SYMPTOMS, getCalmColor, getOrbColor, avgScore, highestSymptom } from '../../data/mock'
import { GlassCard, Icon } from '../../components/ui'

type Phase = 'symptom' | 'review'

export default function Assessment() {
  const { tr, locale, completeAssessment } = useApp()
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('symptom')
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [currentScore, setCurrentScore] = useState(0)

  const symptom = MDASI_SYMPTOMS[step]
  const symptomLabel = tr.symptoms[symptom.id]
  const totalSteps = MDASI_SYMPTOMS.length
  const isLastSymptom = step === totalSteps - 1

  const displayScores = phase === 'review'
    ? { ...scores, [symptom.id]: scores[symptom.id] ?? currentScore }
    : scores

  const reviewScores = phase === 'review' ? displayScores : scores
  const bgColor = phase === 'review' ? 'var(--color-calm-0)' : getCalmColor(currentScore)
  const orbColor = phase === 'review' ? 'var(--color-orb-0)' : getOrbColor(currentScore)

  const handleNext = () => {
    const updated = { ...scores, [symptom.id]: currentScore }
    setScores(updated)
    if (isLastSymptom) {
      setPhase('review')
    } else {
      setStep(s => s + 1)
      setCurrentScore(updated[MDASI_SYMPTOMS[step + 1].id] ?? 0)
    }
  }

  const handleBack = () => {
    if (phase === 'review') {
      setPhase('symptom')
      setStep(totalSteps - 1)
      setCurrentScore(scores[MDASI_SYMPTOMS[totalSteps - 1].id] ?? 0)
      return
    }
    if (step === 0) {
      navigate('/patient/home')
      return
    }
    setStep(s => s - 1)
    setCurrentScore(scores[MDASI_SYMPTOMS[step - 1].id] ?? 0)
  }

  const handleSubmit = () => {
    const final = { ...scores, [MDASI_SYMPTOMS[totalSteps - 1].id]: scores[MDASI_SYMPTOMS[totalSteps - 1].id] ?? currentScore }
    completeAssessment(final)
    navigate('/patient/assessment/success')
  }

  const handleEditSymptom = (index: number) => {
    setPhase('symptom')
    setStep(index)
    setCurrentScore(scores[MDASI_SYMPTOMS[index].id] ?? 0)
  }

  if (phase === 'review') {
    const avg = avgScore(reviewScores)
    const highId = highestSymptom(reviewScores)
    return (
      <div className="min-h-[100dvh] flex flex-col bg-calm-0">
        <header className="pt-6 px-6 pb-4">
          <button type="button" onClick={handleBack} className="p-3 rounded-full bg-white/30 border border-white/50">
            <Icon name="arrow_back" rounded className="text-xl" />
          </button>
          <h1 className="text-2xl font-bold text-on-surface mt-4">{tr.reviewTitle}</h1>
          <p className="text-on-surface-variant text-sm mt-1">{tr.reviewSubtitle}</p>
        </header>
        <main className="flex-1 px-6 pb-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <GlassCard className="p-4 text-center">
              <span className="text-xs text-outline block">{tr.avgScore}</span>
              <span className="text-3xl font-light text-primary">{avg}</span>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <span className="text-xs text-outline block">{tr.highestSymptom}</span>
              <span className="text-lg font-semibold text-on-surface">{tr.symptoms[highId]}</span>
              <span className="text-sm text-tertiary block">{reviewScores[highId]}/10</span>
            </GlassCard>
          </div>
          <div className="flex flex-col gap-2">
            {MDASI_SYMPTOMS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleEditSymptom(i)}
                className="glass-card rounded-2xl p-4 flex items-center gap-3 text-left active:scale-[0.99]"
              >
                <Icon name={s.icon} className="text-primary text-xl" />
                <span className="flex-1 text-on-surface">{tr.symptoms[s.id]}</span>
                <span className="font-semibold text-lg">{reviewScores[s.id] ?? 0}</span>
                <Icon name="edit" className="text-outline text-sm" />
              </button>
            ))}
          </div>
        </main>
        <footer className="px-6 pb-10">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full min-h-[56px] rounded-2xl bg-primary-container text-white font-semibold text-lg shadow-lg active:scale-[0.98]"
          >
            {tr.confirmSubmit}
          </button>
        </footer>
      </div>
    )
  }

  const questionText = locale === 'zh'
    ? `请评估您在过去24小时内，处于最严重时的 ${symptomLabel} 程度。`
    : `Rate your worst ${symptomLabel.toLowerCase()} in the past 24 hours.`

  return (
    <div className="min-h-[100dvh] flex flex-col transition-colors duration-700" style={{ backgroundColor: bgColor }}>
      <header className="w-full z-50 flex flex-col pt-6 px-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={handleBack} className="p-3 rounded-full bg-white/30 border border-white/50 active:scale-95">
            <Icon name="close" rounded className="text-xl" />
          </button>
          <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/50">
            <span className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
              {tr.stepOf} {step + 1} / {totalSteps}
            </span>
          </div>
          <div className="w-11" />
        </div>
        <div className="h-1.5 bg-white/40 rounded-full overflow-hidden">
          <div className="h-full bg-primary-container transition-all duration-500 rounded-full" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
        </div>
      </header>

      <main className="flex-1 px-8 flex flex-col items-center justify-center -mt-6">
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full blur-[40px] opacity-40 transition-colors duration-700" style={{ backgroundColor: orbColor }} />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-lg">
              <Icon name={symptom.icon} rounded className="text-6xl" style={{ color: orbColor }} />
            </div>
          </div>
          <div className="text-center mb-10 text-fade-in">
            <h2 className="text-[26px] leading-snug font-semibold text-on-surface max-w-[300px] mx-auto">{questionText}</h2>
            <p className="mt-4 text-on-surface-variant/70 text-sm max-w-[260px] mx-auto">{tr.scoreHint}</p>
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="flex justify-center items-end gap-1 h-16">
              <span className="text-6xl font-light tracking-tighter text-on-surface">{currentScore}</span>
              <span className="text-on-surface-variant/50 text-lg mb-2">/ 10</span>
            </div>
            <div className="relative w-full h-12 flex items-center">
              <div className="absolute w-full h-2 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${currentScore * 10}%`, backgroundColor: orbColor }} />
              </div>
              <input type="range" min={0} max={10} value={currentScore} onChange={e => setCurrentScore(Number(e.target.value))} className="sensory-slider" style={{ '--active-color': orbColor } as React.CSSProperties} />
            </div>
            <div className="flex justify-between text-xs text-on-surface-variant/60 px-1">
              <span>0</span><span>5</span><span>10</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 pb-10 pt-4">
        <button type="button" onClick={handleNext} className="w-full min-h-[56px] rounded-2xl bg-primary-container text-white font-semibold text-lg shadow-lg active:scale-[0.98]">
          {isLastSymptom ? tr.next : tr.next}
        </button>
      </footer>
    </div>
  )
}
