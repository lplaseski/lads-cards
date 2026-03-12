import { headers } from 'next/headers'
import HomePage from './components/LadsCardsPage';
import MlqcPage from './mlqc/page';

export default async function Home() {
  const headersList = await headers()

   const host = headersList.get('host')
  
  if (host === 'www.mlqc-archive.com') {
    return <MlqcPage />
  }

  return <HomePage />
}
