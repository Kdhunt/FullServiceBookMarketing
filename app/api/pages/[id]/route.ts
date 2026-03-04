import { NextRequest, NextResponse } from 'next/server';
import { getPageById, savePage, deletePage } from '@/lib/data';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const page = getPageById(params.id);
  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }
  return NextResponse.json(page);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const page = getPageById(params.id);
  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }
  const body = await request.json();
  const updated = {
    ...page,
    ...body,
    id: page.id,
    updatedAt: new Date().toISOString(),
  };
  savePage(updated);
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const page = getPageById(params.id);
  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }
  deletePage(params.id);
  return NextResponse.json({ success: true });
}
