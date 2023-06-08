import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { styled } from 'styled-components';
import ProjectModal from '@src/components/myProject/ProjectDetail';
import { ReactComponent as EditIconSvg } from '@src/assets/portfolioDetail/port-edit-icon.svg';
import { ReactComponent as Trash } from '@src/assets/portfolioDetail/port-trash-icon.svg';
import { ReactComponent as Mail } from '@src/assets/portfolioDetail/port-mail-icon.svg';
import { ReactComponent as Telephone } from '@src/assets/portfolioDetail/port-telephone-icon.svg';
import { ReactComponent as Home } from '@src/assets/portfolioDetail/port-home-iocn.svg';
import { ReactComponent as Blog } from '@src/assets/portfolioDetail/port-blogger-icon.svg';
import { ReactComponent as YouTube } from '@src/assets/portfolioDetail/port-youtube-icon.svg';
import User from '@src/assets/nav/nav-default-user-image-icon.svg';
import DeletePortfolioModal from '@src/components/myPortfolio/DeletePortfolioModal';
import TechStackTag from '@src/components/createPortfolio/TechStackTag';
import CreateProject from '@src/components/myProject/CreateProject';
import { useRecoilValue } from 'recoil';
import { projectDataAtom } from '@src/states/createProjectState';
import jwtDecode from 'jwt-decode';

