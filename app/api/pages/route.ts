import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getPages, savePage } from '@/lib/data';
import { MarketingPage } from '@/lib/types';

export async function GET() {
  const pages = getPages();
  return NextResponse.json(pages);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const now = new Date().toISOString();
  const page: MarketingPage = {
    id: uuidv4(),
    title: body.title || 'Untitled Page',
    slug: body.slug || '',
    status: body.status || 'draft',
    blocks: body.blocks || [],
    createdAt: now,
    updatedAt: now,
  };
  savePage(page);
  return NextResponse.json(page, { status: 201 });
}
