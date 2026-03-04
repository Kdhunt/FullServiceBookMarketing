import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.username === 'admin' && body.password === 'admin123') {
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
