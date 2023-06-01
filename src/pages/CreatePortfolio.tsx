import { useState } from 'react';
import StepOneIntro from '@src/components/createPortfolio/createStep/StepOneIntro';
import StepTwoCategoryFilter from '@src/components/createPortfolio/createStep/StepTwoCategoryFilter';
import { STEP } from '@src/constants/createPortfolioConstants';

const CreatePortfolio = () => {
  const [step, setStep] = useState(STEP.ONE);

  const nextStep = (step: string) => {
    setStep(step);
  };

  return (
    <>
      {
        {
          stepOne: <StepOneIntro onNextButtonClick={nextStep} />,
          stepTwo: <StepTwoCategoryFilter onNextButtonClick={nextStep} />,
        }[step]
      }
    </>
  );
};

export default CreatePortfolio;
