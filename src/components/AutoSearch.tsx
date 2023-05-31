import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { portfolioDataState } from '@src/states/SearchResultsState';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const AutoSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [portfolioData, setPortfolioData] = useRecoilState(portfolioDataState);
  const navigate = useNavigate();

  useEffect(() => {
    const debounceSearch = debounce(async term => {
      try {
        const response = await axios.get(
          `http://3.34.102.60:8080/api/portfolios/autocomplete?keyword=${term}`
        );
        setSuggestions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }, 500);

    debounceSearch(searchTerm);
  }, [searchTerm]);

  const handleChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleKeyDown = async e => {
    if (e.key === 'Enter') {
      try {
        const response = await axios.get(
          `http://3.34.102.60:8080/api/portfolios/search?keyword=${searchTerm}`
        );
        setPortfolioData(response.data.data.content);
        navigate('/searchresults');
      } catch (error) {
        console.error(error);
      }
    }
  };

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
