"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import {
  BookOpenText,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  Database,
  LayoutDashboard,
  RefreshCcw,
  Search,
  Settings2,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

import {
  initialShots,
  safeSpeech,
  sampleMaterial,
  segments,
  STORAGE_KEY,
  topics,
  type BusyAction,
  type OutputMode,
  type ScriptShot,
  type View,
} from "./demo-data"
import {
  ContextPanel,
  EditorView,
  InsightsView,
  KnowledgeView,
  PublishDialog,
  TasksView,
  TopicsView,
  WorkflowRail,
  WorkspaceView,
} from "./demo-views"

type StoredDemo = {
  material?: string
  analysisReady?: boolean
  topicsReady?: boolean
  selectedTopicId?: number | null
  selectedSegment?: string | null
  outputMode?: OutputMode
  scriptReady?: boolean
  shots?: ScriptShot[]
  riskChecked?: boolean
  riskFixed?: boolean
  published?: boolean
  publishedReal?: boolean
  feedbackSubmitted?: boolean
  strategyValidated?: boolean
  platform?: string
  publishDate?: string
  plays?: string
  completionRate?: string
  consultations?: string
}

type WebMcpTool = {
  name: string
  title: string
  description: string
  inputSchema: Record<string, unknown>
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean }
  execute: (input: unknown) => unknown | Promise<unknown>
}

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => void | Promise<void>
    }
  }
}

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <i />
    </div>
  )
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function viewLabel(view: View) {
  if (view === "topics") return "候选选题"
  if (view === "editor") return "脚本工作台"
  if (view === "tasks") return "内容任务"
  if (view === "insights") return "内容经验"
  if (view === "knowledge") return "产品知识"
  return "创作工作台"
}

