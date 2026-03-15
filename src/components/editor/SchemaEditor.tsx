"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/store/useAppStore";
import Editor from "@monaco-editor/react";
import { Cpu, Loader2 } from "lucide-react";

export function SchemaEditor() {
  const {
    schema,
    setSchema,
    schemaType,
    setSchemaType,
    isAnalyzing,
    setIsAnalyzing,
    setAnalysis,
  } = useAppStore();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        body: JSON.stringify({ schema, type: schemaType }),
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      <div className="flex flex-col gap-4 p-6 border-b border-white/5 bg-white/1">
        <div className="flex items-center justify-between">
          <Select
            value={schemaType}
            onValueChange={(value) => setSchemaType(value || "SQL")}
          >
            <SelectTrigger className="w-[140px] h-9 text-[11px] font-bold bg-white/5 border-white/10 text-white/40 rounded-xl hover:bg-white/10 hover:text-white transition-all">
              <SelectValue placeholder="Protocol" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border-white/10 shadow-3xl rounded-2xl">
              <SelectItem value="SQL" className="text-xs py-3 font-semibold">
                PostgreSQL
              </SelectItem>
              <SelectItem value="Prisma" className="text-xs py-3 font-semibold">
                Prisma Schema
              </SelectItem>
              <SelectItem
                value="Drizzle"
                className="text-xs py-3 font-semibold"
              >
                Drizzle ORM
              </SelectItem>
              <SelectItem value="JSON" className="text-xs py-3 font-semibold">
                JSON Structure
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className={`h-9 gap-2 text-[11px] font-bold transition-all rounded-xl px-4 ${
                isAnalyzing
                  ? "bg-primary/20 text-primary border border-primary/20"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Cpu className="w-3.5 h-3.5" />
              )}
              {isAnalyzing ? "Processing" : "Analyze"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grow relative overflow-hidden flex flex-col">
        <Editor
          height="100%"
          defaultLanguage="sql"
          theme="vs-dark"
          value={schema}
          onChange={(value) => setSchema(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: isAnalyzing,
            automaticLayout: true,
            padding: { top: 24, bottom: 24 },
            fontFamily: "'Geist Mono', var(--font-mono)",
            cursorStyle: "line",
            lineHeight: 22,
            fontWeight: "500",
            letterSpacing: -0.2,
            scrollbar: {
              verticalScrollbarSize: 4,
              horizontalScrollbarSize: 4,
            },
            renderLineHighlight: "none",
            hideCursorInOverviewRuler: true,
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("blueprintDark", {
              base: "vs-dark",
              inherit: true,
              rules: [
                { token: "keyword", foreground: "3b82f6", fontStyle: "bold" },
                { token: "type", foreground: "06b6d4" },
                { token: "string", foreground: "94a3b8" },
                { token: "comment", foreground: "334155", fontStyle: "italic" },
              ],
              colors: {
                "editor.background": "#050505",
                "editorLineNumber.foreground": "#1e293b",
                "editorLineNumber.activeForeground": "#3b82f6",
                "editor.selectionBackground": "#3fb95010",
                "editorCursor.foreground": "#3b82f6",
              },
            });
          }}
          onMount={(editor) => {
            editor.updateOptions({ theme: "blueprintDark" });
          }}
        />

        {/* Footer Info */}
        <div className="absolute bottom-0 inset-x-0 h-8 border-t border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 z-10">
          <div className="text-[9px] font-bold font-mono text-white/10 uppercase tracking-widest leading-none">
            Lines: {schema.split("\n").length}
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold font-mono text-white/10 uppercase tracking-widest leading-none">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
            Engine: Groq-Llama-3.3
          </div>
        </div>
      </div>
    </div>
  );
}
