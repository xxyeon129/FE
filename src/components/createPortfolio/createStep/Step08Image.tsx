import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import { StContainer } from '@src/components/common/createPortfolio/createStepStyles';
import {
  createCategoryState,
  createEmailState,
  createFilterState,
  createLocationState,
  createResidenceState,
  createTechStack,
  createTelephoneState,
  createTitleState,
} from '@src/states';
import { useRecoilValue } from 'recoil';

const Step08Image = () => {
  const portfolioTitle = useRecoilValue(createTitleState);
  const category = useRecoilValue(createCategoryState);
  const filter = useRecoilValue(createFilterState);
  const email = useRecoilValue(createEmailState);
  const residence = useRecoilValue(createResidenceState);
  const location = useRecoilValue(createLocationState);
  const telephone = useRecoilValue(createTelephoneState);
  const techStack = useRecoilValue(createTechStack);
  // const projectIdList = useRecoilValue()
  // const experience = useRecoilValue()
  // const githubId = useRecoilValue()
  // const youtubeUrl = useRecoilValue()
  // const blogUrl = useRecoilValue()

  const onSubmitData = () => {
    const testObj = {
      portfolioTitle,
      category,
      filter,
      email,
      residence,
      location,
      telephone,
      techStack,
    };

    console.log(testObj);
  };

  return (
    <StContainer>
      STEP 8
      <NextStepButton onClick={onSubmitData} />
    </StContainer>
  );
};

export default Step08Image;
