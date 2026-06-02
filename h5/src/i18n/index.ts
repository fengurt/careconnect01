export type Locale = 'zh' | 'en'

export interface Translations {
  appName: string
  appTagline: string
  langToggle: string
  studyId: string
  // Roles
  rolePatient: string
  rolePatientDesc: string
  roleClinical: string
  roleClinicalDesc: string
  roleResearch: string
  roleResearchDesc: string
  enterAs: string
  // Secure entry
  secureTitle: string
  secureSubtitle: string
  privacyMode: string
  privacyModeOn: string
  enterPin: string
  useBiometric: string
  wrongPin: string
  // Nav
  navHome: string
  navAssessment: string
  navWisdom: string
  navProfile: string
  navCohort: string
  navAnalytics: string
  navExport: string
  // Home
  greeting: string
  greetingSub: string
  recoveryJourney: string
  chemoCycle: string
  dayOf: string
  hydrating: string
  todayTasks: string
  taskAssessment: string
  taskAssessmentHint: string
  taskWisdom: string
  taskWisdomDone: string
  dailyMessage: string
  dailyMessageBody: string
  dailyMessageHighlight: string
  streak: string
  streakDays: string
  // Assessment
  assessmentTitle: string
  stepOf: string
  scoreHint: string
  next: string
  previous: string
  submit: string
  skip: string
  successTitle: string
  successBody: string
  backHome: string
  // Wisdom
  wisdomTitle: string
  wisdomSubtitle: string
  readMore: string
  // Profile
  profileTitle: string
  privacyProtected: string
  studyEnrollment: string
  language: string
  logout: string
  switchRole: string
  // Clinical
  clinicalDashboard: string
  activePatients: string
  critical: string
  elevated: string
  stable: string
  triageQueue: string
  lastAssessment: string
  viewProfile: string
  logIntervention: string
  interventionTitle: string
  interventionType: string
  teleConsult: string
  pathwayUpdate: string
  notes: string
  save: string
  actionLogged: string
  symptomTrend: string
  sevenDayTrend: string
  regimen: string
  // Research
  analyticsTitle: string
  complianceRate: string
  cohortHealth: string
  exportTitle: string
  exportSubtitle: string
  exportCsv: string
  exportXlsx: string
  exportPdf: string
  generating: string
  exportReady: string
  downloadStarted: string
  // Assessment review
  reviewTitle: string
  reviewSubtitle: string
  confirmSubmit: string
  avgScore: string
  highestSymptom: string
  viewResults: string
  retakeAssessment: string
  assessmentHistory: string
  reflectionPrompt: string
  viewWisdom: string
  // Notifications
  notificationsTitle: string
  markAllRead: string
  noNotifications: string
  // Wisdom article
  articleDone: string
  // Clinical
  filterAll: string
  searchPlaceholder: string
  callClinic: string
  symptomBreakdown: string
  scheduleFollowUp: string
  medicationAdjust: string
  submitIntervention: string
  backToCohort: string
  backToPatient: string
  interventionSuccessTitle: string
  interventionSuccessBody: string
  viewQueue: string
  recentInterventions: string
  // Auth
  login: string
  loggingIn: string
  username: string
  password: string
  usernamePlaceholder: string
  passwordPlaceholder: string
  loginError: string
  adminHub: string
  adminHubDesc: string
  systemAdmin: string
  orgAdmin: string
  externalUser: string
  userManagement: string
  userManagementDesc: string
  resetPassword: string
  resetPasswordFor: string
  newPasswordPlaceholder: string
  passwordResetSuccess: string
  passwordResetFailed: string
  saving: string
  back: string
  adminConsole: string
  // Symptoms
  symptoms: Record<string, string>
}

