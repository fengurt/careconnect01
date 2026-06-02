import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { PatientHeader, PatientLayout } from '../../components/layout'
import { GlassCard, Icon } from '../../components/ui'
import { WISDOM_ARTICLES } from '../../data/mock'

export default function Wisdom() {
  const { tr, locale, readArticles } = useApp()
  const navigate = useNavigate()

  return (
    <>
      <PatientHeader />
      <PatientLayout>
        <main className="flex-1 px-[var(--spacing-container-padding)] flex flex-col gap-6 max-w-2xl mx-auto w-full">
          <section>
            <h1 className="text-2xl font-bold text-on-surface">{tr.wisdomTitle}</h1>
            <p className="text-on-surface-variant mt-1">{tr.wisdomSubtitle}</p>
          </section>

          <div className="flex flex-col gap-4">
            {WISDOM_ARTICLES.map(article => {
              const read = readArticles.includes(article.id)
              return (
                <GlassCard key={article.id} onClick={() => navigate(`/patient/wisdom/${article.id}`)} className={`p-5 flex gap-4 items-start ${read ? 'opacity-80' : ''}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${read ? 'bg-surface-container' : 'bg-secondary/10'}`}>
                    <Icon name={article.icon} className={read ? 'text-outline' : 'text-secondary text-2xl'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-on-surface text-base leading-snug">
                        {locale === 'zh' ? article.titleZh : article.titleEn}
                      </h2>
                      {read && <Icon name="check_circle" className="text-primary text-sm shrink-0" />}
                    </div>
                    <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                      {locale === 'zh' ? article.summaryZh : article.summaryEn}
                    </p>
                    <span className="inline-flex items-center gap-1 text-secondary text-sm font-medium mt-3">
                      {read ? tr.viewResults : tr.readMore}
                      <Icon name="arrow_forward" className="text-base" />
                    </span>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </main>
      </PatientLayout>
    </>
  )
}
