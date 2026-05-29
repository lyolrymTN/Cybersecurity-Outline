"use client";

import { useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  MarkerType,
  Node,
  Edge,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ArrowDown, ArrowRight } from "lucide-react";

import type { Course } from "@/lib/types";
import { CATEGORY_STYLES } from "@/lib/types";
import { getCourse, commonTerms, getTrackPlan } from "@/lib/data";
import { computeRiskLevel } from "@/lib/prerequisite";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";

type Mode = "academic" | "prereq" | "risk" | "student";
type TrackKey = "project" | "coop" | "wil";
type LayoutDir = "TB" | "LR";

type ModeConfig = {
  nodeHeight: number;
  nodeGap: number;
  fontTitle: number;
  fontCode: number;
  edgeAlways: boolean;
  edgeColor: string;
  edgeWidth: number;
  desaturate: boolean;
};

const MODE_CONFIG: Record<Mode, ModeConfig> = {
  academic: {
    nodeHeight: 96,
    nodeGap: 18,
    fontTitle: 13,
    fontCode: 11,
    edgeAlways: false,
    edgeColor: "rgba(148,163,184,0.35)",
    edgeWidth: 1.4,
    desaturate: false,
  },
  prereq: {
    nodeHeight: 96,
    nodeGap: 18,
    fontTitle: 13,
    fontCode: 11,
    edgeAlways: true,
    edgeColor: "rgba(34,211,238,0.75)",
    edgeWidth: 2,
    desaturate: true,
  },
  risk: {
    nodeHeight: 96,
    nodeGap: 18,
    fontTitle: 13,
    fontCode: 11,
    edgeAlways: false,
    edgeColor: "rgba(148,163,184,0.35)",
    edgeWidth: 1.4,
    desaturate: false,
  },
  student: {
    nodeHeight: 118,
    nodeGap: 22,
    fontTitle: 15,
    fontCode: 12,
    edgeAlways: false,
    edgeColor: "rgba(148,163,184,0.35)",
    edgeWidth: 1.4,
    desaturate: false,
  },
};

const CARD_WIDTH = 232;
const CARD_GAP_X = 24;
const ROW_HEADER_H = 40;
const ROW_GAP_Y = 64;

type CourseNodeData = {
  course: Course;
  mode: Mode;
  cfg: ModeConfig;
  risk: string;
  layoutDir: LayoutDir;
  inNetwork: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  isHoveredNode: boolean;
  courseName: (c: Course) => string;
  onHoverEnter: (id: string) => void;
  onHoverLeave: () => void;
  onSelect: (course: Course) => void;
};

