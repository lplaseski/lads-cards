'use client';

import React, { useCallback, useState } from 'react';
import Modal from '@/common/YoutubeModal';
import { getVideoUrl } from '@/common/cardUtils';

const VideoCircle = ({ url }: { url: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <div className='flex flex-col items-center gap-3'>
      <button
        onClick={toggle}
        aria-label='Play video'
        className='group relative mb-3 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#f3dfae] via-[#9b7a45] to-[#f6e7c0] p-[2px] shadow-[0_0_30px_rgba(216,184,120,0.25)]'
      >
        <span className='absolute -inset-3 rounded-full border border-white/15' />
        <span className='flex h-full w-full flex-col items-center justify-center gap-1 rounded-full bg-[radial-gradient(circle_at_50%_30%,#4a3d4f,#1c1622_70%)] transition-colors group-hover:bg-[radial-gradient(circle_at_50%_30%,#5a4a5f,#231b2a_70%)]'>
          <svg viewBox='0 0 24 24' className='ml-1 h-10 w-10 fill-[#f1dca4]'>
            <path d='M8 5v14l11-7z' />
          </svg>
          <span className='font-serif text-xs tracking-[0.2em] text-white/80 uppercase'>
            Watch
          </span>
        </span>
      </button>
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-[11px] tracking-widest text-white/50 uppercase hover:text-white/80'
      >
        Open on YouTube ↗
      </a>
      {isOpen && <Modal videoUrl={getVideoUrl(url)} onClose={toggle} />}
    </div>
  );
};

export default VideoCircle;
