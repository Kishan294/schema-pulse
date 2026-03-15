"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import Editor from "@monaco-editor/react";
import { Cpu, Loader2 } from "lucide-react";

export function SchemaEditor() {
  const {
    schema,
    setSchema,
    schemaType,
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
      if (data.error) throw new Error(data.error);
      setAnalysis(data);
    } catch (error) {
      console.error("Analysis failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Analysis failed. Please check your API configuration.";
      alert(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      <div className="flex flex-col gap-4 p-8 border-b border-white/5 bg-linear-to-b from-white/2 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white">
                Data Blueprint
              </span>
            </div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
              Schema Engine v1.2
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className={`h-10 gap-3 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl px-6 border ${
                isAnalyzing
                  ? "bg-primary/20 text-primary border-primary/20"
                  : "bg-primary text-white hover:bg-primary/90 border-primary/20 shadow-[0_10px_30px_rgba(59,130,246,0.3)] active:scale-95"
              }`}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Cpu className="w-4 h-4" />
              )}
              {isAnalyzing ? "Processing..." : "Sync Engine"}
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
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: isAnalyzing,
            automaticLayout: true,
            padding: { top: 32, bottom: 32 },
            fontFamily: "'Source Code Pro', var(--font-source-code-pro), monospace",
            cursorStyle: "line",
            lineHeight: 24,
            fontWeight: "500",
            letterSpacing: -0.1,
            scrollbar: {
              verticalScrollbarSize: 4,
              horizontalScrollbarSize: 4,
            },
            renderLineHighlight: "all",
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: false,
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
                { token: "operator", foreground: "3b82f6" },
              ],
              colors: {
                "editor.background": "#050505",
                "editorLineNumber.foreground": "#1e293b",
                "editorLineNumber.activeForeground": "#3b82f6",
                "editor.selectionBackground": "#3b82f640",
                "editor.inactiveSelectionBackground": "#3b82f620",
                "editor.lineHighlightBackground": "#ffffff05",
                "editorCursor.foreground": "#3b82f6",
                "editor.selectionHighlightBackground": "#3b82f630",
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
