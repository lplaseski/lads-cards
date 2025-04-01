import Image from 'next/image';
import banner from '../../public/banner.jpg';
import cards from './cards.json';

import { CardType } from '../common/types';
import Card from '@/common/Card';

interface CardList {
  [key: string]: CardType[];
}

interface Sections {
  myth: {
    [key: string]: CardList;
    limited: CardList;
    standard: CardList;
  };
  solo: CardType[];
  birthday: CardType[];
}
const SECTIONS: Sections = {
  myth: {
    limited: {},
    standard: {},
  },
  solo: [],
  birthday: [],
};

cards.forEach((card) => {
  if (card.type.startsWith('myth')) {
    const [_, type] = card.type.split('_');
    if (!SECTIONS.myth?.[type]?.[card.character]) {
      const current = (SECTIONS.myth[type][card.character] = []);
    }
    SECTIONS.myth[type][card.character][Number(card.order) - 1] = card;
  }
});

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center gap-16 bg-black p-20 font-[family-name:var(--font-geist-sans)]'>
      <main
        className='flex w-full max-w-250 flex-col border-2'
        style={{ minHeight: 'calc(100vh - 160px)' }}
      >
        <div className='relative flex h-100 w-full'>
          <Image
            fill
            src={banner}
            alt='Next.js logo'
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className='flex'>
          <div className='flex'>
            <div className='flex w-10 items-center justify-center bg-white text-black'>
              <span className='rotate-270 whitespace-nowrap'>
                Limited Myths
              </span>
            </div>
            <div className='mb-4 grid grid-cols-[160px_160px_160px_160px] gap-4'>
              {Object.values(SECTIONS.myth.limited)
                .flat()
                .map((card: CardType) => (
                  <Card {...card} />
                ))}
              </div>
          </div>
          <div className='flex w-10 items-center justify-center bg-white text-black'>
            <span className='rotate-270 whitespace-nowrap'>Standard Myths</span>
          </div>
          <div className='grid grid-cols-[160px_160px_160px_160px] gap-4'>
            {Object.values(SECTIONS.myth.standard)
              .flat()
              .map((card: CardType) => (
                <Card {...card} />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
