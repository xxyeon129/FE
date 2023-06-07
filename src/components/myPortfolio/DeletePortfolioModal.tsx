import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeletePortfolioModal({ portId, onCloseModal }) {
  const navigate = useNavigate();

  const onhandleDelete = async () => {
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
      //테스트
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StModalContainer>
      <StModalContent>
        <h2>포트폴리오 삭제 모달</h2>
        <button onClick={onhandleDelete}>삭제</button>
        <button onClick={onCloseModal}>닫기</button>
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
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
`;
