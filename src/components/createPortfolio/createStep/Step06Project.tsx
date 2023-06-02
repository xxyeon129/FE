import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { createProjectIdListState, createProjectListState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import TestCreateProjectModal from '../TestCreateProjectModal';
import { useQueryClient } from 'react-query';
import { ProjectDataType } from '@src/types/portfolioType';

const Step06Project = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  const setProjectIdList = useSetRecoilState<number[]>(createProjectIdListState);
  const [projectList, setProjectList] = useRecoilState<ProjectDataType[]>(createProjectListState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const projectData = queryClient.getQueryData('projectData') as ProjectDataType | null;

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const keepModalWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (projectData) {
      setProjectList(prevProject => [...prevProject, projectData]);
      setProjectIdList(prevProjectIds => [...prevProjectIds, projectData.id]);
    }
  }, [projectData]);

  const title = '프로젝트를 추가하세요';
  const description =
    '진행한 프로젝트를 추가하고 설명을 작성해보세요.\n작성하신 프로젝트는 포트폴리오 작성 후 언제든 수정하실 수 있습니다.';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} containerWidth="900px" />
      <StAddProjectContainer>
        <StAddProjectButton onClick={handleModal}>+ 프로젝트 추가</StAddProjectButton>
        <StProjectsList>
          {projectList?.length !== 0 &&
            projectList.map(project => (
              <StProjectItem key={project.id}>
                <StProjectImg src={project.projectImageList[0].imageUrl} />
                <StProjectText>{project.title}</StProjectText>
                {/* TODO: 로그인 후 userId 확인 방법 생기면 회원조회로 profileImg, nickname 가져와서 추가 */}
              </StProjectItem>
            ))}
        </StProjectsList>
      </StAddProjectContainer>

      <S.ButtonContainer>
        <NextStepButton onClick={() => onNextButtonClick(STEP.SEVEN)} marginRight="-150px" />
      </S.ButtonContainer>

      {isModalOpen && (
        <StBackground onClick={handleModal}>
          <TestCreateProjectModal setIsModalOpen={setIsModalOpen} onClick={keepModalWindow} />
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

const StProjectsList = styled.div`
  width: 900px;
  min-height: 250px;

  padding: 1rem;
  border: 1px solid gray;
  border-radius: 10px;

  display: flex;
  gap: 1rem;
  flex-flow: wrap;
`;

const StProjectItem = styled.div`
  background-color: lightgrey;
  border-radius: 10px;
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