function CourseNode({ data }: NodeProps<Node<CourseNodeData>>) {
  const {
    course,
    mode,
    cfg,
    risk,
    layoutDir,
    inNetwork,
    isDimmed,
    isHoveredNode,
    courseName,
    onHoverEnter,
    onHoverLeave,
    onSelect,
  } = data;

  const style = CATEGORY_STYLES[course.category];

  let bgClass = style.color;
  let borderClass = style.border;
  if (mode === "risk") {
    bgClass =
      risk === "critical"
        ? "bg-red-500"
        : risk === "high"
        ? "bg-orange-500"
        : risk === "medium"
        ? "bg-yellow-500"
        : "bg-green-500";
    borderClass =
      risk === "critical"
        ? "border-red-600"
        : risk === "high"
        ? "border-orange-600"
        : risk === "medium"
        ? "border-yellow-600"
        : "border-green-600";
  } else if (mode === "prereq") {
    bgClass = inNetwork ? style.color : "bg-slate-600";
    borderClass = inNetwork ? style.border : "border-slate-700";
  }

  const dimOpacity = isDimmed ? 0.3 : 1;
  const hoverBorder = isHoveredNode ? "border-cyan-400 border-[2px]" : "border-black/20 border-[1px]";

  const textClass = mode === "risk" ? "text-white" : style.text;
  const isLR = layoutDir === "LR";

  return (
    <div
      className={`relative rounded-xl shadow-md transition-all duration-200 ease-in-out cursor-pointer ${bgClass} ${textClass} ${hoverBorder} hover:-translate-y-1 hover:shadow-lg`}
      style={{
        width: CARD_WIDTH,
        height: cfg.nodeHeight,
        opacity: dimOpacity,
      }}
      onMouseEnter={() => onHoverEnter(course.id)}
      onMouseLeave={() => onHoverLeave()}
      onClick={() => onSelect(course)}
    >
      <Handle
        type="target"
        position={isLR ? Position.Left : Position.Top}
        className="opacity-0"
      />

      {/* P Badge */}
      {course.prerequisites.some((p) => p.type !== "none") && (
        <div className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/30 text-[10px] font-bold text-white">
          P
        </div>
      )}

      {/* Risk Badge */}
      {mode === "risk" && (
        <div className="absolute top-2.5 left-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/30 text-[10px] font-bold text-white">
          {risk === "critical" ? "C" : risk === "high" ? "H" : risk === "medium" ? "M" : "L"}
        </div>
      )}

      <div className="px-3 pt-3">
        <div
          className="font-mono font-semibold"
          style={{ fontSize: cfg.fontCode, marginLeft: mode === "risk" ? 24 : 0 }}
        >
          {course.code}
        </div>
        <div
          className="mt-1 font-semibold leading-snug line-clamp-3"
          style={{ fontSize: cfg.fontTitle, WebkitLineClamp: mode === "student" ? 4 : 3 }}
        >
          {courseName(course)}
        </div>
      </div>

      <Handle
        type="source"
        position={isLR ? Position.Right : Position.Bottom}
        className="opacity-0"
      />
    </div>
  );
}

function TermHeaderNode({ data }: NodeProps<Node<{ label: string; subLabel: string; width: number }>>) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-slate-300 bg-slate-100 py-2 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 shadow-sm"
      style={{ width: data.width, height: ROW_HEADER_H }}
    >
      <div className="text-sm font-bold">{data.label}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{data.subLabel}</div>
    </div>
  );
}

const nodeTypes = {
  course: CourseNode,
  termHeader: TermHeaderNode,
};

