import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '15 s'),
  analytics: true,
});

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await rateLimit.limit(ip);

  if (request.nextUrl.pathname.includes('get-generations'))
    return NextResponse.next();

  return success
    ? NextResponse.next()
    : new NextResponse('Limite de chamadas atingido, vai com calma!', {
        status: 409,
      });
}

export const config = {
  matcher: '/api/:path*',
};
