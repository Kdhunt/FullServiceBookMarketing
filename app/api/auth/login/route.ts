import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.DASHBOARD_USERNAME ?? 'admin';
const ADMIN_PASSWORD = process.env.DASHBOARD_PASSWORD ?? 'admin123';

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.username === ADMIN_USERNAME && body.password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('dashboard_auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  );
}
