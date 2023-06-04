import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { PATH_URL } from '@src/constants/constants';
import useDecodeJWT from '@src/Hook/useDecodeJWT';
import { useSetRecoilState } from 'recoil';
import { selectedCategoryState } from '@src/states';

const Header = () => {
  const userId = useDecodeJWT().userId;

  const headerList = [
    { value: 'Main', underLineWidth: '28%', path: PATH_URL.MAIN },
    { value: 'My Portfolios', underLineWidth: '75%', path: PATH_URL.MYPORTFOLIO },
    { value: 'My Page', underLineWidth: '50%', path: `${PATH_URL.MY_PAGE}/${userId}` },
    { value: 'Notification', underLineWidth: '65%' },
  ];

  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  const navigate = useNavigate();

  const onClickText = (path: string) => {
    setSelectedCategory('');
    navigate(path);
  };

  return (
    <StHeader>
      <StUnorderedList>
        {headerList.map(list => (
          <StList key={list.value}>
            <StLabel>
              <StCheckItem type="radio" name="header" value={list.value} />
              <StText
                underlinewidth={list.underLineWidth}
                onClick={() => list.path && onClickText(list.path)}
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
  width: 100px;
`;

const StLabel = styled.label`
  display: block;
`;

const StText = styled.span<{ underlinewidth: string }>`
  cursor: pointer;
  position: relative;

  display: flex;
  justify-content: center;
  padding-bottom: 3px;

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

const StCheckItem = styled.input`
  display: none;
  &:hover + ${StText}::before {
    transform: scaleX(0.5);
    transition: 0.25s transform cubic-bezier(0, 0, 0.1, 1);
  }
  &:checked + ${StText}::before {
    transform: scaleX(1.3);
    transition: 0.25s transform cubic-bezier(0, 0, 0.1, 1);
  }
  &:checked + ${StText} {
    font-weight: bold;
  }
`;

export default Header;
