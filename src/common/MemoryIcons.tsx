export const Stars = ({
  className = 'text-[11px]',
}: {
  className?: string;
}) => (
  <span
    className={`leading-none tracking-[-1px] text-white [text-shadow:0_0_3px_rgba(255,214,120,0.9)] ${className}`}
  >
    ★★★★★
  </span>
);

export const TimeIcon = ({
  time,
  className = 'h-6 w-6',
}: {
  time?: string;
  className?: string;
}) => {
  if (time === 'solar') {
    return (
      <svg viewBox='0 0 24 24' className={`fill-amber-100 ${className}`}>
        <circle cx='12' cy='12' r='4.5' />
        <path
          d='M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1'
          className='stroke-amber-100'
          strokeWidth='1.8'
          strokeLinecap='round'
        />
      </svg>
    );
  }
  if (time === 'lunar') {
    return (
      <svg viewBox='0 0 24 24' className={`fill-amber-100 ${className}`}>
        <path d='M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z' />
      </svg>
    );
  }
  return null;
};
