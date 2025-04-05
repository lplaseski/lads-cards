import Image from 'next/image';
import banner from '../../public/banner.jpg';
import getSheetData from '@/actions/getSheetData';

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
  standard: {
    [key: string]: CardType[];
    Xavier: CardType[];
    Zayne: CardType[];
    Rafayel: CardType[];
    Sylus: CardType[];
    Caleb: CardType[];
  };
}

export default async function Home() {
  const cards = await getSheetData('Sheet1');
  const SECTIONS: Sections = {
    myth: {
      limited: {},
      standard: {},
    },
    solo: [],
    birthday: [],
    limited: {},
    standard: {
      Xavier: [],
      Zayne: [],
      Rafayel: [],
      Sylus: [],
      Caleb: [],
    },
  };

  cards.forEach((card) => {
    if (card?.type?.startsWith('myth')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, type] = card.type.split('_');
      if (card.character) {
        if (!SECTIONS.myth?.[type]?.[card.character]) {
          SECTIONS.myth[type][card.character] = [];
        }
        SECTIONS.myth[type][card.character][Number(card.order) - 1] = card;
      }
    } else if (card.banner === 'solo') {
      SECTIONS.solo[Number(card.order) - 1] = card;
    } else if (card.banner === 'birthday') {
      SECTIONS.birthday[Number(card.order) - 1] = card;
    } else if (card.type === 'standard') {
      if (card.character) {
        if (!SECTIONS.standard?.[card.character]) {
          SECTIONS.standard[card.character] = [];
        }
        SECTIONS.standard[card.character].push(card);
      }
    } else {
      if (card.banner) {
        if (!SECTIONS.limited[card.banner]) {
          SECTIONS.limited[card.banner] = [];
        }
        SECTIONS.limited[card.banner].push(card);
      }
    }
  });

  return (
    <div className='flex min-h-screen min-w-fit items-center justify-center gap-16 bg-black p-20 font-[family-name:var(--font-noto-sans)]'>
      <main
        className='flex w-full min-w-536 flex-col border-2 bg-white'
        style={{ minHeight: 'calc(100vh - 160px)' }}
      >
        <div className='relative flex h-120 w-full'>
          <Image
            fill
            src={banner}
            alt='Next.js logo'
            style={{ objectFit: 'cover', objectPosition: '0 20%' }}
          />
        </div>
        <div className='flex items-center justify-center gap-4 bg-sky-950 p-4 font-serif text-4xl text-white uppercase'>
          <Image
            alt='Love and Deepspace'
            height={150}
            width={150}
            src='/logo.svg'
          />
          <span>5 Star Memory Chart</span>
        </div>
        <div className='flex flex-wrap gap-8 p-6'>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-8'>
              <BannerTag>Limited Myths</BannerTag>
              <div className='mb-4 grid grid-cols-[160px_160px_160px_160px] gap-4'>
                {Object.values(SECTIONS.myth.limited)
                  .flat()
                  .map((card: CardType) => (
                    <Card
                      key={(card.name || '').replaceAll(' ', '_')}
                      {...card}
                    />
                  ))}
              </div>
            </div>
            <div className='flex gap-8'>
              <BannerTag>Standard Myths</BannerTag>
              <div className='grid grid-cols-[160px_160px_160px_160px] gap-4'>
                {Object.values(SECTIONS.myth.standard)
                  .flat()
                  .map((card: CardType) => (
                    <Card
                      key={(card.name || '').replaceAll(' ', '_')}
                      {...card}
                    />
                  ))}
              </div>
            </div>
            <div className='flex gap-8'>
              <BannerTag>Standard</BannerTag>
              <div className='grid grid-cols-[160px_160px_160px_160px] gap-4'>
                {SECTIONS.standard.Xavier.map((card: CardType) => (
                  <Card
                    key={(card.name || '').replaceAll(' ', '_')}
                    {...card}
                  />
                ))}
                {SECTIONS.standard.Zayne.map((card: CardType) => (
                  <Card
                    key={(card.name || '').replaceAll(' ', '_')}
                    {...card}
                  />
                ))}
                {SECTIONS.standard.Rafayel.map((card: CardType) => (
                  <Card
                    key={(card.name || '').replaceAll(' ', '_')}
                    {...card}
                  />
                ))}
                {SECTIONS.standard.Sylus.map((card: CardType) => (
                  <Card
                    key={(card.name || '').replaceAll(' ', '_')}
                    {...card}
                  />
                ))}
                {SECTIONS.standard.Caleb.map((card: CardType) => (
                  <Card
                    key={(card.name || '').replaceAll(' ', '_')}
                    {...card}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-8'>
              <BannerTag>Solo</BannerTag>
              <div className='grid grid-cols-[160px_160px] gap-4'>
                {SECTIONS.solo.map((card: CardType) => (
                  <Card
                    key={(card.name || '').replaceAll(' ', '_')}
                    {...card}
                  />
                ))}
              </div>
            </div>
            <div className='flex gap-8'>
              <BannerTag>Birthday</BannerTag>
              <div className='grid grid-cols-[160px_160px] gap-4'>
                {SECTIONS.birthday.map((card: CardType) => (
                  <Card
                    key={(card.name || '').replaceAll(' ', '_')}
                    {...card}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='grid flex-grow grid-cols-[repeat(auto-fill,_408px)] gap-8'>
            {BANNERS.map((banner) => (
              <div key={banner} className='flex gap-8'>
                <BannerTag>{banner}</BannerTag>
                <div className='grid grid-cols-[160px_160px] grid-rows-[max-content] content-start gap-4'>
                  {SECTIONS.limited[banner]?.map?.((card: CardType) => (
                    <Card
                      key={(card.name || '').replaceAll(' ', '_')}
                      {...card}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className='flex w-full items-center justify-center gap-4 bg-sky-950 p-4 font-serif text-2xl text-white uppercase'>
          Inspired by the infographic created by{' '}
          <a href='https://x.com/YiZhan_05'>@YiZhan_05</a> on Twitter
        </footer>
      </main>
      <DownloadBtn />
    </div>
  );
}
