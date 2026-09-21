export default function Loading() {
  return (
    <div className='min-h-screen bg-[#d9d7de]'>
      <div className='mx-auto flex min-h-screen w-full max-w-[480px] items-center justify-center bg-[#1c1622] shadow-2xl'>
        <div className='h-10 w-10 animate-spin rounded-full border-2 border-[#d8b878]/30 border-t-[#d8b878]' />
      </div>
    </div>
  );
}
