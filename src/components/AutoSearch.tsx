import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { portfolioDataState, searchTermState } from '@src/states/SearchResultsState';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { search, searchPage } from '@src/apis/search';
import { styled } from 'styled-components';
import { ReactComponent as SearchIcon } from 'src/assets/Icons.svg';
const AutoSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');
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
    setSelectedSuggestion(term);
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchQuery = selectedSuggestion ? selectedSuggestion : searchTerm;
      const portData = await searchPage(1, searchQuery);
      setPortfolioData(portData);
      setSearchWords(searchQuery);
      navigate('/searchresults');
      setSelectedSuggestion('');
      setSearchTerm('');
    }
  };

  const handleClickSuggestion = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setSearchTerm(suggestion);
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleArrowNavigation = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = suggestions.indexOf(selectedSuggestion);
      if (currentIndex === 0) {
        inputRef.current?.focus();
        setSelectedSuggestion('');
      } else {
        const newIndex = Math.max(0, currentIndex - 1);
        setSelectedSuggestion(suggestions[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.min(
        suggestions.length - 1,
        suggestions.indexOf(selectedSuggestion) + 1
      );
      setSelectedSuggestion(suggestions[newIndex]);
    }
  };

  return (
    <div>
      <StSearch>
        <SearchContainer>
          <SearchIcon />
          <input
            id="fileinput"
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={e => {
              handleArrowNavigation(e);
              handleKeyDown(e);
            }}
            ref={inputRef}
          />
        </SearchContainer>
      </StSearch>

      {searchTerm !== '' && suggestions.length > 0 && (
        <StSearchUl>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClickSuggestion(suggestion)}
              className={selectedSuggestion === suggestion ? 'active' : ''}
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

const StSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 16px;
  gap: 10px;
  border: 1px solid #c7c7c7;
  border-radius: 10px;
  width: 200px;
  height: 56px;
  border-radius: 16px;
  font-size: 16px;

  input {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border: none;
    background: none;
    font-size: 16px;
    max-width: 140px;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: none;
  }
`;

const StSearchUl = styled.ul`
  margin-top: 8px;
  position: fixed;
  background-color: #f0f0f0;
  border: none;
  border-radius: 15px;
  width: 200px;

  li {
    padding: 8px;
    margin: 0px 34px;
    cursor: pointer;
    border-radius: 15px;

    &.active {
      width: 166px;

      background-color: #6bf65f;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
`;
