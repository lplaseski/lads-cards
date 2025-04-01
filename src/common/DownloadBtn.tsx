'use client';

import React, { useState } from 'react';
import { toJpeg } from 'html-to-image';

const DownloadBtn = () => {
  const [loading, setLoadiing] = useState(false);
  const filter = (node: HTMLElement) => {
    const exclusionClasses = ['exclude-from-download', 'hidden'];
    return !exclusionClasses.some((classname) =>
      node.classList?.contains(classname)
    );
  };
  const handleDownload = () => {
    const element = document.querySelector('main');
    if (element) {
      setLoadiing(true);
      toJpeg(element, { filter })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'lads-cards.jpeg';
          link.href = dataUrl;
          link.click();
          setLoadiing(false);
        })
        .catch((error) => {
          console.error('Error downloading image:', error);
          setLoadiing(false);
        });
    }
  };

  return (
    <button
      disabled={loading}
      type='button'
      className='fixed right-8 bottom-8 cursor-pointer rounded-full bg-sky-950 p-4 text-white transition-colors hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400'
      onClick={handleDownload}
    >
      {loading ? 'Generating...' : 'Download Image'}
    </button>
  );
};
export default DownloadBtn;
