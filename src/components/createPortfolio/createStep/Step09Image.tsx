import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
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
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { createPortfolio } from '@src/apis/portfolio';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';

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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const isNoImageFile = imageFile === null;

  const navigate = useNavigate();

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);
    }
  };

  const handleFormData = () => {
    const formData = new FormData();
    const inputData = {
      portfolioTitle,
      techStack,
      residence,
      location,
      telephone,
      email,
      githubId,
      experience,
      youtubeUrl,
      blogUrl,
      category,
      filter,
      projectIdList,
    };

    formData.append(
      'portfolioRequestDto',
      new Blob([JSON.stringify(inputData)], { type: 'application/json' })
    );

    imageFile && formData.append('portfolioImage', imageFile);

    // TEST CODE
    // console.log(...formData);

    return formData;
  };

  const onSubmitFormData = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = handleFormData();

    try {
      await createPortfolio(formData);
      alert('TEST ALERT: 포트폴리오 작성 완료');
      navigate(PATH_URL.MAIN);
    } catch (error) {
      if (isNoImageFile) alert('TEST ALERT: 이미지를 추가해주세요!');
      console.log('CreatePortfolio catch error: ', error);
    }
  };

  useEffect(() => {
    if (imagePreview) {
      return () => URL.revokeObjectURL(imagePreview);
    }
  }, [imagePreview]);

  const title = '마지막 단계입니다!';
  const description = '포트폴리오 대표 이미지를 등록해주세요.';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} />
      <StImageContainer>
        <StPreviewImg src={imagePreview} />
        <StInput type="file" accept="image/*" id="portfolioImage" onChange={onUploadImage} />
      </StImageContainer>
      <S.ButtonContainer>
        <NextStepButton onClick={onSubmitFormData} text="완료" notAllowed={`${isNoImageFile}`} />
      </S.ButtonContainer>
    </S.Container>
  );
};

const StImageContainer = styled.div`
  width: 600px;
`;

const StPreviewImg = styled.img`
  max-width: 100%;
  max-height: 250px;
  object-fit: contain;
`;

const StInput = styled.input``;

export default Step09Image;
