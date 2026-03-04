import { getPageById } from '@/lib/data';
import PageEditorClient from './PageEditorClient';
import { notFound } from 'next/navigation';
import { MarketingPage } from '@/lib/types';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PageEditorPage({ params }: Props) {
  const { id } = await params;
  let page: MarketingPage | null = null;

  if (id !== 'new') {
    page = getPageById(id);
    if (!page) notFound();
  } else {
    // New page template
    page = {
      id: 'new',
      title: 'New Page',
      slug: '',
      status: 'draft',
      blocks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  return <PageEditorClient initialPage={page} isNew={id === 'new'} />;
}
