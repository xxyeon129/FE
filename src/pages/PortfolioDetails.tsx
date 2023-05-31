import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GitHubCalendar from 'react-github-calendar';
import { ReactTinyLink } from 'react-tiny-link';

function PortfolioDetails() {
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [residence, setResidence] = useState('');
  const [telephone, setTelephone] = useState('');
  const [experience, setExperience] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [githubId, setGithubId] = useState('');
  const [youtube, setYoutube] = useState('');
  const [blog, setBlog] = useState('');
  const [projectList, setProjectList] = useState([1, 2, 3]);
  const [portEdit, setPortEdit] = useState(false);
  const [category, setCategory] = useState('');
  const [filter, setFilter] = useState('');
  const [portfolioImage, setPortfolioImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMyPortfolio();
  }, []);

  const portfolioId = 110;

  const getMyPortfolio = async () => {
    const response = await axios.get(`http://3.34.102.60:8080/api/portfolios/${portfolioId}`);
    console.log(response.data.data);

    setPortfolioTitle(response.data.data.portfolioTitle);
    setEmail(response.data.data.email);
    setTelephone(response.data.data.telephone);
    setLocation(response.data.data.location);
    setResidence(response.data.data.residence);
    setExperience(response.data.data.experience);
    setTechStack(response.data.data.techStack.split(','));
    setGithubId(response.data.data.githubId);
    setBlog(response.data.data.blogUrl);
  };

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
                <input type="text" id="residence" value={location} onChange={onResidenceHandler} />
              </div>
              <div>
                <label htmlFor="location">희망:</label>
                <input type="text" id="location" value={residence} onChange={onLocationHandler} />
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
                <GitHubCalendar username="HyoHwanKim" />
              </div>
              <div>
                {/* 프로젝트 리스트 출력 */}
                프로젝트 리스트
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PortfolioDetails;
