import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type Node, type Edge } from "@xyflow/react";

interface AnalysisResult {
  explanation: string;
  entities: {
    name: string;
    description: string;
    columns: { name: string; type: string; isPrimary: boolean }[]
  }[];
  relationships: {
    from: string;
    to: string;
    fromColumn?: string;
    toColumn?: string;
    type: string;
    description: string
  }[];
  optimizations: string[];
  smells: string[];
}

interface AppState {
  schema: string;
  setSchema: (schema: string) => void;
  schemaType: string;
  setSchemaType: (type: string) => void;
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
  analysis: AnalysisResult | null;
  setAnalysis: (analysis: AnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (status: boolean) => void;
  lastSaved: Date | null;
  setLastSaved: (date: Date) => void;
}

const defaultSchema = `-- Initial Schema Example
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total DECIMAL(10, 2),
  status VARCHAR(50)
);`;

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      schema: defaultSchema,
      setSchema: (schema: string) => set({ schema, lastSaved: new Date() }),
      schemaType: "SQL",
      setSchemaType: (type: string) => set({ schemaType: type }),
      nodes: [],
      setNodes: (nodes: Node[]) => set({ nodes }),
      edges: [],
      setEdges: (edges: Edge[]) => set({ edges }),
      analysis: null,
      setAnalysis: (analysis: AnalysisResult) => set({ analysis }),
      isAnalyzing: false,
      setIsAnalyzing: (isAnalyzing: boolean) => set({ isAnalyzing }),
      lastSaved: null,
      setLastSaved: (date: Date) => set({ lastSaved: date }),
    }),
    {
      name: "schema-pulse-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        schema: state.schema,
        schemaType: state.schemaType,
        nodes: state.nodes,
        edges: state.edges,
      }),
    }
  )
);
