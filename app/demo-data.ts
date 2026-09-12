export type View = "workspace" | "topics" | "editor" | "tasks" | "insights" | "knowledge"
export type OutputMode = "human" | "aigc"
export type BusyAction = "material" | "today" | "script" | "check" | null
export type ScoreKey = "customer" | "market" | "history" | "product"

export type Topic = {
  id: number
  title: string
  score: number
  scores: Record<ScoreKey, number>
  reason: string
  audience: string
  pain: string
  elder: string
  barrier: string
  format: string
  conversion: string
  signals: string[]
}

export type ScriptShot = {
  id: number
  duration: string
  shot: string
  purpose: string
  visual: string
  speech: string
  caption: string
  note: string
}

export const STORAGE_KEY = "lianying-content-desk-demo-v1"

export const sampleMaterial =
  "我父亲长期卧床，现在主要是我妈妈一个人在照顾。白天还好，最难的是晚上要反复帮他翻身，一个人特别吃力。我们也看过护理床，但担心送到家之后安装麻烦，老人又学不会操作，所以一直没有决定。"

export const materialInsights = [
  { label: "开始寻找的原因", value: "长期卧床，夜间需要家属反复协助翻身", color: "var(--signal-customer)" },
  { label: "老人具体情况", value: "行动受限，日常体位调整需要一位家属协助", color: "var(--signal-history)" },
  { label: "迟迟不下单的阻力", value: "担心送装流程复杂，也担心家里人学不会操作", color: "var(--signal-product)" },
]

export const evidence = [
  {
    id: "01",
    label: "客户需求",
    color: "var(--signal-customer)",
    title: "夜间翻身负担上升",
    detail: "演示样本中，照护者最明确的困难是夜间独自协助翻身。",
  },
  {
    id: "02",
    label: "同行内容",
    color: "var(--signal-market)",
    title: "真实照护冲突更易停留",
    detail: "演示洞察显示，前 3 秒直接进入照护动作比产品介绍更容易留住目标人群。",
  },
  {
    id: "03",
    label: "历史反馈",
    color: "var(--signal-history)",
    title: "痛点内容曾带来咨询",
    detail: "两条同类演示记录播放量一般，但分别带来 2 次与 3 次高意向咨询。",
  },
  {
    id: "04",
    label: "产品知识",
    color: "var(--signal-product)",
    title: "3 条演示口径可用于生成",
    detail: "体位调节、送装指导与不替代专业护理三条口径已加入演示知识。",
  },
]

export const topics: Topic[] = [
  {
    id: 1,
    title: "夜里一个人给老人翻身，到底有多累？",
    score: 91,
    scores: { customer: 95, market: 82, history: 90, product: 94 },
    reason: "同时命中夜间照护负担和安装操作顾虑，适合用真实场景建立共鸣，再自然带出产品介入与咨询。",
    audience: "独自照护长期卧床老人的配偶或子女",
    pain: "夜间反复起身，单人翻身费力且休息被打断",
    elder: "长期卧床、行动受限，需要协助调整体位",
    barrier: "担心安装麻烦、家人不会操作",
    format: "真人场景优先",
    conversion: "询问送装流程或预约体验",
    signals: ["01 客户原话", "02 同行开场结构", "03 两次转化记录", "04 已确认演示口径"],
  },
  {
    id: 2,
    title: "护理床送到家以后，安装和教会家人有多难？",
    score: 86,
    scores: { customer: 88, market: 78, history: 86, product: 92 },
    reason: "直接回应当前上升的购买阻力，适合用送装流程和操作指导降低决策焦虑。",
    audience: "已经了解护理床、仍在比较服务流程的家庭",
    pain: "担心买回家后没人装、不会用",
    elder: "居家照护，需要家属频繁操作护理床",
    barrier: "服务流程不透明",
    format: "真人讲解",
    conversion: "咨询当地配送与安装",
    signals: ["01 近期购买阻力", "03 顾虑消除内容", "04 送装演示口径"],
  },
  {
    id: 3,
    title: "长期卧床的老人，一天里哪些照护动作最费力？",
    score: 84,
    scores: { customer: 90, market: 76, history: 80, product: 88 },
    reason: "覆盖更完整的照护日常，容易被目标家庭保存，但购买意图不如第一条集中。",
    audience: "刚开始承担居家照护的家属",
    pain: "翻身、起背与日常清洁需要反复协助",
    elder: "长期卧床或活动能力受限",
    barrier: "还没有明确意识到辅助设备的价值",
    format: "真人纪实",
    conversion: "私信描述老人情况",
    signals: ["01 长期照护需求", "02 一日记录形式", "04 适用场景口径"],
  },
  {
    id: 4,
    title: "买护理床前，先确认家里这 3 个条件",
    score: 82,
    scores: { customer: 78, market: 72, history: 83, product: 95 },
    reason: "事实边界清楚，适合做决策清单；客户痛点共鸣较弱，更适合作为承接型内容。",
    audience: "已经进入产品比较阶段的家庭",
    pain: "不知道如何判断产品是否适合家中场景",
    elder: "需要长期居家照护",
    barrier: "尺寸、使用者和照护方式尚未确认",
    format: "AIGC 图文动画",
    conversion: "提交家庭场景信息获得建议",
    signals: ["01 决策疑问", "02 清单型结构", "04 使用限制口径"],
  },
]

