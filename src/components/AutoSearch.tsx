import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { portfolioDataState, searchTermState } from '@src/states/SearchResultsState';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { search, searchPage } from '@src/apis/search';
import { styled } from 'styled-components';

const AutoSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [portfolioData, setPortfolioData] = useRecoilState(portfolioDataState);
  const [searchwords, setSearchWords] = useRecoilState(searchTermState);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const debounceSearch = debounce(async (term: string) => {
      const suggestions = await search(term);
      setSuggestions(suggestions);
    }, 500);

    debounceSearch(searchTerm);
  }, [searchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const portData = await searchPage(1, searchTerm);
      setPortfolioData(portData);
      setSearchWords(searchTerm);
      navigate('/searchresults');
    }
  };

  const handleClickSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleArrowNavigation = (e: KeyboardEvent<HTMLInputElement>) => {
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
      <StSearch
        type="text"
        placeholder=" Search..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={e => {
          handleKeyDown(e);
          handleArrowNavigation(e);
        }}
        ref={inputRef}
      />
      {searchTerm !== '' && suggestions.length > 0 && (
        <StSearchUl>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClickSuggestion(suggestion)}
              className={searchTerm === suggestion ? 'active' : ''}
            >
              {suggestion}
            </li>
          ))}
        </StSearchUl>
      )}
    </div>
  );
};

export default AutoSearch;

const StSearch = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  gap: 10px;

  height: 20px;

  background: #f5f5f5;
  border-radius: 16px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const StSearchUl = styled.ul`
  padding: 16px;

  li {
    padding: 8px;
    cursor: pointer;

    &.active {
      background-color: #f0f0f0;
    }
  }
`;
