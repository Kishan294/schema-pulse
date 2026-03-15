import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

interface UseKeyboardShortcutsOptions {
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onDelete?: () => void;
  onVisualize?: () => void;
}

export function useKeyboardShortcuts({
  onSave,
  onUndo,
  onRedo,
  onDelete,
  onVisualize,
}: UseKeyboardShortcutsOptions) {
  const { schema, setSchema, lastSaved } = useAppStore();

  // History for undo/redo
  const historyRef = {
    past: [] as string[],
    present: schema,
    future: [] as string[],
  };

  useEffect(() => {
    historyRef.present = schema;
  }, [schema]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl/Cmd key
      const isMod = e.ctrlKey || e.metaKey;

      if (isMod) {
        switch (e.key.toLowerCase()) {
          case "s":
            e.preventDefault();
            onSave?.();
            break;
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              // Ctrl+Shift+Z = Redo
              onRedo?.();
            } else {
              // Ctrl+Z = Undo
              onUndo?.();
            }
            break;
          case "y":
            e.preventDefault();
            // Ctrl+Y = Redo
            onRedo?.();
            break;
          case "Enter":
            e.preventDefault();
            onVisualize?.();
            break;
        }
      }

      // Delete key (when not in input field)
      if (e.key === "Delete" && !isInputFocused()) {
        e.preventDefault();
        onDelete?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSave, onUndo, onRedo, onDelete, onVisualize]);

  return {
    pushToHistory: (newSchema: string) => {
      historyRef.past.push(historyRef.present);
      historyRef.future = [];
      setSchema(newSchema);
    },
    undo: () => {
      if (historyRef.past.length > 0) {
        historyRef.future.push(historyRef.present);
        const previous = historyRef.past.pop()!;
        setSchema(previous);
      }
    },
    redo: () => {
      if (historyRef.future.length > 0) {
        historyRef.past.push(historyRef.present);
        const next = historyRef.future.pop()!;
        setSchema(next);
      }
    },
  };
}

function isInputFocused(): boolean {
  const active = document.activeElement;
  return (
    active?.tagName === "INPUT" ||
    active?.tagName === "TEXTAREA" ||
    active?.getAttribute("contenteditable") === "true"
  );
}