export const segments = [
  { id: "night-care", eyebrow: "照护者痛点", title: "一个人夜间照护，翻身太累", detail: "从配偶连续被叫醒、一个人用力的真实动作切入。" },
  { id: "long-term", eyebrow: "老人情况", title: "长期卧床，体位调整需要协助", detail: "解释日常体位调整为什么成为长期照护负担。" },
  { id: "installation", eyebrow: "购买阻力", title: "想买，但担心送装和操作太复杂", detail: "用服务过程和操作演示消除最后一步顾虑。" },
]

export const initialShots: ScriptShot[] = [
  {
    id: 1,
    duration: "0–3s",
    shot: "近景 / 固定",
    purpose: "Hook",
    visual: "夜灯下，照护者从床边起身，双手准备协助老人翻身。镜头只拍动作和疲惫神态。",
    speech: "夜里一个人给卧床老人翻身，到底有多累？",
    caption: "一个人夜间照护，最怕反复翻身",
    note: "避免呈现老人隐私；动作由工作人员安全示范。",
  },
  {
    id: 2,
    duration: "3–9s",
    shot: "中景 / 轻推",
    purpose: "痛点场景",
    visual: "照护者俯身调整老人身体位置，停顿后揉腰，画面保留真实环境声。",
    speech: "白天还能轮着照看，到了晚上，一次翻身就可能把两个人都折腾醒。",
    caption: "夜间反复起身 · 单人照护费力",
    note: "不强化痛苦表情，不制造恐惧感。",
  },
  {
    id: 3,
    duration: "9–17s",
    shot: "侧面中近景",
    purpose: "产品介入",
    visual: "照护者站在床侧，演示通过护理床调节床面，配合完成体位调整。",
    speech: "这张床能彻底解决卧床老人翻身问题。",
    caption: "护理床介入日常体位调整",
    note: "此处预置一处宣传合规风险，等待检测。",
  },
  {
    id: 4,
    duration: "17–25s",
    shot: "特写 / 跟随",
    purpose: "功能展示",
    visual: "特写操作区域，再切到床面缓慢变化；照护者始终在旁扶护。",
    speech: "它还支持全自动静音侧翻，一键就能完成。",
    caption: "操作过程清楚可见",
    note: "此处预置一处无已确认知识依据的功能表述。",
  },
  {
    id: 5,
    duration: "25–33s",
    shot: "双人中景",
    purpose: "顾虑消除",
    visual: "服务人员完成基础操作演示，家属跟着操作一次并点头确认。",
    speech: "送到家后，会完成安装和基础操作指导；具体服务以当地确认结果为准。",
    caption: "送装与操作指导 · 下单前先确认当地服务",
    note: "送装口径使用演示知识，正式发布前需连盈业务确认。",
  },
  {
    id: 6,
    duration: "33–40s",
    shot: "正面中景 / 固定",
    purpose: "CTA",
    visual: "出镜人站在护理床旁，画面右侧留出字幕位置。",
    speech: "如果你也在一个人照护家里的老人，可以把老人情况和所在城市发给我们，先确认适不适合。",
    caption: "留言：老人情况 + 所在城市",
    note: "CTA 引导咨询，不承诺适用结果。",
  },
]

