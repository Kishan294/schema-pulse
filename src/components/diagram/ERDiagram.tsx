"use client";

import { Button } from "@/components/ui/button";
import { Download, LayoutGrid, FileText } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  type Connection,
  Controls,
  type Edge,
  type Node as RFNode,
  Panel,
  useEdgesState,
  useNodesState,
  useReactFlow,
  ReactFlowProvider,
  ConnectionLineType,
  MarkerType,
  SelectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TableNode } from "./TableNode";
import { useAppStore } from "@/store/useAppStore";
import { domToSvg, domToPng } from "modern-screenshot";
import jsPDF from "jspdf";

const nodeTypes = {
  tableNode: TableNode,
};

const initialNodes: RFNode[] = [
  {
    id: "users",
    type: "tableNode",
    position: { x: 50, y: 100 },
    data: {
      label: "users",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "email", type: "varchar", isPrimary: false },
        { name: "created_at", type: "timestamp", isPrimary: false },
      ],
    },
  },
  {
    id: "orders",
    type: "tableNode",
    position: { x: 550, y: 100 },
    data: {
      label: "orders",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "user_id", type: "int", isPrimary: false },
        { name: "total", type: "decimal", isPrimary: false },
        { name: "status", type: "varchar", isPrimary: false },
      ],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-orders-users",
    source: "users",
    target: "orders",
    sourceHandle: "id-right-source",
    targetHandle: "user_id-left-target",
    label: "1:N",
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#3b82f6",
      width: 14,
      height: 14,
    },
    style: {
      stroke: "#3b82f6",
      strokeWidth: 1.8,
      opacity: 0.6,
    },
  },
];

