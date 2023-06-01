import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import { StContainer } from '@src/components/common/createPortfolio/createStepStyles';

const Step08Image = () => {
  const onSubmitData = () => {
    console.log('click');
  };

  return (
    <StContainer>
      STEP 8
      <NextStepButton onClick={onSubmitData} />
    </StContainer>
  );
};

export default Step08Image;
