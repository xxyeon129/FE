import { getPhotographerChart } from '@src/apis/chart';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { styled } from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

const PhotographerChart = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [count, setCount] = useState<number[]>([]);

  const fetchPhotographerChart = async () => {
    const photographerData = await getPhotographerChart();
    const labelsData: string[] = Object.keys(photographerData);
    const countData: number[] = Object.values(photographerData);

    setLabels(labelsData);
    setCount(countData);
  };

  useEffect(() => {
    fetchPhotographerChart();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'portfolio',
        data: count,
        backgroundColor: [
          'rgba(153, 231, 255, 0.25)',
          'rgba(82, 182, 255, 0.25)',
          'rgba(0, 118, 227, 0.25)',
          'rgba(58, 66, 255, 0.25)',
          'rgba(187, 134, 255, 0.25)',
          'rgba(210, 83, 255, 0.25)',
        ],
        borderColor: ['#99E7FF', '#52B6FF', '#0076E3', '#3A42FF', '#BB86FF', '#D253FF'],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    // responsive: false,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return <StDoughutChart data={data} options={options} />;
};

const StDoughutChart = styled(Doughnut)`
  width: 100%;
`;

export default PhotographerChart;
