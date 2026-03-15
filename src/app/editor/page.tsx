"use client";

import { ERDiagram } from "@/components/diagram/ERDiagram";
import { SchemaEditor } from "@/components/editor/SchemaEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import {
  ArrowLeft,
  ChevronRight,
  Cpu,
  History,
  LayoutGrid,
  Settings2,
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 text-white/20 hover:text-white"
            >
              <History className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 text-white/20 hover:text-white"
            >
              <Settings2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="grow flex overflow-hidden">
        {/* Source Control Panel */}
        <aside className="w-[420px] border-r border-white/5 flex flex-col bg-black/20 shrink-0">
          <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-white/2">
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
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                className="border-t border-white/5 bg-primary/5"
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                        Inference Report
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </div>

                  <p className="text-sm text-white/50 leading-relaxed font-medium italic">
                    &quot;{analysis.explanation}&quot;
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-px grow bg-white/5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">
                        Insights
                      </span>
                      <div className="h-px grow bg-white/5" />
                    </div>

                    <div className="space-y-3">
                      {analysis.optimizations
                        ?.slice(0, 2)
                        .map((opt: string, i: number) => (
                          <div
                            key={i}
                            className="text-xs font-semibold text-white/40 border-l border-primary/40 pl-4 py-1"
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
        </aside>

        {/* Global Blueprint Canvas */}
        <main className="grow relative bg-background flex flex-col">
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
        </main>
      </div>
    </div>
  );
}
