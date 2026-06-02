import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { PatientHeader, PatientLayout, SubPageHeader } from '../../components/layout'
import { GlassCard, Icon } from '../../components/ui'

export default function Notifications() {
  const { tr, locale, notifications, markNotificationRead, markAllNotificationsRead } = useApp()
  const navigate = useNavigate()

  return (
    <>
      <PatientHeader />
      <PatientLayout>
        <main className="flex-1 px-[var(--spacing-container-padding)] flex flex-col gap-4 max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between gap-2">
            <SubPageHeader title={tr.notificationsTitle} backTo="/patient/home" backLabel={tr.backHome} />
            <button type="button" onClick={markAllNotificationsRead} className="text-xs text-secondary font-semibold shrink-0 -mt-8">
              {tr.markAllRead}
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className="text-center text-on-surface-variant py-12">{tr.noNotifications}</p>
          ) : (
            <div className="flex flex-col gap-3 -mt-2">
              {notifications.map(n => (
                <GlassCard
                  key={n.id}
                  onClick={() => {
                    markNotificationRead(n.id)
                    if (n.id === 'n1') navigate('/patient/assessment')
                  }}
                  className={`p-4 flex gap-4 items-start ${n.read ? 'opacity-60' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.read ? 'bg-surface-container' : 'bg-primary/10'}`}>
                    <Icon name={n.icon} className={n.read ? 'text-outline' : 'text-primary'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-semibold text-on-surface text-sm">{locale === 'zh' ? n.titleZh : n.titleEn}</h2>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{locale === 'zh' ? n.bodyZh : n.bodyEn}</p>
                    <span className="text-xs text-outline mt-2 block">{locale === 'zh' ? n.timeZh : n.timeEn}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </main>
      </PatientLayout>
    </>
  )
}
