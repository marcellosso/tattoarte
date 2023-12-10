import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { authMiddleware } from '@clerk/nextjs';

const privatePaths = ['/checkout', '/criar'];

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '15 s'),
  analytics: true,
});

// Checks if the pathname you are is public
const isPublic = (path: string) => {
  return !privatePaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/|\\.)')))
  );
};

// Checks if you are hitting an API
const isAPI = (path: string) => {
  return !!path.match(new RegExp(`^\/api\/`));
};

export default authMiddleware({
  publicRoutes: (req: NextRequest) => {
    return isPublic(req.nextUrl.pathname);
  },
  apiRoutes: ['/api/buy(.*)', '/api/generation(.*)', '/api/user/(.*)'],
  async afterAuth(auth, req, evt) {
    if (!auth.userId && auth.isApiRoute) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (isAPI(req.nextUrl.pathname)) {
      const ip = req.ip ?? '127.0.0.1';
      const { success, pending, limit, reset, remaining } =
        await rateLimit.limit(`ratelimit_middleware_${ip}`);
      evt.waitUntil(pending);

      if (req.nextUrl.pathname.includes('get-prediction'))
        return NextResponse.next();

      const res = success
        ? NextResponse.next()
        : new NextResponse('Limte de chamadas atingido, vai com calma!', {
            status: 409,
          });

      res.headers.set('X-RateLimit-Limit', limit.toString());
      res.headers.set('X-RateLimit-Remaining', remaining.toString());
      res.headers.set('X-RateLimit-Reset', reset.toString());
      return res;
    }

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/login', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)',
    '/',
  ],
};
