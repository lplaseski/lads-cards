'use client';

import { StatsType } from '@/common/types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
  LOVE_INTERESTS,
  LOVE_INTERESTS_BORDER_COLORS,
  LOVE_INTERESTS_COLORS,
} from '../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TotalPerLIProps {
  cards: StatsType[];
}
export default function TotalPerLIChart({ cards }: TotalPerLIProps) {
  const totalsPerLI = cards?.length
    ? cards.reduce(
        (acc, curr) => {
          const { character } = curr;
          if (!character) return acc;

          if (!acc[character]) {
            acc[character] = 1;
          } else {
            acc[character] += 1;
          }
          return acc;
        },
        {} as Record<string, number>
      )
    : {};

  const cardsPerLI = {
    labels: Array.from(LOVE_INTERESTS),
    datasets: [
      {
        label: '# of Cards',
        data: LOVE_INTERESTS.map((li) => totalsPerLI[li]),
        backgroundColor: LOVE_INTERESTS.map((li) => LOVE_INTERESTS_COLORS[li]),
        borderColor: LOVE_INTERESTS.map(
          (li) => LOVE_INTERESTS_BORDER_COLORS[li]
        ),
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={cardsPerLI} options={{ responsive: true }} />;
}
