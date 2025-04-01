import Image from 'next/image';
import banner from '../../public/banner.jpg';
import cards from './cards.json';

import { CardType } from '../common/types';
import Card from '@/common/Card';
import BannerTag from '@/common/BannerTag';
import DownloadBtn from '@/common/DownloadBtn';

const BANNERS = [
  'Veiled Whispers',
  'Lingering Gaze',
  'Entwined Shadows',
  'Misty Invasion',
  'Wander in Wonder',
  'Yes, Cat Caretaker',
  'Nightly Rendezvous',
  "Tomorrow's Catch-22",
];

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
  limited: {
    [key: string]: CardType[];
  };
}
const SECTIONS: Sections = {
  myth: {
    limited: {},
    standard: {},
  },
  solo: [],
  birthday: [],
  limited: {},
};

cards.forEach((card) => {
  if (card.type.startsWith('myth')) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, type] = card.type.split('_');
    if (!SECTIONS.myth?.[type]?.[card.character]) {
      SECTIONS.myth[type][card.character] = [];
    }
    SECTIONS.myth[type][card.character][Number(card.order) - 1] = card;
  } else if (card.banner === 'solo') {
    SECTIONS.solo[Number(card.order) - 1] = card;
  } else if (card.banner === 'birthday') {
    SECTIONS.birthday[Number(card.order) - 1] = card;
  } else {
    if (!SECTIONS.limited[card.banner]) {
      SECTIONS.limited[card.banner] = [];
    }
    SECTIONS.limited[card.banner].push(card);
  }
});

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center gap-16 bg-black p-20 font-[family-name:var(--font-geist-sans)]'>
      <main
        className='flex w-full flex-col gap-8 border-2 bg-white'
        style={{ minHeight: 'calc(100vh - 160px)' }}
      >
        <div className='relative flex h-100 w-full'>
          <Image
            fill
            src={banner}
            alt='Next.js logo'
            style={{ objectFit: 'cover', objectPosition: '0 20%' }}
          />
        </div>
        <div className='flex flex-wrap gap-8 px-6 pb-6'>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-8'>
              <BannerTag>Limited Myths</BannerTag>
              <div className='mb-4 grid grid-cols-[160px_160px_160px_160px] gap-4'>
                {Object.values(SECTIONS.myth.limited)
                  .flat()
                  .map((card: CardType) => (
                    <Card key={card.name.replaceAll(' ', '_')} {...card} />
                  ))}
              </div>
            </div>
            <div className='flex gap-8'>
              <BannerTag>Standard Myths</BannerTag>
              <div className='grid grid-cols-[160px_160px_160px_160px] gap-4'>
                {Object.values(SECTIONS.myth.standard)
                  .flat()
                  .map((card: CardType) => (
                    <Card key={card.name.replaceAll(' ', '_')} {...card} />
                  ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-8'>
              <BannerTag>Solo</BannerTag>
              <div className='grid grid-cols-[160px_160px] gap-4'>
                {SECTIONS.solo.map((card: CardType) => (
                  <Card key={card.name.replaceAll(' ', '_')} {...card} />
                ))}
              </div>
            </div>
          </div>
          <div className='grid flex-grow grid-cols-[repeat(auto-fill,_408px)] gap-8'>
            {BANNERS.map((banner) => (
              <div key={banner} className='flex gap-8'>
                <BannerTag>{banner}</BannerTag>
                <div className='grid grid-cols-[160px_160px] grid-rows-[max-content] gap-4'>
                  {SECTIONS.limited[banner]?.map?.((card: CardType) => (
                    <Card key={card.name.replaceAll(' ', '_')} {...card} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <DownloadBtn />
    </div>
  );
}
