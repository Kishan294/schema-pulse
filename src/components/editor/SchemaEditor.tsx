"use client";

import Editor from "@monaco-editor/react";
import { useAppStore } from "@/store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Assuming SchemaType is defined somewhere, e.g., in useAppStore or a types file
// type SchemaType = "SQL" | "Prisma" | "Drizzle" | "JSON";

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
    <Card className="h-full flex flex-col border-border/50 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/10">
        <div className="flex items-center gap-4">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Schema Input
          </CardTitle>
          <Select
            value={schemaType}
            onValueChange={(value) => setSchemaType(value || "SQL")}
          >
            <SelectTrigger className="w-[120px] h-8 text-xs bg-muted/30">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SQL">SQL</SelectItem>
              <SelectItem value="Prisma">Prisma</SelectItem>
              <SelectItem value="Drizzle">Drizzle</SelectItem>
              <SelectItem value="JSON">JSON/NoSQL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1.5 text-xs text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            Analyze
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1.5 text-xs shadow-md shadow-primary/10"
            disabled={isAnalyzing}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Sync Diagram
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 grow relative">
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
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: isAnalyzing,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'Geist Mono', monospace",
          }}
        />
      </CardContent>
    </Card>
  );
}
