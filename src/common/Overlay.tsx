'use client';

import React, { Fragment, useState } from 'react';
import Image from 'next/image';

interface OverlayProps {
  link: string;
  name: string;
}

const getCardsFromStorage = () => {
  try {
    const ownedCards = JSON.parse(
      window.localStorage.getItem('ownedCards') || '[]'
    );
    return ownedCards;
  } catch (error) {
    console.error('Error parsing owned cards from localStorage:', error);
    return [];
  }
};

const hasCard = (name: string) => {
  try {
    const ownedCards = getCardsFromStorage();
    return ownedCards.includes(name);
  } catch (error) {
    console.error('Error parsing owned cards from localStorage:', error);
    return false;
  }
};

const setCardsInStorage = (cards: string[]) => {
  try {
    window.localStorage.setItem('ownedCards', JSON.stringify(cards));
  } catch (error) {
    console.error('Error setting owned cards to localStorage:', error);
  }
};

const Overlay = ({ link, name }: OverlayProps) => {
  const [isOwned, setIsOwned] = useState(hasCard(name));

  const handleClick = () => {
    const updatedIsOwned = !isOwned;
    setIsOwned(updatedIsOwned);
    const ownedCards = getCardsFromStorage();
    if (updatedIsOwned) {
      ownedCards.push(name);
    } else {
      const index = ownedCards.indexOf(name);
      if (index > -1) {
        ownedCards.splice(index, 1);
      }
    }
    setCardsInStorage(ownedCards);
  };
  
  return (
    <>
      <button
        onClick={handleClick}
        data-locked={!isOwned}
        className='absolute inset-0 flex cursor-pointer flex-col items-center justify-center text-lg font-bold text-white'
      >
        {!isOwned && (
          <Image
            src='/icons/lock.svg'
            width={50}
            height={50}
            className='mb-2'
            alt='Not Owned'
          />
        )}
      </button>
      {!isOwned && link && (
        <a
          className='exclude-from-download absolute bottom-4 left-4 rounded-xl bg-red-500 p-2 leading-none text-white hover:bg-red-600'
          href={link}
          target='_blank'
          rel='noopener noreferrer'
        >
          YT
        </a>
      )}
    </>
  );
};

export default Overlay;
