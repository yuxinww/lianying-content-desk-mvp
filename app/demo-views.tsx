"use client"

import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BookOpenText,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock3,
  Copy,
  FileText,
  Flag,
  MessageSquareText,
  MoreHorizontal,
  Play,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  UserRound,
  Video,
  Wand2,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import {
  aigcScenes,
  evidence,
  knowledgeItems,
  materialInsights,
  scoreMeta,
  segments,
  topics,
  type BusyAction,
  type OutputMode,
  type ScoreKey,
  type ScriptShot,
  type Topic,
  type View,
} from "./demo-data"

export function WorkflowRail({ step }: { step: number }) {
  const steps = ["材料", "选题", "细分", "脚本", "发布反馈"]
  return (
    <div className="workflow-rail" aria-label="当前工作进度">
      {steps.map((label, index) => {
        const complete = index < step
        const active = index === step && step < 5
        return (
          <div key={label} className={`workflow-node ${complete ? "is-complete" : ""} ${active ? "is-active" : ""}`}>
            <span>{complete || step === 5 ? <Check className="size-3.5" /> : index + 1}</span>
            <p>{label}</p>
          </div>
        )
      })}
    </div>
  )
}

export function WorkspaceView({
  material,
  setMaterial,
  analysisReady,
  busyAction,
  loadSample,
  runTopicGeneration,
  published,
  feedbackSubmitted,
  strategyValidated,
  goTasks,
  goInsights,
}: {
  material: string
  setMaterial: (value: string) => void
  analysisReady: boolean
  busyAction: BusyAction
  loadSample: () => void
  runTopicGeneration: (source: "material" | "today") => void
  published: boolean
  feedbackSubmitted: boolean
  strategyValidated: boolean
  goTasks: () => void
  goInsights: () => void
}) {
  return (
    <div className="content-wrap home-wrap">
      <div className="page-heading">
        <div>
          <p className="section-index">今日内容决策</p>
          <h1>下一批，值得拍什么？</h1>
        </div>
        <div className="date-stamp"><strong>12</strong><span>SEP · 2026</span></div>
      </div>

      <section className="material-panel" aria-labelledby="material-title">
        <div className="panel-heading">
          <div className="flex items-center gap-2.5">
            <MessageSquareText className="size-[18px] text-[var(--accent-brand)]" strokeWidth={1.6} />
            <h2 id="material-title">基于材料生成</h2>
          </div>
          <span>MATERIAL / 01</span>
        </div>
        <div className="panel-body">
          <label htmlFor="customer-material" className="field-label">客户聊天、同行文案或历史表现说明</label>
          <Textarea
            id="customer-material"
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
            placeholder="粘贴材料……系统会先提炼客户触发原因、老人情况和购买阻力。"
            className="material-input"
          />
          <div className="material-actions">
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="outline" size="sm" onClick={loadSample} className="secondary-control"><FileText strokeWidth={1.6} />加载示例材料</Button>
              {material.trim() ? <span className="inline-status"><Check className="size-4" />材料已就绪</span> : null}
              {analysisReady ? <span className="inline-status"><CheckCircle2 className="size-4" />已提炼 3 类需求</span> : null}
            </div>
            <Button type="button" size="lg" disabled={!material.trim() || busyAction !== null} onClick={() => runTopicGeneration("material")} className="primary-action">
              {busyAction === "material" ? <><span className="loading-dot" />正在分析材料</> : <>分析并生成选题<ArrowUpRight strokeWidth={1.7} /></>}
            </Button>
          </div>
        </div>
      </section>

      <section className="today-panel" aria-labelledby="today-title">
        <div className="flex min-w-0 items-center gap-3">
          <CalendarDays className="size-[18px] text-[var(--accent-brand)]" strokeWidth={1.6} />
          <div><h2 id="today-title">生成今天的内容</h2><p>4 类演示信号已就绪</p></div>
        </div>
        <Button type="button" size="lg" disabled={busyAction !== null} onClick={() => runTopicGeneration("today")} className="primary-action">
          {busyAction === "today" ? <><span className="loading-dot" />正在生成</> : <>生成今日选题<ArrowUpRight strokeWidth={1.7} /></>}
        </Button>
      </section>

      <section className="attention-section" aria-labelledby="attention-title">
        <div className="section-heading-row"><div><p className="section-index neutral">TODAY AT A GLANCE</p><h2 id="attention-title">今天需要关注</h2></div></div>
        <div className="status-grid">
          <button className="status-cell text-left" onClick={() => runTopicGeneration("today")}><p className="status-kicker">最近需求</p><p className="status-value font-display">夜间翻身</p><p className="status-detail">安装与操作顾虑近期上升</p></button>
          <button className="status-cell text-left" onClick={goTasks}><div className="flex items-baseline gap-2"><p className="font-display text-[34px] leading-none text-[var(--ink)]">{published && !feedbackSubmitted ? 1 : 0}</p><p className="status-kicker">项待反馈</p></div><p className="status-detail">{published && !feedbackSubmitted ? "反馈日期：9 月 12 日" : "当前没有到期待办"}</p></button>
          <button className="status-cell text-left" onClick={goInsights}><p className="status-kicker">{strategyValidated ? "已验证策略" : "待验证策略"}</p><p className="mt-2 text-[15px] font-medium leading-6 text-[var(--ink)]">真实照护场景 <span className="mx-1.5 text-[var(--line-strong)]">+</span> 顾虑消除</p><p className="status-detail">{strategyValidated ? "已完成 3 次有效验证" : "已有 2 次有效观察"}</p></button>
        </div>
      </section>

      <details className="context-mobile xl:hidden"><summary>查看本轮可用的 4 类信号</summary><div className="mt-5 space-y-6">{evidence.map((item) => <EvidenceItem key={item.id} item={item} />)}</div></details>
    </div>
  )
}