export function CurriculumFlowDiagram({
  onSelect,
}: {
  onSelect: (course: Course) => void;
}) {
  const [track, setTrack] = useState<TrackKey>("project");
  const [mode, setMode] = useState<Mode>("academic");
  const [layoutDir, setLayoutDir] = useState<LayoutDir>("TB");
  const [hovered, setHovered] = useState<string | null>(null);
  const { t, courseName } = useLang();
  const { theme } = useTheme();

  const cfg = MODE_CONFIG[mode];

  const terms = useMemo(() => {
    return [...commonTerms, ...getTrackPlan(track).terms];
  }, [track]);

  // Network calculation
  const rawEdges = useMemo(() => {
    const list: { from: string; to: string }[] = [];
    const nodeIds = new Set();
    for (const term of terms) {
      for (const cid of term.courses) {
        nodeIds.add(cid);
      }
    }

    for (const term of terms) {
      for (const cid of term.courses) {
        const c = getCourse(cid);
        if (!c) continue;
        for (const r of c.prerequisites) {
          for (const ref of r.courses ?? []) {
            if (nodeIds.has(ref)) list.push({ from: ref, to: cid });
          }
        }
      }
    }
    return list;
  }, [terms]);

  const inNetwork = useMemo(() => {
    const set = new Set<string>();
    for (const e of rawEdges) {
      set.add(e.from);
      set.add(e.to);
    }
    return set;
  }, [rawEdges]);

  const { upstream, downstream } = useMemo(() => {
    const up = new Set<string>();
    const down = new Set<string>();
    if (!hovered) return { upstream: up, downstream: down };

    const stackU = [hovered];
    while (stackU.length) {
      const cur = stackU.pop()!;
      const c = getCourse(cur);
      if (!c) continue;
      for (const r of c.prerequisites) {
        for (const ref of r.courses ?? []) {
          if (!up.has(ref)) {
            up.add(ref);
            stackU.push(ref);
          }
        }
      }
    }

    const stackD = [hovered];
    while (stackD.length) {
      const cur = stackD.pop()!;
      for (const e of rawEdges) {
        if (e.from === cur && !down.has(e.to)) {
          down.add(e.to);
          stackD.push(e.to);
        }
      }
    }
    return { upstream: up, downstream: down };
  }, [hovered, rawEdges]);

  // Graph Layout mapping
  const { nodes, edges } = useMemo(() => {
    const maxCoursesInTerm = Math.max(...terms.map((t) => t.courses.length), 1);
    const rowContentH = cfg.nodeHeight;

    const newNodes: Node[] = [];

    if (layoutDir === "TB") {
      const rowFullH = ROW_HEADER_H + rowContentH + ROW_GAP_Y;
      const innerW = maxCoursesInTerm * CARD_WIDTH + (maxCoursesInTerm - 1) * CARD_GAP_X;

      terms.forEach((term, rowIdx) => {
        const yTop = rowIdx * rowFullH;

        // Add Term Header Node
        newNodes.push({
          id: `term-h-${rowIdx}`,
          type: "termHeader",
          position: { x: 0, y: yTop },
          data: {
            label: `Year ${term.year} · Sem ${term.semester}`,
            subLabel: `${term.totalCredits} ${t("common.credits")}${
              term.cumulative != null ? ` · รวมสะสม ${term.cumulative}` : ""
            }`,
            width: innerW,
          },
          draggable: false,
          selectable: false,
        });

        const count = term.courses.length;
        const usedW = count * CARD_WIDTH + (count - 1) * CARD_GAP_X;
        const startX = Math.max(0, (innerW - usedW) / 2);

        term.courses.forEach((cid, colIdx) => {
          const x = startX + colIdx * (CARD_WIDTH + CARD_GAP_X);
          const y = yTop + ROW_HEADER_H + 24;

          const course = getCourse(cid);
          if (!course) return;
          const risk = computeRiskLevel(cid);

          const isHighlighted =
            !hovered || hovered === cid || upstream.has(cid) || downstream.has(cid);
          const isDimmed = hovered ? !isHighlighted : false;

          newNodes.push({
            id: cid,
            type: "course",
            position: { x, y },
            data: {
              course,
              mode,
              cfg,
              risk,
              layoutDir,
              inNetwork: inNetwork.has(cid),
              isHighlighted,
              isDimmed,
              isHoveredNode: hovered === cid,
              courseName,
              onHoverEnter: setHovered,
              onHoverLeave: () => setHovered(null),
              onSelect,
            },
          });
        });
      });
    } else {
      // LR layout (Left-to-Right)
      const colFullW = CARD_WIDTH + CARD_GAP_X * 2;
      const COURSE_GAP_Y = 24;
      const innerH = maxCoursesInTerm * rowContentH + (maxCoursesInTerm - 1) * COURSE_GAP_Y;

      terms.forEach((term, colIdx) => {
        const xLeft = colIdx * colFullW;

        newNodes.push({
          id: `term-h-${colIdx}`,
          type: "termHeader",
          position: { x: xLeft, y: 0 },
          data: {
            label: `Year ${term.year} · Sem ${term.semester}`,
            subLabel: `${term.totalCredits} ${t("common.credits")}${
              term.cumulative != null ? ` · รวมสะสม ${term.cumulative}` : ""
            }`,
            width: CARD_WIDTH,
          },
          draggable: false,
          selectable: false,
        });

        const count = term.courses.length;
        const usedH = count * rowContentH + (count - 1) * COURSE_GAP_Y;
        const startY = ROW_HEADER_H + 32 + Math.max(0, (innerH - usedH) / 2);

        term.courses.forEach((cid, rowIdx) => {
          const x = xLeft;
          const y = startY + rowIdx * (rowContentH + COURSE_GAP_Y);

          const course = getCourse(cid);
          if (!course) return;
          const risk = computeRiskLevel(cid);

          const isHighlighted =
            !hovered || hovered === cid || upstream.has(cid) || downstream.has(cid);
          const isDimmed = hovered ? !isHighlighted : false;

          newNodes.push({
            id: cid,
            type: "course",
            position: { x, y },
            data: {
              course,
              mode,
              cfg,
              risk,
              layoutDir,
              inNetwork: inNetwork.has(cid),
              isHighlighted,
              isDimmed,
              isHoveredNode: hovered === cid,
              courseName,
              onHoverEnter: setHovered,
              onHoverLeave: () => setHovered(null),
              onSelect,
            },
          });
        });
      });
    }

    const newEdges: Edge[] = rawEdges.map((e, i) => {
      const isHot =
        hovered &&
        (e.from === hovered ||
          e.to === hovered ||
          (upstream.has(e.from) && (upstream.has(e.to) || e.to === hovered)) ||
          (downstream.has(e.to) && (downstream.has(e.from) || e.from === hovered)));

      const isVisible = isHot || cfg.edgeAlways;
      const defaultEdgeColor = theme === "dark" ? cfg.edgeColor : "rgba(148, 163, 184, 0.4)";

      return {
        id: `e-${e.from}-${e.to}`,
        source: e.from,
        target: e.to,
        type: "smoothstep",
        animated: !!isHot,
        hidden: !isVisible,
        style: {
          stroke: isHot ? "rgba(34,211,238,0.95)" : defaultEdgeColor,
          strokeWidth: isHot ? 2.5 : cfg.edgeWidth,
          transition: "stroke 0.2s, stroke-width 0.2s",
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isHot ? "rgba(34,211,238,0.95)" : defaultEdgeColor,
        },
      };
    });

    return { nodes: newNodes, edges: newEdges };
  }, [
    terms,
    cfg,
    mode,
    layoutDir,
    hovered,
    upstream,
    downstream,
    rawEdges,
    inNetwork,
    theme,
    t,
    courseName,
    onSelect,
  ]);

  return (
    <div className="card overflow-hidden">
      {/* Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-4 no-print dark:border-navy-700">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-navy-900 dark:text-slate-100">
            {t("curriculum.track")}:
          </span>
          {(["project", "coop", "wil"] as const).map((tk) => (
            <button
              key={tk}
              onClick={() => setTrack(tk)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                track === tk
                  ? "bg-navy-700 text-white dark:bg-cyan-500 dark:text-navy-950"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-navy-800 dark:text-slate-200 dark:hover:bg-navy-700"
              }`}
            >
              {tk === "project" ? "Project" : tk === "coop" ? "Co-op" : "WIL"}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-navy-900 dark:text-slate-100 hidden sm:inline">
              Layout:
            </span>
            <div className="flex rounded-md bg-slate-100 p-1 dark:bg-navy-800">
              <button
                onClick={() => setLayoutDir("TB")}
                className={`flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors ${
                  layoutDir === "TB"
                    ? "bg-white text-cyan-600 shadow-sm dark:bg-navy-700 dark:text-cyan-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                <ArrowDown size={14} />
                แนวดิ่ง
              </button>
              <button
                onClick={() => setLayoutDir("LR")}
                className={`flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors ${
                  layoutDir === "LR"
                    ? "bg-white text-cyan-600 shadow-sm dark:bg-navy-700 dark:text-cyan-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                <ArrowRight size={14} />
                แนวนอน
              </button>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-[1px] bg-slate-300 dark:bg-navy-600"></div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-navy-900 dark:text-slate-100">
              {t("curriculum.view")}:
            </span>
            {(
              [
                { id: "academic", k: "curriculum.view.academic" },
                { id: "prereq", k: "curriculum.view.prereq" },
                { id: "risk", k: "curriculum.view.risk" },
                { id: "student", k: "curriculum.view.student" },
              ] as { id: Mode; k: string }[]
            ).map((v) => (
              <button
                key={v.id}
                onClick={() => setMode(v.id)}
                className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                  mode === v.id
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-navy-800 dark:text-slate-200 dark:hover:bg-navy-700"
                }`}
              >
                {t(v.k)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600 dark:border-navy-700 dark:bg-navy-900/60 dark:text-slate-300">
        {t(`curriculum.view.${mode}.desc`)}
      </div>

      {/* Flow Canvas */}
      <div
        className="relative bg-slate-50 dark:bg-navy-950"
        style={{ height: "700px" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          colorMode={theme}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
          key={layoutDir} // Force ReactFlow to re-initialize and auto-fitView when layout changes
        >
          <Background color={theme === "dark" ? "#94a3b8" : "#cbd5e1"} gap={20} size={1} />
          <Controls className="dark:bg-navy-800 dark:fill-white dark:border-navy-700" />
          <MiniMap
            zoomable
            pannable
            nodeColor={(node) => {
              if (node.type === "termHeader") return theme === "dark" ? "#334155" : "#e2e8f0";
              const c = (node.data as any).course as Course;
              if (!c) return "#475569";
              const style = CATEGORY_STYLES[c.category];
              const map: Record<string, string> = {
                "bg-emerald-500": "#10b981",
                "bg-orange-500": "#f97316",
                "bg-sky-500": "#0ea5e9",
                "bg-fuchsia-500": "#d946ef",
                "bg-emerald-300": "#6ee7b7",
                "bg-slate-700": "#334155",
              };
              return map[style.color] || "#475569";
            }}
            maskColor={theme === "dark" ? "rgba(15, 23, 42, 0.7)" : "rgba(241, 245, 249, 0.7)"}
            className={theme === "dark" ? "bg-navy-900" : "bg-slate-50"}
          />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="border-t border-slate-200 bg-white p-3 text-xs text-slate-600 dark:border-navy-700 dark:bg-navy-950/80 dark:text-slate-300">
        <Legend mode={mode} prereqLabel={t("curriculum.legend.prereq")} />
      </div>
    </div>
  );
}

function Legend({ mode, prereqLabel }: { mode: Mode; prereqLabel: string }) {
  if (mode === "risk") {
    const items = [
      { label: "Low", hex: "#22c55e", code: "L" },
      { label: "Medium", hex: "#eab308", code: "M" },
      { label: "High", hex: "#f97316", code: "H" },
      { label: "Critical", hex: "#ef4444", code: "C" },
    ];
    return (
      <div className="flex flex-wrap items-center gap-3">
        {items.map((it) => (
          <span key={it.label} className="inline-flex items-center gap-1.5">
            <span
              className="grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold text-white"
              style={{ background: it.hex }}
            >
              {it.code}
            </span>
            {it.label}
          </span>
        ))}
      </div>
    );
  }

  const items: { label: string; hex: string }[] = [
    { label: "Gen-Ed", hex: "#10b981" },
    { label: "Math & Sci", hex: "#f97316" },
    { label: "Core", hex: "#0ea5e9" },
    { label: "Elective", hex: "#d946ef" },
    { label: "Free Elective", hex: "#6ee7b7" },
  ];
  if (mode === "prereq") items.push({ label: "Standalone", hex: "#475569" });

  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded" style={{ background: it.hex }} />
          {it.label}
        </span>
      ))}
      <span className="ml-auto inline-flex items-center gap-1.5">
        <span className="grid h-4 w-4 place-items-center rounded-full bg-black/40 text-[9px] font-bold text-white">
          P
        </span>
        {prereqLabel}
      </span>
    </div>
  );
}
