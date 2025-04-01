'use client';

import React from 'react';
import { toPng } from 'html-to-image';

const DownloadBtn = () => {
    const handleDownload = () => {
        const element = document.querySelector('main');
          if (element) {
            toPng(element, { cacheBust: true, }).then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
            })
          }
        }
    

    return (
    <button
        className='fixed bottom-8 right-8 rounded-full bg-sky-950 p-4 text-white'
        onClick={handleDownload}
      >
        Download
      </button>
    )
}
export default DownloadBtn;