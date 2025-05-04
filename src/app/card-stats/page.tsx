import getGoogleSheet from '@/api/getGoogleSheet';
import { StatsType } from '@/common/types';
import TotalPerLIChart from './components/TotalPerLIChart';
import TotalVsOwnedChart from './components/TotalVsOwnedChart';
export const revalidate = 60;

export const dynamicParams = false;

export default async function CardStats() {
  const sheetData = await getGoogleSheet('level-info'); // Format the data assuming the first row contains keys
  const values = sheetData.data.values || [];
  const keys = values[0];
  const statsData = values.slice(1).map((row) => {
    const obj = {} as StatsType;
    keys.forEach((key, index) => {
      obj[key] = row[index];
    });
    return obj;
  });

  const owned = statsData?.filter((card) => card.owned === 'TRUE');

  return (
    <div className='flex min-h-screen min-w-fit gap-16 bg-blue-100 p-20 font-[family-name:var(--font-noto-sans)]'>
      <main
        className='flex w-full min-w-236 flex-col gap-4 border-2 bg-white text-center'
        style={{ minHeight: 'calc(100vh - 160px)' }}
      >
        <h1 className='text-2xl'>Stats Dashboard</h1>
        <div className='grid grid-cols-2 gap-4 text-center align-middle'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <h3>Total Cards: {statsData?.length}</h3>
            <div className='flex max-h-[500px] w-full flex-grow items-center justify-center'>
              <TotalPerLIChart cards={statsData} />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center gap-4'>
            <h3>Total Owned: {owned?.length}</h3>
            <div className='flex max-h-[500px] w-full flex-grow items-center justify-center'>
              <TotalPerLIChart cards={owned} />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <TotalVsOwnedChart cards={statsData} />
          </div>
        </div>
      </main>
    </div>
  );
}
