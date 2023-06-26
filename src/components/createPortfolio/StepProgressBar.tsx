import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';
import { STEP } from '@src/constants/createPortfolioConstants';

interface StepProgressBarProps {
  currentStep: string;
}

const StepProgressBar = ({ currentStep }: StepProgressBarProps) => {
  const [progressBarRatio, setProgressBarRatio] = useState<number>(0);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);

  const getWidthRatio = (step: number) => {
    return Math.floor((step / 8) * 100);
  };

  useEffect(() => {
    switch (currentStep) {
      case STEP.ONE:
        setProgressBarRatio(0);
        break;
      case STEP.TWO:
        setProgressBarRatio(getWidthRatio(1));
        break;
      case STEP.THREE:
        setProgressBarRatio(getWidthRatio(2));
        break;
      case STEP.FOUR:
        setProgressBarRatio(getWidthRatio(3));
        break;
      case STEP.FIVE:
        setProgressBarRatio(getWidthRatio(4));
        break;
      case STEP.SIX:
        setProgressBarRatio(getWidthRatio(5));
        break;
      case STEP.SEVEN:
        setProgressBarRatio(getWidthRatio(6));
        break;
      case STEP.EIGHT:
        setProgressBarRatio(getWidthRatio(7));
        break;
      case STEP.NINE:
        setProgressBarRatio(getWidthRatio(8));
        break;
      default:
        break;
    }
  }, [currentStep]);

  return (
    <StBackgroundBar isdarkmode={`${isDarkMode}`}>
      <StProgressBar width={`${progressBarRatio}%`} />
    </StBackgroundBar>
  );
};

const StBackgroundBar = styled.div<{ isdarkmode: string }>`
  position: fixed;
  width: calc(100% - 270px);
  bottom: 0;
  height: 13px;
  background-color: ${({ theme, isdarkmode }) =>
    isdarkmode === 'true' ? theme.color.fontColor : theme.color.gray};
`;

const StProgressBar = styled.div<{ width: string }>`
  position: relative;
  background-color: ${({ theme }) => theme.color.neonGreen};
  width: ${({ width }) => width};
  transition: 1s;
  height: 13px;
`;

export default StepProgressBar;
