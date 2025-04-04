import React, { useEffect } from 'react';

interface ModalProps {
  videoUrl: string;
  onClose: () => void;
}

const Modal = ({ videoUrl, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50' onClick={onClose} />
      <div className='max-h-3xl relative aspect-video w-full max-w-5xl rounded-lg bg-white p-9 shadow-lg'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className='absolute top-3 right-4 cursor-pointer text-gray-500 hover:text-gray-800'
        >
          ✕
        </button>
        <div className='h-full w-full'>
          <iframe
            src={videoUrl}
            title='YouTube Video'
            className='h-full w-full'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Modal;