export const zh: Translations = {
  appName: 'CareConnect ePRO',
  appTagline: '关怀连接 · 临床试验症状自报平台',
  langToggle: 'EN',
  studyId: '研究 C-194',
  rolePatient: '患者端',
  rolePatientDesc: '宁静疗愈空间 · 症状自报与康复追踪',
  roleClinical: '临床端',
  roleClinicalDesc: '队列指挥中心 · 分诊与干预记录',
  roleResearch: '研究端',
  roleResearchDesc: '人群分析 · 合规数据导出',
  enterAs: '选择入口',
  secureTitle: '安全进入',
  secureSubtitle: '您的数据受隐私保护模式加密',
  privacyMode: '隐私保护模式',
  privacyModeOn: '隐私模式已开启',
  enterPin: '请输入 4 位 PIN 码',
  useBiometric: '使用生物识别',
  wrongPin: 'PIN 码不正确，请重试',
  navHome: '首页',
  navAssessment: '评估',
  navWisdom: '知识',
  navProfile: '我的',
  navCohort: '队列',
  navAnalytics: '分析',
  navExport: '导出',
  greeting: '你好，',
  greetingSub: '今天是自我关怀的绝佳日子。',
  recoveryJourney: '康复旅程',
  chemoCycle: '化疗周期 2',
  dayOf: '第 3 天 / 共 7 天',
  hydrating: '补水中',
  todayTasks: '今日待办',
  taskAssessment: '完成 T1 症状评估',
  taskAssessmentHint: '建议尽快完成',
  taskWisdom: '阅读疲劳管理建议',
  taskWisdomDone: '已完成',
  dailyMessage: '每日寄语',
  dailyMessageBody: '休息不仅是停止活动，更是身体在积极自我修复的过程。',
  dailyMessageHighlight: '今天请允许自己多休息一会儿。',
  streak: '连续打卡',
  streakDays: '天',
  assessmentTitle: '禅意评估',
  stepOf: '步骤',
  scoreHint: '0 代表无症状，10 代表极度不适。',
  next: '下一步',
  previous: '上一步',
  submit: '提交评估',
  skip: '跳过',
  successTitle: '评估已完成',
  successBody: '感谢您今天的自我关怀。护理团队已收到您的报告。',
  backHome: '返回首页',
  wisdomTitle: '疗愈智慧',
  wisdomSubtitle: '为您量身定制的护理建议',
  readMore: '阅读全文',
  profileTitle: '我的',
  privacyProtected: '隐私保护已启用',
  studyEnrollment: '入组研究',
  language: '语言',
  logout: '退出登录',
  switchRole: '切换角色',
  clinicalDashboard: '临床指挥中心',
  activePatients: '在组患者',
  critical: '危急',
  elevated: '升高',
  stable: '稳定',
  triageQueue: '分诊队列',
  lastAssessment: '最近评估',
  viewProfile: '查看档案',
  logIntervention: '记录干预',
  interventionTitle: '干预记录',
  interventionType: '干预类型',
  teleConsult: '远程会诊',
  pathwayUpdate: '更新护理路径',
  notes: '备注',
  save: '保存',
  actionLogged: '干预已记录',
  symptomTrend: '症状趋势',
  sevenDayTrend: '7 日趋势',
  regimen: '治疗方案',
  analyticsTitle: '人群分析',
  complianceRate: '合规率',
  cohortHealth: '队列健康指数',
  exportTitle: '数据导出',
  exportSubtitle: '生成符合监管要求的试验数据集',
  exportCsv: '导出 CSV',
  exportXlsx: '导出 XLSX',
  exportPdf: '导出 PDF',
  generating: '正在生成…',
  exportReady: '导出文件已就绪',
  downloadStarted: '下载已开始',
  reviewTitle: '确认您的评估',
  reviewSubtitle: '提交前请核对各项评分',
  confirmSubmit: '确认并提交',
  avgScore: '平均评分',
  highestSymptom: '最高症状',
  viewResults: '查看结果',
  retakeAssessment: '重新评估',
  assessmentHistory: '评估历史',
  reflectionPrompt: '今天，您为自己留出了一点时间。这本身就是一种治愈。',
  viewWisdom: '阅读护理建议',
  notificationsTitle: '通知',
  markAllRead: '全部标为已读',
  noNotifications: '暂无通知',
  articleDone: '我已阅读',
  filterAll: '全部',
  searchPlaceholder: '搜索患者编号…',
  callClinic: '联系诊所',
  symptomBreakdown: '症状明细',
  scheduleFollowUp: '安排随访',
  medicationAdjust: '药物调整',
  submitIntervention: '提交干预记录',
  backToCohort: '返回队列',
  backToPatient: '返回患者档案',
  interventionSuccessTitle: '干预已记录',
  interventionSuccessBody: '护理路径已更新，患者将在随访队列中收到通知。',
  viewQueue: '查看分诊队列',
  recentInterventions: '近期干预',
  login: '登录',
  loggingIn: '登录中…',
  username: '账号',
  password: '密码',
  usernamePlaceholder: '请输入账号',
  passwordPlaceholder: '请输入密码',
  loginError: '账号或密码不正确',
  adminHub: '管理控制台',
  adminHubDesc: '选择要进入的业务端，或管理用户账号。',
  systemAdmin: '系统管理员',
  orgAdmin: '组织管理员',
  externalUser: '外部用户',
  userManagement: '用户管理',
  userManagementDesc: '管理员可重置外部用户及下级管理员密码。',
  resetPassword: '重置密码',
  resetPasswordFor: '重置账号',
  newPasswordPlaceholder: '新密码（至少 6 位）',
  passwordResetSuccess: '密码已重置',
  passwordResetFailed: '重置失败，请检查权限',
  saving: '保存中…',
  back: '返回',
  adminConsole: '控制台',
  symptoms: {
    pain: '疼痛',
    fatigue: '疲劳',
    nausea: '恶心',
    sleep: '睡眠障碍',
    distress: '心理困扰',
    breath: '呼吸短促',
    memory: '记忆困难',
    appetite: '食欲缺乏',
    drowsiness: '嗜睡',
    dryMouth: '口干',
  },
}

