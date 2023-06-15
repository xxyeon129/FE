import React, { ChangeEvent, RefObject } from 'react';
import { styled } from 'styled-components';

interface ImageChangeProps {
  onImageClick: () => void;
  portfolioImagePreview: string | null;
  fileInputRef: RefObject<HTMLInputElement>;
  onhandlePortfolioImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ImageChange(props: ImageChangeProps) {
  return (
    <div>
      <StImagePreviewer onClick={props.onImageClick}>
        {props.portfolioImagePreview ? (
          <StRepresentativeImageEdit src={props.portfolioImagePreview} alt="" />
        ) : (
          <StPreviewerComment>선택된 이미지가 없습니다.</StPreviewerComment>
        )}
        <StFileUpload
          type="file"
          id="image"
          ref={props.fileInputRef}
          onChange={props.onhandlePortfolioImageChange}
        />
      </StImagePreviewer>
    </div>
  );
}

export default ImageChange;

const StImagePreviewer = styled.div`
  border: 2px dotted black;
  height: 250px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
`;

const StFileUpload = styled.input`
  display: none;
`;

const StPreviewerComment = styled.div`
  font-size: 25px;
`;

const StRepresentativeImageEdit = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;
