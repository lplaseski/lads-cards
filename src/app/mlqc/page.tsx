import getSheetData from '@/actions/getSheetData';
import { MLQCCardType } from '@/common/types';
import React from 'react';
import Image from 'next/image';
import Overlay from '@/common/Overlay';

const Colours: Record<string, string> = {
  Kiro: '#f1c766',
  Gavin: '#8dbddd',
  Victor: '#e7787f',
  Lucien: '#8f92c4',
  Shaw: '#9d9ca1'
}

const MLQCPage = async () => {
  const cards = await getSheetData('Sheet3');
  const groups = cards.reduce(
    (acc, card, index) => {
      const { date, banner, viewed } = card;
      const cardWithIndex = { ...card, viewed: Number(viewed || '0'), index };
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
              <h1 className='w-full rounded-2xl bg-cyan-950 p-1 text-center text-2xl font-bold text-white'>
                {group.date}
              </h1>
              <div className='flex flex-row flex-wrap gap-4'>
                {Object.entries(group.cards).map(([banner, cards]) => (
                  <div className='flex flex-col gap-4' key={banner}>
                    <h2 className='rounded-2xl bg-fuchsia-900 px-5 py-1 text-center text-xl font-bold text-white'>
                      {banner}
                    </h2>
                    <div className='flex flex-row flex-wrap justify-center gap-4'>
                      {cards.map((card) => (
                        <div
                        className='flex flex-col justify-center text-center align-middle gap-2'
                        key={`${card.character}_${card.card}`}
                        >
                          {card?.character && <p style={{ backgroundColor: card.character ? Colours[card.character] : '#9d9ca1' }} className='w-full rounded-2xl p-1 text-center text-2xl font-bold text-white'>{card?.character}</p>}
                          <div className='relative overflow-hidden'>
                            <Image
                              width={1024}
                              height={1564}
                              src={
                                `/mlqc/${card.character}_${card.card?.replaceAll(' ', '_').replaceAll("'", '%27')}.png` ||
                                ''
                              }
                              alt={card.name || ''}
                              className='h-90 w-60 object-cover'
                            />
                            <Overlay
                              showViewed={false}
                              name={card.card || ''}
                              link={card.yt_link || ''}
                              index={card.index}
                              viewed={card.viewed}
                              sheet='Sheet3'
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