export const en: Translations = {
  appName: 'CareConnect ePRO',
  appTagline: 'Compassionate symptom reporting for clinical trials',
  langToggle: '中文',
  studyId: 'Study C-194',
  rolePatient: 'Patient',
  rolePatientDesc: 'Serene Sanctuary · Symptom reporting & recovery tracking',
  roleClinical: 'Clinical',
  roleClinicalDesc: 'Cohort Command Center · Triage & intervention logging',
  roleResearch: 'Research',
  roleResearchDesc: 'Population analytics · Regulatory data export',
  enterAs: 'Choose entry',
  secureTitle: 'Secure Entry',
  secureSubtitle: 'Your data is protected by Privacy Mode encryption',
  privacyMode: 'Privacy Protected Mode',
  privacyModeOn: 'Privacy mode enabled',
  enterPin: 'Enter your 4-digit PIN',
  useBiometric: 'Use biometrics',
  wrongPin: 'Incorrect PIN, please try again',
  navHome: 'Home',
  navAssessment: 'Assess',
  navWisdom: 'Wisdom',
  navProfile: 'Me',
  navCohort: 'Cohort',
  navAnalytics: 'Analytics',
  navExport: 'Export',
  greeting: 'Hello, ',
  greetingSub: 'Today is a great day for self-care.',
  recoveryJourney: 'Healing Path',
  chemoCycle: 'Chemo Cycle 2',
  dayOf: 'Day 3 of 7',
  hydrating: 'Hydrating',
  todayTasks: 'Today\'s Tasks',
  taskAssessment: 'Complete T1 symptom assessment',
  taskAssessmentHint: 'Recommended soon',
  taskWisdom: 'Read fatigue management tips',
  taskWisdomDone: 'Completed',
  dailyMessage: 'Daily Wisdom',
  dailyMessageBody: 'Rest is not just stopping activity—it is your body actively healing.',
  dailyMessageHighlight: 'Allow yourself extra rest today.',
  streak: 'Streak',
  streakDays: 'days',
  assessmentTitle: 'Zen Assessment',
  stepOf: 'Step',
  scoreHint: '0 = no symptom, 10 = worst imaginable.',
  next: 'Next',
  previous: 'Back',
  submit: 'Submit',
  skip: 'Skip',
  successTitle: 'Assessment Complete',
  successBody: 'Thank you for your self-care today. Your care team has received your report.',
  backHome: 'Back to Home',
  wisdomTitle: 'Healing Wisdom',
  wisdomSubtitle: 'Care tips tailored to your profile',
  readMore: 'Read more',
  profileTitle: 'Profile',
  privacyProtected: 'Privacy protection enabled',
  studyEnrollment: 'Enrolled study',
  language: 'Language',
  logout: 'Sign out',
  switchRole: 'Switch role',
  clinicalDashboard: 'Clinical Command Center',
  activePatients: 'Active',
  critical: 'Critical',
  elevated: 'Elevated',
  stable: 'Stable',
  triageQueue: 'Triage Queue',
  lastAssessment: 'Last assessment',
  viewProfile: 'View profile',
  logIntervention: 'Log intervention',
  interventionTitle: 'Intervention Log',
  interventionType: 'Intervention type',
  teleConsult: 'Tele-consult',
  pathwayUpdate: 'Care pathway update',
  notes: 'Notes',
  save: 'Save',
  actionLogged: 'Intervention logged',
  symptomTrend: 'Symptom trend',
  sevenDayTrend: '7-day trend',
  regimen: 'Regimen',
  analyticsTitle: 'Population Analytics',
  complianceRate: 'Compliance',
  cohortHealth: 'Cohort Health Index',
  exportTitle: 'Data Export',
  exportSubtitle: 'Generate trial datasets for regulatory reporting',
  exportCsv: 'Export CSV',
  exportXlsx: 'Export XLSX',
  exportPdf: 'Export PDF',
  generating: 'Generating…',
  exportReady: 'Export ready',
  downloadStarted: 'Download started',
  reviewTitle: 'Review your assessment',
  reviewSubtitle: 'Please verify scores before submitting',
  confirmSubmit: 'Confirm & submit',
  avgScore: 'Average score',
  highestSymptom: 'Highest symptom',
  viewResults: 'View results',
  retakeAssessment: 'Retake assessment',
  assessmentHistory: 'Assessment history',
  reflectionPrompt: 'Today you made space for yourself. That is healing.',
  viewWisdom: 'Read care tips',
  notificationsTitle: 'Notifications',
  markAllRead: 'Mark all read',
  noNotifications: 'No notifications',
  articleDone: 'Done reading',
  filterAll: 'All',
  searchPlaceholder: 'Search patient ID…',
  callClinic: 'Call clinic',
  symptomBreakdown: 'Symptom breakdown',
  scheduleFollowUp: 'Schedule follow-up',
  medicationAdjust: 'Medication adjust',
  submitIntervention: 'Submit intervention',
  backToCohort: 'Back to queue',
  backToPatient: 'Back to profile',
  interventionSuccessTitle: 'Intervention logged',
  interventionSuccessBody: 'Care pathway updated. Patient will be notified in follow-up queue.',
  viewQueue: 'View triage queue',
  recentInterventions: 'Recent interventions',
  login: 'Sign in',
  loggingIn: 'Signing in…',
  username: 'Username',
  password: 'Password',
  usernamePlaceholder: 'Enter username',
  passwordPlaceholder: 'Enter password',
  loginError: 'Invalid username or password',
  adminHub: 'Admin Console',
  adminHubDesc: 'Choose a portal or manage user accounts.',
  systemAdmin: 'System Admin',
  orgAdmin: 'Org Admin',
  externalUser: 'External User',
  userManagement: 'User Management',
  userManagementDesc: 'Admins can reset passwords for managed accounts.',
  resetPassword: 'Reset password',
  resetPasswordFor: 'Reset password for',
  newPasswordPlaceholder: 'New password (min 6 chars)',
  passwordResetSuccess: 'Password reset successfully',
  passwordResetFailed: 'Reset failed — check permissions',
  saving: 'Saving…',
  back: 'Back',
  adminConsole: 'Console',
  symptoms: {
    pain: 'Pain',
    fatigue: 'Fatigue',
    nausea: 'Nausea',
    sleep: 'Disturbed sleep',
    distress: 'Distress',
    breath: 'Shortness of breath',
    memory: 'Memory problems',
    appetite: 'Lack of appetite',
    drowsiness: 'Drowsiness',
    dryMouth: 'Dry mouth',
  },
}

export const dictionaries = { zh, en }

export function t(locale: Locale): Translations {
  return dictionaries[locale]
}
