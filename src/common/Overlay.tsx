'use client';

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from './YoutubeModal';
import setViewed from '@/actions/setViewed';

interface OverlayProps {
  link: string;
  name: string;
  index?: number;
  viewed?: number;
  sheet?: string;
  showWanted?: boolean;
  showViewed?: boolean;
  showOwned?: boolean;
}

const getCardsFromStorage = (key: string) => {
  try {
    const ownedCards = JSON.parse(window.localStorage.getItem(key) || '[]');
    return ownedCards;
  } catch (error) {
    console.error('Error parsing owned cards from localStorage:', error);
    return [];
  }
};

const hasCard = (key: string, name: string) => {
  try {
    const ownedCards = getCardsFromStorage(key);
    return ownedCards.includes(name);
  } catch (error) {
    console.error('Error parsing owned cards from localStorage:', error);
    return false;
  }
};

const setCardsInStorage = (key: string, cards: string[]) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(cards));
  } catch (error) {
    console.error('Error setting owned cards to localStorage:', error);
  }
};

const Overlay = ({ link, name, index, viewed, sheet, showWanted = false, showViewed = false, showOwned = false }: OverlayProps) => {
  const [isOwned, setIsOwned] = useState(false);
  const [isWanted, setIsWanted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewed, setIsViewed] = useState(!!viewed);

  useEffect(() => {
    setIsOwned(hasCard('ownedCards', name));
    setIsWanted(hasCard('wantedCards', name));
  }, [name]);

  const handleToggle = () => {
    const updatedIsOwned = !isOwned;
    setIsOwned(updatedIsOwned);
    const ownedCards = getCardsFromStorage('ownedCards');
    if (updatedIsOwned) {
      ownedCards.push(name);
    } else {
      const index = ownedCards.indexOf(name);
      if (index > -1) {
        ownedCards.splice(index, 1);
      }
    }
    setCardsInStorage('ownedCards', ownedCards);
  };

  const handleWantedToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIsWanted = e.target.checked;
    setIsWanted(updatedIsWanted);
    const wantedCards = getCardsFromStorage('wantedCards');
    if (updatedIsWanted) {
      wantedCards.push(name);
    } else {
      const index = wantedCards.indexOf(name);
      if (index > -1) {
        wantedCards.splice(index, 1);
      }
    }
    setCardsInStorage('wantedCards', wantedCards);
  };

  const handleModalToggle = useCallback(() => {
    setIsModalOpen((v) => !v);
  }, []);

  const handleSetViewed = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedViewed = e.target.checked;
    if (index !== undefined && !!sheet) {
      setIsViewed(updatedViewed);
      try {
        await setViewed(sheet, index, updatedViewed ? 1 : 0);
      } catch (error) {
        console.error('Error updating:', error)
        setIsViewed(!updatedViewed);
      }
    }
  }

  return (
    <>
      <button
        onClick={handleToggle}
        data-locked={!isOwned}
        className='peer absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center text-lg font-bold text-white'
      >
        {showOwned && !isOwned && (
          <Image
            src='/icons/lock.svg'
            width={50}
            height={50}
            className='mb-2'
            alt='Not Owned'
          />
        )}
        {isWanted && !isOwned && (
          <div className='absolute top-7 left-[-35px] w-full rotate-[-45deg] bg-white text-black'>
            Wanted
          </div>
        )}
        {!!isViewed && (
          <div className='absolute top-7 left-[-35px] w-full rotate-[-45deg] bg-white text-black'>
            Viewed
          </div>
        )}
      </button>
      {!isOwned && link && (
        <button
          onClick={handleModalToggle}
          className='peer exclude-from-download absolute top-2 right-2 z-10 cursor-pointer rounded-md bg-red-500 p-1 text-xs leading-none text-white hover:bg-red-600'
        >
          View on YouTube
        </button>
      )}
      {!isOwned && showWanted && (
        <label
          htmlFor={`wanted-${name.replaceAll(' ', '_')}`}
          className='exclude-from-download hover:bg-sky-6000 invisible absolute right-8 bottom-2 z-10 flex cursor-pointer items-center gap-2 rounded-md bg-sky-800 p-2 text-xs leading-none text-white peer-hover:visible hover:visible'
        >
          <input
            checked={isWanted}
            id={`wanted-${name.replaceAll(' ', '_')}`}
            type='checkbox'
            onChange={handleWantedToggle}
          />{' '}
          <span>Set Wanted</span>
        </label>
      )}
        {showViewed && (<label
          htmlFor={`viewed-${name.replaceAll(' ', '_')}`}
          className='exclude-from-download hover:bg-gray-600 invisible absolute right-8 bottom-2 z-10 flex cursor-pointer items-center gap-2 rounded-md bg-gray-800 p-2 text-xs leading-none text-white peer-hover:visible hover:visible'
        >
          <input
            checked={isViewed}
            id={`viewed-${name.replaceAll(' ', '_')}`}
            type='checkbox'
            onChange={handleSetViewed}
          />{' '}
          <span>Set Viewed</span>
        </label>)}
      {isModalOpen && (
        <Modal
          videoUrl={link.replace('watch?v=', 'embed/')}
          onClose={handleModalToggle}
        />
      )}
    </>
  );
};

export default Overlay;
