'use client';

import { StatsType } from '@/common/types';
import {
  Chart as ChartJS,
  Tooltip,
  BarElement,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { LOVE_INTERESTS } from '../constants';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface TotalPerLIProps {
  cards: StatsType[];
}
export default function TotalVsOwnedChart({ cards }: TotalPerLIProps) {
  const totalsPerLI = cards?.length
    ? cards.reduce(
        (acc, curr) => {
          const { character } = curr;
          if (!character) return acc;

          if (!acc[character]) {
            acc[character] = {
              owned: 0,
              total: 0,
            };
          }

          acc[character].total += 1;
          if (curr.owned === 'TRUE') {
            acc[character].owned += 1;
          }
          return acc;
        },
        {} as Record<string, Record<string, number>>
      )
    : {};

  const cardsPerLI = {
    labels: Array.from(LOVE_INTERESTS),
    datasets: [
      {
        label: 'Owned',
        data: LOVE_INTERESTS.map((li) => totalsPerLI[li].owned),
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
      },
      {
        label: 'Total',
        data: LOVE_INTERESTS.map((li) => totalsPerLI[li].total),
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)'],
      },
    ],
  };

  return (
    <Bar
      data={cardsPerLI}
      options={{
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Total vs Owned',
          },
        },
      }}
    />
  );
}
