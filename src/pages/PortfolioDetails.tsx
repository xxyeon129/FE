import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { styled } from 'styled-components';
import ProjectModal from '@src/components/myProject/ProjectDetail';
import User from '@src/assets/nav/nav-default-user-image-icon.svg';
import DeletePortfolioModal from '@src/components/myPortfolio/DeletePortfolioModal';
import TechStackTag from '@src/components/createPortfolio/TechStackTag';
import CreateProject from '@src/components/myProject/CreateProject';
import { useRecoilValue } from 'recoil';
import { projectDataAtom } from '@src/states/createProjectState';
import jwtDecode from 'jwt-decode';
import { SERVER_URL } from '@src/constants/constants';
import { getAccessToken } from '@src/apis/token';
import ImageTextSection from '@src/components/portfolio/detail/ImageTextSection';
import LinkSection from '@src/components/portfolio/detail/LinkSection';
import ProjectList from '@src/components/portfolio/detail/ProjectList';
import Information from '@src/components/portfolio/edit/Information';
import EditLinkSection from '@src/components/portfolio/edit/EditLinkSection';
import ProjectEditSection from '@src/components/portfolio/edit/ProjectEditSection';
import DetailTechStack from '@src/components/portfolio/detail/DetailTechStack';
import { Desktop } from '@src/style/mediaQuery.ts';

