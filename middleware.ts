import { NextRequest, NextResponse } from 'next/server';

// run only on homepage
export const config = {
  matcher: '/',
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const lat = geo?.latitude || '33.749';
  const lon = geo?.longitude || '-84.388';

  url.searchParams.set('lat', lat);
  url.searchParams.set('lon', lon);

  return NextResponse.rewrite(url);
}
