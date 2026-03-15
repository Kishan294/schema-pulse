import { NextResponse } from "next/server";
import { analyzeSchema } from "@/lib/groq";
import { checkRateLimit, getRateLimitInfo, LIMITS } from "@/lib/rateLimiter";

function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return `ai-limit:${ip}`;
}

function getRateLimitHeaders(info: { remaining: number; resetTime: number; limit: number }) {
  return {
    "X-RateLimit-Limit": String(info.limit),
    "X-RateLimit-Remaining": String(info.remaining),
    "X-RateLimit-Reset": String(info.resetTime),
  };
}

export async function POST(req: Request) {
  const identifier = getClientIdentifier(req);
  const rateLimit = checkRateLimit(identifier);
  const headers = getRateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    const resetIn = Math.ceil((rateLimit.resetTime - Date.now()) / 60000);
    return NextResponse.json(
      { 
        error: "AI rate limit exceeded",
        message: `You've used all ${LIMITS.MAX_REQUESTS} free AI analyses for this hour. Please try again in ${resetIn} minute(s).`,
      },
      { 
        status: 429,
        headers 
      }
    );
  }

  try {
    const { schema, type } = await req.json();

    if (!schema) {
      return NextResponse.json({ error: "Schema is required" }, { status: 400, headers });
    }

    const analysis = await analyzeSchema(schema, type || "SQL");

    return NextResponse.json(analysis, { headers });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: "Failed to process schema with AI" },
      { status: 500, headers }
    );
  }
}

export async function HEAD(req: Request) {
  const identifier = getClientIdentifier(req);
  const info = getRateLimitInfo(identifier);
  return new NextResponse(null, {
    headers: getRateLimitHeaders(info),
  });
}
