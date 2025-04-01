import React from 'react';
import { CardType } from './types';
import Image from 'next/image';

const Card = ({
  name,
  stellacrum,
  character,
}: CardType) => {
  const url = `/myths/${character}_${encodeURIComponent(name.replaceAll(' ', '_').replaceAll("'", ''))}.jpeg`;
  return (
    <div className='relative h-53 w-40 text-white'>
      <Image alt='' src={url} fill style={{ objectFit: 'cover' }} />
      <Image
        className='absolute top-1 left-1'
        alt=''
        height={25}
        width={25}
        src={`/stella/${stellacrum}.png`}
      />
    </div>
  );
};

export default Card;
