import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function checkRateLimit(identifier, maxRequests = 1000, windowMs = 3600000) {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  const requests = await redis.get(key) || [];

  const validRequests = requests.filter(
    timestamp => now - timestamp < windowMs
  );

  if (validRequests.length >= maxRequests) {
    const oldestRequest = validRequests[0];
    const resetTime = oldestRequest + windowMs;
    const retryAfter = Math.ceil((resetTime - now) / 1000);

    return {
      allowed: false,
      remaining: 0,
      resetTime,
      retryAfter,
    };
  }

  validRequests.push(now);

  const ttl = Math.ceil(windowMs / 1000);
  await redis.set(key, validRequests, { ex: ttl });

  return {
    allowed: true,
    remaining: maxRequests - validRequests.length,
    resetTime: now + windowMs,
    retryAfter: null,
  };
}
