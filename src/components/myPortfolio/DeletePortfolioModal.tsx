import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <h2>포트폴리오를 삭제하시겠습니까?</h2>
        <h3></h3>
        <StButtonContainer>
          <StButton onClick={onHandleDelete}>삭제</StButton>
          <StButton onClick={onCloseModal}>닫기</StButton>
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
  width: 40%;
  height: 20%;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 20px;
`;

const StButton = styled.button`
  background-color: #6bf65f;
  color: black;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  width: 100px;
  height: 40px;
  cursor: pointer;

  &:not([notallowed='true']):hover {
    transition: 0.5s;
    background-color: ${({ theme }) => theme.color.lightGreen};
    color: white;
  }
`;