function PortfolioDetails() {
  interface Project {
    projectImageList: any;
    id: number;
    title: string;
    term: string;
    people: string;
    position: string;
  }
  const [portid, setPortId] = useState<number>();
  const [hostid, setHostid] = useState<number>(0);
  const [portfolioTitle, setPortfolioTitle] = useState<string>('');
  const [intro, setIntro] = useState<string>('');
  const [proFileImage, setProFileImage] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [residence, setResidence] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [githubId, setGithubId] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  const [blog, setBlog] = useState<string>('');
  const [projectIdList, setProjectIdList] = useState<number[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [portfolioImage, setPortfolioImage] = useState<File | null>(null);
  const [getPortfolioImage, setGetPortFolioImage] = useState(null);
  const [portfolioImagePreview, setPortfolioImagePreview] = useState('');
  const [portEdit, setPortEdit] = useState<boolean>(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  const [updateComplete, setUpdateComplete] = useState(false);

  const projectData = useRecoilValue(projectDataAtom);

  console.log('겟이미지', getPortfolioImage);

  useEffect(() => {
    if (projectData !== null) {
      const projectId = projectData.id;
      setProjects(prevProjects => [...prevProjects, projectData]);
      setProjectIdList(prevProjects => [...prevProjects, projectId]);
    }
  }, [projectData]);

  interface DecodeTokenType {
    sub: string;
    userId: number;
    exp: number;
    iat: number;
  }

  const [userid, setUserId] = useState<number>(0);
  const { id } = useParams();
  const portfolioId = id;

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        const DecodeToken: DecodeTokenType = jwtDecode(`${accessToken}`);
        DecodeToken && setUserId(DecodeToken.userId);
      }
    };
    getToken();
    if (portfolioId) {
      getMyPortfolio();
    }
  }, []);

  const getMyPortfolio = async () => {
    const response = await axios.get(`${SERVER_URL}/api/portfolios/${portfolioId}`);

    const newProjectData = projects.map((item: { id: number }) => item.id);
    const selprojects = response.data.data.projectList;
    const projectIdList = selprojects.map((project: { id: string }) => parseInt(project.id));

    console.log(response.data.data);

    setPortId(response.data.data.id);
    setHostid(response.data.data.userId);
    setPortfolioTitle(response.data.data.portfolioTitle);
    setEmail(response.data.data.email);
    setTelephone(response.data.data.telephone);
    setLocation(response.data.data.location);
    setResidence(response.data.data.residence);
    setGithubId(response.data.data.githubId);
    setBlog(response.data.data.blogUrl);
    setYoutube(response.data.data.youtubeUrl);
    setGetPortFolioImage(response.data.data.portfolioImage);
    setProjectIdList([...projectIdList, ...newProjectData]);
    setProjects(selprojects);
    setIntro(response.data.data.intro);
    setProFileImage(response.data.data.profileImage || (User as string));
    setPortfolioImagePreview(response.data.data.portfolioImage);
    setFilter(response.data.data.filter);

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
      intro,
      techStack: techStackJoin,
      residence,
      location,
      telephone,
      email,
      githubId,
      youtubeUrl: youtube,
      blogUrl: blog,
      projectIdList,
    };

    const portfolioRequestBlob = new Blob([JSON.stringify(portfolioRequestDto)], {
      type: 'application/json',
    });
    const portfolioImageBlob = portfolioImage
      ? new Blob([portfolioImage], { type: 'multipart/form-data' })
      : new Blob([], { type: 'multipart/form-data' });

    const updatedData = new FormData();
    updatedData.append('portfolioRequestDto', portfolioRequestBlob);

    updatedData.append('portfolioImage', portfolioImageBlob);

    try {
      const response = await axios.patch(
        `${SERVER_URL}/api/portfolios/${portfolioId}`,
        updatedData,
        {
          headers: {
            Authorization: accessToken,
            RefreshToken: refreshToken,
          },
        }
      );
    } catch (error: unknown) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
        alert('토큰이 만료되었습니다 다시 로그인 해주세요!');
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
    setUpdateComplete(true);
    await PortfolioEdit();
    await getMyPortfolio();
  };

  useEffect(() => {
    if (updateComplete) {
      alert('수정완료');
      setUpdateComplete(false);
    }
  }, [updateComplete]);

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

  const onIntroHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntro(e.target.value);
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

  // console.log('이미지 프리뷰 데이터 : ', portfolioImagePreview);
  // console.log('포트폴리오 이미지 데이터 : ', portfolioImage);

  const onProjectDetail = (projectId: number) => {
    setSelectedProjectId(projectId);
    setIsProjectModalOpen(true);
  };

  const onProjectCreate = () => {
    setCreateProjectModalOpen(true);
  };

  const onImageClick = () => {
    fileInputRef.current?.click();
  };

  const onMyGit = () => {
    window.location.href = `https://github.com/${githubId}`;
  };

  const onMyBlog = () => {
    window.location.href = `${blog}`;
  };

  const onMyYoutube = () => {
    window.location.href = `${youtube}`;
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onProjectDelete = async (projectId: number) => {
    const confirmDelete = window.confirm('프로젝트를 삭제하시겠습니까?');
    const accessToken = localStorage.getItem('accesstoken');

    if (confirmDelete) {
      try {
        const response = await axios.delete(`${SERVER_URL}/api/projects/${projectId}`, {
          headers: {
            Authorization: accessToken,
          },
        });
        setProjects([...projects]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onImageError = () => {
    setImageLoadError(true);
  };

  return (
    <>
      <div>
        <div>
          {portEdit ? (
            <StEditWrapper>
              <Information
                portfolioTitle={portfolioTitle}
                residence={residence}
                location={location}
                email={email}
                telephone={telephone}
                intro={intro}
                filter={filter}
                onIntroHandler={onIntroHandler}
                onTitleHandler={onTitleHandler}
                onResidenceHandler={onResidenceHandler}
                onLocationHandler={onLocationHandler}
                onEmailHandler={onEmailHandler}
                onTelephoneHandler={onTelephoneHandler}
                onPortfolioUpdate={onPortfolioUpdate}
                onPortfolioEditClear={onPortfolioEditClear}
                onImageClick={onImageClick}
                portfolioImagePreview={portfolioImagePreview}
                fileInputRef={fileInputRef}
                onhandlePortfolioImageChange={onhandlePortfolioImageChange}
                getPortfolioImage={getPortfolioImage}
              />
              <Desktop>
                <TechStackTag techStack={techStack} setTechStack={setTechStack} StWidth="100%" />
              </Desktop>

              <EditLinkSection
                youtube={youtube}
                blog={blog}
                githubId={githubId}
                onYoutubeHandler={onYoutubeHandler}
                onBlogHandler={onBlogHandler}
                onGithubHandler={onGithubHandler}
              />

              <ProjectEditSection
                onProjectCreate={onProjectCreate}
                onProjectDelete={onProjectDelete}
                projects={projects}
              />

              {createProjectModalOpen && (
                <CreateProject
                  showModal1={createProjectModalOpen}
                  setShowModal1={setCreateProjectModalOpen}
                />
              )}
            </StEditWrapper>
          ) : (
            // 디테일 페이지
            <div>
              <ImageTextSection
                email={email}
                telephone={telephone}
                residence={residence}
                location={location}
                getPortfolioImage={getPortfolioImage}
                imageLoadError={imageLoadError}
                proFileImage={proFileImage}
                intro={intro}
                filter={filter}
                hostid={hostid}
                userid={userid}
                onPortfolioEdit={onPortfolioEdit}
                onPortfolioDelete={onPortfolioDelete}
                onImageError={onImageError}
                portfolioTitle={portfolioTitle}
              />

              <DetailTechStack techStack={techStack} />

              <LinkSection
                blog={blog}
                youtube={youtube}
                githubId={githubId}
                onMyBlog={onMyBlog}
                onMyYoutube={onMyYoutube}
                onMyGit={onMyGit}
              />

              <ProjectList projects={projects} onProjectDetail={onProjectDetail} />

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

const StEditWrapper = styled.div`
  padding: 100px;
  height: 100vh;
`;
