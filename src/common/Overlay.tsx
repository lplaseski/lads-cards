'use client';

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from './YoutubeModal';

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
  const [isOwned, setIsOwned] = useState(false);
  const [isWanted, setIsWanted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsOwned(hasCard(name));
  }, [name]);

  const handleToggle = () => {
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

  const handleModalToggle = useCallback(() => {
    setIsModalOpen((v) => !v);
  }, []);

  return (
    <>
      <button
        onClick={handleToggle}
        data-locked={!isOwned}
        className='peer absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center text-lg font-bold text-white'
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
        {isWanted && !isOwned && (
          <div className='absolute top-7 left-[-35px] w-full rotate-[-45deg] bg-white text-black'>
            Wanted
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
      {!isOwned && (
        <label
          htmlFor={`wanted-${name.replaceAll(' ', '_')}`}
          className='exclude-from-download hover:bg-sky-6000 invisible absolute right-8 bottom-2 z-10 flex cursor-pointer items-center gap-2 rounded-md bg-sky-800 p-2 text-xs leading-none text-white peer-hover:visible hover:visible'
        >
          <input
            checked={isWanted}
            id={`wanted-${name.replaceAll(' ', '_')}`}
            type='checkbox'
            onChange={(e) => {
              e.stopPropagation();
              setIsWanted(!!e.target.checked);
            }}
          />{' '}
          <span>Set Wanted</span>
        </label>
      )}
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
