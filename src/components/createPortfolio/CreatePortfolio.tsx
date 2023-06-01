import useCreatePortfolioInput from '@src/Hook/useCreatePortfolioInput';
import { createPortfolio } from '@src/apis/portfolio';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SelectDropdown from './CreateSelectDropdown';
import CreatePortfolioFilter from './CreatePortfolioFilter';
import { categoryList } from '@src/constants/portfolioFilteringData';
import TechStackTag from './TechStackTag';
import TestCreateProjectModal from './TestCreateProjectModal';
import { useQuery, useQueryClient } from 'react-query';

interface ProjectDataType {
  id: number;
  title: string;
  term: string;
  people: string;
  position: string;
  projectImageList: { id: number; imageUrl: string }[];
  description: string;
}

const CreatePortfolio = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [techStack, setTechStack] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [projectList, setProjectList] = useState<ProjectDataType[]>([]);
  const [projectIdList, setProjectIdList] = useState<number[]>([]);

  const queryClient = useQueryClient();
  const projectData = queryClient.getQueryData('projectData') as ProjectDataType | null;

  useEffect(() => {
    if (projectData) {
      console.log(projectData);
      setProjectList(prevProject => [...prevProject, projectData]);
      setProjectIdList(prevProjectIds => [...prevProjectIds, projectData.id]);
    }
  }, [projectData]);

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

  const onClickCreateProjectButton = () => {
    setIsOpenModal(true);
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

      <StLabel htmlFor="techStack">기술 스택</StLabel>
      <TechStackTag setTechStackRequestData={setTechStack} />

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

      <StLabel htmlFor="project">Projects</StLabel>
      <StProjectsContainer>
        {projectList?.length !== 0 &&
          projectList.map(project => (
            <StProjectItem key={project.id}>
              <StProjectImg src={project.projectImageList[0].imageUrl} />
              <StProjectText>{project.title}</StProjectText>
              {/* TODO: 로그인 후 userId 확인 방법 생기면 회원조회로 profileImg, nickname 가져와서 추가 */}
            </StProjectItem>
          ))}
      </StProjectsContainer>
      <StButton type="button" onClick={onClickCreateProjectButton}>
        프로젝트 추가
      </StButton>

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

      {isOpenModal && (
        <StBackgroundModal>
          <TestCreateProjectModal setIsOpenModal={setIsOpenModal} />
        </StBackgroundModal>
      )}
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

const StProjectsContainer = styled.div`
  padding: 1rem;
  border: 1px solid;

  display: flex;
  gap: 1rem;
  flex-flow: wrap;
`;

const StProjectItem = styled.div`
  background-color: lightgray;
  padding: 1rem;
  width: 200px;
  height: 250px;
`;

const StProjectImg = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
`;

const StProjectText = styled.div`
  font-weight: bold;
  margin-top: 0.5rem;
`;

const StButton = styled.button`
  border: 1px solid;
  max-width: 100px;
  border-radius: 50px;
  margin-top: 5px;
`;

const StBackgroundModal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  background-color: rgba(0, 0, 0, 0.4);
`;

export default CreatePortfolio;
