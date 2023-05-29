import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { ReactTinyLink } from 'react-tiny-link';

function PortfolioDetails() {
  const [githubId, setGithubId] = useState('');
  const [youtube, setYoutube] = useState('');
  const [blog, setBlog] = useState('');
  const [projectList, setProjectList] = useState([]);

  return (
    <div>
      <div>
        <div>
          <img src="" alt="" />
          <div>{/* 기술스텍 출력 */}</div>
        </div>
      </div>
      <div>
        <ReactTinyLink
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url="https://www.youtube.com/watch?v=JD_E-zY6wVU"
        />
      </div>
      <div>
        <ReactTinyLink
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url="https://gyghks0378.tistory.com/"
        />
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
