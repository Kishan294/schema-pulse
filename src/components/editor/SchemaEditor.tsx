"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import Editor from "@monaco-editor/react";
import { Cpu, Loader2, RotateCcw, RotateCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface RateLimitInfo {
  remaining: number;
  resetTime: number;
  limit: number;
}

export function SchemaEditor() {
  const {
    schema,
    setSchema,
    schemaType,
    isAnalyzing,
    setIsAnalyzing,
    setAnalysis,
    lastSaved,
    setNodes,
    setEdges,
  } = useAppStore();

  const [rateLimit, setRateLimit] = useState<RateLimitInfo | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  // Undo/redo history
  const [history, setHistory] = useState({
    past: [] as string[],
    present: schema,
    future: [] as string[],
  });

  useEffect(() => {
    setHistory((h) => ({ ...h, present: schema }));
  }, [schema]);

  useEffect(() => {
    fetchRateLimit();
    const interval = setInterval(fetchRateLimit, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (rateLimit) {
      const updateCountdown = () => {
        const now = Date.now();
        const diff = rateLimit.resetTime - now;
        if (diff <= 0) {
          setCountdown("0m");
        } else {
          const minutes = Math.ceil(diff / 60000);
          setCountdown(`${minutes}m`);
        }
      };
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [rateLimit]);

  // Undo/Redo handlers
  const handleUndo = useCallback(() => {
    setHistory((h) => {
      if (h.past.length === 0) return h;
      const previous = h.past[h.past.length - 1];
      const newPast = h.past.slice(0, -1);
      setSchema(previous);
      return {
        past: newPast,
        present: previous,
        future: [h.present, ...h.future],
      };
    });
  }, []);

  const handleRedo = useCallback(() => {
    setHistory((h) => {
      if (h.future.length === 0) return h;
      const next = h.future[0];
      const newFuture = h.future.slice(1);
      setSchema(next);
      return {
        past: [...h.past, h.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.ctrlKey || e.metaKey;

      if (document.activeElement?.classList.contains("monaco-editor")) {
        return;
      }

      if (isMod) {
        switch (e.key.toLowerCase()) {
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case "y":
            e.preventDefault();
            handleRedo();
            break;
          case "Enter":
            e.preventDefault();
            handleAnalyze();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Update history when schema changes
  const handleSchemaChange = useCallback(
    (value: string | undefined) => {
      setHistory((h) => ({
        past: [...h.past, h.present],
        present: value || "",
        future: [],
      }));
      setSchema(value || "");
    },
    [setSchema],
  );

  const fetchRateLimit = async () => {
    try {
      const response = await fetch("/api/ai/analyze", { method: "HEAD" });
      const remaining = response.headers.get("x-ratelimit-remaining");
      const reset = response.headers.get("x-ratelimit-reset");
      const limit = response.headers.get("x-ratelimit-limit");
      if (remaining && reset && limit) {
        setRateLimit({
          remaining: parseInt(remaining),
          resetTime: parseInt(reset),
          limit: parseInt(limit),
        });
      }
    } catch (e) {
      // Ignore errors
    }
  };

  const handleAnalyze = async () => {
    if (!rateLimit || rateLimit.remaining <= 0) {
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        body: JSON.stringify({ schema, type: schemaType }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setAnalysis(data);
      fetchRateLimit();
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isLimitExhausted = rateLimit && rateLimit.remaining === 0;
  const lines = schema.split("\n").length;
  const chars = schema.length;

  return (
    <div className="h-full flex flex-col bg-[#09090b]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-white/80">
              Schema Editor
            </span>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-0.5">
            <button
              onClick={handleUndo}
              disabled={history.past.length === 0}
              className="p-1.5 rounded-md hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              title="Undo (Ctrl+Z)"
            >
              <RotateCcw className="w-4 h-4 text-white/50" />
            </button>
            <button
              onClick={handleRedo}
              disabled={history.future.length === 0}
              className="p-1.5 rounded-md hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              title="Redo (Ctrl+Y)"
            >
              <RotateCw className="w-4 h-4 text-white/50" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Rate Limit */}
          {rateLimit && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <span className="text-xs font-medium text-white/60">
                {rateLimit.remaining}/{rateLimit.limit}
              </span>
              <span className="text-[10px] font-medium text-white/40 uppercase">
                AI
              </span>
            </div>
          )}

          <Button
            size="sm"
            disabled={isAnalyzing || !!isLimitExhausted}
            onClick={handleAnalyze}
            className={`h-8 px-4 gap-2 rounded-lg text-xs font-medium transition-all ${
              isAnalyzing
                ? "bg-blue-500/20 text-blue-400"
                : isLimitExhausted
                  ? "bg-white/5 text-white/20 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25"
            }`}
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Cpu className="w-4 h-4" />
            )}
            {isAnalyzing
              ? "Analyzing..."
              : isLimitExhausted
                ? "Limit Reached"
                : "Analyze"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="grow relative overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="sql"
          theme="vs-dark"
          value={schema}
          onChange={handleSchemaChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: isAnalyzing,
            automaticLayout: true,
            padding: { top: 16, bottom: 48 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            cursorStyle: "line",
            lineHeight: 21,
            fontWeight: "400",
            letterSpacing: 0,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
              useShadows: false,
            },
            renderLineHighlight: "all",
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 4,
            glyphMargin: false,
            folding: true,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            smoothScrolling: true,
            cursorSmoothCaretAnimation: "on",
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("schema-dark", {
              base: "vs-dark",
              inherit: true,
              rules: [
                { token: "keyword", foreground: "3b82f6", fontStyle: "bold" },
                { token: "keyword.create", foreground: "60a5fa" },
                { token: "keyword.table", foreground: "60a5fa" },
                { token: "type", foreground: "22d3ee" },
                { token: "identifier", foreground: "e2e8f0" },
                { token: "string", foreground: "a78bfa" },
                { token: "comment", foreground: "475569", fontStyle: "italic" },
                { token: "operator", foreground: "94a3b8" },
                { token: "delimiter.parenthesis", foreground: "64748b" },
                { token: "number", foreground: "fbbf24" },
                { token: "keyword.default", foreground: "f472b6" },
              ],
              colors: {
                "editor.background": "#09090b",
                "editorLineNumber.foreground": "#27272a",
                "editorLineNumber.activeForeground": "#3b82f6",
                "editor.selectionBackground": "#3b82f620",
                "editor.inactiveSelectionBackground": "#3b82f610",
                "editor.lineHighlightBackground": "#18181b",
                "editorCursor.foreground": "#3b82f6",
                "editor.selectionHighlightBackground": "#3b82f615",
                "editorIndentGuide.background": "#27272a",
                "editorIndentGuide.activeBackground": "#3f3f46",
              },
            });
          }}
          onMount={(editor) => {
            editor.updateOptions({ theme: "schema-dark" });
          }}
        />

        {/* Footer */}
        <div className="absolute bottom-0 inset-x-0 h-8 border-t border-white/5 bg-[#09090b] flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium text-white/40">
              {lines} lines
            </span>
            <span className="text-[10px] font-medium text-white/40">
              {chars} chars
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium text-white/30 uppercase tracking-wide">
              SQL
            </span>
            <div className="w-px h-3 bg-white/10" />
            <span className="text-[10px] font-medium text-blue-400/70 uppercase tracking-wide">
              Groq AI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
