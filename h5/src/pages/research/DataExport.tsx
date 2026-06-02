import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ResearchLayout } from '../../components/layout'
import { Icon } from '../../components/ui'
import { buildExportCsv, MOCK_PATIENTS } from '../../data/mock'
import { downloadCsv, downloadText } from '../../utils/export'

type ExportFormat = 'csv' | 'xlsx' | 'pdf' | null

export default function DataExport() {
  const { tr, logout } = useApp()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<ExportFormat>(null)
  const [done, setDone] = useState<ExportFormat>(null)

  const handleExport = async (format: NonNullable<ExportFormat>) => {
    setLoading(format)
    setDone(null)
    await new Promise(r => setTimeout(r, 800))

    const date = new Date().toISOString().slice(0, 10)
    const base = `careconnect_C-194_${date}`

    if (format === 'csv') {
      downloadCsv(buildExportCsv(), `${base}.csv`)
    } else if (format === 'xlsx') {
      downloadCsv(buildExportCsv(), `${base}.xlsx`)
    } else {
      const lines = [
        'CareConnect ePRO — Study C-194 Export',
        `Generated: ${new Date().toLocaleString()}`,
        '',
        ...MOCK_PATIENTS.map(p => `${p.id} | ${p.aliasEn} | ${p.risk} | score=${p.lastScore} | ${p.regimen}`),
      ]
      downloadText(lines.join('\n'), `${base}.pdf.txt`)
    }

    setLoading(null)
    setDone(format)
  }

  const formats = [
    { id: 'csv' as const, label: tr.exportCsv, icon: 'table' },
    { id: 'xlsx' as const, label: tr.exportXlsx, icon: 'grid_on' },
    { id: 'pdf' as const, label: tr.exportPdf, icon: 'picture_as_pdf' },
  ]

  return (
    <ResearchLayout>
      <h1 className="text-xl font-bold text-on-surface mb-2">{tr.exportTitle}</h1>
      <p className="text-on-surface-variant text-sm mb-6">{tr.exportSubtitle}</p>

      <div className="bg-white rounded-xl p-4 border border-surface-variant mb-6 text-sm">
        <div className="flex justify-between py-2 border-b border-surface-variant">
          <span className="text-on-surface-variant">{tr.studyId}</span>
          <span className="font-medium">C-194</span>
        </div>
        <div className="flex justify-between py-2 border-b border-surface-variant">
          <span className="text-on-surface-variant">{tr.activePatients}</span>
          <span className="font-medium">45</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-on-surface-variant">{tr.complianceRate}</span>
          <span className="font-medium">89%</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {formats.map(fmt => (
          <button
            key={fmt.id}
            type="button"
            disabled={loading !== null}
            onClick={() => handleExport(fmt.id)}
            className="w-full min-h-[56px] rounded-xl bg-white border border-surface-variant flex items-center gap-4 px-5 active:scale-[0.99] disabled:opacity-60"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={fmt.icon} className="text-primary" />
            </div>
            <span className="flex-1 text-left font-medium">{fmt.label}</span>
            {loading === fmt.id && <span className="text-xs text-secondary animate-pulse">{tr.generating}</span>}
            {done === fmt.id && (
              <span className="text-xs text-primary flex items-center gap-1">
                <Icon name="check_circle" className="text-sm" />
                {tr.downloadStarted}
              </span>
            )}
          </button>
        ))}
      </div>

      <button type="button" onClick={async () => { await logout(); navigate('/login', { replace: true }) }} className="w-full min-h-[48px] rounded-xl border border-outline-variant text-sm font-medium text-on-surface-variant">
        {tr.logout}
      </button>
    </ResearchLayout>
  )
}
