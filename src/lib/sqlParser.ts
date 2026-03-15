// Native SQL Parser - No AI required
// Parses CREATE TABLE statements into nodes and edges for ER diagram

import { type Node, type Edge, MarkerType } from "@xyflow/react";

export interface ParsedColumn {
  name: string;
  type: string;
  isPrimary: boolean;
  isUnique: boolean;
  isNullable: boolean;
  defaultValue?: string;
  references?: {
    table: string;
    column: string;
  };
}

export interface ParsedTable {
  name: string;
  columns: ParsedColumn[];
}

export interface ParsedRelationship {
  from: string;
  to: string;
  fromColumn: string;
  toColumn: string;
  type: "1:1" | "1:N" | "N:M";
}

export interface ParseResult {
  tables: ParsedTable[];
  relationships: ParsedRelationship[];
  errors: string[];
}

/**
 * Parse SQL CREATE TABLE statements
 */
export function parseSQL(sql: string): ParseResult {
  const tables: ParsedTable[] = [];
  const relationships: ParsedRelationship[] = [];
  const errors: string[] = [];

  // Remove comments
  const cleanedSQL = sql
    .replace(/--[\s\S]*?(?=\n|$)/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  // Match CREATE TABLE statements
  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]*?)\)\s*;?/gi;
  let tableMatch;

  while ((tableMatch = tableRegex.exec(cleanedSQL)) !== null) {
    const tableName = tableMatch[1].toLowerCase();
    const columnsDef = tableMatch[2];

    try {
      const table = parseTableDefinition(tableName, columnsDef);
      tables.push(table);

      // Extract relationships from foreign keys
      const tableRels = extractRelationships(tableName, columnsDef);
      relationships.push(...tableRels);
    } catch (error) {
      errors.push(`Error parsing table ${tableName}: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  // Also match ALTER TABLE ADD CONSTRAINT statements
  const alterRegex = /ALTER\s+TABLE\s+(\w+)\s+ADD\s+(?:CONSTRAINT\s+\w+\s+)?FOREIGN\s+KEY\s*\((\w+)\)\s*REFERENCES\s+(\w+)\s*\((\w+)\)/gi;
  let alterMatch;

  while ((alterMatch = alterRegex.exec(cleanedSQL)) !== null) {
    const fromTable = alterMatch[1].toLowerCase();
    const fromColumn = alterMatch[2].toLowerCase();
    const toTable = alterMatch[3].toLowerCase();
    const toColumn = alterMatch[4].toLowerCase();

    relationships.push({
      from: toTable,
      to: fromTable,
      fromColumn: toColumn,
      toColumn: fromColumn,
      type: "1:N",
    });
  }

  return { tables, relationships, errors };
}

function parseTableDefinition(tableName: string, columnsDef: string): ParsedTable {
  const columns: ParsedColumn[] = [];
  
  // Split by comma, but respect parentheses (for types like DECIMAL(10,2))
  const columnDefs = splitColumnDefinitions(columnsDef);

  for (const colDef of columnDefs) {
    const trimmed = colDef.trim();
    
    // Skip table constraints (PRIMARY KEY, FOREIGN KEY, etc.)
    if (/^(PRIMARY|FOREIGN|UNIQUE|CHECK|CONSTRAINT|INDEX|KEY)/i.test(trimmed)) {
      continue;
    }

    const column = parseColumn(trimmed);
    if (column) {
      columns.push(column);
    }
  }

  return { name: tableName, columns };
}

function splitColumnDefinitions(def: string): string[] {
  const result: string[] = [];
  let current = "";
  let parenDepth = 0;

  for (const char of def) {
    if (char === "(") {
      parenDepth++;
      current += char;
    } else if (char === ")") {
      parenDepth--;
      current += char;
    } else if (char === "," && parenDepth === 0) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}

function parseColumn(colDef: string): ParsedColumn | null {
  // Match column name and type
  const match = colDef.match(/^(\w+)\s+(\w+(?:\s*\([^)]+\))?)/i);
  if (!match) return null;

  const name = match[1].toLowerCase();
  let type = match[2].toUpperCase();

  // Normalize type
  type = type.replace(/\s+/g, "");

  const isPrimary = /PRIMARY\s+KEY/i.test(colDef);
  const isUnique = /UNIQUE/i.test(colDef);
  const isNullable = !/NOT\s+NULL/i.test(colDef) && !isPrimary;
  
  // Extract default value
  const defaultMatch = colDef.match(/DEFAULT\s+([^,\s]+)/i);
  const defaultValue = defaultMatch ? defaultMatch[1] : undefined;

  // Extract REFERENCES
  const refMatch = colDef.match(/REFERENCES\s+(\w+)\s*\((\w+)\)/i);
  const references = refMatch
    ? { table: refMatch[1].toLowerCase(), column: refMatch[2].toLowerCase() }
    : undefined;

  return {
    name,
    type,
    isPrimary,
    isUnique,
    isNullable,
    defaultValue,
    references,
  };
}

function extractRelationships(tableName: string, columnsDef: string): ParsedRelationship[] {
  const relationships: ParsedRelationship[] = [];

  // Match inline REFERENCES
  const refRegex = /(\w+)\s+\w+(?:\([^)]+\))?\s+.*?REFERENCES\s+(\w+)\s*\((\w+)\)/gi;
  let match;

  while ((match = refRegex.exec(columnsDef)) !== null) {
    const column = match[1].toLowerCase();
    const refTable = match[2].toLowerCase();
    const refColumn = match[3].toLowerCase();

    relationships.push({
      from: refTable,
      to: tableName,
      fromColumn: refColumn,
      toColumn: column,
      type: "1:N",
    });
  }

  return relationships;
}

/**
 * Convert parsed tables and relationships to React Flow nodes and edges
 */
export function parsedToDiagram(
  tables: ParsedTable[],
  relationships: ParsedRelationship[]
): { nodes: Node[]; edges: Edge[] } {
  const RELATION_COLORS = [
    "#3b82f6", "#06b6d4", "#8b5cf6", "#f59e0b",
    "#ec4899", "#10b981", "#f43f5e",
  ];

  const linkedColumns = new Map<string, Map<string, string[]>>();

  // Build edges
  const edges: Edge[] = relationships.map((rel, idx) => {
    const color = RELATION_COLORS[idx % RELATION_COLORS.length];
    const fromTable = rel.from.toLowerCase();
    const toTable = rel.to.toLowerCase();

    const sourceHandle = `${rel.fromColumn}-right-source`;
    const targetHandle = `${rel.toColumn}-left-target`;

    // Track linked columns
    if (!linkedColumns.has(fromTable)) linkedColumns.set(fromTable, new Map());
    const fromMap = linkedColumns.get(fromTable)!;
    if (!fromMap.has(rel.fromColumn)) fromMap.set(rel.fromColumn, []);
    fromMap.get(rel.fromColumn)!.push(color);

    if (!linkedColumns.has(toTable)) linkedColumns.set(toTable, new Map());
    const toMap = linkedColumns.get(toTable)!;
    if (!toMap.has(rel.toColumn)) toMap.set(rel.toColumn, []);
    toMap.get(rel.toColumn)!.push(color);

    let strokeDasharray = "";
    switch (rel.type) {
      case "1:1": strokeDasharray = ""; break;
      case "1:N": strokeDasharray = "8 4"; break;
      case "N:M": strokeDasharray = "3 3"; break;
    }

    return {
      id: `e-${fromTable}-${toTable}-${idx}`,
      source: fromTable,
      target: toTable,
      sourceHandle,
      targetHandle,
      type: "smoothstep",
      label: rel.type,
      labelBgPadding: [4, 2] as [number, number],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#0a0a0a", fillOpacity: 1, stroke: color, strokeWidth: 0.5 },
      labelStyle: { fill: color, fontSize: 9, fontWeight: 800 },
      animated: rel.type === "1:N",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color,
        width: 10,
        height: 10,
      },
      markerStart: {
        type: MarkerType.Arrow,
        color,
        width: 8,
        height: 8,
      },
      style: {
        stroke: color,
        strokeWidth: 1.2,
        strokeDasharray,
        opacity: 0.8,
        filter: `drop-shadow(0 0 3px ${color}30)`,
      },
    } as Edge;
  });

  // Build nodes
  const nodes: Node[] = tables.map((table, idx) => {
    const tableName = table.name.toLowerCase();
    return {
      id: tableName,
      type: "tableNode",
      position: { x: (idx % 3) * 550, y: Math.floor(idx / 3) * 600 },
      data: {
        label: table.name,
        columns: table.columns.map(col => {
          const linkColors = linkedColumns.get(tableName)?.get(col.name) || [];
          return {
            name: col.name,
            type: col.type,
            isPrimary: col.isPrimary,
            linkColors,
          };
        }),
      },
    };
  });

  return { nodes, edges };
}
