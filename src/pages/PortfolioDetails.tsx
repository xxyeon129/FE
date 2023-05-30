import React, { useState, useEffect } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { ReactTinyLink } from 'react-tiny-link';
import axios from 'axios';

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
  const [projectList, setProjectList] = useState([]);

  console.log(techStack);
  useEffect(() => {
    getMyPortfolio();
  }, []);

  const getMyPortfolio = async () => {
    const response = await axios.get('http://3.34.102.60:8080/api/portfolios/110');
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

  const onPortfolioEdit = () => {
    console.log('수정');
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={onPortfolioEdit}>수정</button>
        </div>
        <div>
          <h1>{portfolioTitle}</h1>
          <img src="" alt="" />
          <div>
            {residence} / {email} / 희망근무 : {location} / {telephone}
          </div>
          <div>
            {/* 프로젝트 경험 */}
            {experience}
          </div>
          <div>
            {/* 기술스택 출력 */}
            {techStack.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {/* <ReactTinyLink cardSize="small" showGraphic={true} maxLine={2} minLine={1} url="" /> */}
      </div>
      <div>
        {/* <ReactTinyLink cardSize="small" showGraphic={true} maxLine={2} minLine={1} url="" /> */}
      </div>
      <div>
        {/* Github 출력 */}
        <GitHubCalendar username="HyoHwanKim" />
      </div>
      <div>{/* 프로젝트 리스트 출력 */}</div>
    </div>
  );
}

export default PortfolioDetails;
