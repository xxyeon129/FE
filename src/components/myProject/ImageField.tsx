import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

export const ImageField: React.FC<{
  previewImages: string[];
  imageHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ previewImages, imageHandler }) => (
  <StImageHeader>
    <StImageBox>
      {previewImages.map((url, index) => (
        <StImage key={index} src={url} alt="프리뷰" />
      ))}
    </StImageBox>
    <StImageText>
      <h3>프로젝트 썸네일</h3>
      <p>
        10MB 이하의 jpg, jpeg, png 파일을
        <br /> 업로드 해주세요.
      </p>
      <StImageTextdiv>
        <StLabel htmlFor="file">파일 선택</StLabel>
        <StFileUpload type="file" id="file" onChange={imageHandler}></StFileUpload>
      </StImageTextdiv>
    </StImageText>
  </StImageHeader>
);

const StImageBox = styled.div`
  width: 160px;
  height: 160px;
  left: 55px;
  top: 112px;
  border: 1px solid #000000;
  border-radius: 20px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

const StImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const StImageHeader = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 100%;
  gap: 60px;
  h3 {
    margin-bottom: 10px;
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }
  p {
    margin-bottom: 30px;
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 130%;
    letter-spacing: -0.015em;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StImageText = styled.div`
  /* margin-left: 50px; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const StImageTextdiv = styled.div`
  display: flex;
  align-items: center;
`;

const StFileUpload = styled.input`
  width: 0;
  height: 42px;
  opacity: 0;
`;

const StLabel = styled.label`
  width: 160px;
  height: 44px;
  background: #ebebeb;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
`;

const StImgDel = styled.div`
  width: 160px;
  height: 44px;
  left: 260px;
  top: 218px;
  background: #ebebeb;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  cursor: pointer;
  text-align: center;
`;