export const safeSpeech: Record<number, string> = {
  3: "护理床的体位调节功能，可以帮助减轻日常翻身照护负担。",
  4: "可通过护理床的辅助侧翻结构配合完成体位调整，具体操作以对应型号说明为准。",
}

export const aigcScenes = [
  { id: "A01", duration: "0–3s", title: "夜间照护冲突", prompt: "中国普通家庭卧室，暖色夜灯，一位 55 岁左右女性照护者从折叠椅起身，走到长期卧床老人的护理床边，疲惫但克制，近景固定镜头，写实纪录片质感，真实皮肤与家居细节，竖屏 9:16。", voice: "夜里一个人给卧床老人翻身，到底有多累？" },
  { id: "A02", duration: "3–9s", title: "单人照护负担", prompt: "同一卧室、同一人物与服装，照护者俯身协助老人调整体位，动作缓慢且符合安全照护常识，中景轻微前推，不展示敏感身体部位，不夸张痛苦表情。", voice: "白天还能轮着照看，到了晚上，一次翻身就可能把两个人都折腾醒。" },
  { id: "A03", duration: "9–22s", title: "产品介入", prompt: "同一人物使用外观简洁的居家护理床，展示床面辅助体位调整过程，照护者全程在旁扶护，特写操作区域与床面变化，柔和自然光，产品结构前后一致，不出现品牌和虚构参数。", voice: "护理床的体位调节功能，可以帮助减轻日常翻身照护负担。" },
  { id: "A04", duration: "22–33s", title: "顾虑消除", prompt: "白天的同一卧室，服务人员向家属演示基础操作，家属亲手完成一次操作，双人中景，画面干净克制，真实服务记录感，不出现夸张手势或销售横幅。", voice: "送到家后，可完成安装和基础操作指导；具体服务以下单前确认结果为准。" },
  { id: "A05", duration: "33–40s", title: "咨询 CTA", prompt: "出镜人站在护理床旁，正面中景，右侧保留字幕安全区，光线柔和，语气平实可信，镜头固定，结尾停留两秒。", voice: "把老人情况和所在城市发给我们，先确认家里的照护场景是否适合。" },
]

export const knowledgeItems = [
  { id: "KB-01", type: "适用口径", title: "辅助日常体位调整", body: "护理床的可调节床面可用于辅助日常体位调整，不能表述为治疗或彻底解决健康问题。", source: "演示知识 · 待连盈业务复核", status: "演示确认" },
  { id: "KB-02", type: "服务口径", title: "送装与基础操作指导", body: "可表达为提供安装与基础操作指导，但具体范围、地区和时间以下单前确认结果为准。", source: "演示知识 · 待连盈业务复核", status: "演示确认" },
  { id: "KB-03", type: "限制口径", title: "不替代专业医疗护理", body: "内容不得暗示护理床替代诊疗、康复方案或专业照护建议；老人情况特殊时应咨询专业人员。", source: "MVP 安全约束", status: "启用" },
  { id: "KB-04", type: "待确认功能", title: "全自动静音侧翻", body: "当前没有型号、参数或说明书依据，不得用于脚本和对外宣传。", source: "本轮事实检测反例", status: "不可使用" },
]

export const scoreMeta: Record<ScoreKey, { label: string; weight: string; color: string }> = {
  customer: { label: "客户需求匹配", weight: "35%", color: "var(--signal-customer)" },
  market: { label: "同行验证程度", weight: "20%", color: "var(--signal-market)" },
  history: { label: "历史转化潜力", weight: "25%", color: "var(--signal-history)" },
  product: { label: "产品能力匹配", weight: "20%", color: "var(--signal-product)" },
}
