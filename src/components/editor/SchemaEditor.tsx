"use client";

import Editor from "@monaco-editor/react";
import { useAppStore } from "@/store/useAppStore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Loader2, Code2, RefreshCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <Card className="h-full flex flex-col border-0 bg-transparent shadow-none rounded-none overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-6 px-10 border-b border-white/[0.05] bg-black/5">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
            <Code2 className="w-4 h-4" />
            Source Engine
          </div>
          <Select
            value={schemaType}
            onValueChange={(value) => setSchemaType(value || "SQL")}
          >
            <SelectTrigger className="w-[160px] h-10 text-xs font-bold bg-white/3 border-white/5 text-white/80 rounded-xl hover:bg-white/6 transition-all">
              <SelectValue placeholder="Protocol" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/8 shadow-2xl rounded-2xl">
              <SelectItem value="SQL" className="py-3 font-bold">PostgreSQL / SQL</SelectItem>
              <SelectItem value="Prisma" className="py-3 font-bold">Prisma Schema</SelectItem>
              <SelectItem value="Drizzle" className="py-3 font-bold">Drizzle ORM</SelectItem>
              <SelectItem value="JSON" className="py-3 font-bold">JSON Data / Schema</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            size="lg"
            variant="secondary"
            className="h-10 gap-2.5 text-xs font-black border border-white/[0.08] bg-white/[0.03] hover:bg-primary hover:text-white transition-all rounded-xl uppercase tracking-tighter"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <Sparkles className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
            )}
            Analyze System
          </Button>
          <Button
            size="lg"
            className="h-10 gap-2.5 text-xs font-black bg-white text-black hover:bg-primary hover:text-white shadow-2xl transition-all rounded-xl px-6 group"
            disabled={isAnalyzing}
          >
            <RefreshCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-700" />
            Deploy Graph
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 grow relative overflow-hidden flex flex-col">
        <Editor
          height="100%"
          defaultLanguage="sql"
          theme="vs-dark"
          value={schema}
          onChange={(value) => setSchema(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 15,
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: isAnalyzing,
            automaticLayout: true,
            padding: { top: 32, bottom: 32 },
            fontFamily: "'Geist Mono', var(--font-mono)",
            cursorStyle: "line",
            lineHeight: 24,
            fontWeight: "500",
            letterSpacing: -0.2,
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            }
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('customDark', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                { token: 'keyword', foreground: '8957e5', fontStyle: 'bold' },
                { token: 'type', foreground: '3fb950' },
                { token: 'string', foreground: 'a5d6ff' },
                { token: 'comment', foreground: '8b949e', fontStyle: 'italic' },
              ],
              colors: {
                'editor.background': '#00000000',
                'editorLineNumber.foreground': '#484f58',
                'editorLineNumber.activeForeground': '#f0f6fc',
                'editor.selectionBackground': '#3fb95030',
                'editorCursor.foreground': '#8957e5',
              }
            });
          }}
          onMount={(editor) => {
            editor.updateOptions({ theme: 'customDark' });
          }}
        />
        
        {/* Editor Bottom Status */}
        <div className="h-8 bg-black/5 border-t border-white/[0.05] flex items-center justify-between px-6">
           <div className="flex items-center gap-4 text-[9px] font-black font-mono text-white/10 uppercase tracking-[0.2em]">
             <span>Lines: {schema.split('\n').length}</span>
             <span>UTF-8</span>
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black font-mono text-white/10 uppercase tracking-[0.2em]">
             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
             Auto-saving enabled
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
