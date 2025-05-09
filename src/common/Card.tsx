import React from 'react';
import { CardType } from './types';
import Image from 'next/image';
import Overlay from './Overlay';

const Card = ({ name, type, stellacrum, character, yt_video }: CardType) => {
  let folder = 'limited';
  if (type === 'standard') {
    folder = 'standard';
  } else if (type?.includes('myth')) {
    folder = 'myths';
  } else if (type === 'four-star') {
    folder = 'four-star';
  }

  const extension = type === 'four-star' ? 'png' : 'jpeg';

  const url = `/${folder}/${character}_${encodeURIComponent((name || '').replaceAll(' ', '_').replaceAll("'", ''))}.${extension}`;

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='relative h-55 w-40 overflow-hidden rounded-md'>
        <Overlay name={name || ''} link={yt_video || ''} showWanted showOwned />
        <Image
          className='peer-data-[locked=true]:grayscale-85'
          alt={name || ''}
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
          src={`/stella/${stellacrum}.svg`}
        />
      </div>
      <p className='text-center font-medium'>{name}</p>
    </div>
  );
};

export default Card;
