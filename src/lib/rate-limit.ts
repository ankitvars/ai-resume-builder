import { redis } from './redis';

const WINDOW = 10 * 60; 
const MAX = 5;

export async function rateLimit(key: string) {
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, WINDOW);
  }

  if (count > MAX) {
    const ttl = await redis.ttl(key);
    return { allowed: false, retryAfter: ttl };
  }

  return { allowed: true };
}
