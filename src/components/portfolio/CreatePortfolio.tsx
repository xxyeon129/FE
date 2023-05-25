import { createPortfolio } from '@src/apis/portfolio';
import { useState } from 'react';
import { styled } from 'styled-components';

const CreatePortfolio = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

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
      portfolioTitle: 'portfolioTitle',
      techstack: 'techstack',
      residence: 'residence',
      location: 'location',
      telephone: 'telephone',
      email: 'email',
      githubId: 'githubId',
      experience: 'experience',
      youtubeUrl: 'youtubeUrl',
      blogUrl: 'blogUrl',
      category: 'category',
      filter: 'filter',
    };

    formData.append(
      'portfolioRequestDto',
      new Blob([JSON.stringify(inputData)], { type: 'application/json' })
    );

    imageFile && formData.append('portfolioImage', imageFile);
    return formData;
  };

  const onSubmitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = handleFormData();

    // FormData key 확인
    for (let key of formData.keys()) {
      console.log('key => ', key);
    }

    // FormData value 확인
    for (let value of formData.values()) {
      console.log(value);
    }

    try {
      createPortfolio(formData);
    } catch (error) {
      console.log('CreatePortfolio catch error: ', error);
    }
  };

  return (
    <StForm onSubmit={onSubmitFormData}>
      <StLabel htmlFor="portfolioTitle">제목</StLabel>
      <StInput type="text" id="portfolioTitle"></StInput>

      <StLabel htmlFor="techstack">기술 스택</StLabel>
      <StInput type="text" id="techstack"></StInput>

      <StLabel htmlFor="residence">거주지</StLabel>
      <StInput type="text" id="residence"></StInput>

      <StLabel htmlFor="location">희망 근무지역</StLabel>
      <StInput type="text" id="location"></StInput>

      <StLabel htmlFor="telephone">전화번호</StLabel>
      <StInput type="text" id="telephone"></StInput>

      <StLabel htmlFor="email">이메일</StLabel>
      <StInput type="email" id="email"></StInput>

      <StLabel htmlFor="githubId">Github ID</StLabel>
      <StInput type="text" id="githubId"></StInput>

      <StLabel htmlFor="experience">프로젝트 경험</StLabel>
      <StInput type="text" id="experience"></StInput>

      <StLabel htmlFor="youtubeUrl">Youtube Link</StLabel>
      <StInput type="text" id="youtubeUrl"></StInput>

      <StLabel htmlFor="blogUrl">Blog Link</StLabel>
      <StInput type="text" id="blogUrl"></StInput>

      <StImageContainer>
        <StPreviewImage src={imagePreview} />
        <StLabel htmlFor="portfolioImage">포트폴리오 대표 이미지 등록</StLabel>
        <StInput type="file" accept="image/*" id="portfolioImage" onChange={onUploadImage} />
      </StImageContainer>

      <button>Submit</button>
    </StForm>
  );
};

const StForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StLabel = styled.label``;

const StInput = styled.input``;

const StImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StPreviewImage = styled.img`
  max-width: 100%;
  max-height: 250px;
  object-fit: contain;
`;

export default CreatePortfolio;
