import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { ProjectDataType } from '@src/types/portfolioType';
import useDecodeJWT from '@src/Hook/useDecodeJWT';
import { getUser } from '@src/apis/user';
import UserProfileImage from '../common/UserProfileImage';
import NoImage from '../common/NoImage';

interface ProjectItemProps {
  project: ProjectDataType;
  isEditMode: boolean;
  deleteProject?: (id: number) => void;
}

const ProjectItem = ({ project, isEditMode, deleteProject }: ProjectItemProps) => {
  const [userData, setUserData] = useState({ nickname: '', profileImage: null });

  useEffect(() => {
    let userId = useDecodeJWT().userId;

    const fetchUserData = async () => {
      const serverUserData = await getUser({ id: userId });
      setUserData(serverUserData);
    };
    fetchUserData();
  }, []);

  return (
    <StProjectItem>
      <StImgContainer>
        {isEditMode && (
          <StIconContainer onClick={() => deleteProject && deleteProject(project.id)}>
            <StDeleteIcon />
          </StIconContainer>
        )}
        {project.projectImageList.length !== 0 ? (
          <StProjectImg
            src={project.projectImageList[0].imageUrl}
            alt="project representative image"
          />
        ) : (
          <NoImage height="100%" borderTopRadius="20px" />
        )}
      </StImgContainer>
      <StDescriptionContainer>
        <StTopDescription>
          <StProjectTitle>{project.title}</StProjectTitle>
          <StProjectPosition>{project.position}</StProjectPosition>
        </StTopDescription>
        <StBottomDescription>
          <UserProfileImage imgSrc={userData.profileImage} size="25px" />
          <StUserName>{userData.nickname}</StUserName>
        </StBottomDescription>
      </StDescriptionContainer>
    </StProjectItem>
  );
};

const StProjectItem = styled.div`
  width: 275px;
  height: 250px;

  border: 1px solid lightgray;
  border-radius: 20px;
`;

const StImgContainer = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
`;

const StIconContainer = styled.div`
  cursor: pointer;
  :hover {
    transition: 0.5s;
    color: red;
  }
`;

const StDeleteIcon = styled(IoMdCloseCircle)`
  position: absolute;
  top: 5%;
  right: 5%;
  color: white;
  font-size: 28px;
`;

const StProjectImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const StDescriptionContainer = styled.div`
  height: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StTopDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StProjectTitle = styled.div`
  font-weight: bold;
  font-size: 19px;
  color: ${({ theme }) => theme.color.fontColor};
`;

const StProjectPosition = styled.div`
  color: #adadad;
  font-weight: bold;
`;

const StBottomDescription = styled.div`
  display: flex;
  align-items: center;
`;

const StUserName = styled.div`
  margin-left: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.fontColor};
`;

export default ProjectItem;
