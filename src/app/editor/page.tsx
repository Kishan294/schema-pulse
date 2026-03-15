"use client";

import { ERDiagram } from "@/components/diagram/ERDiagram";
import { SchemaEditor } from "@/components/editor/SchemaEditor";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/useAppStore";
import {
  ArrowLeft,
  ChevronRight,
  Cpu,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

export default function EditorPage() {
  const { isAnalyzing, analysis } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* HUD Header */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-3xl shrink-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/">
            <div className="flex items-center gap-3 active:scale-95 transition-transform group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight hidden md:block">
                Workspace
              </span>
            </div>
          </Link>
          <div className="h-4 w-px bg-white/5" />
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
              <LayoutGrid className="w-3 h-3 text-primary" />
            </div>
            <span className="text-xs font-semibold text-white/80">
              untitled_architecture.sql
            </span>
            <Badge
              variant="outline"
              className="text-[9px] uppercase tracking-widest text-white/20 border-white/5 px-2 h-5"
            >
              Stable
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {isAnalyzing && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
              <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                LPU Processing...
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="grow flex overflow-hidden">
        {/* Source Control Panel */}
        <div className="w-[35%] flex flex-col bg-black/20 shrink-0">
          <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-white/2 shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                Source Configuration
              </span>
            </div>
          </div>
          <div className="grow relative">
            <SchemaEditor />
          </div>

          {/* Analysis Module (Integrated) */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-white/5 bg-primary/5 max-h-[500px] overflow-y-auto custom-scrollbar shrink-0"
              >
                <div className="p-6 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">
                        Blueprint Audit
                      </span>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[8px] uppercase tracking-widest h-5">
                      AI Verified
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[8px] font-bold text-white/20 uppercase tracking-widest">
                      <Zap className="w-3 h-3 text-yellow-500/50" />
                      Executive Summary
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed font-medium italic border-l-2 border-white/5 pl-4">
                      &quot;{analysis?.explanation}&quot;
                    </p>
                  </div>

                  {/* Smells / Warnings */}
                  {analysis?.smells && analysis.smells.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[8px] font-bold text-red-500/50 uppercase tracking-widest">
                        <Terminal className="w-3 h-3" />
                        Detected Smells
                      </div>
                      <div className="space-y-2">
                        {analysis?.smells.map((smell: string, i: number) => (
                          <div key={i} className="text-[11px] font-semibold text-red-400/70 bg-red-500/5 border border-red-500/10 p-2.5 rounded-lg flex gap-3 italic">
                            <span className="opacity-30">0{i+1}</span>
                            {smell}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optimizations */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[8px] font-bold text-primary/50 uppercase tracking-widest">
                      <ChevronRight className="w-3 h-3" />
                      Optimization Path
                    </div>
                    <div className="space-y-3">
                      {analysis?.optimizations?.map((opt: string, i: number) => (
                        <div
                          key={i}
                          className="text-[11px] font-semibold text-white/40 border-l border-primary/40 pl-4 py-1 hover:text-white/60 transition-colors"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Blueprint Canvas */}
        <div className="grow relative bg-background flex flex-col">
          <div className="absolute top-6 left-6 z-10 hidden md:flex items-center gap-3 p-1.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">
              <Zap className="w-3 h-3" />
              Blueprints Active
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-bold text-green-500 uppercase tracking-[0.2em]">
              <ShieldCheck className="w-3 h-3" />
              Encrypted
            </div>
          </div>

          <div className="grow">
            <ERDiagram />
          </div>
        </div>
      </div>
    </div>
  );
}
