import Image from 'next/image';
import banner from '../../../public/banner.jpg';
import getSheetData from '@/actions/getSheetData';

import { CardType } from '../../common/types';
import Card from '@/common/Card';
import MythGroupCard from '@/common/MythGroupCard';
import BannerTag from '@/common/BannerTag';

const BANNERS = [
  'Veiled Whispers',
  'Lingering Gaze',
  'Entwined Shadows',
  'Misty Invasion',
  'Wander in Wonder',
  'Yes, Cat Caretaker',
  'Nightly Rendezvous',
  "Tomorrow's Catch-22",
  'Spring and Flowers',
  'Witnessed by Deepspace',
  'You and Midsummer',
  'Heart Beats Ablaze',
  'Throne of Eros',
  "Mortality's Tenderness",
  'Lingering Lust',
];

interface CardList {
  [key: string]: CardType[];
}

interface Sections {
  myth: {
    limited: CardType[];
    standard: CardList;
  };
  solo: CardType[];
  birthday: CardType[];
  free: {
    [key: string]: CardType[];
  };
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
      limited: [],
      standard: {},
    },
    solo: [],
    birthday: [],
    free: {},
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
    if (typeof card.type === 'string' && card?.type?.startsWith('myth')) {
      console.log(card);
      if (card.type === 'myth_limited') {
        SECTIONS.myth.limited.push(card);
      } else if (card.character) {
        if (!SECTIONS.myth.standard[card.character]) {
          SECTIONS.myth.standard[card.character] = [];
        }
        SECTIONS.myth.standard[card.character].push(card);
      }
    } else if (card.type === 'free') {
      const key = (card.banner || card.name || '').trim();
      if (!SECTIONS.free[key]) SECTIONS.free[key] = [];
      SECTIONS.free[key].push(card);
    } else if (card.banner === 'solo') {
      SECTIONS.solo.push(card);
    } else if (card.banner === 'birthday') {
      SECTIONS.birthday.push(card);
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
  const sortByDate = (arr: CardType[]) =>
    arr.sort((a, b) =>
      (a.release_date || '').localeCompare(b.release_date || '')
    );

  sortByDate(SECTIONS.solo);
  sortByDate(SECTIONS.birthday);
  Object.values(SECTIONS.standard).forEach(sortByDate);
  Object.values(SECTIONS.limited).forEach(sortByDate);
  Object.values(SECTIONS.free).forEach(sortByDate);
  SECTIONS.free = Object.fromEntries(
    Object.entries(SECTIONS.free).sort(([, a], [, b]) =>
      (a[0]?.release_date || '').localeCompare(b[0]?.release_date || '')
    )
  );

  const sortMythCards = (arr: CardType[]) =>
    arr.sort((a, b) => {
      const dateCompare = (a.release_date || '').localeCompare(
        b.release_date || ''
      );
      if (dateCompare !== 0) return dateCompare;
      return Number(a.order || 0) - Number(b.order || 0);
    });

  const sortMythSection = (section: CardList) => {
    Object.values(section).forEach(sortMythCards);
    const sorted = Object.entries(section).sort(([, a], [, b]) =>
      (a[0]?.release_date || '').localeCompare(b[0]?.release_date || '')
    );
    return Object.fromEntries(sorted);
  };
  sortMythCards(SECTIONS.myth.limited);
  SECTIONS.myth.standard = sortMythSection(SECTIONS.myth.standard);

  const groupByBanner = (arr: CardType[]): CardType[][] => {
    const map: Record<string, CardType[]> = {};
    for (const card of arr) {
      const key = card.banner || card.release_date || card.name || '';
      if (!map[key]) map[key] = [];
      map[key].push(card);
    }
    return Object.values(map);
  };

  const limitedMythGroups = groupByBanner(SECTIONS.myth.limited);
  const standardMythGroups = Object.values(SECTIONS.myth.standard).flatMap(
    groupByBanner
  );

  return (
    <div className='flex min-h-screen flex-col items-center bg-black p-4 font-[family-name:var(--font-noto-sans)] sm:p-10 lg:p-20'>
      <main className='flex w-full flex-col border-2 bg-white'>
        <div className='relative h-32 w-full sm:h-60 lg:h-120'>
          <Image
            fill
            src={banner}
            alt='Next.js logo'
            style={{ objectFit: 'cover', objectPosition: '0 20%' }}
          />
        </div>
        <div className='flex items-center justify-center gap-2 bg-sky-950 p-4 font-serif text-2xl text-white uppercase sm:gap-4 lg:text-4xl'>
          <Image
            alt='Love and Deepspace'
            height={100}
            width={100}
            src='/logo.svg'
            className='lg:h-[150px] lg:w-[150px]'
          />
          <span>5 Star Memory Chart</span>
        </div>
        <div className='flex flex-col gap-8 p-4 sm:p-6'>
          <div className='flex gap-4'>
            <BannerTag>Limited Myths</BannerTag>
            <div className='flex flex-1 flex-wrap gap-4'>
              {limitedMythGroups.map((group) => (
                <MythGroupCard
                  key={group[0].banner || group[0].name || ''}
                  cards={group}
                />
              ))}
            </div>
          </div>
          <div className='flex gap-4'>
            <BannerTag>Standard Myths</BannerTag>
            <div className='flex flex-1 flex-wrap gap-4'>
              {standardMythGroups.map((group) => (
                <MythGroupCard
                  key={group[0].banner || group[0].name || ''}
                  cards={group}
                />
              ))}
            </div>
          </div>
          <div className='flex gap-4'>
            <BannerTag>Standard</BannerTag>
            <div className='grid flex-1 grid-cols-[repeat(auto-fill,192px)] gap-4'>
              {SECTIONS.standard.Xavier.map((card: CardType) => (
                <Card key={(card.name || '').replaceAll(' ', '_')} {...card} />
              ))}
              {SECTIONS.standard.Zayne.map((card: CardType) => (
                <Card key={(card.name || '').replaceAll(' ', '_')} {...card} />
              ))}
              {SECTIONS.standard.Rafayel.map((card: CardType) => (
                <Card key={(card.name || '').replaceAll(' ', '_')} {...card} />
              ))}
              {SECTIONS.standard.Sylus.map((card: CardType) => (
                <Card key={(card.name || '').replaceAll(' ', '_')} {...card} />
              ))}
              {SECTIONS.standard.Caleb.map((card: CardType) => (
                <Card key={(card.name || '').replaceAll(' ', '_')} {...card} />
              ))}
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            {Object.entries(SECTIONS.free).map(([bannerName, bannerCards]) => (
              <div key={bannerName} className='flex gap-4'>
                <BannerTag>{bannerName}</BannerTag>
                <div className='grid grid-cols-[192px_192px_192px] grid-rows-[max-content] content-start gap-4'>
                  {bannerCards.map?.((card: CardType) => (
                    <Card
                      key={(card.name || '').replaceAll(' ', '_')}
                      {...card}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className='flex gap-4'>
            <BannerTag>Solo</BannerTag>
            <div className='grid flex-1 grid-cols-[repeat(auto-fill,192px)] gap-4'>
              {SECTIONS.solo.map((card: CardType) => (
                <Card key={(card.name || '').replaceAll(' ', '_')} {...card} />
              ))}
            </div>
          </div>
          <div className='flex gap-4'>
            <BannerTag>Birthday</BannerTag>
            <div className='grid flex-1 grid-cols-[repeat(auto-fill,192px)] gap-4'>
              {SECTIONS.birthday.map((card: CardType) => (
                <Card key={(card.name || '').replaceAll(' ', '_')} {...card} />
              ))}
            </div>
          </div>
          <div className='flex flex-wrap gap-8'>
            {BANNERS.map((banner) => (
              <div key={banner} className='flex gap-4'>
                <BannerTag>{banner}</BannerTag>
                <div className='grid grid-cols-[192px_192px] grid-rows-[max-content] content-start gap-4'>
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
    </div>
  );
}
