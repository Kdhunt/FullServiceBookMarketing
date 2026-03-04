import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, saveSiteSettings } from '@/lib/data';

export async function GET() {
  const settings = getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const current = getSiteSettings();
  const updated = { ...current, ...body };
  saveSiteSettings(updated);
  return NextResponse.json(updated);
}
