'use client';
import Image from 'next/image';
import React, { Fragment, useState } from 'react';

interface OverlayProps {
  link: string;
}

const Overlay = ({ link }: OverlayProps) => {
  const [isOwned, setIsOwned] = useState(false);

  return (
    <>
<button
    onClick={() => setIsOwned(!isOwned)}
    data-locked={!isOwned}
    className='absolute inset-0 flex flex-col items-center justify-center text-lg font-bold text-white cursor-pointer'
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
    {!isOwned && link && <a className="absolute bottom-4 left-4 bg-red-500 text-white rounded-xl p-2 hover:bg-red-600 leading-none" href={link} target='_blank' rel='noopener noreferrer'>YT</a>}
    </>
  );
};

export default Overlay;
