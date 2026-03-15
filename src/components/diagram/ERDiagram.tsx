"use client";

import { Button } from "@/components/ui/button";
import { Cpu, Download, LayoutGrid, Share2 } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  type Connection,
  Controls,
  type Edge,
  type Node,
  MiniMap,
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
import { toPng, toSvg } from "html-to-image";
import { Database } from "lucide-react";

const nodeTypes = {
  tableNode: TableNode,
};

const initialNodes: Node[] = [
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
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6", width: 14, height: 14 },
    style: {
      stroke: "#3b82f6",
      strokeWidth: 1.8,
      opacity: 0.6,
    },
  },
];

function ERDiagramContent() {
  const { analysis, isAnalyzing } = useAppStore();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView } = useReactFlow();

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
        const sourceHandle = rel.fromColumn ? `${rel.fromColumn.toLowerCase()}-right-source` : undefined;
        const targetHandle = rel.toColumn ? `${rel.toColumn.toLowerCase()}-left-target` : undefined;
        
        if (rel.fromColumn) {
          const colName = rel.fromColumn.toLowerCase();
          if (!linkedColumns.has(fromTable)) linkedColumns.set(fromTable, new Map());
          const colMap = linkedColumns.get(fromTable)!;
          if (!colMap.has(colName)) colMap.set(colName, []);
          colMap.get(colName)!.push(color);
        }

        if (rel.toColumn) {
          const colName = rel.toColumn.toLowerCase();
          if (!linkedColumns.has(toTable)) linkedColumns.set(toTable, new Map());
          const colMap = linkedColumns.get(toTable)!;
          if (!colMap.has(colName)) colMap.set(colName, []);
          colMap.get(colName)!.push(color);
        }

        const animated = rel.type === "1:N";
        let strokeDasharray = "";
        switch (rel.type) {
          case "1:1": strokeDasharray = ""; break;
          case "1:N": strokeDasharray = "8 4"; break;
          case "N:M": strokeDasharray = "3 3"; break;
          default: strokeDasharray = "8 4";
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
          labelBgStyle: { fill: "#0a0a0a", fillOpacity: 1, stroke: color, strokeWidth: 0.5 },
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
            columns: ent.columns.map(col => {
              const colName = col.name;
              const linkColors = linkedColumns.get(tableName)?.get(colName.toLowerCase()) || [];
              
              return {
                name: colName,
                type: col.type || "varchar",
                isPrimary: col.isPrimary || false,
                linkColors: linkColors
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

  const onExport = useCallback(async (format: 'png' | 'svg') => {
    if (reactFlowWrapper.current === null) return;
    const element = reactFlowWrapper.current.querySelector('.react-flow__viewport') as HTMLElement;
    if (!element) return;

    try {
      const dataUrl = format === 'png' 
        ? await toPng(element, { backgroundColor: '#050505', quality: 1, pixelRatio: 2 })
        : await toSvg(element, { backgroundColor: '#050505' });
        
      const link = document.createElement("a");
      link.download = `schema-pulse-export.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full bg-background relative overflow-hidden">
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
          type: 'smoothstep',
          zIndex: 1000,
        }}
      >
        <Background color="#111111" gap={32} size={1} />
        
        {isAnalyzing && (
          <div className="absolute inset-0 z-100 bg-background/60 backdrop-blur-md flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse" />
                <Cpu className="w-16 h-16 text-primary animate-bounce" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-black uppercase tracking-[0.5em] text-white">Synthesizing Schema</span>
                <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">LPU processing in progress...</span>
              </div>
            </div>
          </div>
        )}

        <Controls
          showInteractive={false}
          className="bg-black/60! border-white/5! backdrop-blur-3xl! rounded-2xl! p-1.5! shadow-2xl! space-y-1.5!"
        />

        <Panel position="top-right" className="flex gap-4 m-8">
          <div className="flex bg-black/60 border border-white/10 backdrop-blur-3xl rounded-2xl p-1.5 shadow-2xl transition-all hover:border-white/20">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2.5 h-10 px-5 text-white/50 hover:text-white hover:bg-white/5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all"
              onClick={() => fitView({ duration: 800, padding: 0.2 })}
            >
              <LayoutGrid className="w-4 h-4" />
              Auto Layout
            </Button>
            <div className="w-px h-6 bg-white/10 my-auto mx-1.5" />
            <Button
              variant="ghost"
              size="sm"
              className="gap-2.5 h-10 px-5 text-white/50 hover:text-white hover:bg-white/5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all"
              onClick={() => onExport('png')}
            >
              <Download className="w-4 h-4" />
              Snapshot
            </Button>
          </div>
          <Button 
            className="h-12 px-8 bg-primary text-white hover:bg-primary/90 font-black rounded-2xl shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all group active:scale-95 border border-primary/20"
            onClick={() => {
              const text = JSON.stringify({ nodes, edges }, null, 2);
              navigator.clipboard.writeText(text);
              alert("Blueprint configuration copied!");
            }}
          >
            <Database className="w-4.5 h-4.5 mr-3" />
            Deploy Blueprint
            <Share2 className="w-4.5 h-4.5 ml-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Button>
        </Panel>

        <Panel position="bottom-right" className="m-10 group">
          <div className="bg-black/60 border border-white/10 backdrop-blur-3xl rounded-4xl overflow-hidden shadow-2xl w-72 transition-all duration-700 hover:border-primary/50 hover:scale-105">
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90">
                  Global Map
                </span>
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
            </div>
            <div className="p-2">
              <MiniMap
                zoomable
                pannable
                className="bg-transparent! m-0! w-full! h-40! opacity-80!"
                nodeColor="#1a1a1a"
                maskColor="rgba(0, 0, 0, 0.5)"
              />
            </div>
            <div className="px-5 pb-6 flex justify-between gap-5 mt-3">
              <div className="grow bg-white/5 border border-white/5 p-3.5 rounded-2xl text-center group/stat hover:bg-primary/5 transition-colors">
                <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1.5 group-hover/stat:text-primary/50">
                  Nodes
                </div>
                <div className="text-lg font-black text-white group-hover/stat:text-primary">{nodes.length}</div>
              </div>
              <div className="grow bg-white/5 border border-white/5 p-3.5 rounded-2xl text-center group/stat hover:bg-primary/5 transition-colors">
                <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1.5 group-hover/stat:text-primary/50">
                  Edges
                </div>
                <div className="text-lg font-black text-white group-hover/stat:text-primary">{edges.length}</div>
              </div>
            </div>
          </div>
        </Panel>

        <Panel position="bottom-left" className="m-10 flex items-center gap-5">
          <div className="px-6 py-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-3xl flex items-center gap-4 hover:border-primary/30 transition-colors cursor-help">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] leading-none mb-1.5">
                System Status
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white tracking-tight">
                  LPU V1.2
                </span>
                <span className="text-[8px] font-bold bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">Operational</span>
              </div>
            </div>
          </div>
        </Panel>
      </ReactFlow>
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

