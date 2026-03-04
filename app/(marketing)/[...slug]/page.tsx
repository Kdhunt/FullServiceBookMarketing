import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/data';
import BlockRenderer from '@/components/marketing/BlockRenderer';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug.join('/');
  const page = getPageBySlug(slug);
  if (!page) return { title: 'Not Found' };
  return { title: page.title };
}

export default function SlugPage({ params }: Props) {
  const slug = params.slug.join('/');
  const page = getPageBySlug(slug);

  if (!page || page.status !== 'published') {
    notFound();
  }

  return (
    <>
      {page.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
