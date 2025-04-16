import getSheetData from '@/actions/getSheetData';
import { MLQCCardType } from '@/common/types';
import React from 'react';
import Image from 'next/image';
import Overlay from '@/common/Overlay';

const MLQCPage = async () => {
  const cards = await getSheetData('Sheet3');
  const groups = cards.reduce(
    (acc, card, index) => {
      const { date, banner, viewed } = card;
      const cardWithIndex = {...card, viewed: Number(viewed|| '0'), index}
      if (date && banner) {
        if (acc?.[date]?.[banner]) {
          acc[date][banner].push(cardWithIndex);
        } else if (acc?.[date]) {
          acc[date][banner] = [cardWithIndex];
        } else {
          acc[date] = { [banner]: [cardWithIndex] };
        }
      }
      return acc;
    },
    {} as Record<string, Record<string, MLQCCardType[]>>
  );

  const sortedDates = Object.keys(groups).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const sortedGroups = sortedDates.map((date) => ({
    date,
    cards: groups[date],
  }));

  return (
    <div className='flex min-h-screen min-w-fit items-center justify-center gap-16 bg-black p-20 font-[family-name:var(--font-noto-sans)]'>
      <main
        className='flex w-full min-w-236 flex-col border-2 bg-white'
        style={{ minHeight: 'calc(100vh - 160px)' }}
      >
        <div className='flex flex-wrap items-center justify-center gap-4 p-10'>
          {sortedGroups.map((group) => (
            <div
              key={group.date}
              className='flex flex-col items-center justify-center gap-4'
            > 
              <h1 className='text-2xl font-bold text-center bg-cyan-950 text-white p-1 rounded-2xl w-full'>{group.date}</h1>
              <div className="flex flex-row flex-wrap gap-4">
                
              {Object.entries(group.cards).map(([banner, cards]) => (
                <div className='flex flex-col gap-4' key={banner}>
                  <h2 className='text-xl font-bold text-center bg-fuchsia-900 text-white px-5 py-1 rounded-2xl'>{banner}</h2>
                  <div className="flex flex-row flex-wrap gap-4 justify-center">
                    {cards.map((card) => (
                        <div
                        className='flex flex-col justify-center text-center align-middle'
                        key={`${card.character}_${card.card}`}
                        >
                        <div className='relative overflow-hidden'>
                            <Image
                            width={1024}
                            height={1564}
                            src={
                                `/mlqc/${card.character}_${card.card?.replaceAll(' ', '_').replaceAll("'", '%27')}.png` ||
                                ''
                            }
                            alt={card.name || ''}
                            className='h-65 w-40 object-cover'
                            />
                            <Overlay
                            showViewed
                            name={card.card || ''}
                            link={card.yt_link || ''}
                            index={card.index}
                            viewed={card.viewed}
                            sheet="Sheet3"
                            />
                        </div>
                        <p>{card?.card}</p>
                        <p>{card?.name}</p>
                        </div>
                    ))}
                    </div>
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MLQCPage;
