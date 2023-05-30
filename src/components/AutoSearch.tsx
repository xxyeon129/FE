import React, { useState } from 'react';
import axios from 'axios';
// 딜레이를 줄이기 위한 것 =  디바이스  라이브러리 : lodash
function AutoSearch() {
  // 검색어 저장
  const [searchTerm, setSearchTerm] = useState('');
  // 서버에서 받은 검색어 저장
  const [suggestions, setSuggestions] = useState([]);

  //input의 요소 값이 변경될 때마다 호출
  const handleChange = async e => {
    const term = e.target.value;
    setSearchTerm(term);
    console.log(term);

    try {
      const response = await axios.get(`/api/portfolios/search?keyword=${term}`);
      // 아래 수정
      setSuggestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 제안된 검색어를 클릭했을 때 함수
  const handleClickSuggestion = suggestion => {
    setSearchTerm(suggestion);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleClickSuggestion(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AutoSearch;