function PortfolioDetails() {
  interface Project {
    projectImageList: any;
    id: number;
    title: string;
    term: string;
    people: string;
    position: string;
  }
  const [portid, SetPortId] = useState();
  const [hostid, setHostid] = useState();
  const [portfolioTitle, setPortfolioTitle] = useState<string>('');
  const [intro, setIntro] = useState<string>('');
  const [proFileImage, setProFileImage] = useState(null);
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [residence, setResidence] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [githubId, setGithubId] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  const [blog, setBlog] = useState<string>('');
  const [projectList, setProjectList] = useState<number[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [portfolioImage, setPortfolioImage] = useState<File | null>(null);
  const [getPortfolioImage, setGetPortFolioImage] = useState(null);
  const [portfolioImagePreview, setPortfolioImagePreview] = useState('');
  const [portEdit, setPortEdit] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [createProjects, setCreateProjects] = useState([]);

  const projectData = useRecoilValue(projectDataAtom);
  // console.log('리코일로 받은데이터 : ', projectData);

  useEffect(() => {
    if (projectData) {
      setCreateProjects(prevProjects => [...prevProjects, projectData]);
    }
  }, [projectData]);

  console.log('새로 만들어진 프로젝트 :', createProjects);
  console.log('기존에 있던 프로젝트 :', projects);

  // console.log('내가 사용할 데이터 : ', createProjects);

  const accessToken = localStorage.getItem('accesstoken');
  const DecodeToken = jwtDecode(accessToken);
  const userid = DecodeToken.userId;

  useEffect(() => {
    getMyPortfolio();
  }, []);

  const { id } = useParams();

  const portfolioId = id;

  const getMyPortfolio = async () => {
    const response = await axios.get(`http://3.34.102.60:8080/api/portfolios/${portfolioId}`);

    console.log(response.data.data);
    const projects = response.data.data.projectList;
    const projectIdList = projects.map((project: { id: string }) => parseInt(project.id));

    SetPortId(response.data.data.id);
    setHostid(response.data.data.userId);
    setPortfolioTitle(response.data.data.portfolioTitle);
    setEmail(response.data.data.email);
    setTelephone(response.data.data.telephone);
    setLocation(response.data.data.location);
    setResidence(response.data.data.residence);
    setGithubId(response.data.data.githubId);
    setBlog(response.data.data.blogUrl);
    setGetPortFolioImage(response.data.data.portfolioImage);
    setProjectList(projectIdList);
    setProjects(projects);
    setIntro(response.data.data.intro);

    setProFileImage(response.data.data.profileImage || (User as string));

    console.log(User);
    if (techStack) {
      setTechStack(response.data.data.techStack.split(','));
    }
  };

  const PortfolioEdit = async () => {
    const accessToken = localStorage.getItem('accesstoken');
    const refreshToken = localStorage.getItem('refreshtoken');

    const techStackJoin = techStack.join(',');

    const portfolioRequestDto = {
      portfolioTitle,
      residence,
      location,
      telephone,
      email,
      githubId,
      youtubeUrl: youtube,
      blogUrl: blog,
      category,
      filter,
      projectIdList: projectList,
      techStack: techStackJoin,
      intro,
    };

    const portfolioRequestBlob = new Blob([JSON.stringify(portfolioRequestDto)], {
      type: 'application/json',
    });
    const portfolioImageBlob = portfolioImage
      ? new Blob([portfolioImage], { type: 'multipart/form-data' })
      : null;

    const updatedData = new FormData();
    updatedData.append('portfolioRequestDto', portfolioRequestBlob);
    if (portfolioImageBlob) {
      updatedData.append('portfolioImage', portfolioImageBlob);
    }
    try {
      const response = await axios.patch(
        `http://3.34.102.60:8080/api/portfolios/${portfolioId}`,
        updatedData,
        {
          headers: {
            Authorization: accessToken,
            RefreshToken: refreshToken,
          },
        }
      );
      alert('수정완료');
    } catch (error: unknown) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 409) {
        alert('토큰이 일치하지 않습니다.');
      }
    }
  };

  const onPortfolioEdit = () => {
    setPortEdit(true);
  };

  const onPortfolioDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const onPortfolioUpdate = async () => {
    setPortEdit(false);
    await PortfolioEdit();
    await getMyPortfolio();
  };

  const onPortfolioEditClear = () => {
    setPortEdit(false);
  };

  const onTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioTitle(e.target.value);
  };

  const onResidenceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResidence(e.target.value);
  };

  const onLocationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onTelephoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelephone(e.target.value);
  };

  const onYoutubeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutube(e.target.value);
  };

  const onBlogHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlog(e.target.value);
  };

  const onGithubHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubId(e.target.value);
  };

  const onhandlePortfolioImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setPortfolioImage(file);
      setPortfolioImagePreview(URL.createObjectURL(file));
    }
  };

  const onProjectDetail = (projectId: number) => {
    setSelectedProjectId(projectId);
    setIsProjectModalOpen(true);
  };

  const onProjectCreate = () => {
    setCreateProjectModalOpen(true);
    console.log('프로젝트 모달 생성', createProjectModalOpen);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onProjectReset = () => {
    setCreateProjects([]);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onProjectDelete = async (projectId: number) => {
    const confirmDelete = window.confirm('삭제하실?');
    const accessToken = localStorage.getItem('accesstoken');
    const refreshToken = localStorage.getItem('refreshtoken');

    if (confirmDelete) {
      console.log('삭제 : ', projectId);
      try {
        const response = await axios.delete(`http://3.34.102.60:8080/api/projects/${projectId}`, {
          headers: {
            Authorization: accessToken,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div>
        <div>
          {portEdit ? (
            <StEditWrapper>
              <button onClick={onPortfolioUpdate}>수정완료</button>
              <button onClick={onPortfolioEditClear}>수정취소</button>

              <StFirstEditWrapper>
                <img src="" alt="" />
                <div>
                  <StLabel htmlFor="portfolioTitle">제목</StLabel>
                  <StInput
                    type="text"
                    id="portfolioTitle"
                    value={portfolioTitle}
                    onChange={onTitleHandler}
                  />
                </div>
                <div>
                  <StLabel htmlFor="residence">거주지</StLabel>
                  <StInput
                    type="text"
                    id="residence"
                    value={residence}
                    onChange={onResidenceHandler}
                  />
                </div>
                <div>
                  <StLabel htmlFor="location">희망</StLabel>
                  <StInput
                    type="text"
                    id="location"
                    value={location}
                    onChange={onLocationHandler}
                  />
                </div>

                <div>
                  <StLabel htmlFor="email">이메일</StLabel>
                  <StInput type="text" id="email" value={email} onChange={onEmailHandler} />
                </div>
                <div>
                  <StLabel htmlFor="telephone">번호</StLabel>
                  <StInput
                    type="text"
                    id="telephone"
                    value={telephone}
                    onChange={onTelephoneHandler}
                  />
                </div>
              </StFirstEditWrapper>

              <StImagePreviewer onClick={handleImageClick}>
                {portfolioImagePreview ? (
                  <StRepresentativeImageEdit src={portfolioImagePreview} alt="" />
                ) : (
                  <StPreviewerComment>선택된 이미지가 없습니다.</StPreviewerComment>
                )}
                <StFileUpload
                  type="file"
                  id="image"
                  ref={fileInputRef}
                  onChange={onhandlePortfolioImageChange}
                />
              </StImagePreviewer>

              <div>
                <TechStackTag techStack={techStack} setTechStack={setTechStack} StWidth="100%" />
              </div>

              <StRinkWrapper>
                <div>
                  <StLabel htmlFor="youtube">유튜브:</StLabel>
                  <StRinkInput
                    type="text"
                    id="youtube"
                    value={youtube}
                    onChange={onYoutubeHandler}
                  />
                </div>
                <div>
                  <StLabel htmlFor="blog">블로그:</StLabel>
                  <StRinkInput type="text" id="blog" value={blog} onChange={onBlogHandler} />
                </div>
                <div>
                  <StLabel htmlFor="github">GitHub:</StLabel>
                  <StRinkInput
                    type="text"
                    id="github"
                    value={githubId}
                    onChange={onGithubHandler}
                  />
                </div>
              </StRinkWrapper>
              <button onClick={onProjectCreate}>생성</button>
              <button onClick={onProjectReset}>초기화</button>

              <StProjectEditBox>
                {projects.map((item, index) => (
                  <StProjectBox key={index} onClick={() => onProjectDelete(item.id)}>
                    <StProjectImg src={item.projectImageList[0].imageUrl} alt="프로젝트 이미지" />
                    <StProjectTitle>{item.title}</StProjectTitle>
                  </StProjectBox>
                ))}

                {createProjects.map((item, index) => (
                  <StProjectBox key={index}>
                    {item.imageList.map((image, imageIndex) => {
                      if (image instanceof File) {
                        const imageUrl = URL.createObjectURL(image);
                        return (
                          <StProjectImg
                            key={imageIndex}
                            src={imageUrl}
                            alt={`Image ${imageIndex}`}
                          />
                        );
                      }
                      return null;
                    })}
                    <StProjectTitle>{item.title}</StProjectTitle>
                  </StProjectBox>
                ))}
              </StProjectEditBox>

              {createProjectModalOpen && (
                <CreateProject
                  showModal1={createProjectModalOpen}
                  setShowModal1={setCreateProjectModalOpen}
                />
              )}
            </StEditWrapper>
          ) : (
            <div>
              <StFirstSection>
                <h1>{portfolioTitle}</h1>
                <StHorizontalLine />

                <StButtonSection>
                  {hostid === userid ? (
                    <>
                      <StEditIcon onClick={onPortfolioEdit} />
                      <StTrashIcon onClick={onPortfolioDelete} />
                    </>
                  ) : null}
                </StButtonSection>

                <StProfileContainer>
                  <div>{proFileImage && <StProFileImage src={proFileImage} alt="" />}</div>

                  <StProfileText>
                    <div>
                      <Mail /> {email}
                    </div>
                    <div>
                      <Telephone /> {telephone}
                    </div>
                    <div>
                      <Home /> {residence} | {location} 근무 희망
                    </div>
                  </StProfileText>
                </StProfileContainer>
                {getPortfolioImage && <StRepresentativeImage src={getPortfolioImage} alt="" />}
              </StFirstSection>

              <StSecondSection>
                <StIntro>{intro}</StIntro>
                <StTechStackSection>
                  {techStack?.map((item, index) => (
                    <StTechStack key={index}>{item}</StTechStack>
                  ))}
                </StTechStackSection>
              </StSecondSection>

              {blog && (
                <StBlog>
                  <Blog />
                  <a href={blog}>{blog}</a>
                </StBlog>
              )}

              {youtube && (
                <StYoutube>
                  <YouTube />
                  <a href={youtube}>{youtube}</a>
                </StYoutube>
              )}

              {githubId && (
                <StGithub>
                  <StGitgrass
                    src={`https://ghchart.rshah.org/${githubId}`}
                    alt="GitHub Contributions"
                  />
                </StGithub>
              )}

              <StProjectList>
                {/* 프로젝트 리스트 출력 */}
                {projects.map((item, index) => (
                  <StProjectBox key={index} onClick={() => onProjectDetail(item.id)}>
                    <StProjectImg src={item.projectImageList[0].imageUrl} alt="프로젝트 이미지" />
                    <StProjectTitle>{item.title}</StProjectTitle>
                  </StProjectBox>
                ))}
              </StProjectList>

              {isProjectModalOpen && (
                <ProjectModal
                  showModal={isProjectModalOpen}
                  projectId={selectedProjectId}
                  setShowModal={setIsProjectModalOpen}
                />
              )}

              {isDeleteModalOpen && (
                <DeletePortfolioModal
                  portId={portid}
                  onCloseModal={() => setIsDeleteModalOpen(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PortfolioDetails;

const input = `
flex: 1;
padding: 8px;
margin-right: 8px;
border: 1px solid #ccc;
border-radius: 4px;
height: 40px;
width: 40%;
margin-top: 10px;
`;

const StEditWrapper = styled.div`
  padding: 120px;
  height: 100vh;
`;

const StFirstEditWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 30px;
  margin: 30px 0;
`;

const StLabel = styled.label`
  display: inline-block;
  width: 60px;
`;

const StRinkInput = styled.input`
  ${input}
  width: 88%;
`;

const StInput = styled.input`
  ${input}
`;

const StFirstSection = styled.div`
  margin-left: 6%;
  margin-right: 6%;
`;

const StImagePreviewer = styled.div`
  border: 2px dotted black;
  height: 250px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
`;

const StFileUpload = styled.input`
  display: none;
`;

const StPreviewerComment = styled.div`
  /* text-align: center; */
  font-size: 25px;
`;

const StRepresentativeImageEdit = styled.img`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StProjectEditBox = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 20px;
  padding: 20px;
  gap: 30px;
  width: 100%;
`;

const StRinkWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 30px;
  margin: 30px 0;
`;

const StHorizontalLine = styled.div`
  border-bottom: 1px solid #000000;
  margin: 10px 0;
`;

const StButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const StEditIcon = styled(EditIconSvg)`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const StTrashIcon = styled(Trash)`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const StProfileContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin: 20px 0;
  padding: 20px 20px;
`;

const StProFileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  /* border: 1px solid black; */
`;

const StProfileText = styled.div`
  margin-left: 10px;
`;

const StSecondSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5%;
`;

const StIntro = styled.div`
  width: 50%;
`;

const StTechStackSection = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  /* border: 1px solid black; */
`;

const StTechStack = styled.div`
  width: calc(33.33% - 20px);
  height: 37px;
  border-radius: 20px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  transition: background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const StRepresentativeImage = styled.img`
  width: 100%;
  height: 300px;
  top: 0;
  left: 0;
`;

const StYoutube = styled.div`
  display: flex;
  width: 90%;
  height: 80px;
  border: 1px solid black;
  margin: 5%;
`;

const StBlog = styled.div`
  display: flex;
  width: 90%;
  height: 80px;
  border: 1px solid black;
  margin: 5%;
`;

const StGithub = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  padding: 20px;
  margin: 5%;
  border-radius: 20px;
`;

const StGitgrass = styled.img`
  width: 100%;
  height: auto;
`;

const StProjectList = styled.div`
  justify-content: center;
  margin: 5%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StProjectBox = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-top: 20px;
  width: 20%;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StProjectImg = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const StProjectTitle = styled.div`
  margin-bottom: 15px;
  font-weight: bold;
`;
