'use client';

import React from 'react';
import { toJpeg } from 'html-to-image';

const DownloadBtn = () => {

const filter = (node: HTMLElement) => {
  const exclusionClasses = ['exclude-from-download', 'hidden'];
    return !exclusionClasses.some((classname) => node.classList?.contains(classname));
  };
  const handleDownload = () => {
    const element = document.querySelector('main');
    if (element) {
      toJpeg(element, { filter }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <button
      className='fixed right-8 bottom-8 cursor-pointer rounded-full bg-sky-950 p-4 text-white transition-colors hover:bg-sky-800'
      onClick={handleDownload}
    >
      Download
    </button>
  );
};
export default DownloadBtn;
