'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import setViewed from '@/actions/setViewed';

interface OverlayProps {
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

const Overlay = ({
  name,
  index,
  viewed,
  sheet,
  showWanted = false,
  showViewed = false,
  showOwned = false,
}: OverlayProps) => {
  const [isOwned, setIsOwned] = useState(false);
  const [isWanted, setIsWanted] = useState(false);
  const [isViewed, setIsViewed] = useState(!!viewed);

  useEffect(() => {
    setIsOwned(hasCard('ownedCards', name));
    setIsWanted(hasCard('wantedCards', name));
  }, [name]);

  const handleToggle = () => {
    if (!showOwned) return;
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

  const handleOwnedToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIsOwned = e.target.checked;
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

  const handleSetViewed = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedViewed = e.target.checked;
    if (index !== undefined && !!sheet) {
      setIsViewed(updatedViewed);
      try {
        await setViewed(sheet, index, updatedViewed ? 1 : 0);
      } catch (error) {
        console.error('Error updating:', error);
        setIsViewed(!updatedViewed);
      }
    }
  };

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
          <div className='absolute top-7 left-[-40px] w-full rotate-[-45deg] bg-white text-black'>
            Wanted
          </div>
        )}
        {!!isViewed && (
          <div className='absolute top-7 left-[-35px] w-full rotate-[-45deg] bg-white text-black'>
            Viewed
          </div>
        )}
      </button>
      {(showOwned || (!isOwned && showWanted)) && (
        <div className='exclude-from-download invisible absolute right-2 bottom-2 left-2 z-10 flex flex-col gap-1 peer-hover:visible hover:visible'>
          {showOwned && (
            <label
              htmlFor={`owned-${name.replaceAll(' ', '_')}`}
              className='flex cursor-pointer items-center gap-2 rounded-md bg-emerald-700 p-2 text-xs leading-none text-white hover:bg-emerald-600'
            >
              <input
                checked={isOwned}
                id={`owned-${name.replaceAll(' ', '_')}`}
                type='checkbox'
                onChange={handleOwnedToggle}
              />{' '}
              <span>Owned</span>
            </label>
          )}
          {!isOwned && showWanted && (
            <label
              htmlFor={`wanted-${name.replaceAll(' ', '_')}`}
              className='flex cursor-pointer items-center gap-2 rounded-md bg-sky-800 p-2 text-xs leading-none text-white hover:bg-sky-700'
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
        </div>
      )}
      {showViewed && (
        <label
          htmlFor={`viewed-${name.replaceAll(' ', '_')}`}
          className='exclude-from-download invisible absolute right-8 bottom-2 z-10 flex cursor-pointer items-center gap-2 rounded-md bg-gray-800 p-2 text-xs leading-none text-white peer-hover:visible hover:visible hover:bg-gray-600'
        >
          <input
            checked={isViewed}
            id={`viewed-${name.replaceAll(' ', '_')}`}
            type='checkbox'
            onChange={handleSetViewed}
          />{' '}
          <span>Set Viewed</span>
        </label>
      )}
    </>
  );
};

export default Overlay;
