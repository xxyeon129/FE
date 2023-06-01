import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReactTinyLink } from 'react-tiny-link';
import { styled } from 'styled-components';

function PortfolioDetails() {
  const [portfolioTitle, setPortfolioTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [residence, setResidence] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [techStack, setTechStack] = useState([]);
  const [githubId, setGithubId] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  const [blog, setBlog] = useState<string>('');
  const [projectList, setProjectList] = useState([]);
  const [portEdit, setPortEdit] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [portfolioImage, setPortfolioImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMyPortfolio();
  }, []);

  console.log('projectList :', projectList);
  console.log('blog :', blog);

  const portfolioId = 132;

  const getMyPortfolio = async () => {
    const response = await axios.get(`http://3.34.102.60:8080/api/portfolios/${portfolioId}`);
    console.log(response.data.data);

    setPortfolioTitle(response.data.data.portfolioTitle);
    setEmail(response.data.data.email);
    setTelephone(response.data.data.telephone);
    setLocation(response.data.data.location);
    setResidence(response.data.data.residence);
    setExperience(response.data.data.experience);
    setGithubId(response.data.data.githubId);
    setBlog(response.data.data.blogUrl);
    setPortfolioImage(response.data.data.portfolioImage);
    setProjectList(response.data.data.projectList);
    setTechStack(response.data.data.techStack.split(','));

    //프로젝트 데이터 추출 부분 진행중
    // const projectListData = response.data.data.projectList;

    // const extractedProjectList = projectListData.map(item => ({
    //   id: item.id,
    //   title: item.title,
    //   term: item.term,
    //   people: item.people,
    //   position: item.position,
    // }));

    // setProjectList(extractedProjectList);
  };

  console.log('projectList : ', projectList);

  const PortfolioEdit = async () => {
    const accessToken = localStorage.getItem('accesstoken');
    const refreshToken = localStorage.getItem('refreshtoken');

    const portfolioRequestDto = {
      portfolioTitle,
      residence,
      location,
      telephone,
      email,
      githubId,
      experience,
      youtubeUrl: youtube,
      blogUrl: blog,
      category,
      filter,
      projectIdList: projectList,
    };

    const portfolioRequestBlob = new Blob([JSON.stringify(portfolioRequestDto)], {
      type: 'application/json',
    });
    const portfolioImageBlob = new Blob([portfolioImage], { type: 'multipart/form-data' });

    const updatedData = new FormData();
    updatedData.append('portfolioRequestDto', portfolioRequestBlob);
    updatedData.append('portfolioImage', portfolioImageBlob);

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

    console.log('response:', response.data);
  };

  const onPortfolioEdit = () => {
    console.log('수정');
    setPortEdit(true);
  };

  const onPortfolioUpdate = () => {
    console.log('수정완료');
    setPortEdit(false);
    PortfolioEdit();
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

  return (
    <>
      <div>
        <div>
          <button onClick={onPortfolioEdit}>수정</button>
          <button onClick={onPortfolioEditClear}>수정취소</button>
        </div>
        <div>
          {portEdit ? (
            <div>
              <h1>수정페이지</h1>
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
                <input type="text" id="residence" value={residence} onChange={onResidenceHandler} />
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
                <input type="text" id="telephone" value={telephone} onChange={onTelephoneHandler} />
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

              <button onClick={onPortfolioUpdate}>수정완료</button>
            </div>
          ) : (
            <div>
              <h1>{portfolioTitle}</h1>
              <img src="" alt="" />
              <div>
                {residence} / {email} / 희망근무: {location} / {telephone}
              </div>
              <div>{experience}</div>
              <div>
                {techStack.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
              <div>
                <img src={portfolioImage} alt="" />
              </div>
              <div>
                <img src={`https://ghchart.rshah.org/${githubId}`} alt="GitHub Contributions" />
              </div>
              <ProjectList>
                {/* 프로젝트 리스트 출력 */}
                {projectList.map((item, index) => (
                  <ProjectBox key={index}>
                    <div>{item.title}</div>
                    <div>term : {item.term}</div>
                    <div>people : {item.people}</div>
                  </ProjectBox>
                ))}
              </ProjectList>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PortfolioDetails;

const ProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProjectBox = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  width: 30%;
  cursor: pointer;
`;
