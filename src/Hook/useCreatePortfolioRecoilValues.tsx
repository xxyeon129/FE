import { useRecoilValue } from 'recoil';
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

const useCreatPortfolioRecoilValues = () => {
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

  return {
    portfolioTitle,
    category,
    filter,
    email,
    residence,
    location,
    telephone,
    techStackArray,
    projectIdList,
    experience,
    githubId,
    youtubeUrl,
    blogUrl,
  };
};

export default useCreatPortfolioRecoilValues;
