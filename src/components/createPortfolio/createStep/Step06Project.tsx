import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useQueryClient } from 'react-query';
import { css, styled } from 'styled-components';

import { createProjectIdListState, createProjectListState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { ProjectDataType } from '@src/types/portfolioType';
import { STEP } from '@src/constants/createPortfolioConstants';
import { deleteProject } from '@src/apis/project';

import * as S from '@src/components/common/createPortfolio/createStepStyles';
import ProjectItem from '@src/components/project/ProjectItem';
import CreateProject from '@src/components/myProject/CreateProject';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';

const Step06Project = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [projectIdList, setProjectIdList] = useRecoilState<number[]>(createProjectIdListState);
  const [projectList, setProjectList] = useRecoilState<ProjectDataType[]>(createProjectListState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProjectExist, setIsProjectExist] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const projectData = queryClient.getQueryData('projectData') as ProjectDataType | null;

  const isProjectListExist = projectList.length !== 0;

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onClickdeleteProject = (id: number) => {
    deleteProject(id);
    const deletedList = projectList.filter(project => project.id !== id);
    setProjectList(deletedList);
    const deletedIdList = projectIdList.filter(projectId => projectId !== id);
    setProjectIdList(deletedIdList);
  };

  useEffect(() => {
    console.log('프로젝트 데이터 있니? => ', projectData);

    if (projectData) {
      setIsProjectExist(true);
      setProjectList(prevProject => [...prevProject, projectData]);
      setProjectIdList(prevProjectIds => [...prevProjectIds, projectData.id]);
    }
  }, [projectData]);

  useEffect(() => {
    console.log('이건 실행되냐??');

    isProjectListExist ? setIsProjectExist(true) : setIsProjectExist(false);
  }, [projectList]);

  console.log('projectData => ', projectData);
  console.log('projectList => ', projectList);

  const title = '프로젝트를 추가하세요';
  const description =
    '진행하신 프로젝트를 추가하고 설명을 작성해보세요.\n추가된 프로젝트의 오른쪽 상단 X 아이콘을 눌러 삭제하실 수 있습니다.\n작성하신 프로젝트는 포트폴리오 작성 후 언제든 수정하실 수 있으니 편하게 작성해주세요!';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} containerWidth="900px" />
      <StAddProjectContainer>
        <StAddProjectButton onClick={handleModal}>+ 프로젝트 추가</StAddProjectButton>
        <StProjectsList isprojectexist={`${isProjectExist}`}>
          {isProjectListExist &&
            projectList.map(project => (
              <ProjectItem
                key={project.id}
                project={project}
                deleteProject={onClickdeleteProject}
                isEditMode={true}
              />
            ))}
          {!isProjectExist && (
            <StNoProjectText>
              작성하신 프로젝트가 없습니다.
              <br />
              상단 프로젝트 추가 버튼을 눌러 프로젝트를 추가해주세요!
            </StNoProjectText>
          )}
        </StProjectsList>
      </StAddProjectContainer>

      <S.ButtonContainer width="900px">
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.FIVE)} />
        <NextStepButton onClick={() => onNextButtonClick(STEP.SEVEN)} />
      </S.ButtonContainer>

      {isModalOpen && (
        <StBackground onClick={handleModal}>
          <CreateProject showModal1={isModalOpen} setShowModal1={setIsModalOpen} />
        </StBackground>
      )}
    </S.Container>
  );
};

const StAddProjectContainer = styled.div``;

const StAddProjectButton = styled.button`
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.lightGreen};
`;

const StProjectsList = styled.div<{ isprojectexist: string }>`
  width: 900px;
  min-height: 250px;

  padding: 1rem;

  display: flex;
  gap: 20px;
  flex-flow: wrap;

  ${({ isprojectexist }) =>
    isprojectexist === 'false' &&
    css`
      border: 1px dashed gray;
      border-radius: 20px;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 160%;
      font-weight: bold;
    `}
`;

const StNoProjectText = styled.div`
  color: #9d9d9d;
`;

const StBackground = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;

  background-color: rgba(0, 0, 0, 0.4);
`;

export default Step06Project;
