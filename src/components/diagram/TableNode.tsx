"use client";

import { Handle, Position } from "reactflow";
import { Table as TableIcon, Key, Hash } from "lucide-react";

interface Column {
  name: string;
  type: string;
  isPrimary: boolean;
}

interface TableNodeData {
  label: string;
  columns?: Column[];
}

export function TableNode({ data }: { data: TableNodeData }) {
  return (
    <div className="min-w-[220px] bg-card rounded-xl border-2 border-border/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <div className="bg-primary/5 px-4 py-3 border-b-2 border-border/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TableIcon className="w-4 h-4 text-primary" />
          <span className="font-bold text-sm tracking-tight">{data.label}</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider">Table</span>
      </div>
      
      <div className="p-2 flex flex-col gap-0.5">
        {data.columns?.map((col, idx) => (
          <div key={idx} className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-muted/30 transition-colors group">
            <div className="flex items-center gap-2">
              {col.isPrimary ? (
                <Key className="w-3 h-3 text-yellow-500" />
              ) : (
                <Hash className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary/40 transition-colors" />
              )}
              <span className={`text-xs font-medium ${col.isPrimary ? 'text-foreground' : 'text-muted-foreground'}`}>
                {col.name}
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors uppercase">
              {col.type}
            </span>
          </div>
        ))}
      </div>

      {/* Handles for relationships */}
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-primary! border-2 border-background" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-primary! border-2 border-background" />
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-primary! border-2 border-background" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-primary! border-2 border-background" />
    </div>
  );
}
