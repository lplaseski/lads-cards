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
  } 
  
  const url = `/${folder}/${character}_${encodeURIComponent((name || '').replaceAll(' ', '_').replaceAll("'", ''))}.jpeg`;
  return (
    <div className='group relative h-53 w-40 text-white [&:has([data-locked="true"])_img]:grayscale-85'>
      <Image alt={name || ''} src={url} fill style={{ objectFit: 'cover' }} />
      <Image
        style={{ background: 'transparent' }}
        className='absolute top-1 left-1 bg-transparent'
        alt=''
        height={25}
        width={25}
        src={`/stella/${stellacrum}.svg`}
      />
      <Overlay name={name || ''} link={yt_video || ''} />
    </div>
  );
};

export default Card;
