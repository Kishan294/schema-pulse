"use client";

import { ERDiagram } from "@/components/diagram/ERDiagram";
import { SchemaEditor } from "@/components/editor/SchemaEditor";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/useAppStore";
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  Zap,
  FileCode,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

export default function EditorPage() {
  const { isAnalyzing, analysis } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-[#05050a] text-white overflow-hidden">
      {/* Header */}
      <header className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#09090b] shrink-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all">
                <ArrowLeft className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          </Link>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-white/40" />
            <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
              SQL Schema
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
            >
              <Zap className="w-3 h-3 text-blue-400 animate-pulse" />
              <span className="text-[10px] font-medium text-blue-400">
                Analyzing...
              </span>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="grow flex overflow-hidden">
        {/* Left Panel - Schema Editor */}
        <div className="w-[400px] min-w-[400px] max-w-[500px] flex flex-col border-r border-white/5 bg-[#09090b]">
          <div className="grow overflow-hidden">
            <SchemaEditor />
          </div>

          {/* AI Analysis Panel */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="border-t border-white/5 bg-[#09090b] max-h-[45vh] overflow-y-auto"
              >
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                        Analysis
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1.5">
                    <p className="text-xs text-white/60 leading-relaxed pl-3 border-l-2 border-amber-500/30">
                      {analysis?.explanation}
                    </p>
                  </div>

                  {/* Issues */}
                  {analysis?.smells && analysis.smells.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-red-400/60" />
                        <span className="text-[9px] font-medium uppercase tracking-wider text-white/40">
                          Issues
                        </span>
                      </div>
                      <div className="space-y-1 pl-5">
                        {analysis.smells.map((smell: string, i: number) => (
                          <div
                            key={i}
                            className="text-[11px] text-red-300/80 bg-red-500/5 border border-red-500/10 px-2.5 py-1.5 rounded leading-relaxed"
                          >
                            {smell}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 text-blue-400/60" />
                      <span className="text-[9px] font-medium uppercase tracking-wider text-white/40">
                        Recommendations
                      </span>
                    </div>
                    <div className="space-y-1 pl-5">
                      {analysis.optimizations?.map((opt: string, i: number) => (
                        <div
                          key={i}
                          className="text-[11px] text-white/50 border-l-2 border-blue-500/30 pl-2.5 py-0.5"
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

        {/* Right Panel - Diagram Canvas */}
        <div className="grow relative bg-[#05050a]">
          <div className="h-full">
            <ERDiagram />
          </div>
        </div>
      </div>
    </div>
  );
}
