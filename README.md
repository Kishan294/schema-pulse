# SchemaPulse - AI-Powered ER Diagram Generator

SchemaPulse is a modern, high-performance ER diagram generator that uses AI to analyze database schemas and visualize relationships with stunning aesthetics.

## 🚀 Features

- **AI Analysis**: Automatically detect entities, columns, and relationships from SQL or schema descriptions.
- **Dynamic Visualization**: Interactive ER diagrams powered by `@xyflow/react` (React Flow).
- **Pro Design**: Beautiful dark-mode interface with glassmorphism, smooth animations, and curated color palettes.
- **Export Capabilities**: Export your diagrams as high-resolution SVG or PDF files.
- **Interactive Editor**: Edit your schema in real-time with a built-in code editor.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Diagram Library**: [@xyflow/react](https://reactflow.dev/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **AI Integration**: Groq SDK
- **Export**: `modern-screenshot` & `jspdf`

## 📦 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (Recommended)

### 2. Environment Setup

Copy the example environment file and fill in your API keys:

```bash
cp .env.example .env
```

| Variable              | Description                                                | Default                  |
| --------------------- | ---------------------------------------------------------- | ------------------------ |
| `GROQ_API_KEY`        | Your API key from [Groq Console](https://console.groq.com/) | -                        |
| `NEXT_PUBLIC_APP_URL` | The base URL for the application                           | `http://localhost:3000` |

### 3. Installation & Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 Exporting

SchemaPulse provides high-resolution exports. For large diagrams, the export process is optimized to handle complex node structures and relationships.

## 🗺️ Project Structure

- `src/app`: Next.js pages and layout.
- `src/components`: Reusable UI components and diagram-specific logic.
- `src/lib`: Utility functions and third-party integrations (Groq, SQL Parser).
- `src/store`: Global state management with Zustand.

## 📜 License

Created by [Kishan](https://github.com/Kishan294). Built for the modern web.
