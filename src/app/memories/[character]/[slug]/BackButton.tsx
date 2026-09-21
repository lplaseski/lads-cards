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
      className='absolute top-8 left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white drop-shadow hover:bg-white/10'
    >
      <svg
        viewBox='0 0 20 20'
        className='h-6 w-6 fill-none stroke-current'
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
