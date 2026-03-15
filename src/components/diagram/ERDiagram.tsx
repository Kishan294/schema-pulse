"use client";

import { Button } from "@/components/ui/button";
import { Activity, Cpu, Download, LayoutGrid, Share2 } from "lucide-react";
import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Panel,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { TableNode } from "./TableNode";

const nodeTypes = {
  tableNode: TableNode,
};

const initialNodes = [
  {
    id: "users",
    type: "tableNode",
    position: { x: 100, y: 100 },
    data: {
      label: "users",
      columns: [
        { name: "id", type: "uuid", isPrimary: true },
        { name: "email", type: "varchar", isPrimary: false },
        { name: "created_at", type: "timestamp", isPrimary: false },
        { name: "org_id", type: "uuid", isPrimary: false },
      ],
    },
  },
  {
    id: "organizations",
    type: "tableNode",
    position: { x: 500, y: 50 },
    data: {
      label: "organizations",
      columns: [
        { name: "id", type: "uuid", isPrimary: true },
        { name: "name", type: "varchar", isPrimary: false },
        { name: "plan", type: "varchar", isPrimary: false },
      ],
    },
  },
];

const initialEdges = [
  {
    id: "e-users-orgs",
    source: "users",
    target: "organizations",
    label: "belongs_to",
    animated: true,
    style: {
      stroke: "#3b82f6",
      strokeWidth: 2,
      strokeDasharray: "6 6",
      opacity: 0.4,
    },
  },
];

export function ERDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-full bg-background relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-dot-pattern"
      >
        <Background color="#111111" gap={32} size={1} />

        <Controls
          showInteractive={false}
          className="bg-black/60! border-white/5! backdrop-blur-3xl! rounded-xl! p-1! shadow-2xl! space-y-1!"
        />

        {/* Top Control Rail */}
        <Panel position="top-right" className="flex gap-3 m-6">
          <div className="flex bg-black/40 border border-white/5 backdrop-blur-3xl rounded-xl p-1 shadow-2xl">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 h-9 px-4 text-white/40 hover:text-white hover:bg-white/5 rounded-lg text-[11px] font-bold uppercase tracking-wider"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Auto Layout
            </Button>
            <div className="w-px h-6 bg-white/5 my-auto mx-1" />
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 h-9 px-4 text-white/40 hover:text-white hover:bg-white/5 rounded-lg text-[11px] font-bold uppercase tracking-wider"
            >
              <Download className="w-3.5 h-3.5" />
              Export SVG
            </Button>
          </div>
          <Button className="h-11 px-6 bg-primary text-white hover:bg-primary/90 font-bold rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all group">
            Share Blueprint
            <Share2 className="w-4 h-4 ml-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Button>
        </Panel>

        {/* Global Telemetry Card */}
        <Panel position="bottom-right" className="m-8 group">
          <div className="bg-black/60 border border-white/10 backdrop-blur-3xl rounded-2xl overflow-hidden shadow-2xl w-64 transition-all duration-500 hover:border-primary/40">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Blueprint Radar
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="p-4">
              <MiniMap
                nodeColor="#3b82f6"
                maskColor="rgba(0,0,0,0.8)"
                className="bg-black/40! border-white/5! rounded-lg! overflow-hidden! m-0! w-full! h-32!"
              />
            </div>
            <div className="px-4 pb-4 flex justify-between gap-4">
              <div className="grow bg-white/5 border border-white/5 p-2.5 rounded-xl text-center">
                <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">
                  Entities
                </div>
                <div className="text-sm font-bold">{nodes.length}</div>
              </div>
              <div className="grow bg-white/5 border border-white/5 p-2.5 rounded-xl text-center">
                <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">
                  Edges
                </div>
                <div className="text-sm font-bold">{edges.length}</div>
              </div>
            </div>
          </div>
        </Panel>

        {/* Ambient Overlay Component */}
        <Panel position="bottom-left" className="m-8 flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 backdrop-blur-3xl flex items-center gap-3">
            <Cpu className="w-3.5 h-3.5 text-white/20" />
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] leading-none mb-1">
                Core Protocol
              </span>
              <span className="text-[10px] font-bold text-white/60 tracking-tighter">
                LPU V1.0-STABLE
              </span>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
