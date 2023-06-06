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
              <StTitleContainer>
                <StTitle>프로젝트 제목</StTitle>
              </StTitleContainer>
              <StInput
                type="text"
                value={title}
                onChange={titleHandler}
                placeholder="프로젝트 제목을 입력하세요"
              />
            </StTextWrap>
            {titleError && <StError>{titleError}</StError>}
            <StTextWrap>
              <StTitleContainer>
                <StTitle>프로젝트 기간</StTitle>
              </StTitleContainer>
              <StInput
                type="text"
                value={term}
                onChange={termHandler}
                placeholder="프로젝트 기간을 입력하세요"
              />
            </StTextWrap>
            {termError && <StError>{termError}</StError>}
            <StTextWrap>
              <StTitleContainer>
                <StTitle>프로젝트 인원</StTitle>
              </StTitleContainer>
              <StInput
                type="text"
                value={people}
                onChange={peopleHandler}
                placeholder="프로젝트 인원을 입력하세요"
              />
            </StTextWrap>
            {peopleError && <StError>{peopleError}</StError>}
            <StTextWrap>
              <StTitleContainer>
                <StTitle>해당 포지션</StTitle>
              </StTitleContainer>
              <StInput
                type="text"
                value={position}
                onChange={positionHandler}
                placeholder="해당 포지션을 입력하세요"
              />
            </StTextWrap>
            {positionError && <StError>{positionError}</StError>}
            <StTextWrap>
              <StTitleContainer>
                <StTitle>프로젝트 설명</StTitle>
              </StTitleContainer>
              <StTextArea
                value={description}
                onChange={descriptionHandler}
                placeholder="프로젝트 설명을 입력하세요"
              ></StTextArea>
            </StTextWrap>
            {descriptionError && <StError>{descriptionError}</StError>}
          </StTextBox>
        </>
      ) : (
        <>
          <StGetImageContainer>
            <StImageBox>
              {data?.projectImageList.map((image: any, index: number) => (
                <StImage key={index} src={image.imageUrl} alt="Preview" />
              ))}
            </StImageBox>
          </StGetImageContainer>
          <StgetContainer>
            <StTextBox>
              <StTextWrap>
                <StTitleContainer>
                  <StTitle>프로젝트 제목</StTitle>
                </StTitleContainer>
                <StText>{data?.title}</StText>
              </StTextWrap>
              <StTextWrap>
                <StTitleContainer>
                  <StTitle>프로젝트 기간</StTitle>
                </StTitleContainer>
                <StText>{data?.term}</StText>
              </StTextWrap>
              <StTextWrap>
                <StTitleContainer>
                  <StTitle>프로젝트 인원</StTitle>
                </StTitleContainer>
                <StText>{data?.people}</StText>
              </StTextWrap>
              <StTextWrap>
                <StTitleContainer>
                  <StTitle>해당 포지션</StTitle>
                </StTitleContainer>
                <StText>{data?.position}</StText>
              </StTextWrap>
              <StTextWrap>
                <StTitleContainer>
                  <StTitle>프로젝트 설명</StTitle>
                </StTitleContainer>
                <StText>{data?.description}</StText>
              </StTextWrap>
            </StTextBox>
          </StgetContainer>
          <StBottom></StBottom>
        </>
      )}
      {accessToken && (
        <StBottom>
          {isEditable ? (
            <>
              <StGoodButton onClick={handleSubmit}>수정완료</StGoodButton>
              <StBadButton onClick={handleEdit}>취소</StBadButton>
            </>
          ) : (
            <StGoodButton onClick={handleEdit}>수정하기</StGoodButton>
          )}
          <StBadButton onClick={handleCloseModal}>닫기</StBadButton>
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
const StTitleContainer = styled.div`
  display: flex;
  width: 20%;
  align-items: center;
  justify-content: center;
`;

const StTitle = styled.div`
  font-weight: bold;
  width: 100%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const StText = styled.div`
  width: 80%;
  margin-left: 20px;
  border-bottom: 1px solid #d6d6d6;
  padding: 5px;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }
`;

const StInput = styled.input`
  width: 80%;
  margin-left: 20px;
  height: 3.3em;
  background: #fafafa;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  transition: font-size 0.3s;
  font-size: 15px;
  &:focus::placeholder {
    font-size: 0.8em;
    transition: font-size 0.3s;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }
`;

const StTextArea = styled.textarea`
  width: 80%;
  padding: 0.3em;
  margin-left: 20px;
  height: 10vh;
  background: #fafafa;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  transition: font-size 0.3s;
  font-size: 15px;

  &:focus::placeholder {
    font-size: 0.8em;
    transition: font-size 0.3s;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }
`;

const StImageBox = styled.div`
  /* background-image: url('public/images/no-img.jpg'); */
  /* background-size: 250px 250px; */
  border: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
  border-radius: 15px;
  /* margin-right: 20px; */
`;

const StImage = styled.img`
  width: 100%;
  height: 240px;
  border-radius: 15px;
`;

const StTextBox = styled.div`
  width: 100%;
  white-space: normal;
  word-break: break-all;
  margin-bottom: 40px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  /* div {
    padding-bottom: 10px;
  } */
`;

const StBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StGoodButton = styled.button`
  max-width: 120px;
  padding: 15px 25px;
  border-radius: 10px;
  font-weight: bold;
  margin: 0px 20px 0px;
  background-color: #6bf65f;
  &:hover {
    background-color: #4ae040;
    color: white;
  }
`;

const StBadButton = styled.button`
  padding: 15px 25px;
  margin: 0px 20px 0px;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-weight: bold;
  color: gray;
  &:hover {
    background-color: #d3d3d3;
  }
`;

const StError = styled.div`
  padding-left: 230px;
  font-size: 12px;
  color: red;
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

const StGetImageContainer = styled.div`
  display: grid;
  gap: 30px;
  margin-bottom: 40px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
