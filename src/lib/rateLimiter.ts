// Simple in-memory rate limiter for hobby project
// Limits AI API usage to prevent exceeding free tier quotas

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export const LIMITS = {
  MAX_REQUESTS: 10, // Max requests per window
  WINDOW_MS: 60 * 60 * 1000, // 1 hour window
};

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  limit: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + LIMITS.WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: LIMITS.MAX_REQUESTS - 1,
      resetTime: now + LIMITS.WINDOW_MS,
      limit: LIMITS.MAX_REQUESTS,
    };
  }

  if (entry.count >= LIMITS.MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      limit: LIMITS.MAX_REQUESTS,
    };
  }

  entry.count++;
  rateLimitStore.set(identifier, entry);

  return {
    allowed: true,
    remaining: LIMITS.MAX_REQUESTS - entry.count,
    resetTime: entry.resetTime,
    limit: LIMITS.MAX_REQUESTS,
  };
}

export function getRateLimitInfo(identifier: string): {
  remaining: number;
  resetTime: number;
  limit: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    return {
      remaining: LIMITS.MAX_REQUESTS,
      resetTime: now + LIMITS.WINDOW_MS,
      limit: LIMITS.MAX_REQUESTS,
    };
  }

  return {
    remaining: Math.max(0, LIMITS.MAX_REQUESTS - entry.count),
    resetTime: entry.resetTime,
    limit: LIMITS.MAX_REQUESTS,
  };
}
