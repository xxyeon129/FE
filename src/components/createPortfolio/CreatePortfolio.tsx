import useCreatePortfolioInput from '@src/Hook/useCreatePortfolioInput';
import { createPortfolio } from '@src/apis/portfolio';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SelectDropdown from './SelectDropdown';
import CreatePortfolioFilter from './CreatePortfolioFilter';
import { categoryList } from '@src/constants/portfolioFilteringData';
import TechStackTag from './TechStackTag';

const CreatePortfolio = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [techstack, setTechStack] = useState<string>('');

  const { inputData: portfolioTitle, onChangeInput: onChangeTitle } = useCreatePortfolioInput();
  const { inputData: residence, onChangeInput: onChangeResidence } = useCreatePortfolioInput();
  const { inputData: telephone, onChangeInput: onChangeTelephone } = useCreatePortfolioInput();
  const { inputData: email, onChangeInput: onChangeEmail } = useCreatePortfolioInput();
  const { inputData: location, onChangeInput: onChangeLocation } = useCreatePortfolioInput();
  const { inputData: experience, onChangeInput: onChangeExperience } = useCreatePortfolioInput();
  const { inputData: githubId, onChangeInput: onChangeGithubId } = useCreatePortfolioInput();
  const { inputData: youtubeUrl, onChangeInput: onChangeYoutubeUrl } = useCreatePortfolioInput();
  const { inputData: blogUrl, onChangeInput: onChangeBlogUrl } = useCreatePortfolioInput();

  const categoryDropdownOptions = categoryList.slice(1);

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
      techstack,
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
      projectIdList: [],
    };

    formData.append(
      'portfolioRequestDto',
      new Blob([JSON.stringify(inputData)], { type: 'application/json' })
    );

    imageFile && formData.append('portfolioImage', imageFile);

    // TEST CODE
    console.log(inputData);

    return formData;
  };

  const onSubmitFormData = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = handleFormData();

    // console.log(...formData);

    try {
      createPortfolio(formData);
    } catch (error) {
      console.log('CreatePortfolio catch error: ', error);
    }
  };

  // TEST CODE
  const testData = () => {
    handleFormData();
  };

  useEffect(() => {
    if (imagePreview) {
      return () => URL.revokeObjectURL(imagePreview);
    }
  }, [imagePreview]);

  return (
    <StContainer>
      <StLabel htmlFor="portfolioTitle">제목</StLabel>
      <StInput type="text" id="portfolioTitle" onChange={onChangeTitle}></StInput>

      <StLabel htmlFor="techstack">기술 스택</StLabel>
      <TechStackTag techstackRequestData={techstack} setTechStackRequestData={setTechStack} />

      <StLabel htmlFor="residence">거주지</StLabel>
      <StInput type="text" id="residence" onChange={onChangeResidence}></StInput>

      <StLabel htmlFor="location">희망 근무지역</StLabel>
      <StInput type="text" id="location" onChange={onChangeLocation}></StInput>

      <StLabel htmlFor="telephone">전화번호</StLabel>
      <StInput type="text" id="telephone" onChange={onChangeTelephone}></StInput>

      <StLabel htmlFor="email">이메일</StLabel>
      <StInput type="email" id="email" onChange={onChangeEmail}></StInput>

      <StLabel htmlFor="githubId">Github ID</StLabel>
      <StInput type="text" id="githubId" onChange={onChangeGithubId}></StInput>

      <StLabel htmlFor="experience">프로젝트 경험</StLabel>
      <StTextArea id="experience" onChange={onChangeExperience}></StTextArea>

      <StLabel htmlFor="youtubeUrl">Youtube Link</StLabel>
      <StInput type="text" id="youtubeUrl" onChange={onChangeYoutubeUrl}></StInput>

      <StLabel htmlFor="blogUrl">Blog Link</StLabel>
      <StInput type="text" id="blogUrl" onChange={onChangeBlogUrl}></StInput>

      <StLabel htmlFor="category">Category</StLabel>
      <SelectDropdown
        dropdownOptions={categoryDropdownOptions}
        selectBarDefaultText="--카테고리 선택--"
        selectedOption={category}
        setSelectedOption={setCategory}
      />

      <StLabel htmlFor="filter">Filter</StLabel>
      <CreatePortfolioFilter
        category={category}
        selectedFilter={filter}
        setSelectedFilter={setFilter}
      />

      <StImageContainer>
        <StPreviewImage src={imagePreview} />
        <StLabel htmlFor="portfolioImage">포트폴리오 대표 이미지 등록</StLabel>
        <StInput type="file" accept="image/*" id="portfolioImage" onChange={onUploadImage} />
      </StImageContainer>

      {/* TEST CODE */}
      <button type="button" onClick={testData}>
        TEST
      </button>

      <button type="submit" onClick={onSubmitFormData}>
        Submit
      </button>
    </StContainer>
  );
};

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StLabel = styled.label`
  font-weight: bold;
  margin-top: 10px;
`;

const StInput = styled.input``;

const StTextArea = styled.textarea``;

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
