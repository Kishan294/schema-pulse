"use client";

import { Hash, Key, Table as TableIcon } from "lucide-react";
import { Handle, Position } from "@xyflow/react";

interface Column {
  name: string;
  type: string;
  isPrimary: boolean;
  linkColors?: string[];
}

interface TableNodeData {
  label: string;
  columns?: Column[];
}

export function TableNode({ data }: { data: TableNodeData }) {
  return (
    <div className="min-w-[260px] bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-primary/50 group relative">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Header */}
      <div className="bg-white/2 px-5 py-4 border-b border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <TableIcon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-[15px] tracking-tight text-white group-hover:text-primary transition-colors">
              {data.label}
            </span>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] leading-none">
              Entity Protocol
            </span>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/10 group-hover:bg-green-500 group-hover:shadow-[0_0_8px_#22c55e] transition-all" />
      </div>

      {/* Fields */}
      <div className="p-2 space-y-0.5 relative z-10">
        {data.columns?.map((col, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group/item border border-transparent hover:border-white/5 relative"
          >
            {/* Left Handles */}
            <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 flex flex-col gap-0.5 z-20">
              <Handle
                type="target"
                position={Position.Left}
                id={`${col.name.toLowerCase()}-left-target`}
                className="w-1.5! h-1.5! bg-primary! border! border-background! opacity-0! group-hover/item:opacity-100! transition-all hover:scale-150!"
              />
              <Handle
                type="source"
                position={Position.Left}
                id={`${col.name.toLowerCase()}-left-source`}
                className="w-1.5! h-1.5! bg-blue-400! border! border-background! opacity-0! group-hover/item:opacity-100! transition-all hover:scale-150!"
              />
            </div>
            
            <div className="flex items-center gap-3">
              {col.isPrimary ? (
                <Key className="w-3 h-3 text-primary drop-shadow-[0_0_3px_rgba(59,130,246,0.3)]" />
              ) : col.linkColors && col.linkColors.length > 0 ? (
                <div className="flex gap-1 items-center">
                  {col.linkColors.map((color, cIdx) => (
                    <div key={cIdx} className="relative">
                      <Hash className="w-3 h-3 text-white/10" style={{ color: cIdx === 0 ? color : undefined, opacity: cIdx === 0 ? 0.8 : 1 }} />
                      <div 
                        className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full animate-pulse shadow-lg" 
                        style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Hash className="w-3 h-3 text-white/5 group-hover/item:text-white/20 transition-colors" />
              )}
              <span
                className={`text-[12px] font-medium tracking-tight transition-colors ${
                  col.isPrimary 
                    ? "text-white" 
                    : (col.linkColors && col.linkColors.length > 0) 
                      ? "text-white/90" 
                      : "text-white/30"
                }`}
                style={{ color: (col.linkColors && col.linkColors.length > 0) ? col.linkColors[0] : undefined }}
              >
                {col.name}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-white/5 group-hover/item:text-white/15 uppercase tracking-widest pl-4 transition-colors">
                {col.type}
              </span>
              
              {/* Right Handles */}
              <div className="absolute -right-[9px] top-1/2 -translate-y-1/2 flex flex-col gap-0.5 z-20">
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${col.name.toLowerCase()}-right-source`}
                  className="w-1.5! h-1.5! bg-blue-400! border! border-background! opacity-0! group-hover/item:opacity-100! transition-all hover:scale-150!"
                />
                <Handle
                  type="target"
                  position={Position.Right}
                  id={`${col.name.toLowerCase()}-right-target`}
                  className="w-1.5! h-1.5! bg-primary! border! border-background! opacity-0! group-hover/item:opacity-100! transition-all hover:scale-150!"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

