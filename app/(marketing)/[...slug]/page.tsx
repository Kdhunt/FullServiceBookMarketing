import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/data';
import BlockRenderer from '@/components/marketing/BlockRenderer';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: slugParts } = await params;
  const slug = slugParts.join('/');
  const page = getPageBySlug(slug);
  if (!page) return { title: 'Not Found' };
  return { title: page.title };
}

export default async function SlugPage({ params }: Props) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join('/');
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
