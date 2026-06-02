export type UserRole = 'patient' | 'clinical' | 'research'
export type RiskLevel = 'critical' | 'elevated' | 'stable'
export type InterventionType = 'teleConsult' | 'pathwayUpdate' | 'medicationAdjust'

export interface MdasiSymptom {
  id: string
  icon: string
}

export const MDASI_SYMPTOMS: MdasiSymptom[] = [
  { id: 'pain', icon: 'healing' },
  { id: 'fatigue', icon: 'battery_alert' },
  { id: 'nausea', icon: 'sick' },
  { id: 'sleep', icon: 'bedtime' },
  { id: 'distress', icon: 'psychology' },
  { id: 'breath', icon: 'air' },
  { id: 'memory', icon: 'neurology' },
  { id: 'appetite', icon: 'restaurant' },
  { id: 'drowsiness', icon: 'snooze' },
  { id: 'dryMouth', icon: 'water_drop' },
]

export interface PatientRecord {
  id: string
  alias: string
  aliasEn: string
  risk: RiskLevel
  lastScore: number
  lastAssessment: string
  lastAssessmentEn: string
  regimen: string
  trend: number[]
  symptoms: Record<string, number>
}

export const MOCK_PATIENTS: PatientRecord[] = [
  {
    id: 'P-001', alias: '患者 A', aliasEn: 'Patient A', risk: 'critical', lastScore: 8.2,
    lastAssessment: '2 小时前', lastAssessmentEn: '2h ago', regimen: 'FOLFOX',
    trend: [4, 5, 6, 7, 8, 8, 8.2],
    symptoms: { pain: 9, fatigue: 8, nausea: 7, sleep: 6, distress: 5, breath: 4, memory: 3, appetite: 6, drowsiness: 7, dryMouth: 5 },
  },
  {
    id: 'P-002', alias: '患者 B', aliasEn: 'Patient B', risk: 'elevated', lastScore: 5.4,
    lastAssessment: '5 小时前', lastAssessmentEn: '5h ago', regimen: 'AC-T',
    trend: [3, 3, 4, 4, 5, 5, 5.4],
    symptoms: { pain: 4, fatigue: 6, nausea: 5, sleep: 5, distress: 4, breath: 3, memory: 4, appetite: 5, drowsiness: 6, dryMouth: 4 },
  },
  {
    id: 'P-003', alias: '患者 C', aliasEn: 'Patient C', risk: 'stable', lastScore: 2.1,
    lastAssessment: '1 天前', lastAssessmentEn: '1d ago', regimen: 'FOLFOX',
    trend: [2, 2, 3, 2, 2, 2, 2.1],
    symptoms: { pain: 2, fatigue: 3, nausea: 1, sleep: 2, distress: 2, breath: 1, memory: 2, appetite: 2, drowsiness: 3, dryMouth: 2 },
  },
  {
    id: 'P-004', alias: '患者 D', aliasEn: 'Patient D', risk: 'elevated', lastScore: 6.0,
    lastAssessment: '3 小时前', lastAssessmentEn: '3h ago', regimen: 'Paclitaxel',
    trend: [4, 4, 5, 5, 6, 6, 6],
    symptoms: { pain: 5, fatigue: 7, nausea: 4, sleep: 5, distress: 4, breath: 3, memory: 5, appetite: 4, drowsiness: 5, dryMouth: 3 },
  },
  {
    id: 'P-005', alias: '患者 E', aliasEn: 'Patient E', risk: 'stable', lastScore: 1.8,
    lastAssessment: '6 小时前', lastAssessmentEn: '6h ago', regimen: 'AC-T',
    trend: [2, 1, 2, 1, 2, 2, 1.8],
    symptoms: { pain: 1, fatigue: 2, nausea: 1, sleep: 2, distress: 1, breath: 1, memory: 2, appetite: 2, drowsiness: 2, dryMouth: 1 },
  },
]

export interface WisdomArticle {
  id: string
  icon: string
  titleZh: string
  titleEn: string
  summaryZh: string
  summaryEn: string
  bodyZh: string[]
  bodyEn: string[]
  category: string
}

