import { useResetRecoilState } from 'recoil';
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
  createProjectListState,
} from '@src/states';
import { useQueryClient } from 'react-query';

const useResetCreatePortfolioRecoilValues = () => {
  const resetPortfolioTitle = useResetRecoilState(createTitleState);
  const resetCategory = useResetRecoilState(createCategoryState);
  const resetFilter = useResetRecoilState(createFilterState);
  const resetEmail = useResetRecoilState(createEmailState);
  const resetResidence = useResetRecoilState(createResidenceState);
  const resetLocation = useResetRecoilState(createLocationState);
  const resetTelephone = useResetRecoilState(createTelephoneState);
  const resetTechStackArray = useResetRecoilState(createTechStackState);
  const resetProjectList = useResetRecoilState(createProjectListState);
  const resetProjectIdList = useResetRecoilState(createProjectIdListState);
  const resetIntro = useResetRecoilState(createExperienceState);
  const resetGithub = useResetRecoilState(createGithubState);
  const resetYoutube = useResetRecoilState(createYoutubeState);
  const resetBlog = useResetRecoilState(createBlogState);

  const queryClient = useQueryClient();

  const resetRecoilValues = () => {
    resetPortfolioTitle();
    resetCategory();
    resetFilter();
    resetEmail();
    resetResidence();
    resetLocation();
    resetTelephone();
    resetTechStackArray();
    resetProjectList();
    resetProjectIdList();
    resetIntro();
    resetGithub();
    resetYoutube();
    resetBlog();
    queryClient.setQueryData('projectData', null);
  };

  return resetRecoilValues;
};

export default useResetCreatePortfolioRecoilValues;
