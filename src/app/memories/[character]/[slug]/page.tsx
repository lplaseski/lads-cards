import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import getGalleryCards from '@/actions/getGalleryCards';
import {
  formatReleaseDate,
  getCardHref,
  getCardSlug,
} from '@/common/galleryCards';
import { Stars, TimeIcon } from '@/common/MemoryIcons';
import BackButton from './BackButton';
import VideoCircle from './VideoCircle';

export async function generateStaticParams() {
  const cards = await getGalleryCards();
  return cards.map((c) => ({
    character: c.character.toLowerCase(),
    slug: getCardSlug(c.name),
  }));
}

type Params = Promise<{ character: string; slug: string }>;

async function findCard(params: Params) {
  const { character, slug } = await params;
  const cards = await getGalleryCards();
  return cards.find(
    (c) =>
      c.character.toLowerCase() === character.toLowerCase() &&
      getCardSlug(c.name) === slug
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const card = await findCard(params);
  if (!card) return {};

  const title = `${card.character}: ${card.name}`;
  const description = `${card.character}'s ${card.category} memory "${card.name}" in Love and Deepspace${
    card.releaseDate ? `, released ${formatReleaseDate(card.releaseDate)}` : ''
  }.`;
  const url = getCardHref(card);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: [{ url: card.imageUrl, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [card.imageUrl],
    },
  };
}

export default async function MemoryPage({ params }: { params: Params }) {
  const card = await findCard(params);
  if (!card) notFound();

  return (
    <div className='min-h-screen bg-[#d9d7de] font-[family-name:var(--font-noto-sans)]'>
      <div className='relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col overflow-hidden bg-[#1c1622] text-white shadow-2xl'>
        <div className='absolute inset-0'>
          <Image
            alt={card.name}
            src={card.imageUrl}
            fill
            priority
            sizes='480px'
            className='object-cover object-top'
          />
          <div className='absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#1c1622] via-[#1c1622]/85 to-transparent' />
        </div>

        <BackButton />

        <div className='relative mt-auto px-5 pt-40 pb-10'>
          <Stars count={card.stars} className='text-2xl' />
          <p className='mt-2 text-[9px] tracking-[0.25em] text-white/60 uppercase'>
            Memories · {card.category}
          </p>
          <div className='flex items-center gap-2'>
            <span className='self-stretch border-y border-l border-white/60 pr-0.5' />
            <h1 className='font-serif text-2xl leading-tight font-bold [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]'>
              {card.character}: {card.name}
            </h1>
            {card.stellacrum && (
              <Image
                alt=''
                width={24}
                height={24}
                src={`/stella/${card.stellacrum}.svg`}
                className='shrink-0 drop-shadow'
              />
            )}
            <TimeIcon time={card.time} className='h-5 w-5 shrink-0' />
          </div>

          {(card.releaseDate || card.stars === 5) && (
            <div className='mt-3 flex items-center gap-3 border border-white/25 bg-black/20 px-4 py-2 backdrop-blur-sm'>
              <svg
                viewBox='0 0 20 20'
                className='h-4 w-4 shrink-0 fill-none stroke-white/70'
                strokeWidth='1.5'
              >
                <rect x='2.5' y='4' width='15' height='13.5' rx='1.5' />
                <path d='M2.5 8h15M6.5 2v4M13.5 2v4' />
              </svg>
              <span className='text-[11px] tracking-[0.2em] text-white/60 uppercase'>
                Released
              </span>
              <span className='ml-auto text-lg tracking-wide'>
                {card.releaseDate ? formatReleaseDate(card.releaseDate) : 'TBA'}
              </span>
            </div>
          )}

          {card.ytVideo && (
            <div className='mt-10 flex justify-center'>
              <VideoCircle url={card.ytVideo} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
