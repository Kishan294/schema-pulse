"use client";

import { Hash, Key, Table as TableIcon } from "lucide-react";
import { Handle, Position } from "reactflow";

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
    <div className="min-w-[240px] bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:border-primary/50 group">
      {/* Header */}
      <div className="bg-white/2 px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 transition-all duration-500 group-hover:bg-primary group-hover:border-primary">
            <TableIcon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-primary transition-colors">
              {data.label}
            </span>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] leading-none">
              Entity Protocol
            </span>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/10 group-hover:bg-green-500 group-hover:animate-pulse transition-all" />
      </div>

      {/* Fields */}
      <div className="p-3 space-y-1">
        {data.columns?.map((col, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/3 transition-all group/item border border-transparent hover:border-white/5"
          >
            <div className="flex items-center gap-3">
              {col.isPrimary ? (
                <Key className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Hash className="w-3.5 h-3.5 text-white/10 group-hover/item:text-white/30 transition-colors" />
              )}
              <span
                className={`text-[13px] font-semibold tracking-tight ${col.isPrimary ? "text-white" : "text-white/40"}`}
              >
                {col.name}
              </span>
            </div>
            <span className="text-[10px] font-bold text-white/10 group-hover/item:text-white/20 uppercase tracking-widest pl-4">
              {col.type}
            </span>
          </div>
        ))}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-primary! border-2 border-background! shadow-lg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-primary! border-2 border-background! shadow-lg"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-primary! border-2 border-background! shadow-lg"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-primary! border-2 border-background! shadow-lg"
      />
    </div>
  );
}
