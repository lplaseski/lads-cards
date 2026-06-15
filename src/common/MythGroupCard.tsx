'use client';

import React, { useCallback, useState } from 'react';
import { CardType } from './types';
import Image from 'next/image';
import Overlay from './Overlay';
import Modal from './YoutubeModal';

const getVideoUrl = (url: string) => {
  const urlObj = new URL(url);
  if (urlObj.searchParams.get('list')) {
    return `https://www.youtube.com/embed/videoseries?list=${urlObj.searchParams.get('list')}`;
  }
  return `https://www.youtube.com/embed/${urlObj.searchParams.get('v')}`;
};

const characterColors: Record<string, string> = {
  Zayne: '#3b82f6',
  Xavier: '#a855f7',
  Rafayel: '#ec4899',
  Sylus: '#ef4444',
  Caleb: '#f97316',
};

const MythGroupCard = ({ cards }: { cards: CardType[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = useCallback(() => setIsModalOpen((v) => !v), []);

  const videoCard = cards.find((c) => String(c.order) === '1') ?? cards[0];
  const yt_video = videoCard?.yt_video;

  const color = videoCard.character
    ? (characterColors[videoCard.character] ?? '#6b7280')
    : undefined;

  return (
    <div
      className='flex flex-col items-center gap-3 overflow-hidden rounded-xl border-1 border-gray-200 pb-2 transition-shadow'
      style={color ? { boxShadow: `0 2px 8px ${color}60` } : undefined}
    >
      <div className='flex gap-1'>
        {cards.map((card) => {
          const folder = card.type?.includes('myth') ? 'myths' : 'limited';
          const url = `/${folder}/${card.character}_${encodeURIComponent((card.name || '').replaceAll(' ', '_').replaceAll("'", ''))}.jpeg`;
          const color = card.character
            ? (characterColors[card.character] ?? '#6b7280')
            : undefined;

          return (
            <div key={card.name} className='flex flex-col items-center gap-1'>
              <div className='relative h-65 w-48 overflow-hidden'>
                <Overlay name={card.name || ''} showWanted showOwned />
                <Image
                  className='peer-data-[locked=true]:grayscale-85'
                  alt={card.name || ''}
                  src={url}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  sizes='320px'
                />
                <Image
                  style={{ background: 'transparent' }}
                  className='absolute top-1 left-1 bg-transparent peer-data-[locked=true]:grayscale-85'
                  alt=''
                  height={25}
                  width={25}
                  src={`/stella/${card.stellacrum}.svg`}
                />
              </div>
              <p className='text-center font-medium'>{card.name}</p>
              {card.character && (
                <span
                  className='-mt-1 rounded-full px-2.5 py-0.5 text-xs font-medium text-white'
                  style={{ backgroundColor: color }}
                >
                  {card.character}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {yt_video && (
        <button
          onClick={handleModalToggle}
          className='flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-600 hover:border-gray-400 hover:bg-gray-50'
        >
          <svg viewBox='0 0 24 24' className='h-3.5 w-3.5 fill-red-500'>
            <path d='M8 5v14l11-7z' />
          </svg>
          View on YouTube
        </button>
      )}
      {isModalOpen && yt_video && (
        <Modal videoUrl={getVideoUrl(yt_video)} onClose={handleModalToggle} />
      )}
    </div>
  );
};

export default MythGroupCard;
