import { getPageById } from '@/lib/data';
import PageEditorClient from './PageEditorClient';
import { notFound } from 'next/navigation';
import { MarketingPage } from '@/lib/types';

interface Props {
  params: { id: string };
}

export default function PageEditorPage({ params }: Props) {
  let page: MarketingPage | null = null;

  if (params.id !== 'new') {
    page = getPageById(params.id);
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

  return <PageEditorClient initialPage={page} isNew={params.id === 'new'} />;
}
