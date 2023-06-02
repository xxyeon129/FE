import { useState } from 'react';
import { STEP } from '@src/constants/createPortfolioConstants';
import Step01Intro from '@src/components/createPortfolio/createStep/Step01Intro';
import Step02CategoryFilter from '@src/components/createPortfolio/createStep/Step02CategoryFilter';
import Step03Title from '@src/components/createPortfolio/createStep/Step03Title';
import Step04PersonalInfo from '@src/components/createPortfolio/createStep/Step04PersonalInfo';
import Step05TechStack from '@src/components/createPortfolio/createStep/Step05TechStack';
import Step06Project from '@src/components/createPortfolio/createStep/Step06Project';
import Step07Introduce from '@src/components/createPortfolio/createStep/Step07Introduce';
import Step08Link from '@src/components/createPortfolio/createStep/Step08Link';
import Step09Image from '@src/components/createPortfolio/createStep/Step09Image';

const CreatePortfolio = () => {
  const [step, setStep] = useState(STEP.ONE);

  const nextStep = (step: string) => {
    setStep(step);
  };

  const prevStep = (step: string) => {
    setStep(step);
  };

  return (
    <>
      {
        {
          stepOne: <Step01Intro onNextButtonClick={nextStep} />,
          stepTwo: (
            <Step02CategoryFilter onNextButtonClick={nextStep} onPrevButtonClick={prevStep} />
          ),
          stepThree: <Step03Title onNextButtonClick={nextStep} onPrevButtonClick={prevStep} />,
          stepFour: (
            <Step04PersonalInfo onNextButtonClick={nextStep} onPrevButtonClick={prevStep} />
          ),
          stepFive: <Step05TechStack onNextButtonClick={nextStep} onPrevButtonClick={prevStep} />,
          stepSix: <Step06Project onNextButtonClick={nextStep} onPrevButtonClick={prevStep} />,
          stepSeven: <Step07Introduce onNextButtonClick={nextStep} onPrevButtonClick={prevStep} />,
          stepEight: <Step08Link onNextButtonClick={nextStep} onPrevButtonClick={prevStep} />,
          stepNine: <Step09Image onPrevButtonClick={prevStep} />,
        }[step]
      }
    </>
  );
};

export default CreatePortfolio;
