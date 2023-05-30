import React, { useState } from 'react';
import axios from 'axios';
// 딜레이를 줄이기 위한 것 =  디바이스  라이브러리 : lodash
function AutoSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async e => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      const response = await axios.get(`/api/portfolios/search?keyword=${term}`);
      const filteredSuggestions = response.data.filter(item => {
        return item.toLowerCase().includes(term.toLowerCase());
      });
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error(error);
    }
  };

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
