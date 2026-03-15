"use client";

import { SchemaEditor } from "@/components/editor/SchemaEditor";
import { ERDiagram } from "@/components/diagram/ERDiagram";
import { useAppStore } from "@/store/useAppStore";
import {
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Info,
  ChevronRight,
  Database,
  ArrowLeft,
  CircleSlash,
  Maximize2,
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  const { isAnalyzing, analysis } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden relative selection:bg-primary/30">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] -z-10" />

      {/* Tighter, More Elegant Header */}
      <header className="h-16 border-b border-white/[0.08] flex items-center justify-between px-6 bg-background/80 backdrop-blur-xl shrink-0 z-[100] shadow-sm">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="w-10 h-10 text-white/40 hover:text-white transition-all hover:bg-white/5 rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(137,87,229,0.3)]">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-tighter text-lg leading-none">SchemaPulse</span>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20 mt-1">Architecture Suite</span>
            </div>
          </div>
          <div className="h-6 w-px bg-white/[0.08]" />
          <nav className="flex items-center gap-2 text-sm font-bold">
            <span className="text-white/30">Projects</span>
            <ChevronRight className="w-4 h-4 text-white/10" />
            <span className="text-white">Untitled_Schema_01</span>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                className="text-xs font-black text-primary flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 shadow-lg shadow-primary/10"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                Processing Llama-3 Analysis...
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-3 pr-2">
            <Button variant="ghost" size="icon" className="w-10 h-10 text-white/30 hover:text-white rounded-xl">
              <Settings2 className="w-5 h-5" />
            </Button>
            <Badge
              variant="outline"
              className="h-9 border-white/[0.08] font-black text-[10px] tracking-[0.3em] uppercase bg-white/[0.02] text-white/30 px-4 rounded-xl"
            >
              Mainnet 1.0
            </Badge>
          </div>
        </div>
      </header>

      <div className="grow flex overflow-hidden">
        {/* Advanced Sidebars (40% Editor) */}
        <aside className="w-[40%] flex flex-col border-r border-white/[0.08] bg-black/10 backdrop-blur-sm h-full min-w-[500px] relative">
          <div className="grow overflow-hidden flex flex-col">
            <div className="px-6 py-4 flex items-center justify-between border-b border-white/[0.05] bg-white/[0.01]">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 italic">Global Environment</span>
              <div className="flex gap-1.5 grayscale opacity-30">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
            </div>
            <SchemaEditor />
          </div>

          {/* Expert Insight Panel */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="border-t border-white/[0.08] bg-card/60 backdrop-blur-3xl overflow-hidden shadow-2xl z-50"
              >
                <div className="px-8 py-6 border-b border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-black text-sm tracking-tight text-white/90 uppercase italic">
                        AI Architect Report
                      </h3>
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Semantic Overview</span>
                    </div>
                  </div>
                  <CircleSlash className="w-4 h-4 text-white/10" />
                </div>
                <div className="max-h-[400px] overflow-y-auto p-10 space-y-12 scrollbar-hide">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.5em]">
                      <Info className="w-4 h-4" />
                      Executive Abstract
                    </div>
                    <p className="text-base text-white/60 leading-relaxed font-medium italic border-l-2 border-primary/20 pl-6">
                      &quot;{analysis.explanation}&quot;
                    </p>
                  </div>

                  {analysis.optimizations?.length > 0 && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-4 text-[10px] font-black text-yellow-500 uppercase tracking-[0.5em]">
                        <Lightbulb className="w-4 h-4" />
                        Optimization Protocol
                      </div>
                      <ul className="space-y-6">
                        {analysis.optimizations.map((opt: string, i: number) => (
                          <li key={i} className="flex gap-6 group">
                            <span className="text-xl font-black text-yellow-500/20 group-hover:text-yellow-500 transition-colors shrink-0">0{i + 1}</span>
                            <span className="text-[15px] font-bold text-white/50 group-hover:text-white transition-colors leading-relaxed tracking-tight">{opt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.smells?.length > 0 && (
                    <div className="space-y-8 pb-4">
                      <div className="flex items-center gap-4 text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">
                        <AlertTriangle className="w-4 h-4" />
                        Infrastructure Risks
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {analysis.smells.map((smell: string, i: number) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-red-500/5 text-red-500/50 border-red-500/10 hover:bg-red-500/10 hover:text-red-500 font-black tracking-[0.1em] py-2 px-6 rounded-2xl transition-all uppercase text-[10px] italic"
                          >
                            {smell}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>

        {/* Cinematic Diagram Canvas (60%) */}
        <main className="grow h-full relative p-6 bg-background/50">
          <div className="w-full h-full rounded-[40px] overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/[0.08] bg-black shadow-inner group">
             {/* Dynamic Mesh Focus behind diagram */}
             <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
             <ERDiagram />
          </div>
        </main>
      </div>
    </div>
  );
}
