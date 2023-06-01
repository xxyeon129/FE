import { useState } from 'react';
import Step01Intro from '@src/components/createPortfolio/createStep/Step01Intro';
import Step02CategoryFilter from '@src/components/createPortfolio/createStep/Step02CategoryFilter';
import { STEP } from '@src/constants/createPortfolioConstants';
import Step03Title from '@src/components/createPortfolio/createStep/Step03Title';
import Step04PersonalInfo from '@src/components/createPortfolio/createStep/Step04PersonalInfo';

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
          stepThree: <Step03Title onNextButtonClick={nextStep} />,
          stepFour: <Step04PersonalInfo onNextButtonClick={nextStep} />,
        }[step]
      }
    </>
  );
};

export default CreatePortfolio;