export function TopicsView({
  analysisReady,
  material,
  strategyValidated,
  expandedTopic,
  setExpandedTopic,
  selectedTopicId,
  chooseTopic,
  selectedSegment,
  setSelectedSegment,
  outputMode,
  setOutputMode,
  generateScript,
  busyAction,
  back,
}: {
  analysisReady: boolean
  material: string
  strategyValidated: boolean
  expandedTopic: number | null
  setExpandedTopic: (id: number | null) => void
  selectedTopicId: number | null
  chooseTopic: (id: number) => void
  selectedSegment: string | null
  setSelectedSegment: (id: string) => void
  outputMode: OutputMode
  setOutputMode: (mode: OutputMode) => void
  generateScript: () => void
  busyAction: BusyAction
  back: () => void
}) {
  return (
    <div className="content-wrap topics-wrap">
      <PageBack onClick={back}>返回创作工作台</PageBack>
      <div className="page-heading compact">
        <div><p className="section-index">选题决策 / 4 个候选</p><h1>先选值得拍的，再决定怎么拍</h1><p className="heading-note">总分按客户需求 35%、同行验证 20%、历史转化 25%、产品匹配 20% 加权。</p></div>
      </div>

      {analysisReady ? (
        <section className="analysis-strip" aria-label="材料分析结果">
          <div className="analysis-source"><span>材料已去身份化</span><p>{material}</p></div>
          <div className="analysis-findings">{materialInsights.map((item, index) => <div key={item.label} style={{ "--finding-color": item.color } as React.CSSProperties}><span>0{index + 1} / {item.label}</span><p>{item.value}</p></div>)}</div>
        </section>
      ) : (
        <div className="cold-start-note"><Sparkles className="size-4" /><span>本轮未加入新材料，候选选题来自产品知识、演示历史反馈与通用内容经验。</span></div>
      )}

      <section className="topic-list" aria-labelledby="topics-title">
        <div className="section-heading-row"><div><p className="section-index neutral">RANKED TOPICS</p><h2 id="topics-title">候选选题</h2></div><span className="list-note">点击“查看评分依据”展开证据</span></div>
        {topics.map((topic, index) => {
          const expanded = expandedTopic === topic.id
          const selected = selectedTopicId === topic.id
          const learned = strategyValidated && topic.id === 1
          const displayScore = learned ? topic.score + 2 : topic.score
          return (
            <article key={topic.id} className={`topic-row ${index === 0 ? "is-recommended" : ""} ${selected ? "is-selected" : ""}`}>
              <div className="topic-summary">
                <div className="topic-rank"><span>0{index + 1}</span><strong>{displayScore}</strong><small>总分</small></div>
                <div className="topic-copy">
                  <div className="topic-labels"><Badge variant="outline">{learned ? "已验证策略加权" : index === 0 ? "优先推荐" : topic.format}</Badge>{selected ? <Badge className="selected-badge"><Check className="size-3" />已选择</Badge> : null}</div>
                  <h3>{topic.title}</h3><p>{learned ? `同类结构已连续 3 次带来高意向咨询。${topic.reason}` : topic.reason}</p>
                  <div className="topic-meta"><span>目标：{topic.audience}</span><span>期望：{topic.conversion}</span></div>
                </div>
                <div className="topic-actions">
                  <Button variant="ghost" size="sm" onClick={() => setExpandedTopic(expanded ? null : topic.id)} aria-expanded={expanded} className="detail-button">查看评分依据<ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} /></Button>
                  <Button variant={selected ? "outline" : "default"} size="sm" onClick={() => chooseTopic(topic.id)} className={selected ? "secondary-control" : "select-topic-button"}>{selected ? "已选这个选题" : "选择这个选题"}<ChevronRight className="size-4" /></Button>
                </div>
              </div>
              {expanded ? <TopicEvidence topic={topic} learned={learned} /> : null}
            </article>
          )
        })}
      </section>

      {selectedTopicId ? (
        <section id="segments" className="segment-section" aria-labelledby="segment-title">
          <div className="section-heading-row"><div><p className="section-index neutral">NARROW THE ANGLE</p><h2 id="segment-title">选择一个细分版本</h2></div><span className="list-note">三个版本分别从痛点、老人情况和购买阻力收敛</span></div>
          <div className="segment-list">{segments.map((segment, index) => <button key={segment.id} className={`segment-option ${selectedSegment === segment.id ? "is-selected" : ""}`} onClick={() => setSelectedSegment(segment.id)}><span className="segment-number">0{index + 1}</span><div><small>{segment.eyebrow}</small><h3>{segment.title}</h3><p>{segment.detail}</p></div><span className="segment-check">{selectedSegment === segment.id ? <Check className="size-4" /> : null}</span></button>)}</div>

          <div className="format-picker">
            <div><p className="field-label">选择内容形式</p><h3>{outputMode === "human" ? "真人场景拍摄" : "AIGC 视频 Prompt"}</h3></div>
            <Tabs value={outputMode} onValueChange={(value) => setOutputMode(value as OutputMode)} className="format-tabs"><TabsList><TabsTrigger value="human"><UserRound className="size-4" />真人脚本</TabsTrigger><TabsTrigger value="aigc"><Bot className="size-4" />AIGC Prompt</TabsTrigger></TabsList></Tabs>
            <Button disabled={!selectedSegment || busyAction !== null} onClick={generateScript} className="primary-action">{busyAction === "script" ? <><span className="loading-dot" />正在生成</> : <>{outputMode === "human" ? "生成真人脚本" : "生成 AIGC Prompt"}<ArrowUpRight className="size-4" /></>}</Button>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function TopicEvidence({ topic, learned }: { topic: Topic; learned: boolean }) {
  return (
    <div className="topic-evidence">
      <div className="score-list">{(Object.keys(scoreMeta) as ScoreKey[]).map((key) => { const meta = scoreMeta[key]; const score = learned && key === "history" ? topic.scores[key] + 6 : topic.scores[key]; return <div className="score-line" key={key}><div><span>{meta.label}</span><small>权重 {meta.weight}{learned && key === "history" ? " · 策略 +6" : ""}</small></div><div className="score-track"><i style={{ width: `${score}%`, background: meta.color }} /></div><strong>{score}</strong></div> })}</div>
      <div className="decision-details"><div><span>核心痛点</span><p>{topic.pain}</p></div><div><span>老人情况</span><p>{topic.elder}</p></div><div><span>购买阻力</span><p>{topic.barrier}</p></div><div><span>证据来源</span><p>{topic.signals.join(" · ")}</p></div></div>
    </div>
  )
}

export function EditorView({
  topic,
  segment,
  outputMode,
  setOutputMode,
  shots,
  riskChecked,
  riskFixed,
  busyAction,
  runRiskCheck,
  applyRiskFixes,
  polishShot,
  openPublish,
  back,
}: {
  topic: Topic
  segment: (typeof segments)[number]
  outputMode: OutputMode
  setOutputMode: (mode: OutputMode) => void
  shots: ScriptShot[]
  riskChecked: boolean
  riskFixed: boolean
  busyAction: BusyAction
  runRiskCheck: () => void
  applyRiskFixes: () => void
  polishShot: (id: number, action: string) => void
  openPublish: () => void
  back: () => void
}) {
  return (
    <div className="content-wrap editor-wrap">
      <PageBack onClick={back}>返回选题与细分</PageBack>
      <div className="editor-header">
        <div><div className="topic-labels"><Badge variant="outline">已生成</Badge><Badge variant="outline">40 秒</Badge><Badge variant="outline">{segment.eyebrow}</Badge></div><h1>{topic.title}</h1><p>{segment.title} · 目标受众：{topic.audience}</p></div>
        <div className="editor-header-actions">
          <Button variant="outline" onClick={runRiskCheck} disabled={busyAction !== null || riskFixed} className="secondary-control">{busyAction === "check" ? <><span className="loading-dot dark" />检测中</> : riskFixed ? <><ShieldCheck className="size-4" />检测通过</> : <><ShieldCheck className="size-4" />检测内容</>}</Button>
          <Button onClick={() => riskFixed ? openPublish() : toast.error("请先完成风险检测与修改")} className="primary-action"><Flag className="size-4" />确认并标记发布</Button>
        </div>
      </div>

      <Tabs value={outputMode} onValueChange={(value) => setOutputMode(value as OutputMode)} className="editor-tabs">
        <TabsList variant="line"><TabsTrigger value="human"><Video className="size-4" />真人拍摄脚本</TabsTrigger><TabsTrigger value="aigc"><Bot className="size-4" />AIGC Prompt</TabsTrigger></TabsList>
        <TabsContent value="human"><HumanScript shots={shots} riskChecked={riskChecked} riskFixed={riskFixed} polishShot={polishShot} /></TabsContent>
        <TabsContent value="aigc"><AigcScript riskChecked={riskChecked} riskFixed={riskFixed} /></TabsContent>
      </Tabs>

      {riskChecked ? <RiskResults fixed={riskFixed} apply={applyRiskFixes} /> : <div className="check-callout"><ShieldCheck className="size-5" /><div><h3>发布前还差一次内容检测</h3><p>检查宣传合规和产品事实，问题会定位到具体语句，并给出可直接应用的修改。</p></div><Button variant="outline" onClick={runRiskCheck} disabled={busyAction !== null} className="secondary-control">开始检测</Button></div>}

      <div className="editor-sticky-actions"><div><span>{riskFixed ? <CheckCircle2 className="size-4" /> : <AlertTriangle className="size-4" />}</span><p>{riskFixed ? "2 处风险已修改，脚本可以确认" : "脚本生成完成，尚未通过发布前检测"}</p></div><Button onClick={() => riskFixed ? openPublish() : runRiskCheck()} className="primary-action">{riskFixed ? "确认并标记发布" : "检测内容"}<ArrowUpRight className="size-4" /></Button></div>
    </div>
  )
}

function HumanScript({ shots, riskChecked, riskFixed, polishShot }: { shots: ScriptShot[]; riskChecked: boolean; riskFixed: boolean; polishShot: (id: number, action: string) => void }) {
  return (
    <section className="script-sheet" aria-label="真人拍摄脚本">
      <div className="script-overview"><div><span>脚本结构</span><p>Hook → 痛点场景 → 产品介入 → 功能展示 → 顾虑消除 → CTA</p></div><div><span>拍摄场景</span><p>居家卧室 · 护理床一张 · 照护者、老人替身与服务人员</p></div></div>
      <div className="shot-list">{shots.map((shot) => { const risky = riskChecked && !riskFixed && (shot.id === 3 || shot.id === 4); return <article key={shot.id} className={`shot-row ${risky ? "has-risk" : ""}`}><div className="shot-number"><strong>0{shot.id}</strong><span>{shot.duration}</span></div><div className="shot-content"><div className="shot-title"><div><span>{shot.shot}</span><h3>{shot.purpose}</h3></div><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label={`修改第 ${shot.id} 镜`}><MoreHorizontal /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => polishShot(shot.id, "更口语")}><Wand2 />更口语</DropdownMenuItem><DropdownMenuItem onClick={() => polishShot(shot.id, "缩短台词")}><Clock3 />缩短台词</DropdownMenuItem><DropdownMenuItem onClick={() => polishShot(shot.id, "更换难拍镜头")}><Video />更换难拍镜头</DropdownMenuItem>{shot.id === 6 ? <DropdownMenuItem onClick={() => polishShot(shot.id, "强化咨询")}><ArrowUpRight />强化咨询引导</DropdownMenuItem> : null}</DropdownMenuContent></DropdownMenu></div><div className="shot-grid"><div><span>画面与动作</span><p>{shot.visual}</p></div><div className={risky ? "risky-copy" : ""}><span>口播 / 旁白</span><p>{shot.speech}</p>{risky ? <small><AlertTriangle className="size-3.5" />待修改</small> : null}</div><div><span>屏幕字幕</span><p>{shot.caption}</p></div><div><span>拍摄注意</span><p>{shot.note}</p></div></div></div></article> })}</div>
    </section>
  )
}

function AigcScript({ riskChecked, riskFixed }: { riskChecked: boolean; riskFixed: boolean }) {
  return (
    <section className="script-sheet" aria-label="AIGC 分镜 Prompt">
      <div className="prompt-overview"><div><span>总体创意</span><p>{riskFixed ? "用克制的家庭纪录片视角呈现夜间照护压力，并展示护理床如何辅助日常体位调整。" : "用护理床彻底解决卧床老人翻身问题，强调全自动静音侧翻效果。"}</p>{riskChecked && !riskFixed ? <small><AlertTriangle className="size-3.5" />包含宣传风险与无依据功能</small> : null}</div><div><span>连贯性要求</span><p>同一卧室、人物、服装与护理床外观；动作速度真实；所有产品结构跨镜头保持一致。</p></div><div><span>负面约束</span><p>不要医院场景、不要品牌水印、不要悬浮部件、不要夸张表情、不要畸形手指、不要未经确认的参数和医疗功效。</p></div></div>
      <div className="aigc-list">{aigcScenes.map((scene) => <article key={scene.id}><div className="aigc-id"><strong>{scene.id}</strong><span>{scene.duration}</span></div><div><h3>{scene.title}</h3><p>{scene.prompt}</p><blockquote>旁白：{scene.voice}</blockquote></div><Button variant="ghost" size="icon-sm" aria-label={`复制 ${scene.id} Prompt`} onClick={() => { navigator.clipboard?.writeText(scene.prompt); toast.success(`${scene.id} Prompt 已复制`) }}><Copy /></Button></article>)}</div>
    </section>
  )
}

function RiskResults({ fixed, apply }: { fixed: boolean; apply: () => void }) {
  return (
    <section id="risk-results" className={`risk-panel ${fixed ? "is-safe" : ""}`} aria-labelledby="risk-title">
      <div className="risk-heading"><div>{fixed ? <CheckCircle2 className="size-5" /> : <AlertTriangle className="size-5" />}<div><p className="section-index neutral">CONTENT CHECK</p><h2 id="risk-title">{fixed ? "风险已修改并通过复检" : "发现 2 处需要修改"}</h2></div></div>{!fixed ? <Button onClick={apply} className="primary-action"><ShieldCheck className="size-4" />应用 2 处安全修改</Button> : <Badge variant="outline" className="safe-badge"><Check />合规与事实检查通过</Badge>}</div>
      <div className="risk-list">
        <article><div className="risk-type"><span>01</span><strong>宣传合规</strong><small>{fixed ? "已修改" : "绝对化结果承诺"}</small></div><div className="diff-copy"><div><span>修改前</span><p>“这张床能彻底解决卧床老人翻身问题。”</p></div><ArrowUpRight className="size-4" /><div><span>修改后</span><p>“护理床的体位调节功能，可以帮助减轻日常翻身照护负担。”</p></div></div><p className="risk-reason">原因：“彻底解决”构成绝对化效果承诺，护理床不能替代专业医疗与照护判断。</p></article>
        <article><div className="risk-type"><span>02</span><strong>产品事实</strong><small>{fixed ? "已修改" : "无已确认知识依据"}</small></div><div className="diff-copy"><div><span>修改前</span><p>“它还支持全自动静音侧翻，一键就能完成。”</p></div><ArrowUpRight className="size-4" /><div><span>修改后</span><p>“可通过护理床的辅助侧翻结构配合完成体位调整，具体操作以对应型号说明为准。”</p></div></div><p className="risk-reason">原因：演示知识库中没有“全自动静音侧翻”的型号或参数依据，改为已有口径支持的表述。</p></article>
      </div>
    </section>
  )
}

export function TasksView({
  published,
  feedbackSubmitted,
  topic,
  segment,
  platform,
  publishDate,
  publishedReal,
  setPublishedReal,
  plays,
  setPlays,
  completionRate,
  setCompletionRate,
  consultations,
  setConsultations,
  loadFeedback,
  submitFeedback,
  startFlow,
}: {
  published: boolean
  feedbackSubmitted: boolean
  topic: Topic
  segment: (typeof segments)[number]
  platform: string
  publishDate: string
  publishedReal: boolean
  setPublishedReal: (value: boolean) => void
  plays: string
  setPlays: (value: string) => void
  completionRate: string
  setCompletionRate: (value: string) => void
  consultations: string
  setConsultations: (value: string) => void
  loadFeedback: () => void
  submitFeedback: () => void
  startFlow: () => void
}) {
  if (!published) {
    return <div className="content-wrap"><div className="page-heading compact"><div><p className="section-index">内容任务</p><h1>发布与反馈</h1></div></div><div className="empty-state"><ClipboardList className="size-7" /><h2>还没有待跟进的内容任务</h2><p>先完成选题、脚本与风险检测，确认后就会在这里形成发布任务。</p><Button onClick={startFlow} className="primary-action">继续当前创作<ArrowUpRight className="size-4" /></Button></div></div>
  }
  return (
    <div className="content-wrap tasks-wrap">
      <div className="page-heading compact"><div><p className="section-index">内容任务 / 1</p><h1>{feedbackSubmitted ? "反馈已归档" : "该填写发布反馈了"}</h1><p className="heading-note">发布结果会先形成内容观察，同类策略达到 3 次有效验证后才升级为规则。</p></div></div>
      <section className="task-record">
        <div className="task-header"><div><Badge variant="outline" className={feedbackSubmitted ? "safe-badge" : "due-badge"}>{feedbackSubmitted ? "已反馈" : "今天到期"}</Badge><h2>{topic.title}</h2><p>{segment.title}</p></div><div className="task-status-line"><span><Play className="size-4" />{platform}</span><span><CalendarDays className="size-4" />发布于 {publishDate}</span><span><Clock3 className="size-4" />反馈日 2026-09-12</span></div></div>
        {!feedbackSubmitted ? (
          <div className="feedback-form">
            <div className="feedback-heading"><div><p className="section-index neutral">POST-PUBLISH FEEDBACK</p><h3>填写 3 天反馈</h3></div><Button variant="outline" size="sm" onClick={loadFeedback} className="secondary-control"><Sparkles className="size-4" />载入演示反馈</Button></div>
            <label className="real-publish"><Checkbox checked={publishedReal} onCheckedChange={(value) => setPublishedReal(value === true)} /><span><strong>这条内容已真实发布</strong><small>只有实际发布的内容才会参与经验学习</small></span></label>
            <div className="feedback-fields"><label><span>播放量</span><Input inputMode="numeric" value={plays} onChange={(event) => setPlays(event.target.value)} placeholder="例如 4280" /></label><label><span>完播率</span><div className="input-suffix"><Input inputMode="decimal" value={completionRate} onChange={(event) => setCompletionRate(event.target.value)} placeholder="例如 31" /><i>%</i></div></label><label><span>高意向咨询数</span><Input inputMode="numeric" value={consultations} onChange={(event) => setConsultations(event.target.value)} placeholder="例如 3" /></label></div>
            <div className="feedback-priority"><span>学习优先级</span><p><strong>高意向咨询数</strong><ChevronRight className="size-3.5" />完播率<ChevronRight className="size-3.5" />播放量</p></div>
            <div className="form-actions"><p>当前已有 2 条同类有效观察，本次若有效将形成已验证策略。</p><Button onClick={submitFeedback} className="primary-action">提交反馈并形成经验<ArrowUpRight className="size-4" /></Button></div>
          </div>
        ) : (
          <div className="feedback-summary"><div><span>播放量</span><strong>{Number(plays).toLocaleString()}</strong></div><div><span>完播率</span><strong>{completionRate}%</strong></div><div className="consultation-result"><span>高意向咨询</span><strong>{consultations}</strong><small>次</small></div><p><CheckCircle2 className="size-4" />已形成一条内容观察，并完成同类策略第 3 次有效验证。</p></div>
        )}
      </section>
    </div>
  )
}

export function InsightsView({ feedbackSubmitted, strategyValidated, goWorkspace, goTasks }: { feedbackSubmitted: boolean; strategyValidated: boolean; goWorkspace: () => void; goTasks: () => void }) {
  return (
    <div className="content-wrap insights-wrap">
      <div className="page-heading compact"><div><p className="section-index">内容经验</p><h1>{strategyValidated ? "这次反馈，已经改变下一轮推荐" : "先积累观察，再形成规则"}</h1><p className="heading-note">单次成功只记录为观察；同类策略连续 3 次有效，才升级为已验证策略。</p></div></div>
      {strategyValidated ? <section className="strategy-upgrade"><div className="upgrade-mark"><span>03</span><CheckCircle2 className="size-5" /></div><div className="upgrade-copy"><p className="section-index neutral">VALIDATED STRATEGY</p><h2>真实照护痛点开场 → 场景展示 → 顾虑消除 → 咨询 CTA</h2><p>第三次有效反馈已完成。该策略将为命中“单人照护 + 夜间翻身 + 购买顾虑”的候选选题增加转化依据，并优先推荐真人场景形式。</p><div className="upgrade-effect"><span>下一轮影响</span><strong>历史转化潜力 +6</strong><span>推荐理由加入“已连续 3 次验证”</span></div></div></section> : <div className="pending-insight"><BookOpenText className="size-6" /><div><h2>同类策略已有 2 次有效观察</h2><p>完成当前发布任务的反馈后，系统会判断是否达到第 3 次验证。</p></div><Button onClick={goTasks} variant="outline" className="secondary-control">查看待反馈任务</Button></div>}
      <section className="observation-section"><div className="section-heading-row"><div><p className="section-index neutral">CONTENT OBSERVATIONS</p><h2>内容观察记录</h2></div><span className="list-note">所有数字均为演示数据</span></div><div className="observation-table"><div className="observation-row table-head"><span>内容角度</span><span>播放 / 完播</span><span>高意向咨询</span><span>判断</span></div><div className="observation-row"><span>夜间照护 + 翻身痛点</span><span>3,160 / 29%</span><strong>2 次</strong><span>有效观察 01</span></div><div className="observation-row"><span>真实动作 + 安装顾虑</span><span>3,780 / 33%</span><strong>3 次</strong><span>有效观察 02</span></div>{strategyValidated ? <div className="observation-row is-new"><span>夜间翻身 + 顾虑消除</span><span>4,280 / 31%</span><strong>3 次</strong><span>有效观察 03</span></div> : null}</div></section>
      {feedbackSubmitted ? <div className="next-cycle"><div><RefreshCcw className="size-5" /><span><strong>闭环已经完成</strong>下一轮选题会使用刚形成的已验证策略。</span></div><Button onClick={goWorkspace} className="primary-action">回到工作台生成下一轮<ArrowUpRight className="size-4" /></Button></div> : null}
    </div>
  )
}

export function KnowledgeView() {
  return (
    <div className="content-wrap knowledge-wrap">
      <div className="page-heading compact"><div><p className="section-index">产品知识 / 演示</p><h1>脚本中的事实，必须在这里有依据</h1><p className="heading-note">以下条目只用于 MVP 演示，不代表连盈正式产品承诺；正式上线前需由业务逐条确认。</p></div></div>
      <div className="knowledge-warning"><AlertTriangle className="size-4" /><span>演示确认表示“允许在本次 Demo 中使用”，不等同于正式对外宣传口径。</span></div>
      <section className="knowledge-list" aria-label="产品知识条目">{knowledgeItems.map((item) => <article key={item.id}><div className="knowledge-id"><span>{item.id}</span><small>{item.type}</small></div><div><h2>{item.title}</h2><p>{item.body}</p><small>{item.source}</small></div><Badge variant="outline" className={item.status === "不可使用" ? "blocked-badge" : item.status === "启用" ? "safe-badge" : "demo-badge"}>{item.status}</Badge></article>)}</section>
    </div>
  )
}

export function ContextPanel({ view, riskChecked, riskFixed, strategyValidated }: { view: View; riskChecked: boolean; riskFixed: boolean; strategyValidated: boolean }) {
  return (
    <aside className="context-panel scrollbar-thin hidden overflow-y-auto xl:flex" aria-label="本轮上下文">
      <div className="context-heading"><div><p>EVIDENCE</p><h2>{view === "editor" ? "脚本依据与检查" : view === "insights" ? "学习状态" : "本轮信号"}</h2></div><Badge variant="outline">4 / 4 可用</Badge></div>
      <div className="context-body">
        {view === "editor" ? <div className={`context-check ${riskFixed ? "safe" : ""}`}>{riskFixed ? <CheckCircle2 /> : riskChecked ? <AlertTriangle /> : <ShieldCheck />}<div><span>发布前检测</span><strong>{riskFixed ? "已通过" : riskChecked ? "2 处待修改" : "尚未执行"}</strong><p>宣传合规 + 产品事实</p></div></div> : null}
        {view === "insights" ? <div className={`context-check ${strategyValidated ? "safe" : ""}`}>{strategyValidated ? <CheckCircle2 /> : <Clock3 />}<div><span>同类策略验证</span><strong>{strategyValidated ? "3 / 3 已完成" : "2 / 3 待反馈"}</strong><p>达到 3 次才形成规则</p></div></div> : null}
        <div className="space-y-7">{evidence.map((item) => <EvidenceItem key={item.id} item={item} />)}</div>
      </div>
      <div className="context-footer"><span>数据说明</span><p>客户、同行、历史结果与产品口径均为稳定演示数据，可一键重置。</p></div>
    </aside>
  )
}

export function EvidenceItem({ item }: { item: (typeof evidence)[number] }) {
  return <article className="evidence-item" style={{ "--evidence-color": item.color } as React.CSSProperties}><div className="flex items-center justify-between gap-3"><span className="font-mono text-[11px] font-semibold tracking-[0.07em] text-[var(--evidence-color)]">{item.id} / {item.label}</span><ChevronRight className="size-3.5 text-[var(--ink-muted)]" strokeWidth={1.5} /></div><p className="mt-2.5 text-[14px] font-medium leading-6 text-[var(--ink)]">{item.title}</p><p className="mt-1 text-[13px] leading-5 text-[var(--ink-muted)]">{item.detail}</p></article>
}

function PageBack({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return <button className="page-back" onClick={onClick}><ArrowLeft className="size-4" />{children}</button>
}

export function PublishDialog({
  open,
  setOpen,
  platform,
  setPlatform,
  publishDate,
  setPublishDate,
  publishedReal,
  setPublishedReal,
  confirm,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  platform: string
  setPlatform: (value: string) => void
  publishDate: string
  setPublishDate: (value: string) => void
  publishedReal: boolean
  setPublishedReal: (value: boolean) => void
  confirm: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="publish-dialog sm:max-w-[540px]">
        <DialogHeader><DialogTitle>标记内容已发布</DialogTitle><DialogDescription>记录平台和发布时间。系统将在发布 3 天后把任务标记为待反馈。</DialogDescription></DialogHeader>
        <div className="publish-fields"><label><span>发布平台</span><Select value={platform} onValueChange={setPlatform}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="视频号">视频号</SelectItem><SelectItem value="抖音">抖音</SelectItem><SelectItem value="小红书">小红书</SelectItem></SelectContent></Select></label><label><span>发布时间</span><Input type="date" value={publishDate} onChange={(event) => setPublishDate(event.target.value)} /></label></div>
        <label className="real-publish compact"><Checkbox checked={publishedReal} onCheckedChange={(value) => setPublishedReal(value === true)} /><span><strong>确认为真实发布</strong><small>演示默认使用 9 月 9 日，以便立即展示 3 天反馈任务</small></span></label>
        <div className="dialog-note"><CalendarDays className="size-4" /><span>按演示日期计算，反馈将在 2026 年 9 月 12 日到期。</span></div>
        <DialogFooter><Button variant="outline" onClick={() => setOpen(false)} className="secondary-control">取消</Button><Button onClick={confirm} disabled={!publishedReal} className="primary-action">确认发布<ArrowUpRight className="size-4" /></Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
