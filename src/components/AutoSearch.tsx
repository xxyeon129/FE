import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { portfolioDataState } from '@src/states/SearchResultsState';
import { useNavigate } from 'react-router-dom';
// Usequery 캐싱
// 딜레이를 줄이기 위한 것 =  디바이스  라이브러리 : lodash
const AutoSearch = () => {
  // 검색어 저장
  const [searchTerm, setSearchTerm] = useState('');
  // 서버에서 받은 검색어 저장
  const [suggestions, setSuggestions] = useState([]);
  const [portfolioData, setPortfolioData] = useRecoilState(portfolioDataState);
  const navigate = useNavigate();

  //input의 요소 값이 변경될 때마다 호출
  const handleChange = async e => {
    const term = e.target.value;
    setSearchTerm(term);
    console.log(term);

    try {
      const response = await axios.get(
        `http://3.34.102.60:8080/api/portfolios/autocomplete?keyword=${term}`
      );
      // 아래 수정

      setSuggestions(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // usequery로 data.content를 전역관리
  // 포트폴리오 조회
  const handleKeyDown = async e => {
    if (e.key === 'Enter') {
      try {
        const response = await axios.get(
          `http://3.34.102.60:8080/api/portfolios/search?keyword=${searchTerm}&last-portfolio-id=30&size=10`
        );
        setPortfolioData(response.data.data.content);
        console.log(response.data.data.content);
        navigate('/searchresults');

        // Process the response data here
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 제안된 검색어를 클릭했을 때 함수
  const handleClickSuggestion = suggestion => {
    setSearchTerm(suggestion);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} onKeyDown={handleKeyDown} />
      {searchTerm !== '' && suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleClickSuggestion(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSearch;
