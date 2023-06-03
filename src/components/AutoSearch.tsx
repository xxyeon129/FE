import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { portfolioDataState, searchTermState } from '@src/states/SearchResultsState';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { search, searchPage } from '@src/apis/search';

const AutoSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [portfolioData, setPortfolioData] = useRecoilState(portfolioDataState);
  const [searchwords, setSearchWords] = useRecoilState(searchTermState);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const debounceSearch = debounce(async term => {
      const suggestions = await search(term);
      setSuggestions(suggestions);
    }, 500);

    debounceSearch(searchTerm);
  }, [searchTerm]);

  const handleChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleKeyDown = async e => {
    if (e.key === 'Enter') {
      const portData = await searchPage(1, searchTerm);
      setPortfolioData(portData);
      setSearchWords(searchTerm);
      navigate('/searchresults');
    }
  };

  const handleClickSuggestion = suggestion => {
    setSearchTerm(suggestion);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleArrowNavigation = e => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.max(0, suggestions.indexOf(searchTerm) - 1);
      setSearchTerm(suggestions[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.min(suggestions.length - 1, suggestions.indexOf(searchTerm) + 1);
      setSearchTerm(suggestions[newIndex]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={e => {
          handleKeyDown(e);
          handleArrowNavigation(e);
        }}
        ref={inputRef}
      />
      {searchTerm !== '' && suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClickSuggestion(suggestion)}
              className={searchTerm === suggestion ? 'active' : ''}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSearch;