function ERDiagramContent() {
  const { analysis, isAnalyzing } = useAppStore();
  const [nodes, setNodes, onNodesChange] = useNodesState<RFNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView } = useReactFlow();
  const [isExporting, setIsExporting] = useState(false);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Sync with AI analysis
  useEffect(() => {
    if (analysis && analysis.entities) {
      const RELATION_COLORS = [
        "#3b82f6", // Blue
        "#06b6d4", // Cyan
        "#8b5cf6", // Purple
        "#f59e0b", // Amber
        "#ec4899", // Pink
        "#10b981", // Emerald
        "#f43f5e", // Rose
      ];

      const linkedColumns = new Map<string, Map<string, string[]>>();

      const newEdges = analysis.relationships.map((rel, idx) => {
        const color = RELATION_COLORS[idx % RELATION_COLORS.length];
        const fromTable = rel.from.toLowerCase();
        const toTable = rel.to.toLowerCase();

        // Logical ER connection: From Parent (PK) to Child (FK)
        // Usually, the one side is 'from' and the many side is 'to'.
        // If fromTable is at x=0 and toTable is at x=500:
        // Use right-source on fromTable and left-target on toTable.
        const sourceHandle = rel.fromColumn
          ? `${rel.fromColumn.toLowerCase()}-right-source`
          : undefined;
        const targetHandle = rel.toColumn
          ? `${rel.toColumn.toLowerCase()}-left-target`
          : undefined;

        if (rel.fromColumn) {
          const colName = rel.fromColumn.toLowerCase();
          if (!linkedColumns.has(fromTable))
            linkedColumns.set(fromTable, new Map());
          const colMap = linkedColumns.get(fromTable)!;
          if (!colMap.has(colName)) colMap.set(colName, []);
          colMap.get(colName)!.push(color);
        }

        if (rel.toColumn) {
          const colName = rel.toColumn.toLowerCase();
          if (!linkedColumns.has(toTable))
            linkedColumns.set(toTable, new Map());
          const colMap = linkedColumns.get(toTable)!;
          if (!colMap.has(colName)) colMap.set(colName, []);
          colMap.get(colName)!.push(color);
        }

        const animated = rel.type === "1:N";
        let strokeDasharray = "";
        switch (rel.type) {
          case "1:1":
            strokeDasharray = "";
            break;
          case "1:N":
            strokeDasharray = "8 4";
            break;
          case "N:M":
            strokeDasharray = "3 3";
            break;
          default:
            strokeDasharray = "8 4";
        }

        return {
          id: `e-${idx}`,
          source: fromTable,
          target: toTable,
          sourceHandle,
          targetHandle,
          type: "smoothstep",
          label: rel.type,
          labelBgPadding: [4, 2] as [number, number],
          labelBgBorderRadius: 4,
          labelBgStyle: {
            fill: "#0a0a0a",
            fillOpacity: 1,
            stroke: color,
            strokeWidth: 0.5,
          },
          labelStyle: { fill: color, fontSize: 9, fontWeight: 800 },
          animated,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color,
            width: 10,
            height: 10,
          },
          markerStart: {
            type: MarkerType.Arrow,
            color,
            width: 8,
            height: 8,
          },
          style: {
            stroke: color,
            strokeWidth: 1.2,
            strokeDasharray,
            opacity: 0.8,
            filter: `drop-shadow(0 0 3px ${color}30)`,
          },
        } as Edge;
      });

      const newNodes = analysis.entities.map((ent, idx) => {
        const tableName = ent.name.toLowerCase();
        return {
          id: tableName,
          type: "tableNode",
          position: { x: (idx % 3) * 550, y: Math.floor(idx / 3) * 600 },
          data: {
            label: ent.name,
            columns: ent.columns.map((col) => {
              const colName = col.name;
              const linkColors =
                linkedColumns.get(tableName)?.get(colName.toLowerCase()) || [];

              return {
                name: colName,
                type: col.type || "varchar",
                isPrimary: col.isPrimary || false,
                linkColors: linkColors,
              };
            }),
          },
        };
      });

      setNodes(newNodes);
      setEdges(newEdges);
      setTimeout(() => fitView({ duration: 1000, padding: 0.3 }), 200);
    }
  }, [analysis, setNodes, setEdges, fitView]);

  const onExport = useCallback(async (format: "pdf" | "svg") => {
    if (reactFlowWrapper.current === null) return;
    const element = reactFlowWrapper.current;
    if (!element) return;

    setIsExporting(true);
    try {
      const exportOptions = {
        backgroundColor: "#05050a",
        scale: format === "svg" ? 1.2 : 2, // SVG doesn't need high scale, PDF/PNG does
        filter: (node: globalThis.Node) => {
          if (node instanceof HTMLElement) {
            // Exclude UI elements and buttons
            if (node.tagName === "BUTTON" || node.tagName === "FORM") return false;
            if (node.classList.contains("react-flow__controls")) return false;
            if (node.classList.contains("react-flow__panel")) return false;
            // Explicitly exclude the attribution (watermark) if desired
            if (node.classList.contains("react-flow__attribution")) return false;
          }
          return true;
        },
      };

      if (format === "svg") {
        // Export as SVG
        const dataUrl = await domToSvg(element, exportOptions);
        const link = document.createElement("a");
        link.download = `schema-${new Date().toISOString().slice(0, 10)}.svg`;
        link.href = dataUrl;
        link.click();
      } else if (format === "pdf") {
        // Export as PDF (convert to PNG first, then add to PDF)
        const dataUrl = await domToPng(element, exportOptions);
        
        // Create PDF
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        const imgWidth = 280; // A4 landscape width minus margins
        const imgHeight = (imgWidth * element.clientHeight) / element.clientWidth;
        
        pdf.addImage(dataUrl, "PNG", 15, 15, imgWidth, imgHeight);
        pdf.save(`schema-${new Date().toISOString().slice(0, 10)}.pdf`);
      }
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, []);

  return (
    <div className="w-full h-full bg-background relative overflow-hidden">
      <div
        ref={reactFlowWrapper}
        className="w-full h-full flex flex-col"
      >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        className="bg-dot-pattern"
        minZoom={0.05}
        maxZoom={4}
        elevateEdgesOnSelect={true}
        selectNodesOnDrag={true}
        selectionMode={SelectionMode.Full}
        defaultEdgeOptions={{
          type: "smoothstep",
          zIndex: 1000,
        }}
      >
        <Background color="#0f0f1a" gap={24} size={1} />

        {isAnalyzing && (
          <div className="absolute inset-0 z-50 bg-[#05050a]/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 blur-2xl animate-pulse" />
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/30 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-sm bg-blue-400/60 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-white/80">
                  Analyzing schema...
                </span>
                <span className="text-[10px] font-medium text-white/40">
                  AI processing in progress
                </span>
              </div>
            </div>
          </div>
        )}

        <Controls
          showInteractive={false}
          className="bg-[#0a0a0f]/90! border-white/5! backdrop-blur-xl! rounded-xl! p-1! shadow-2xl! gap-1!"
        />

        <Panel position="top-right" className="flex gap-2 m-4">
          <div className="flex bg-[#0a0a0f]/90 border border-white/5 backdrop-blur-xl rounded-xl p-1 shadow-xl">
            <Button
              variant="ghost"
              size="sm"
              disabled={isExporting}
              className="gap-2 h-8 px-3 text-white/50 hover:text-white hover:bg-white/5 rounded-lg text-xs font-medium transition-all"
              onClick={() => fitView({ duration: 600, padding: 0.25 })}
            >
              <LayoutGrid className="w-4 h-4" />
              Fit View
            </Button>
            <div className="w-px h-5 bg-white/10 my-auto" />
            <Button
              variant="ghost"
              size="sm"
              disabled={isExporting}
              className="gap-2 h-8 px-3 text-white/50 hover:text-white hover:bg-white/5 rounded-lg text-xs font-medium transition-all"
              onClick={() => onExport("svg")}
            >
              {isExporting ? (
                <div className="w-4 h-4 rounded-sm border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              SVG
            </Button>
            <div className="w-px h-5 bg-white/10 my-auto" />
            <Button
              variant="ghost"
              size="sm"
              disabled={isExporting}
              className="gap-2 h-8 px-3 text-white/50 hover:text-white hover:bg-white/5 rounded-lg text-xs font-medium transition-all"
              onClick={() => onExport("pdf")}
            >
              {isExporting ? (
                <div className="w-4 h-4 rounded-sm border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              PDF
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>

    {isExporting && (
      <div className="absolute inset-0 z-50 bg-[#05050a]/60 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300 pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl animate-pulse" />
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-400/20 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-emerald-400/50 border-t-emerald-400 rounded-full animate-spin" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-semibold text-white/80">
              Generating Export...
            </span>
            <span className="text-[10px] font-medium text-white/40">
              Optimizing nodes and edges
            </span>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export function ERDiagram() {
  return (
    <ReactFlowProvider>
      <ERDiagramContent />
    </ReactFlowProvider>
  );
}
