'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { hasGalleryHistory } from '@/common/galleryHistory';

const BackButton = () => {
  const router = useRouter();

  return (
    <Link
      href='/'
      aria-label='Back to memories'
      onClick={(e) => {
        if (!hasGalleryHistory()) return;
        e.preventDefault();
        router.back();
      }}
      className='absolute top-8 left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:bg-black/45'
    >
      <svg
        viewBox='0 0 20 20'
        className='h-6 w-6 fill-none stroke-current drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M12.5 4l-6 6 6 6M9 7l-3 3 3 3' />
      </svg>
    </Link>
  );
};

export default BackButton;