export const WISDOM_ARTICLES: WisdomArticle[] = [
  {
    id: '1',
    icon: 'self_improvement',
    titleZh: '化疗期间如何管理疲劳',
    titleEn: 'Managing fatigue during chemotherapy',
    summaryZh: '少量多次活动、规律小憩，比长时间卧床更有助于恢复精力。',
    summaryEn: 'Short, frequent activity and regular naps help more than prolonged bed rest.',
    bodyZh: [
      '疲劳是化疗最常见的不适之一。完全卧床反而可能加重乏力感。',
      '建议：每天分 3–4 次进行 5–10 分钟的轻度活动，如室内散步或拉伸。',
      '在精力最好的时段处理重要事务；感到困倦时允许自己小憩 20–30 分钟。',
      '保持充足水分与均衡蛋白摄入，有助于维持肌肉量与恢复力。',
    ],
    bodyEn: [
      'Fatigue is one of the most common side effects of chemotherapy. Complete bed rest can worsen exhaustion.',
      'Try 5–10 minutes of light activity 3–4 times daily—indoor walks or gentle stretching.',
      'Schedule important tasks when energy is highest; allow 20–30 minute naps when drowsy.',
      'Stay hydrated and include adequate protein to support muscle and recovery.',
    ],
    category: 'fatigue',
  },
  {
    id: '2',
    icon: 'restaurant',
    titleZh: '恶心时的饮食建议',
    titleEn: 'Nutrition tips when nauseous',
    summaryZh: '选择清淡、温凉的小份食物，避免空腹过久。',
    summaryEn: 'Choose bland, cool small meals and avoid long fasting periods.',
    bodyZh: [
      '空腹会加重恶心感。醒来后可先吃少量苏打饼干或吐司。',
      '优选温凉、少油、少香料的食物；避免一次进食过多。',
      '姜茶或含姜零食对部分患者有缓解作用，可咨询护士后尝试。',
      '若 24 小时内无法进食，请通过应用联系护理团队。',
    ],
    bodyEn: [
      'An empty stomach worsens nausea. Try a few crackers or toast upon waking.',
      'Prefer cool, bland, low-fat foods; avoid large meals at once.',
      'Ginger tea or ginger snacks may help—check with your nurse first.',
      'If unable to eat for 24 hours, contact your care team through the app.',
    ],
    category: 'nausea',
  },
  {
    id: '3',
    icon: 'water_drop',
    titleZh: '保持充足水分',
    titleEn: 'Staying well hydrated',
    summaryZh: '每日目标 8 杯水，可在床头放置提醒水杯。',
    summaryEn: 'Aim for 8 glasses daily; keep a reminder bottle at bedside.',
    bodyZh: [
      '化疗期间充足饮水有助于肾脏清除代谢物，并缓解口干与便秘。',
      '在床头放置 500ml 水杯，设定每 2 小时小口饮用的提醒。',
      '若白开水难以下咽，可尝试淡味汤品、稀释果汁或电解质饮料。',
      '记录每日饮水量，并在症状评估中如实报告口渴程度。',
    ],
    bodyEn: [
      'Adequate fluids help kidneys clear metabolites and ease dry mouth and constipation.',
      'Keep a 500ml bottle at bedside; sip every 2 hours.',
      'If plain water is difficult, try broth, diluted juice, or electrolyte drinks.',
      'Track daily intake and report thirst honestly in your symptom assessment.',
    ],
    category: 'hydration',
  },
  {
    id: '4',
    icon: 'bedtime',
    titleZh: '改善睡眠质量',
    titleEn: 'Improving sleep quality',
    summaryZh: '固定就寝时间，睡前避免屏幕蓝光。',
    summaryEn: 'Keep a consistent bedtime and avoid screen light before sleep.',
    bodyZh: [
      '建立固定的就寝与起床时间，即使在治疗期间也尽量保持规律。',
      '睡前 1 小时避免手机与电视屏幕；可改为轻柔音乐或阅读。',
      '白天适度活动有助于夜间入睡；但避免睡前 3 小时剧烈运动。',
      '若连续 3 晚严重失眠，请在评估中标注并在备注中说明。',
    ],
    bodyEn: [
      'Maintain consistent bed and wake times throughout treatment when possible.',
      'Avoid screens 1 hour before bed; try soft music or reading instead.',
      'Daytime activity supports night sleep; avoid vigorous exercise within 3 hours of bedtime.',
      'If severely insomnia persists 3 nights, note it in your assessment.',
    ],
    category: 'sleep',
  },
]

export interface AppNotification {
  id: string
  icon: string
  titleZh: string
  titleEn: string
  bodyZh: string
  bodyEn: string
  timeZh: string
  timeEn: string
  read: boolean
}

export const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1', icon: 'assignment', read: false,
    titleZh: '今日症状评估提醒', titleEn: 'Daily assessment reminder',
    bodyZh: '请完成 T1 症状评估，护理团队正在等待您的报告。',
    bodyEn: 'Please complete your T1 symptom assessment. Your care team is waiting.',
    timeZh: '30 分钟前', timeEn: '30 min ago',
  },
  {
    id: 'n2', icon: 'medical_services', read: false,
    titleZh: '护理团队消息', titleEn: 'Message from care team',
    bodyZh: '您的上次评估已收到。如有新发疼痛请及时报告。',
    bodyEn: 'Your last assessment was received. Report any new pain promptly.',
    timeZh: '2 小时前', timeEn: '2h ago',
  },
  {
    id: 'n3', icon: 'celebration', read: true,
    titleZh: '连续打卡 12 天', titleEn: '12-day streak!',
    bodyZh: '坚持自我关怀，您正在康复旅程中稳步前行。',
    bodyEn: 'Keep up your self-care—you are making steady progress.',
    timeZh: '昨天', timeEn: 'Yesterday',
  },
]

export interface InterventionRecord {
  id: string
  patientId: string
  patientAlias: string
  type: InterventionType
  notes: string
  followUp: boolean
  timestamp: string
}

export function getCalmColor(score: number): string {
  if (score <= 3) return 'var(--color-calm-0)'
  if (score <= 6) return 'var(--color-calm-6)'
  return 'var(--color-calm-10)'
}

export function getOrbColor(score: number): string {
  if (score <= 3) return 'var(--color-orb-0)'
  if (score <= 6) return 'var(--color-orb-6)'
  return 'var(--color-orb-10)'
}

export function avgScore(scores: Record<string, number>): number {
  const vals = Object.values(scores)
  if (!vals.length) return 0
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
}

export function highestSymptom(scores: Record<string, number>): string {
  let max = -1
  let id = 'pain'
  for (const [k, v] of Object.entries(scores)) {
    if (v > max) { max = v; id = k }
  }
  return id
}

export function buildExportCsv(): string {
  const header = 'patient_id,alias,risk,last_score,regimen,compliance_pct\n'
  const rows = MOCK_PATIENTS.map(p =>
    `${p.id},${p.aliasEn},${p.risk},${p.lastScore},${p.regimen},${Math.round(85 + Math.random() * 10)}`
  ).join('\n')
  return header + rows
}
