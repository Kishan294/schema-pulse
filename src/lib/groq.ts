import Groq from "groq-sdk";

const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn(
      "GROQ_API_KEY is not defined. AI features will be unavailable.",
    );
    return null;
  }
  return new Groq({ apiKey });
};

export async function analyzeSchema(schema: string, type: string) {
  const groq = getGroqClient();
  if (!groq) {
    throw new Error("AI Analysis service is not configured (missing API key).");
  }
  const prompt = `
    You are an expert database architect. Analyze the following ${type} schema.
    
    Tasks:
    1. Explain the overall architecture in simple terms.
    2. Identify all entities and their primary keys.
    3. Detect all relationships (explicit and implicit).
    4. Suggest 3 performance optimizations (indexes, normalization, etc.).
    5. Detect any "database smells" or anti-patterns.

    Schema:
    ${schema}

    Return the response in a structured JSON format with the following keys:
    {
      "explanation": "string",
      "entities": [{ 
        "name": "string", 
        "description": "string", 
        "columns": [{ "name": "string", "type": "string", "isPrimary": boolean }] 
      }],
      "relationships": [{ 
        "from": "string", 
        "to": "string", 
        "fromColumn": "string",
        "toColumn": "string",
        "type": "1:1" | "1:N" | "N:M", 
        "description": "string" 
      }],
      "optimizations": ["string"],
      "smells": ["string"]
    }
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a senior database architect that outputs valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    return JSON.parse(completion.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to analyze schema");
  }
}
