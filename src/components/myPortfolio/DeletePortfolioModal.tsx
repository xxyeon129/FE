import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Icon } from '@src/assets/portfolioDetail/port-delete-icon.svg';

interface DeletePortfoliosModalProps {
  portId: number | undefined;
  onCloseModal: () => void;
}

function DeletePortfolioModal({ portId, onCloseModal }: DeletePortfoliosModalProps) {
  const navigate = useNavigate();

  const onHandleDelete = async () => {
    const accessToken = localStorage.getItem('accesstoken');
    const refreshToken = localStorage.getItem('refreshtoken');

    try {
      const response = await axios.delete(`http://3.34.102.60:8080/api/portfolios/${portId}`, {
        headers: {
          Authorization: accessToken,
          RefreshToken: refreshToken,
        },
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StModalContainer>
      <StModalContent>
        <StIcon />
        <StTitle>포트폴리오를 정말 삭제할까요?</StTitle>
        <StSubtitle>삭제하고 나면 복구할 수 없어요.</StSubtitle>
        <StButtonContainer>
          <StButton color="gray" onClick={onHandleDelete}>
            삭제하기
          </StButton>
          <StButton onClick={onCloseModal}>취소</StButton>
        </StButtonContainer>
      </StModalContent>
    </StModalContainer>
  );
}

export default DeletePortfolioModal;

const StModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 450px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;

  @media (max-width: 1023px) {
    width: 280px;
    height: 380px;
  }

  @media (max-width: 767px) {
    width: 240px;
    height: 350px;
  }

  @media (max-width: 479px) {
    width: 220px;
    height: 300px;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 20px;
`;

const StButton = styled.button`
  background-color: ${({ color }) => color || '#6bf65f'};
  color: black;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 20px;
  width: 100px;
  height: 40px;
  cursor: pointer;
  font-weight: bold;

  &:not([notallowed='true']):hover {
    transition: 0.5s;
    background-color: ${({ theme, color }) => (color ? color : theme.color.lightGreen)};
    color: white;
  }
  @media (max-width: 1023px) {
    margin-top: 10px;
    font-size: 10px;
    width: 70px;
    height: 30px;
  }

  @media (max-width: 767px) {
    margin-top: 10px;
    font-size: 10px;
    width: 70px;
    height: 30px;
  }

  @media (max-width: 479px) {
    margin-top: 10px;
    font-size: 10px;
    width: 70px;
    height: 30px;
  }
`;

const StIcon = styled(Icon)`
  margin-top: 40px;
  margin-bottom: 25px;
  margin-left: 40px;

  @media (max-width: 479px) {
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 30px;
  }
`;

const StTitle = styled.h2`
  margin-bottom: 10px;

  @media (max-width: 479px) {
    margin-top: 10px;
    font-size: 13px;
  }
`;

const StSubtitle = styled.p`
  margin-top: 15px;
  font-weight: bold;

  @media (max-width: 479px) {
    font-size: 10px;
  }
`;
