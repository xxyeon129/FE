import { getAllChart } from '@src/apis/chart';
import { ChartDataType } from '@src/types/chartDataType';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { css, styled } from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AllChartProps {
  setClickType: React.Dispatch<React.SetStateAction<string>>;
  clickType: string;
  allChartData: ChartDataType;
}

const AllChart = ({ setClickType, clickType, allChartData }: AllChartProps) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [count, setCount] = useState<number[]>([]);

  const [options, setOptions] = useState({
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (context: string) => {
            return ['차트 상세보기'];
          },
        },
      },
    },
  });

  const chartRef = useRef(null);
  const onClickChart = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const clickIndex = getElementAtEvent(chartRef.current, event)[0].index;
      switch (clickIndex) {
        case 0:
          setClickType('develop');
          break;
        case 1:
          setClickType('design');
          break;
        case 2:
          setClickType('photographer');
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const labelsData: string[] = Object.keys(allChartData).slice(1);
    const countData: number[] = Object.values(allChartData);

    setLabels(labelsData);
    setCount(countData);
  }, [allChartData]);

  useEffect(() => {
    setOptions(prevState => ({ ...prevState, maintainAspectRatio: true }));
  }, [clickType]);

  const data = {
    labels,
    datasets: [
      {
        label: 'portfolio',
        data: count,
        backgroundColor: ['#45BE59', '#5FF6D2', '#99E7FF'],
        borderColor: ['transparent'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <StBarChart
      //@ts-ignore
      options={options}
      data={data}
      ref={chartRef}
      onClick={onClickChart}
      isclicked={clickType}
    />
  );
};

const StBarChart = styled(Bar)<{ isclicked: string }>`
  width: 100%;
  height: 100%;

  @media screen and (max-width: 550px) {
    padding: 10px;
  }
`;

export default AllChart;
