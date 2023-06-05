import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from 'styled-components';
import ProjectModal from '@src/components/ProjectDetail';
import { ReactComponent as EditIconSvg } from '@src/assets/portfolioDetail/port-edit-icon.svg';
import { ReactComponent as Trash } from '@src/assets/portfolioDetail/port-trash-icon.svg';
import { ReactComponent as Mail } from '@src/assets/portfolioDetail/port-mail-icon.svg';
import { ReactComponent as Telephone } from '@src/assets/portfolioDetail/port-telephone-icon.svg';
import { ReactComponent as Home } from '@src/assets/portfolioDetail/port-home-iocn.svg';
import { ReactComponent as YouTube } from '@src/assets/portfolioDetail/port-youtube-icon.svg';
import { ReactComponent as Blog } from '@src/assets/portfolioDetail/port-blog-icon.svg';

function PortfolioDetails() {
  interface Project {
    id: number;
    title: string;
    term: string;
    people: string;
    position: string;
  }

  const [portfolioTitle, setPortfolioTitle] = useState<string>('');
  const [intro, setIntro] = useState<string>('');
  const [proFileImage, setProFileImage] = useState(null);
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [residence, setResidence] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [githubId, setGithubId] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  const [blog, setBlog] = useState<string>('');
  const [projectList, setProjectList] = useState<number[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [portfolioImage, setPortfolioImage] = useState<File | null>(null);
  const [portEdit, setPortEdit] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getMyPortfolio();
  }, []);

  const portfolioId = 159;

  const getMyPortfolio = async () => {
    const response = await axios.get(`http://3.34.102.60:8080/api/portfolios/${portfolioId}`);

    console.log(response.data.data);
    const projects = response.data.data.projectList;
    const projectIdList = projects.map(project => parseInt(project.id));

    setPortfolioTitle(response.data.data.portfolioTitle);
    setEmail(response.data.data.email);
    setTelephone(response.data.data.telephone);
    setLocation(response.data.data.location);
    setResidence(response.data.data.residence);
    setExperience(response.data.data.experience);
    setGithubId(response.data.data.githubId);
    setBlog(response.data.data.blogUrl);
    setPortfolioImage(response.data.data.portfolioImage);
    setProjectList(projectIdList);
    setProjects(projects);
    setIntro(response.data.data.intro);
    setProFileImage(response.data.data.profileImage);
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
    const portfolioImageBlob = new Blob([portfolioImage], { type: 'multipart/form-data' });

    const updatedData = new FormData();
    updatedData.append('portfolioRequestDto', portfolioRequestBlob);
    updatedData.append('portfolioImage', portfolioImageBlob);

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
    } catch (error) {
      if (error.response && error.response.status === 401) {
        //401 토큰에러
        alert('토큰이 일치하지 않습니다.');
      }
    }
  };

  const onPortfolioEdit = () => {
    console.log('수정페이지 이미지 : ', portfolioImage);
    setPortEdit(true);
  };

  const onPortfolioUpdate = async () => {
    setPortEdit(false);
    await PortfolioEdit();
    await getMyPortfolio();
  };

  const onPortfolioEditClear = () => {
    console.log('수정취소');
    alert('수정사항을 취소하시겠습니까?');
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

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setPortfolioImage(file);
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

  const onProjectDetail = projectId => {
    console.log(projectId);
    setSelectedProjectId(projectId);
    setIsProjectModalOpen(true);
  };

  return (
    <>
      <div>
        <div>
          {portEdit ? (
            <div>
              <button onClick={onPortfolioUpdate}>수정완료</button>
              <button onClick={onPortfolioEditClear}>수정취소</button>
              <h1>수정페이지</h1>

              <div>
                <img src="" alt="" />
                <div>
                  <label htmlFor="portfolioTitle">제목:</label>
                  <input
                    type="text"
                    id="portfolioTitle"
                    value={portfolioTitle}
                    onChange={onTitleHandler}
                  />
                </div>
                <div>
                  <label htmlFor="residence">거주지:</label>
                  <input
                    type="text"
                    id="residence"
                    value={residence}
                    onChange={onResidenceHandler}
                  />
                </div>
                <div>
                  <label htmlFor="location">희망:</label>
                  <input type="text" id="location" value={location} onChange={onLocationHandler} />
                </div>

                <div>
                  <label htmlFor="email">이메일:</label>
                  <input type="text" id="email" value={email} onChange={onEmailHandler} />
                </div>
                <div>
                  <label htmlFor="telephone">번호:</label>
                  <input
                    type="text"
                    id="telephone"
                    value={telephone}
                    onChange={onTelephoneHandler}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="image">이미지:</label>
                <input type="file" id="image" onChange={onImageUpload} />
              </div>
              <div>
                <label htmlFor="youtube">유튜브:</label>
                <input type="text" id="youtube" value={youtube} onChange={onYoutubeHandler} />
              </div>
              <div>
                <label htmlFor="blog">블로그:</label>
                <input type="text" id="blog" value={blog} onChange={onBlogHandler} />
              </div>
              <div>
                <label htmlFor="github">GitHub:</label>
                <input type="text" id="github" value={githubId} onChange={onGithubHandler} />
              </div>
            </div>
          ) : (
            <div>
              <StFirstSection>
                <h1>{portfolioTitle}</h1>
                <StHorizontalLine />

                <StButtonSection>
                  <StEditIcon onClick={onPortfolioEdit} />
                  <StTrashIcon />
                </StButtonSection>

                <StProfileContainer>
                  <StProFileImage>
                    <img src={proFileImage} alt="" />
                  </StProFileImage>
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
                    {/* {residence} / {email} / 희망근무: {location} / {telephone} */}
                  </StProfileText>
                </StProfileContainer>

                <div>
                  <StRepresentativeImage src={portfolioImage} alt="" />
                </div>
              </StFirstSection>

              <StSecondSection>
                <StExperience>{experience}</StExperience>
                <StTechStackSection>
                  {techStack?.map((item, index) => (
                    <StTechStack key={index}>{item}</StTechStack>
                  ))}
                </StTechStackSection>
              </StSecondSection>
              <StYoutube>
                {/* <Blog /> */}
                <a href={blog}>{blog}</a>
              </StYoutube>
              <StBlog>
                {/* <YouTube /> */}
                <a href={youtube}>{youtube}</a>
              </StBlog>
              <StGithub>
                <StGitgrass
                  src={`https://ghchart.rshah.org/${githubId}`}
                  alt="GitHub Contributions"
                />
              </StGithub>
              <StProjectList>
                {/* 프로젝트 리스트 출력 */}
                {projects.map((item, index) => (
                  <StProjectBox key={index} onClick={() => onProjectDetail(item.id)}>
                    <div>{item.title}</div>
                    <div>{item.term}</div>
                    <div>{item.people}</div>
                    <div>{item.position}</div>
                  </StProjectBox>
                ))}

                {isProjectModalOpen && (
                  <ProjectModal projectId={selectedProjectId} showModal={isProjectModalOpen} />
                )}
              </StProjectList>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PortfolioDetails;

const StFirstSection = styled.div`
  margin-left: 6%;
  margin-right: 6%;
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
  align-items: center;
  margin: 20px 0;
`;

const StProFileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
`;

const StProfileText = styled.div`
  margin-left: 10px;
`;

const StSecondSection = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  margin: 5%;
`;

const StExperience = styled.div`
  width: 50%;
  border: 1px solid black;
`;

const StTechStackSection = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
`;

const StTechStack = styled.div`
  width: calc(33.33% - 20px);
  height: 37px;
  border: 1px solid black;
  border-radius: 20px;
  text-align: center;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const StRepresentativeImage = styled.img`
  width: 100%;
  height: 120px;
`;

const StYoutube = styled.div`
  width: 90%;
  height: 80px;
  border: 1px solid black;
  margin: 5%;
`;

const StBlog = styled.div`
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
  padding: 20px;
  margin-top: 20px;
  width: 30%;
  cursor: pointer;
`;
