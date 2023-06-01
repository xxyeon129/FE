import { useState } from 'react';
import StepOneIntro from '@src/components/createPortfolio/createStep/StepOneIntro';
import StepTwoTitle from '@src/components/createPortfolio/createStep/StepTwoTitle';
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
          stepTwo: <StepTwoTitle onNextButtonClick={nextStep} />,
        }[step]
      }
    </>
  );
};

export default CreatePortfolio;
