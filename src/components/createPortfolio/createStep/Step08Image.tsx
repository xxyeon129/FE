import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import { StContainer } from '@src/components/common/createPortfolio/createStepStyles';
import { createCategoryState, createFilterState, createTitleState } from '@src/states';
import { useRecoilValue } from 'recoil';

const Step08Image = () => {
  const portfolioTitle = useRecoilValue(createTitleState);
  const category = useRecoilValue(createCategoryState);
  const filter = useRecoilValue(createFilterState);
  // const residence = useRecoilValue()
  // const location = useRecoilValue()
  // const telephone = useRecoilValue()
  // const email = useRecoilValue()
  // const techStack = useRecoilValue()
  // const projectIdList = useRecoilValue()
  // const experience = useRecoilValue()
  // const githubId = useRecoilValue()
  // const youtubeUrl = useRecoilValue()
  // const blogUrl = useRecoilValue()

  const onSubmitData = () => {
    console.log(`portfolioTitle: ${portfolioTitle}, category: ${category}, filter: ${filter}`);
  };

  return (
    <StContainer>
      STEP 8
      <NextStepButton onClick={onSubmitData} />
    </StContainer>
  );
};

export default Step08Image;
