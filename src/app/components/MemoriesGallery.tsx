'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES, CHARACTERS } from '@/common/cardUtils';
import { GalleryCard, getCardHref } from '@/common/galleryCards';
import { Stars, TimeIcon } from '@/common/MemoryIcons';

type SortKey = 'release' | 'name';

const ACTIVE_TAB_CLASSES =
  'bg-gradient-to-b from-[#3a4456] to-[#232b38] text-white shadow-[0_6px_10px_-4px_rgba(20,25,40,0.5)] after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:bg-[#d8b878]';

const MemoryTile = ({
  card,
  priority,
}: {
  card: GalleryCard;
  priority: boolean;
}) => (
  <Link
    href={getCardHref(card)}
    className='group flex cursor-pointer flex-col items-center gap-1.5 text-center'
  >
    <div className='w-full bg-gradient-to-b from-[#f6e7b8] via-[#c9a462] to-[#f1dca4] p-[2px] shadow-[0_3px_8px_rgba(60,50,80,0.25)]'>
      <div className='relative aspect-square w-full overflow-hidden bg-slate-800'>
        <Image
          alt={card.name}
          src={card.imageUrl}
          fill
          priority={priority}
          sizes='(max-width: 480px) 33vw, 150px'
          className='object-cover object-[center_15%] transition-transform duration-300 group-active:scale-95'
        />
        <div className='absolute inset-x-0 bottom-0 flex h-1/3 items-end justify-between bg-gradient-to-t from-black/70 to-transparent px-1 pb-1'>
          <TimeIcon time={card.time} />
          <Stars />
        </div>
        {card.stellacrum && (
          <Image
            alt=''
            width={22}
            height={22}
            src={`/stella/${card.stellacrum}.svg`}
            className='absolute top-1 left-1 drop-shadow'
          />
        )}
      </div>
    </div>
    <p className='line-clamp-2 text-[13px] leading-tight text-slate-700'>
      {card.character}: {card.name}
    </p>
  </Link>
);

const CharacterTab = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`relative w-full cursor-pointer py-2 font-serif text-[17px] font-bold tracking-wide transition-colors ${active ? ACTIVE_TAB_CLASSES : 'text-slate-700'} hover:bg-slate-200`}
  >
    {label}
  </button>
);

const MemoriesGallery = ({ cards }: { cards: GalleryCard[] }) => {
  const [character, setCharacter] = useState<string | null>(null);
  const [category, setCategory] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('release');
  const [descending, setDescending] = useState(true);

  const visibleCards = useMemo(() => {
    const filtered = cards.filter(
      (c) =>
        (!character || c.character === character) &&
        (category === 'all' || c.category === category)
    );
    const sorted = filtered.sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      return (
        a.releaseDate.localeCompare(b.releaseDate) ||
        a.order - b.order ||
        a.name.localeCompare(b.name)
      );
    });
    return descending ? sorted.reverse() : sorted;
  }, [cards, character, category, sortKey, descending]);

  return (
    <div className='min-h-screen bg-[#d9d7de] text-center font-[family-name:var(--font-noto-sans)]'>
      <div className='relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col overflow-hidden bg-gradient-to-b from-[#f7f6f9] via-[#eeedf2] to-[#e4e2ea] shadow-2xl'>
        <div className='pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,196,214,0.55),transparent_70%)]' />
        <div className='pointer-events-none absolute top-40 -left-24 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(190,215,255,0.45),transparent_70%)]' />

        <header className='relative flex items-start justify-end px-6 pt-10 pb-4'>
          <div className='flex flex-col items-end'>
            <h1 className='text-4xl font-medium tracking-tight text-slate-700'>
              Memories
            </h1>
            <span
              aria-hidden
              className='-mt-3 scale-y-[-1] text-4xl font-medium tracking-tight text-slate-700 opacity-15 [mask-image:linear-gradient(to_top,black,transparent_70%)]'
            >
              Memories
            </span>
          </div>
        </header>

        <nav className='relative flex items-stretch border-b border-slate-300/70 bg-white/30 pr-4 backdrop-blur-sm'>
          <button
            onClick={() => setCharacter(null)}
            className={`relative flex cursor-pointer items-center gap-2 px-5 font-serif text-[17px] font-bold tracking-wide transition-colors ${character === null ? ACTIVE_TAB_CLASSES : 'text-slate-700'} hover:bg-slate-200`}
          >
            <svg
              viewBox='0 0 20 20'
              className='h-5 w-5 fill-none stroke-current'
              strokeWidth='1.5'
            >
              <rect x='2' y='2' width='6.5' height='6.5' rx='1' />
              <rect x='11.5' y='2' width='6.5' height='6.5' rx='1' />
              <rect x='2' y='11.5' width='6.5' height='6.5' rx='1' />
              <rect x='11.5' y='11.5' width='6.5' height='6.5' rx='1' />
            </svg>
            ALL
          </button>
          <div className='my-3 w-px bg-slate-300' />
          <div className='grid flex-1 grid-cols-3 pl-3'>
            {CHARACTERS.map((name, i) => (
              <div
                key={name}
                className={i < 3 ? 'border-b border-slate-300' : ''}
              >
                <CharacterTab
                  label={name}
                  active={character === name}
                  onClick={() => setCharacter(name)}
                />
              </div>
            ))}
          </div>
        </nav>

        <div className='relative flex items-center justify-end gap-2 px-4 pt-4 pb-3'>
          <button
            onClick={() => setDescending((d) => !d)}
            aria-label={descending ? 'Sort ascending' : 'Sort descending'}
            className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white/60 text-slate-600 hover:border-slate-600 hover:bg-white/25'
          >
            <svg
              viewBox='0 0 20 20'
              className={`h-5 w-5 fill-none stroke-current transition-transform ${descending ? '' : 'rotate-180'}`}
              strokeWidth='1.6'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M6 3v14M3 14l3 3 3-3M14 17V3M11 6l3-3 3 3' />
            </svg>
          </button>
          <PillSelect
            label='Category'
            value={category}
            onChange={setCategory}
            options={[
              { value: 'all', label: 'All Types' },
              ...CATEGORIES.map((c) => ({ value: c, label: c })),
            ]}
          />
          <PillSelect
            label='Sort by'
            value={sortKey}
            onChange={(v) => setSortKey(v as SortKey)}
            options={[
              { value: 'release', label: 'Release' },
              { value: 'name', label: 'Name' },
            ]}
          />
        </div>

        <main className='relative flex-1 px-4 pb-8'>
          {visibleCards.length ? (
            <div className='grid grid-cols-3 gap-x-3 gap-y-4'>
              {visibleCards.map((card, i) => (
                <MemoryTile
                  key={`${card.character}-${card.name}`}
                  card={card}
                  priority={i < 9}
                />
              ))}
            </div>
          ) : (
            <p className='py-20 text-center font-serif text-slate-500'>
              No memories match these filters.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

const PillSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) => (
  <label className='relative'>
    <span className='sr-only'>{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='h-10 cursor-pointer appearance-none rounded-full border border-slate-300 bg-white/60 pr-9 pl-4 font-serif text-[15px] font-bold text-slate-600 outline-none hover:border-slate-600 hover:bg-white/25'
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    <svg
      viewBox='0 0 20 20'
      className='pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 fill-none stroke-slate-500'
      strokeWidth='1.8'
      strokeLinecap='round'
    >
      <path d='M5 8l5 5 5-5' />
    </svg>
  </label>
);

export default MemoriesGallery;
