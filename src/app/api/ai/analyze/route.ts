import { NextResponse } from "next/server";
import { analyzeSchema } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { schema, type } = await req.json();

    if (!schema) {
      return NextResponse.json({ error: "Schema is required" }, { status: 400 });
    }

    const analysis = await analyzeSchema(schema, type || "SQL");

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: "Failed to process schema with AI" },
      { status: 500 }
    );
  }
}
