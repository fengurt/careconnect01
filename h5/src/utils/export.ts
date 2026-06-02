export function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadCsv(content: string, filename: string) {
  downloadFile('\uFEFF' + content, filename, 'text/csv;charset=utf-8')
}

export function downloadText(content: string, filename: string) {
  downloadFile(content, filename, 'text/plain;charset=utf-8')
}
