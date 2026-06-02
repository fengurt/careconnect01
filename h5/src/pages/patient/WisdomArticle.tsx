import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { WISDOM_ARTICLES } from '../../data/mock'
import { FlowShell, PrimaryButton } from '../../components/layout'
import { Icon } from '../../components/ui'

export default function WisdomArticle() {
  const { tr, locale, markArticleRead } = useApp()
  const { id } = useParams()
  const navigate = useNavigate()
  const article = WISDOM_ARTICLES.find(a => a.id === id) ?? WISDOM_ARTICLES[0]

  useEffect(() => {
    markArticleRead(article.id)
  }, [article.id, markArticleRead])

  const title = locale === 'zh' ? article.titleZh : article.titleEn
  const body = locale === 'zh' ? article.bodyZh : article.bodyEn

  return (
    <FlowShell
      backTo="/patient/wisdom"
      backLabel={tr.wisdomTitle}
      title={title}
      footer={
        <PrimaryButton onClick={() => navigate('/patient/wisdom')}>{tr.articleDone}</PrimaryButton>
      }
    >
      <div className="px-[var(--spacing-container-padding)] py-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <Icon name={article.icon} className="text-secondary text-2xl" />
          </div>
          <h1 className="text-xl font-bold text-on-surface leading-snug">{title}</h1>
        </div>
        <div className="flex flex-col gap-5">
          {body.map((para, i) => (
            <p key={i} className="text-base text-on-surface-variant leading-[1.75]">{para}</p>
          ))}
        </div>
      </div>
    </FlowShell>
  )
}
