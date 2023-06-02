import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import {
  createBlogState,
  createCategoryState,
  createEmailState,
  createExperienceState,
  createFilterState,
  createGithubState,
  createLocationState,
  createProjectIdListState,
  createResidenceState,
  createTechStackState,
  createTelephoneState,
  createTitleState,
  createYoutubeState,
} from '@src/states';
import { useRecoilValue } from 'recoil';

const Step09Image = () => {
  const portfolioTitle = useRecoilValue(createTitleState);
  const category = useRecoilValue(createCategoryState);
  const filter = useRecoilValue(createFilterState);
  const email = useRecoilValue(createEmailState);
  const residence = useRecoilValue(createResidenceState);
  const location = useRecoilValue(createLocationState);
  const telephone = useRecoilValue(createTelephoneState);
  const techStackArray = useRecoilValue(createTechStackState);
  const projectIdList = useRecoilValue(createProjectIdListState);
  const experience = useRecoilValue(createExperienceState);
  const githubId = useRecoilValue(createGithubState);
  const youtubeUrl = useRecoilValue(createYoutubeState);
  const blogUrl = useRecoilValue(createBlogState);

  const techStack = techStackArray.toString();

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
      projectIdList,
      experience,
      githubId,
      youtubeUrl,
      blogUrl,
    };

    console.log(testObj);
  };

  return (
    <S.Container>
      STEP 9
      <NextStepButton onClick={onSubmitData} />
    </S.Container>
  );
};

export default Step09Image;
