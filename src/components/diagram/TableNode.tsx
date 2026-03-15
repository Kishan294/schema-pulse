"use client";

import { Handle, Position } from "reactflow";
import { Table as TableIcon, Key, Hash, ChevronRight } from "lucide-react";

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
    <div className="min-w-[280px] bg-card/95 backdrop-blur-2xl rounded-3xl border-2 border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 hover:border-primary/50 group hover:-translate-y-2">
      {/* Structural Header */}
      <div className="bg-gradient-to-r from-white/[0.05] to-transparent px-6 py-5 border-b border-white/[0.1] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(137,87,229,0.5)] transition-all duration-500">
            <TableIcon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-[15px] tracking-tighter text-white group-hover:text-primary transition-colors">{data.label}</span>
            <span className="text-[9px] font-black font-mono text-white/20 uppercase tracking-[0.2em]">RDB Entity</span>
          </div>
        </div>
        <div className="flex gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity">
           <div className="w-1.5 h-1.5 rounded-full bg-primary" />
           <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        </div>
      </div>
      
      {/* Column Intelligence */}
      <div className="p-4 space-y-1.5">
        {data.columns?.map((col, idx) => (
          <div key={idx} className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-white/[0.04] transition-all group/item border border-transparent hover:border-white/[0.05]">
            <div className="flex items-center gap-4">
              <div className="relative">
                {col.isPrimary ? (
                  <div className="relative">
                    <Key className="w-4 h-4 text-yellow-500 relative z-10" />
                    <div className="absolute inset-0 bg-yellow-500/40 blur-md z-0" />
                  </div>
                ) : (
                  <Hash className="w-4 h-4 text-white/10 group-hover/item:text-primary transition-colors" />
                )}
              </div>
              <div className="flex flex-col">
                <span className={`text-[14px] font-black tracking-tight ${col.isPrimary ? 'text-white' : 'text-white/70'}`}>
                  {col.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black font-mono text-white/10 group-hover/item:text-white/40 group-hover/item:bg-white/5 px-2.5 py-1 rounded-lg uppercase tracking-widest transition-all">
                 {col.type}
               </span>
               <ChevronRight className="w-3 h-3 text-white/5 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Industrial Strength Handles */}
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-4 h-4 bg-primary! border-[4px] border-[#0d1117] left-[-8px]! shadow-[0_0_15px_rgba(137,87,229,0.8)] hover:scale-150 transition-transform" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-4 h-4 bg-primary! border-[4px] border-[#0d1117] right-[-8px]! shadow-[0_0_15px_rgba(137,87,229,0.8)] hover:scale-150 transition-transform" 
      />
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-4 h-4 bg-primary! border-[4px] border-[#0d1117] top-[-8px]! shadow-[0_0_15px_rgba(137,87,229,0.8)] hover:scale-150 transition-transform" 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-4 h-4 bg-primary! border-[4px] border-[#0d1117] bottom-[-8px]! shadow-[0_0_15px_rgba(137,87,229,0.8)] hover:scale-150 transition-transform" 
      />

      {/* Node Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
