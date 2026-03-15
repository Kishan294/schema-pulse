"use client";

import { useCallback } from "react";
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Connection,
  Edge,
  Panel
} from "reactflow";
import "reactflow/dist/style.css";
import { TableNode } from "./TableNode";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Download, Maximize2, Share2, Activity, Layers, Box } from "lucide-react";

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
      ] 
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
      ] 
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
    style: { stroke: "#8957e5", strokeWidth: 4, strokeDasharray: '8 8', opacity: 0.8 },
  },
];

export function ERDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-full bg-[#02040a] relative overflow-hidden">
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
        {/* Architectural Background */}
        <Background color="#30363d" gap={40} size={1} />
        
        {/* Refined Glass Controls */}
        <Controls 
          showInteractive={false} 
          className="bg-black/60! border-white/[0.08]! backdrop-blur-3xl! rounded-3xl! p-2! shadow-3xl! space-y-2!" 
        />
        
        {/* Panoramic Minimap with Label */}
        <Panel position="bottom-right" className="m-8 group">
           <div className="mb-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
             <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Radar System 1.0</span>
           </div>
           <MiniMap 
            nodeColor="#8957e5" 
            maskColor="rgba(0,0,0,0.8)" 
            className="bg-black/60! border-white/[0.08]! backdrop-blur-3xl! rounded-3xl! overflow-hidden! shadow-3xl! border-2! m-0! w-64! h-40!"
          />
        </Panel>
        
        {/* Advanced Action Panel */}
        <Panel position="top-right" className="flex gap-4 m-10">
          <Button size="xl" variant="secondary" className="gap-3 h-14 px-8 bg-black/60 border-white/8 backdrop-blur-3xl text-white hover:bg-white/10 transition-all rounded-[20px] shadow-3xl border">
            <LayoutGrid className="w-5 h-5 text-primary" />
            <span className="text-sm font-black uppercase tracking-widest font-heading">Architect Layout</span>
          </Button>
          <Button size="xl" className="gap-3 h-14 px-8 bg-white text-black hover:bg-white/90 transition-all rounded-[20px] shadow-3xl border-0 font-heading">
            <Download className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-widest">Export Vector</span>
          </Button>
          <Button variant="secondary" className="w-14 h-14 p-0 bg-black/60 border-white/8 backdrop-blur-3xl text-white hover:bg-white/10 transition-all rounded-[20px] shadow-3xl border">
            <Share2 className="w-5 h-5" />
          </Button>
        </Panel>

        {/* Real-time Telemetry Panel */}
        <Panel position="bottom-left" className="m-10 bg-black/60 backdrop-blur-3xl p-8 rounded-[32px] border border-white/8 shadow-3xl flex flex-col gap-8 w-80">
           <div className="flex flex-col gap-2 border-b border-white/5 pb-6">
             <div className="flex items-center gap-3 mb-1">
               <Activity className="w-4 h-4 text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Canvas Telemetry</span>
             </div>
             <h4 className="text-2xl font-black text-white italic tracking-tightest font-heading">Live Engine <span className="text-primary">v1</span></h4>
           </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between group">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all">
                   <Layers className="w-4 h-4 text-primary group-hover:text-white" />
                 </div>
                 <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Entities</span>
               </div>
               <span className="text-xl font-black text-white font-heading">{nodes.length}</span>
            </div>
            <div className="flex items-center justify-between group">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20 group-hover:bg-accent transition-all">
                   <Box className="w-4 h-4 text-accent group-hover:text-white" />
                 </div>
                 <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Relations</span>
               </div>
               <span className="text-xl font-black text-white font-heading">{edges.length}</span>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex items-center justify-between opacity-50">
             <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-1.5 h-6 bg-white/5 rounded-full relative overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 bg-primary/40" style={{ height: `${i * 30}%` }} />
                  </div>
                ))}
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
               <Maximize2 className="w-4 h-4 shrink-0" />
               Full Spectrum
             </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
