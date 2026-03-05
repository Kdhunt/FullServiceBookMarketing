import { Block } from '@/lib/types';
import HeroBlock from './blocks/HeroBlock';
import FeaturesBlock from './blocks/FeaturesBlock';
import TestimonialsBlock from './blocks/TestimonialsBlock';
import CtaBlock from './blocks/CtaBlock';
import TextImageBlock from './blocks/TextImageBlock';
import StatsBlock from './blocks/StatsBlock';
import FaqBlock from './blocks/FaqBlock';
import RichTextBlock from './blocks/RichTextBlock';

export default function BlockRenderer({ block }: { block: Block }) {
  const config = block.config as Record<string, never>;

  switch (block.type) {
    case 'hero':
      return <HeroBlock config={config as never} />;
    case 'features':
      return <FeaturesBlock config={config as never} />;
    case 'testimonials':
      return <TestimonialsBlock config={config as never} />;
    case 'cta':
      return <CtaBlock config={config as never} />;
    case 'text-image':
      return <TextImageBlock config={config as never} />;
    case 'stats':
      return <StatsBlock config={config as never} />;
    case 'faq':
      return <FaqBlock config={config as never} />;
    case 'rich-text':
      return <RichTextBlock config={config as never} />;
    default:
      return null;
  }
}
