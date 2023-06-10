import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { loginState, selectedCategoryState, selectedHeaderState } from '@src/states';
import { PATH_URL } from '@src/constants/constants';
import useDecodeJWT from '@src/Hook/useDecodeJWT';
import { useEffect, useState } from 'react';
import { getAccessToken } from '@src/apis/token';

const Header = () => {
  const [userId, setUserId] = useState('');
  const isLogin = useRecoilValue(loginState);
  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  const [selectedHeader, setSelectedHeader] = useRecoilState(selectedHeaderState);

  const navigate = useNavigate();

  const headerList = [
    { value: 'Services', underLineWidth: '38%', path: '' },
    { value: 'My Portfolios', underLineWidth: '63%', path: `${PATH_URL.MY_PORTFOLIO}/${userId}` },
    { value: 'My Page', underLineWidth: '40%', path: `${PATH_URL.MY_PAGE}/${userId}` },
    { value: 'Notification', underLineWidth: '57%', path: '' },
  ];

  const onClickText = (path: string) => {
    setSelectedHeader(true);
    setSelectedCategory('');
    if (path.length !== 0) {
      navigate(path);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const loginToken = await getAccessToken();
      loginToken !== null ? setUserId(useDecodeJWT().userId) : setUserId('');
    };
    getToken();
  }, [isLogin]);

  return (
    <StHeader>
      <StUnorderedList>
        {headerList.map(list => (
          <StList key={list.value}>
            <StLabel>
              <StCheckItem
                type="radio"
                name="header"
                value={list.value}
                headerclicked={`${selectedHeader}`}
              />
              <StText
                underlinewidth={list.underLineWidth}
                headerclicked={`${selectedHeader}`}
                onClick={() => onClickText(list.path)}
              >
                {list.value}
              </StText>
            </StLabel>
          </StList>
        ))}
      </StUnorderedList>
    </StHeader>
  );
};

const StHeader = styled.header`
  position: fixed;
  margin-left: 250px;
  padding-right: 41px;
  width: 100%;
  height: 52px;
  background-color: white;
  font-family: 'Open Sans', sans-serif;
  z-index: 999;
`;

const StUnorderedList = styled.ul`
  margin-right: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  gap: 20px;
`;

const StList = styled.li`
  width: 130px;
`;

const StLabel = styled.label`
  display: block;
`;

const StText = styled.span<{ underlinewidth: string; headerclicked: string }>`
  cursor: pointer;
  position: relative;

  display: flex;
  justify-content: center;
  padding-bottom: 7px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    background-color: black;
    margin-top: 10px;
    bottom: 0;
    width: ${({ underlinewidth }) => underlinewidth};
    height: 2px;
    border-radius: 1px;
    transform: scaleX(0);
    transition: 0.25s transform cubic-bezier(0, 0, 0.1, 1);
  }
`;

const StCheckItem = styled.input<{ headerclicked: string }>`
  display: none;
  &:hover + ${StText}::before {
    transform: scaleX(0.5);
    transition: 0.25s transform cubic-bezier(0, 0, 0.1, 1);
  }
  &:checked + ${StText}::before {
    display: ${({ headerclicked }) => headerclicked === 'false' && 'none'};
    transform: scaleX(1.3);
    transition: 0.25s transform cubic-bezier(0, 0, 0.1, 1);
  }
  &:checked + ${StText} {
    font-weight: ${({ headerclicked }) => (headerclicked === 'true' ? 'bold' : 'normal')};
  }
`;

export default Header;
