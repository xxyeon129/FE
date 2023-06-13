import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState, selectedCategoryState, selectedHeaderState } from '@src/states';
import { getAccessToken } from '@src/apis/token';
import useDecodeJWT from '@src/Hook/useDecodeJWT';
import { PATH_URL } from '@src/constants/constants';
import { DesktopAndTablet, Mobile } from '@src/style/mediaQuery';

interface HeaderListItemProps {
  liWidth: string;
  setIsMobileDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderListItem = ({ liWidth, setIsMobileDropdownOpen }: HeaderListItemProps) => {
  const [userId, setUserId] = useState('');
  const isLogin = useRecoilValue(loginState);
  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  const [selectedHeader, setSelectedHeader] = useRecoilState(selectedHeaderState);

  const navigate = useNavigate();

  const headerList = [
    { value: 'Home', underLineWidth: '28%', path: '' },
    { value: 'My Portfolios', underLineWidth: '63%', path: `${PATH_URL.MY_PORTFOLIO}/${userId}` },
    { value: 'My Page', underLineWidth: '40%', path: `${PATH_URL.MY_PAGE}/${userId}` },
    { value: 'Notification', underLineWidth: '57%', path: '' },
  ];

  const onClickText = (path: string) => {
    setSelectedHeader(true);
    setSelectedCategory('');
    setIsMobileDropdownOpen && setIsMobileDropdownOpen(false);
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
    <>
      {headerList.map(list => (
        <StList key={list.value} width={liWidth}>
          <StLabel>
            <DesktopAndTablet>
              <>
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
              </>
            </DesktopAndTablet>
            <Mobile>
              <StMobileText onClick={() => onClickText(list.path)}>{list.value}</StMobileText>
            </Mobile>
          </StLabel>
        </StList>
      ))}
    </>
  );
};

const StList = styled.li<{ width: string }>`
  width: ${({ width }) => width};
`;

const StLabel = styled.label``;

const StText = styled.span<{ underlinewidth: string; headerclicked: string }>`
  cursor: pointer;
  position: relative;

  display: flex;
  justify-content: center;
  padding-bottom: 4px;

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

const StMobileText = styled.div`
  padding: 10px;
  font-size: 15px;

  &:hover {
    background-color: #e3e3e3;
    cursor: pointer;
  }
`;

export default HeaderListItem;
