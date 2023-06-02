import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { createPortfolio } from '@src/apis/portfolio';
import { PATH_URL } from '@src/constants/constants';

import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import useCreatPortfolioRecoilValues from '@src/Hook/useCreatePortfolioRecoilValues';

const Step09Image = () => {
  const {
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
  } = useCreatPortfolioRecoilValues();

  const techStack = techStackArray.toString();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const navigate = useNavigate();

  const isNoImageFile = imageFile === null;

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

    return formData;
  };

  const onSubmitFormData = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = handleFormData();

    try {
      await createPortfolio(formData);
      alert('TEST ALERT: 포트폴리오 작성 완료');
      localStorage.removeItem('recoil-persist');
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
