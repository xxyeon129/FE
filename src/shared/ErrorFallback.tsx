import { styled } from 'styled-components';
import { ReactComponent as ErrorIcon } from '@src/assets/not-found-icon.svg';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';

const ErrorFallback = () => {
  const navigate = useNavigate();
  const onClickHomeButton = () => {
    navigate(PATH_URL.HOME);
    window.location.reload();
  };

  return (
    <StErrorFallback>
      <ErrorIcon />
      <StTextContainer>
        <StErrorTitle>요청하신 페이지를 찾을 수 없습니다.</StErrorTitle>
        <StErrorDescription>
          폴 서비스 이용에 불편을 드려 죄송합니다.
          <br />
          서버에 응답이 없거나, 오류가 발생했습니다.
        </StErrorDescription>
      </StTextContainer>
      <StErrorButton onClick={onClickHomeButton}>홈페이지로 돌아가기</StErrorButton>
    </StErrorFallback>
  );
};

const StErrorFallback = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StTextContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StErrorTitle = styled.h1`
  font-weight: 800;

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 24px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 20px;
  }
`;

const StErrorDescription = styled.p`
  line-height: 150%;
  font-size: 18px;
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 15px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 13px;
  }
`;

const StErrorButton = styled.button`
  background-color: ${({ theme }) => theme.color.neonGreen};
  font-size: 20px;
  font-weight: 700;
  padding: 15px 25px;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    transition: 0.5s;
    background-color: ${({ theme }) => theme.color.lightGreen};
    color: white;
  }

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 15px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 13px;
  }
`;

export default ErrorFallback;
