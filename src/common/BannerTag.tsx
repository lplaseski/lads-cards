import React from 'react';

interface TagProps {
  children: React.ReactNode;
}

const Tag = ({ children }: TagProps) => (
  <div className='flex w-10 items-center justify-center rounded-3xl bg-sky-950 font-serif text-xl text-white uppercase'>
    <span className='rotate-270 whitespace-nowrap'>{children}</span>
  </div>
);

export default Tag;
