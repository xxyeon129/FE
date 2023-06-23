import { getAllChart } from '@src/apis/chart';
import { ThemeType } from '@src/style/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllChart = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [count, setCount] = useState<number[]>([]);

  const fetchChart = async () => {
    const data = await getAllChart();
    const labelsData: string[] = Object.keys(data).slice(1);
    const countData: number[] = Object.values(data);

    setLabels(labelsData);
    setCount(countData);
  };

  useEffect(() => {
    fetchChart();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'portfolio',
        data: count,
        backgroundColor: ['#45BE59', '#5FF6D2', '#99E7FF'],
        borderColor: ['transparent'],
        borderWidth: 40,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default AllChart;
