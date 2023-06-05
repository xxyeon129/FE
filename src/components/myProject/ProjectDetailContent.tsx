import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

interface ProjectDetailContentProps {
  isEditable: boolean;
  data: ProjectDetailData | undefined;
  previewImages: string[];
  title: string;
  term: string;
  people: string;
  position: string;
  description: string;
  imageList: File[];
  titleError: string;
  termError: string;
  peopleError: string;
  positionError: string;
  descriptionError: string;
  accessToken: string | null;
  handleEdit: () => void;
  titleHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  termHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  peopleHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  positionHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  descriptionHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  imageHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  removeImageHandler: () => void;
  handleSubmit: () => void;
  handleCloseModal: () => void;
}
// sdsd
const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({
  isEditable,
  data,
  previewImages,
  title,
  term,
  people,
  position,
  description,
  imageList,
  titleError,
  termError,
  peopleError,
  positionError,
  descriptionError,
  accessToken,
  handleEdit,
  titleHandler,
  termHandler,
  peopleHandler,
  positionHandler,
  descriptionHandler,
  imageHandler,
  removeImageHandler,
  handleSubmit,
  handleCloseModal,
}) => {
  return (
    <StLayout>
      <h1>{isEditable ? 'Project Edit' : 'Project'}</h1>
      {isEditable ? (
        <>
          <StImageContainer>
            <StImageBox>
              {previewImages.map((url, index) => (
                <StImage key={index} src={url} alt="Preview" />
              ))}
            </StImageBox>
            <StimageOptions>
              <input type="file" onChange={imageHandler} />
              <button onClick={removeImageHandler}>이미지 삭제</button>
            </StimageOptions>
          </StImageContainer>
          <StTextBox>
            <StTextWrap>
              <StTitle>프로젝트 제목</StTitle>
              <StInput type="text" value={title} onChange={titleHandler} />
            </StTextWrap>
            {titleError && <StError>{titleError}</StError>}
            <StTextWrap>
              <StTitle>프로젝트 기간</StTitle>
              <StInput type="text" value={term} onChange={termHandler} />
            </StTextWrap>
            {termError && <StError>{termError}</StError>}
            <StTextWrap>
              <StTitle>프로젝트 인원</StTitle>
              <StInput type="text" value={people} onChange={peopleHandler} />
            </StTextWrap>
            {peopleError && <StError>{peopleError}</StError>}
            <StTextWrap>
              <StTitle>해당 포지션</StTitle>
              <StInput type="text" value={position} onChange={positionHandler} />
            </StTextWrap>
            {positionError && <StError>{positionError}</StError>}
            <StTextWrap>
              <StTitle>프로젝트 설명</StTitle>
              <StTextArea value={description} onChange={descriptionHandler}></StTextArea>
            </StTextWrap>
            {descriptionError && <StError>{descriptionError}</StError>}
          </StTextBox>
        </>
      ) : (
        <>
          <StgetContainer>
            <StImageBox>
              {data?.projectImageList.map((image: any, index: number) => (
                <StImage key={index} src={image.imageUrl} alt="Preview" />
              ))}
            </StImageBox>
          </StgetContainer>
          <StTextBox>
            <StTextWrap>
              <StTitle>프로젝트 제목</StTitle>
              <StText>{data?.title}</StText>
            </StTextWrap>
            <StTextWrap>
              <StTitle>프로젝트 기간</StTitle>
              <StText>{data?.term}</StText>
            </StTextWrap>
            <StTextWrap>
              <StTitle>프로젝트 인원</StTitle>
              <StText>{data?.people}</StText>
            </StTextWrap>
            <StTextWrap>
              <StTitle>해당 포지션</StTitle>
              <StText>{data?.position}</StText>
            </StTextWrap>
            <StTextWrap>
              <StTitle>프로젝트 설명</StTitle>
              <StText>{data?.description}</StText>
            </StTextWrap>
          </StTextBox>
        </>
      )}
      {accessToken && (
        <StBottom>
          {isEditable ? (
            <>
              <button onClick={handleSubmit}>수정완료</button>
              <button onClick={handleEdit}>취소</button>
            </>
          ) : (
            <button onClick={handleEdit}>수정하기</button>
          )}
          <button onClick={handleCloseModal}>닫기</button>
        </StBottom>
      )}
    </StLayout>
  );
};

export default ProjectDetailContent;

const StLayout = styled.div`
  padding: 30px 75px;

  @media (max-width: 600px) {
    padding: 0;
  }
`;

const StTextWrap = styled.div`
  display: flex;
  justify-content: start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StTitle = styled.div`
  width: 30%;
  font-weight: bold;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const StText = styled.div`
  width: 70%;
  margin-left: 20px;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }
`;

const StInput = styled.input`
  width: 70%;
  margin-left: 20px;
  height: 30px;
  background: #fafafa;
  border: 0.6px solid black;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }
`;

const StTextArea = styled.textarea`
  width: 70%;
  margin-left: 20px;
  height: 10vh;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }
`;

const StImageBox = styled.div`
  /* background-image: url('public/images/no-img.jpg'); */
  /* background-size: 250px 250px; */
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;

  /* margin-right: 20px; */
`;

const StImage = styled.img`
  width: 100%;
  height: 240px;
`;

const StTextBox = styled.div`
  width: 100%;
  white-space: normal;
  word-break: break-all;
  margin-bottom: 50px;

  div {
    font-size: 20px;
    padding-bottom: 10px;
  }
`;

const StBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 88px;
    height: 35px;
    border: 3px solid black;
    border-radius: 12px;
    margin: 0 12px;
  }
`;

const StError = styled.div`
  padding-left: 230px;
`;

const StImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StimageOptions = styled.div`
  display: flex;
  flex-direction: column-reverse;

  button {
    background: #d9d9d9;
    border-radius: 4px;
  }
`;
const StgetContainer = styled.div`
  display: grid;

  gap: 30px;
  margin-bottom: 20px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// const StImageContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 30px;
//   margin-bottom: 40px;
//   margin-top: 20px;

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
//   }
// `;
