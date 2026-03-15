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
import { LayoutGrid, Download } from "lucide-react";

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
        { name: "id", type: "int", isPrimary: true },
        { name: "email", type: "varchar", isPrimary: false },
        { name: "created_at", type: "timestamp", isPrimary: false },
      ] 
    },
  },
  {
    id: "orders",
    type: "tableNode",
    position: { x: 500, y: 150 },
    data: { 
      label: "orders", 
      columns: [
        { name: "id", type: "int", isPrimary: true },
        { name: "user_id", type: "int", isPrimary: false },
        { name: "total", type: "decimal", isPrimary: false },
        { name: "status", type: "varchar", isPrimary: false },
      ] 
    },
  },
];

const initialEdges = [
  { 
    id: "e-orders-users", 
    source: "orders", 
    target: "users", 
    label: "user_id → id",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 2 },
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
    <div className="w-full h-full bg-[#050505] relative rounded-xl overflow-hidden border border-border/50">
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
        <Background color="#1e1e2e" gap={20} />
        <Controls showInteractive={false} className="bg-card! border-border! rounded-lg! shadow-xl!" />
        <MiniMap 
          nodeColor="#6366f1" 
          maskColor="rgba(0,0,0,0.4)" 
          className="bg-card! border-border! rounded-lg! shadow-xl!"
        />
        
        <Panel position="top-right" className="flex gap-2">
          <Button size="sm" variant="secondary" className="gap-2 h-9 border border-border shadow-lg">
            <LayoutGrid className="w-4 h-4" />
            Auto Layout
          </Button>
          <Button size="sm" variant="secondary" className="gap-2 h-9 border border-border shadow-lg">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </Panel>

        <Panel position="bottom-left" className="bg-card/50 backdrop-blur-md p-3 rounded-lg border border-border/50 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            <div className="w-2 h-2 rounded-full bg-primary" />
            Active Relationships: {edges.length}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Total Entities: {nodes.length}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
