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
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";

export default function EditorPage() {
  const { analysis, isAnalyzing } = useAppStore();

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Mini Header / Breadcrumb */}
      <div className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-card/10 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Database className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold tracking-tight">SchemaPulse</span>
          </div>
          <div className="h-4 w-px bg-border/40 mx-2" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Project Name</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">New Schema</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-medium text-primary flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Groq AI is analyzing...
            </motion.div>
          )}
          <Badge
            variant="outline"
            className="h-7 border-border font-medium bg-muted/30"
          >
            V1.0.4 - Beta
          </Badge>
        </div>
      </div>

      <div className="grow flex p-6 gap-6 overflow-hidden">
        {/* Left Side: Editor (40%) */}
        <div className="w-[40%] flex flex-col gap-6 h-full min-w-[450px]">
          <div className="grow">
            <SchemaEditor />
          </div>

          {/* AI Insights Sidebar/Footer inside Editor Column */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="h-[300px] bg-card/30 border border-border/50 rounded-xl overflow-hidden flex flex-col backdrop-blur-md"
              >
                <div className="px-5 py-4 border-b border-border/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm tracking-tight text-foreground/80">
                    Groq AI Analysis
                  </h3>
                </div>
                <div className="grow overflow-y-auto p-5 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                      <Info className="w-3 h-3" />
                      Explanation
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {analysis.explanation}
                    </p>
                  </div>

                  {analysis.optimizations?.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-yellow-500 uppercase tracking-widest mb-3">
                        <Lightbulb className="w-3 h-3" />
                        Optimizations
                      </div>
                      <ul className="space-y-2">
                        {analysis.optimizations.map(
                          (opt: string, i: number) => (
                            <li
                              key={i}
                              className="text-xs text-muted-foreground flex gap-2"
                            >
                              <span className="text-yellow-500/50">•</span>
                              {opt}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                  {analysis.smells?.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-3">
                        <AlertTriangle className="w-3 h-3" />
                        Anti-patterns
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.smells.map((smell: string, i: number) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-red-500/5 text-red-500/80 border-red-500/10 hover:bg-red-500/10 transition-colors"
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
        </div>

        {/* Right Side: Diagram (60%) */}
        <div className="grow h-full shadow-2xl rounded-2xl overflow-hidden relative group">
          <ERDiagram />
        </div>
      </div>
    </div>
  );
}