export default function ContentDesk() {
  const [view, setView] = useState<View>("workspace")
  const [material, setMaterial] = useState("")
  const [analysisReady, setAnalysisReady] = useState(false)
  const [topicsReady, setTopicsReady] = useState(false)
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null)
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [outputMode, setOutputMode] = useState<OutputMode>("human")
  const [scriptReady, setScriptReady] = useState(false)
  const [shots, setShots] = useState<ScriptShot[]>(initialShots)
  const [riskChecked, setRiskChecked] = useState(false)
  const [riskFixed, setRiskFixed] = useState(false)
  const [busyAction, setBusyAction] = useState<BusyAction>(null)
  const [publishOpen, setPublishOpen] = useState(false)
  const [published, setPublished] = useState(false)
  const [publishedReal, setPublishedReal] = useState(true)
  const [platform, setPlatform] = useState("视频号")
  const [publishDate, setPublishDate] = useState("2026-09-09")
  const [plays, setPlays] = useState("")
  const [completionRate, setCompletionRate] = useState("")
  const [consultations, setConsultations] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [strategyValidated, setStrategyValidated] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as StoredDemo
        setMaterial(parsed.material || "")
        setAnalysisReady(Boolean(parsed.analysisReady))
        setTopicsReady(Boolean(parsed.topicsReady))
        setSelectedTopicId(parsed.selectedTopicId ?? null)
        setSelectedSegment(parsed.selectedSegment ?? null)
        setOutputMode(parsed.outputMode === "aigc" ? "aigc" : "human")
        setScriptReady(Boolean(parsed.scriptReady))
        setShots(Array.isArray(parsed.shots) && parsed.shots.length ? parsed.shots : initialShots)
        setRiskChecked(Boolean(parsed.riskChecked))
        setRiskFixed(Boolean(parsed.riskFixed))
        setPublished(Boolean(parsed.published))
        setPublishedReal(parsed.publishedReal !== false)
        setFeedbackSubmitted(Boolean(parsed.feedbackSubmitted))
        setStrategyValidated(Boolean(parsed.strategyValidated))
        setPlatform(parsed.platform || "视频号")
        setPublishDate(parsed.publishDate || "2026-09-09")
        setPlays(parsed.plays || "")
        setCompletionRate(parsed.completionRate || "")
        setConsultations(parsed.consultations || "")
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const stored: StoredDemo = {
      material,
      analysisReady,
      topicsReady,
      selectedTopicId,
      selectedSegment,
      outputMode,
      scriptReady,
      shots,
      riskChecked,
      riskFixed,
      published,
      publishedReal,
      feedbackSubmitted,
      strategyValidated,
      platform,
      publishDate,
      plays,
      completionRate,
      consultations,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  }, [
    hydrated,
    material,
    analysisReady,
    topicsReady,
    selectedTopicId,
    selectedSegment,
    outputMode,
    scriptReady,
    shots,
    riskChecked,
    riskFixed,
    published,
    publishedReal,
    feedbackSubmitted,
    strategyValidated,
    platform,
    publishDate,
    plays,
    completionRate,
    consultations,
  ])

  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.id === selectedTopicId) ?? topics[0],
    [selectedTopicId],
  )

  const selectedSegmentItem = useMemo(
    () => segments.find((segment) => segment.id === selectedSegment) ?? segments[0],
    [selectedSegment],
  )

  const workflowStep = feedbackSubmitted
    ? 5
    : published
      ? 4
      : scriptReady
        ? 3
        : selectedSegment
          ? 2
          : topicsReady
            ? 1
            : 0

  const resetDemo = () => {
    setView("workspace")
    setMaterial("")
    setAnalysisReady(false)
    setTopicsReady(false)
    setExpandedTopic(null)
    setSelectedTopicId(null)
    setSelectedSegment(null)
    setOutputMode("human")
    setScriptReady(false)
    setShots(initialShots)
    setRiskChecked(false)
    setRiskFixed(false)
    setPublished(false)
    setPublishedReal(true)
    setPlatform("视频号")
    setPublishDate("2026-09-09")
    setPlays("")
    setCompletionRate("")
    setConsultations("")
    setFeedbackSubmitted(false)
    setStrategyValidated(false)
    window.localStorage.removeItem(STORAGE_KEY)
    toast.success("演示已恢复到初始状态")
  }

  const runTopicGeneration = async (source: "material" | "today") => {
    if (source === "material" && !material.trim()) {
      toast.error("请先粘贴材料，或加载示例材料")
      return
    }
    setBusyAction(source)
    await wait(source === "material" ? 850 : 700)
    setAnalysisReady(source === "material")
    setTopicsReady(true)
    setExpandedTopic(1)
    setSelectedTopicId(null)
    setSelectedSegment(null)
    setScriptReady(false)
    setRiskChecked(false)
    setRiskFixed(false)
    setPublished(false)
    setFeedbackSubmitted(false)
    setView("topics")
    setBusyAction(null)
    toast.success(source === "material" ? "已生成 4 个基于材料的候选选题" : "已生成今天的 4 个候选选题")
  }

  const chooseTopic = (topicId: number) => {
    setSelectedTopicId(topicId)
    setSelectedSegment(null)
    window.setTimeout(
      () => document.getElementById("segments")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50,
    )
  }

  const generateScript = async () => {
    if (!selectedTopicId || !selectedSegment) return
    setBusyAction("script")
    await wait(750)
    setScriptReady(true)
    setRiskChecked(false)
    setRiskFixed(false)
    setShots(initialShots)
    setView("editor")
    setBusyAction(null)
    toast.success(outputMode === "human" ? "真人拍摄脚本已生成" : "AIGC 分镜 Prompt 已生成")
  }

  const runRiskCheck = async () => {
    setBusyAction("check")
    await wait(650)
    setRiskChecked(true)
    setBusyAction(null)
    toast.warning("检测到 2 处需要修改的内容")
    window.setTimeout(
      () => document.getElementById("risk-results")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80,
    )
  }

  const applyRiskFixes = () => {
    setShots((current) =>
      current.map((shot) => (safeSpeech[shot.id] ? { ...shot, speech: safeSpeech[shot.id] } : shot)),
    )
    setRiskFixed(true)
    toast.success("已应用 2 处安全修改，并完成受影响段落复检")
  }

  const polishShot = (shotId: number, action: string) => {
    setShots((current) =>
      current.map((shot) => {
        if (shot.id !== shotId) return shot
        if (action === "更口语") {
          return {
            ...shot,
            speech:
              shot.id === 1
                ? "一个人照顾卧床老人，晚上帮他翻身有多累？"
                : shot.speech.replace("可以帮助", "能帮着").replace("日常", "平时"),
          }
        }
        if (action === "缩短台词") {
          return { ...shot, speech: `${shot.speech.split("，").slice(0, 2).join("，")}。` }
        }
        if (action === "强化咨询") {
          return { ...shot, speech: "把老人情况和所在城市发给我们，先确认合适的照护方式与当地服务。" }
        }
        return {
          ...shot,
          visual: "改为固定机位拍摄，由一位出镜人完成动作示范，保留同样的信息重点。",
        }
      }),
    )
    toast.success(`第 ${shotId} 镜已${action}，局部复检通过`)
  }

  const confirmPublish = () => {
    setPublished(true)
    setPublishOpen(false)
    setView("tasks")
    toast.success("已标记发布，反馈日期为 2026 年 9 月 12 日")
  }

  const loadFeedback = () => {
    setPlays("4280")
    setCompletionRate("31")
    setConsultations("3")
  }

  const submitFeedback = () => {
    if (!publishedReal) {
      toast.error("未真实发布的内容不会进入经验学习")
      return
    }
    if (!plays || !completionRate || !consultations) {
      toast.error("请完整填写播放量、完播率和高意向咨询数")
      return
    }
    setFeedbackSubmitted(true)
    setStrategyValidated(true)
    setView("insights")
    toast.success("反馈已记录：同类策略完成第 3 次有效验证")
  }

  useEffect(() => {
    const context = document.modelContext
    if (!context?.registerTool) return

    const lifecycle = new AbortController()
    const register = (tool: WebMcpTool) => {
      try {
        void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => undefined)
      } catch {
        // WebMCP is optional; the visible workflow remains fully usable.
      }
    }

    register({
      name: "generate_demo_topics_from_material",
      title: "从材料生成演示选题",
      description: "载入去身份化材料或使用给定文本，提炼三类客户信号，并在页面中生成四个稳定候选选题。",
      inputSchema: {
        type: "object",
        properties: { material: { type: "string", description: "可选的客户聊天文本；省略时使用内置演示材料。" } },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute(input) {
        const value = typeof input === "object" && input !== null && "material" in input && typeof input.material === "string" ? input.material.trim() : ""
        setMaterial(value || sampleMaterial)
        setAnalysisReady(true)
        setTopicsReady(true)
        setExpandedTopic(1)
        setSelectedTopicId(null)
        setSelectedSegment(null)
        setView("topics")
        await wait(0)
        return { status: "ready", topicCount: topics.length, topTopicId: 1, topScore: 91 }
      },
    })

    register({
      name: "select_demo_topic_and_generate",
      title: "选择细分版本并生成内容",
      description: "选择一个候选选题、细分版本和内容形式，并在页面中打开对应的真人脚本或 AIGC Prompt。",
      inputSchema: {
        type: "object",
        properties: {
          topicId: { type: "integer", enum: [1, 2, 3, 4] },
          segmentId: { type: "string", enum: ["night-care", "long-term", "installation"] },
          outputMode: { type: "string", enum: ["human", "aigc"] },
        },
        required: ["topicId", "segmentId", "outputMode"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute(input) {
        if (typeof input !== "object" || input === null) throw new Error("输入必须是对象")
        const values = input as { topicId?: number; segmentId?: string; outputMode?: string }
        if (!topics.some((topic) => topic.id === values.topicId)) throw new Error("topicId 必须为 1 到 4")
        if (!segments.some((segment) => segment.id === values.segmentId)) throw new Error("segmentId 无效")
        if (values.outputMode !== "human" && values.outputMode !== "aigc") throw new Error("outputMode 无效")
        setTopicsReady(true)
        setSelectedTopicId(values.topicId!)
        setSelectedSegment(values.segmentId!)
        setOutputMode(values.outputMode)
        setScriptReady(true)
        setShots(initialShots)
        setRiskChecked(false)
        setRiskFixed(false)
        setView("editor")
        await wait(0)
        return { status: "generated", topicId: values.topicId, segmentId: values.segmentId, outputMode: values.outputMode }
      },
    })

    register({
      name: "run_and_apply_demo_content_check",
      title: "检测并应用安全修改",
      description: "执行宣传合规与产品事实检查，将两处演示风险替换为有知识依据的安全表述，并更新可见脚本。",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute() {
        setRiskChecked(true)
        setRiskFixed(true)
        setShots((current) => current.map((shot) => (safeSpeech[shot.id] ? { ...shot, speech: safeSpeech[shot.id] } : shot)))
        await wait(0)
        return { status: "passed", modifiedCount: 2, checks: ["promotion_compliance", "product_facts"] }
      },
    })

    register({
      name: "complete_demo_publication_feedback",
      title: "完成发布反馈",
      description: "标记当前演示内容已发布，提交三项反馈指标，并在页面中形成第三次有效观察与已验证策略。",
      inputSchema: {
        type: "object",
        properties: {
          platform: { type: "string", enum: ["视频号", "抖音", "小红书"] },
          plays: { type: "integer", minimum: 0 },
          completionRate: { type: "number", minimum: 0, maximum: 100 },
          highIntentConsultations: { type: "integer", minimum: 0 },
        },
        required: ["platform", "plays", "completionRate", "highIntentConsultations"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute(input) {
        if (typeof input !== "object" || input === null) throw new Error("输入必须是对象")
        const values = input as { platform?: string; plays?: number; completionRate?: number; highIntentConsultations?: number }
        if (!["视频号", "抖音", "小红书"].includes(values.platform || "")) throw new Error("platform 无效")
        if (!Number.isFinite(values.plays) || values.plays! < 0) throw new Error("plays 必须是非负整数")
        if (!Number.isFinite(values.completionRate) || values.completionRate! < 0 || values.completionRate! > 100) throw new Error("completionRate 必须在 0 到 100 之间")
        if (!Number.isFinite(values.highIntentConsultations) || values.highIntentConsultations! < 0) throw new Error("highIntentConsultations 必须是非负整数")
        setPlatform(values.platform!)
        setPublishDate("2026-09-09")
        setPublishedReal(true)
        setPublished(true)
        setPlays(String(values.plays))
        setCompletionRate(String(values.completionRate))
        setConsultations(String(values.highIntentConsultations))
        setFeedbackSubmitted(true)
        setStrategyValidated(true)
        setView("insights")
        await wait(0)
        return { status: "completed", observationCount: 3, strategyValidated: true }
      },
    })

    return () => lifecycle.abort()
  }, [])

  const navItems = [
    { id: "workspace" as const, label: "创作工作台", icon: LayoutDashboard },
    { id: "tasks" as const, label: "内容任务", icon: ClipboardList, badge: published && !feedbackSubmitted ? "1" : undefined },
    { id: "insights" as const, label: "内容经验", icon: BookOpenText, badge: strategyValidated ? "新" : undefined },
    { id: "knowledge" as const, label: "产品知识", icon: Database },
  ]

  return (
    <SidebarProvider className="app-canvas" style={{ "--sidebar-width": "208px" } as CSSProperties}>
      <Sidebar variant="inset" className="editorial-sidebar">
        <SidebarHeader className="px-4 pb-3 pt-4">
          <button className="flex items-center gap-3 text-left" onClick={() => setView("workspace")}>
            <BrandMark />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--sidebar-ink)]">连盈内容台</p>
              <p className="mt-0.5 text-[11px] font-medium tracking-[0.12em] text-[var(--ink-muted)]">CONTENT DESK</p>
            </div>
          </button>
        </SidebarHeader>

        <SidebarSeparator className="mx-4 w-auto bg-[var(--line)]" />

        <SidebarContent className="overflow-x-hidden px-2.5 py-4">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="mb-1.5 px-2.5 text-[11px] font-semibold tracking-[0.12em] text-[var(--ink-muted)]">工作区</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={view === item.id || (item.id === "workspace" && (view === "topics" || view === "editor"))}
                      tooltip={item.label}
                      onClick={() => setView(item.id)}
                      className="h-10 rounded-[8px] px-2.5 text-[14px] text-[var(--ink-soft)] hover:bg-[var(--surface-raised)] hover:text-[var(--ink)] data-[active=true]:bg-[var(--surface-raised)] data-[active=true]:font-medium data-[active=true]:text-[var(--ink)] data-[active=true]:shadow-[0_0_0_1px_var(--line)]"
                    >
                      <item.icon className="size-[18px]" strokeWidth={1.6} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge ? <SidebarMenuBadge className="right-2.5 bg-[var(--accent-soft)] text-[var(--ink)]">{item.badge}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="my-4 bg-[var(--line)]" />

          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-2.5 text-[11px] font-semibold tracking-[0.12em] text-[var(--ink-muted)]">本轮进度</SidebarGroupLabel>
            <div className="px-2.5 pt-3">
              <div className="mb-2.5 flex items-baseline justify-between">
                <span className="font-display text-[28px] leading-none text-[var(--ink)]">{workflowStep}</span>
                <span className="text-[12px] text-[var(--ink-muted)]">/ 5 步</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-[var(--line)]">
                <div className="h-full bg-[var(--accent-brand)] transition-all duration-300" style={{ width: `${workflowStep * 20}%` }} />
              </div>
            </div>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="px-3 pb-3">
          <SidebarSeparator className="mb-2.5 bg-[var(--line)]" />
          <button className="flex w-full items-center gap-2.5 rounded-[8px] px-2 py-2 text-left transition-colors hover:bg-[var(--surface-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-brand)]">
            <div className="flex size-8 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-raised)] text-[11px] font-semibold text-[var(--ink-soft)]">LY</div>
            <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-medium text-[var(--ink)]">视频运营组</p><p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">演示工作区</p></div>
            <Settings2 className="size-4 text-[var(--ink-muted)]" strokeWidth={1.5} />
          </button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="workspace-shell">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--line)] px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger aria-label="打开或收起导航" className="size-9 rounded-[8px] text-[var(--ink-soft)] hover:bg-[var(--surface-muted)] md:hidden" />
            <div className="hidden items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-[var(--ink-muted)] sm:flex"><span>CONTENT DESK</span><span className="text-[var(--line-strong)]">/</span><span>{String(workflowStep).padStart(2, "0")}</span></div>
            <div className="h-4 w-px bg-[var(--line)] max-sm:hidden" />
            <p className="truncate text-[14px] text-[var(--ink-soft)]">{viewLabel(view)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-7 border-[var(--line)] bg-[var(--surface-muted)] px-2.5 text-[12px] font-medium text-[var(--ink-soft)]"><span className="mr-0.5 size-1.5 rounded-full bg-[var(--warning)]" />演示数据</Badge>
            <Button variant="ghost" size="sm" onClick={resetDemo} className="hidden h-8 px-2.5 text-[12px] text-[var(--ink-soft)] hover:bg-[var(--surface-muted)] sm:inline-flex"><RefreshCcw className="size-3.5" />重置</Button>
            <Button variant="ghost" size="icon-sm" aria-label="搜索" className="hidden text-[var(--ink-soft)] hover:bg-[var(--surface-muted)] sm:inline-flex"><Search strokeWidth={1.6} /></Button>
            <Button variant="ghost" size="icon-sm" aria-label="使用帮助" className="hidden text-[var(--ink-soft)] hover:bg-[var(--surface-muted)] lg:inline-flex"><CircleHelp strokeWidth={1.6} /></Button>
          </div>
        </header>

        <WorkflowRail step={workflowStep} />

        <div className="workspace-grid min-h-0 flex-1">
          <main className="scrollbar-thin min-w-0 overflow-y-auto" aria-live="polite">
            {view === "workspace" ? <WorkspaceView material={material} setMaterial={(value) => { setMaterial(value); setAnalysisReady(false) }} analysisReady={analysisReady} busyAction={busyAction} loadSample={() => { setMaterial(sampleMaterial); setAnalysisReady(false); toast.success("已加载去身份化演示材料") }} runTopicGeneration={runTopicGeneration} published={published} feedbackSubmitted={feedbackSubmitted} strategyValidated={strategyValidated} goTasks={() => setView("tasks")} goInsights={() => setView("insights")} /> : null}
            {view === "topics" ? <TopicsView analysisReady={analysisReady} material={material} strategyValidated={strategyValidated} expandedTopic={expandedTopic} setExpandedTopic={setExpandedTopic} selectedTopicId={selectedTopicId} chooseTopic={chooseTopic} selectedSegment={selectedSegment} setSelectedSegment={setSelectedSegment} outputMode={outputMode} setOutputMode={setOutputMode} generateScript={generateScript} busyAction={busyAction} back={() => setView("workspace")} /> : null}
            {view === "editor" ? <EditorView topic={selectedTopic} segment={selectedSegmentItem} outputMode={outputMode} setOutputMode={setOutputMode} shots={shots} riskChecked={riskChecked} riskFixed={riskFixed} busyAction={busyAction} runRiskCheck={runRiskCheck} applyRiskFixes={applyRiskFixes} polishShot={polishShot} openPublish={() => setPublishOpen(true)} back={() => setView("topics")} /> : null}
            {view === "tasks" ? <TasksView published={published} feedbackSubmitted={feedbackSubmitted} topic={selectedTopic} segment={selectedSegmentItem} platform={platform} publishDate={publishDate} publishedReal={publishedReal} setPublishedReal={setPublishedReal} plays={plays} setPlays={setPlays} completionRate={completionRate} setCompletionRate={setCompletionRate} consultations={consultations} setConsultations={setConsultations} loadFeedback={loadFeedback} submitFeedback={submitFeedback} startFlow={() => setView(scriptReady ? "editor" : topicsReady ? "topics" : "workspace")} /> : null}
            {view === "insights" ? <InsightsView feedbackSubmitted={feedbackSubmitted} strategyValidated={strategyValidated} goWorkspace={() => setView("workspace")} goTasks={() => setView("tasks")} /> : null}
            {view === "knowledge" ? <KnowledgeView /> : null}
          </main>
          <ContextPanel view={view} riskChecked={riskChecked} riskFixed={riskFixed} strategyValidated={strategyValidated} />
        </div>
      </SidebarInset>

      <PublishDialog open={publishOpen} setOpen={setPublishOpen} platform={platform} setPlatform={setPlatform} publishDate={publishDate} setPublishDate={setPublishDate} publishedReal={publishedReal} setPublishedReal={setPublishedReal} confirm={confirmPublish} />
      <Toaster position="top-center" />
    </SidebarProvider>
  )
}
