import Image from 'next/image';
import banner from '../../../public/banner.jpg';
import getSheetData from '@/actions/getSheetData';

import { CardType } from '../../common/types';
import Card from '@/common/Card';
import BannerTag from '@/common/BannerTag';
import DownloadBtn from '@/common/DownloadBtn';

interface CardObj {
  [key: string]: CardType[];
  solar: CardType[];
  lunar: CardType[];
}

interface Sections {
  [key: string]: CardObj;
  Xavier: CardObj;
  Zayne: CardObj;
  Rafayel: CardObj;
  Sylus: CardObj;
  Caleb: CardObj;
}

export default async function FourStar() {
  const cards = await getSheetData('Sheet2');
  const SECTIONS: Sections = {
    Xavier: {
      solar: [],
      lunar: [],
    },
    Zayne: {
      solar: [],
      lunar: [],
    },
    Rafayel: {
      solar: [],
      lunar: [],
    },
    Sylus: {
      solar: [],
      lunar: [],
    },
    Caleb: {
      solar: [],
      lunar: [],
    },
  };

  cards.forEach((card = {}) => {
    const { character, time, order } = card;
    if (character && time && order) {
      SECTIONS[character][time][Number(order) - 1] = card;
    }
  });

  return (
    <div className='flex min-h-screen min-w-fit items-center justify-center gap-16 bg-black p-20 font-[family-name:var(--font-noto-sans)]'>
      <main
        className='flex w-full min-w-336 flex-col border-2 bg-white'
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
        <div className='flex flex-col items-start justify-start gap-4 p-4'>
          {Object.entries(SECTIONS).map(([character, cards]) => (
            <div key={character} className='flex gap-4 w-full'>
              <BannerTag>{character}</BannerTag>
              <div className="flex flex-col gap-4 grow">
              {Object.entries(cards).map(([time, cardList]) => (
                <div key={time} className='flex gap-4 grow'>
                  <BannerTag>{time}</BannerTag>
                  <div className='grid grid-cols-[repeat(auto-fill,160px)] gap-4 w-full'>
                  {cardList.map((card) => (
                    <Card
                      type="four-star"
                      key={(card.name || '').replaceAll(' ', '_')}
                      {...card}
                    />
                  ))}
                  </div>
                </div>
              ))}
              </div>
            </div>
          ))}
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
