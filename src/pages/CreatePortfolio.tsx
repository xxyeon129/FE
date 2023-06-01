import { useState } from 'react';
import Step01Intro from '@src/components/createPortfolio/createStep/Step01Intro';
import Step02CategoryFilter from '@src/components/createPortfolio/createStep/Step02CategoryFilter';
import { STEP } from '@src/constants/createPortfolioConstants';
import Step03TitleImage from '@src/components/createPortfolio/createStep/Step03TitleImage';

const CreatePortfolio = () => {
  const [step, setStep] = useState(STEP.ONE);

  const nextStep = (step: string) => {
    setStep(step);
  };

  return (
    <>
      {
        {
          stepOne: <Step01Intro onNextButtonClick={nextStep} />,
          stepTwo: <Step02CategoryFilter onNextButtonClick={nextStep} />,
          stepThree: <Step03TitleImage onNextButtonClick={nextStep} />,
        }[step]
      }
    </>
  );
};

export default CreatePortfolio;
