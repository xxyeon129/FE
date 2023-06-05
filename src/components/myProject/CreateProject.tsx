import React from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { createProject } from '@src/apis/projectapi';

// 프로젝트 작성
const CreateProject: React.FC<{
  showModal1: boolean;
  setShowModal1: (showModal1: boolean) => void;
}> = ({ showModal1, setShowModal1 }) => {
  const [title, setTitle] = useState<string>('');
  const [term, setTerm] = useState<string>('');
  const [people, setPeople] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  // 에러
  const [titleError, setTitleError] = useState<string>('');
  const [termError, setTermError] = useState<string>('');
  const [peopleError, setPeopleError] = useState<string>('');
  const [positionError, setPositionError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');

  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError('');
  };

  const termHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    setTermError('');
  };

  const peopleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPeople(e.target.value);
    setPeopleError('');
  };

  const positionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
    setPositionError('');
  };

  const descriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescriptionError('');
  };

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 0) {
      const fileList = Array.from(e.target.files);
      setImageList(fileList);
      console.log(fileList);

      const previewURLs = fileList.map(file => URL.createObjectURL(file));
      setPreviewImages(previewURLs);
    }
  };

  const mutation = useMutation(async () => {
    if (!title) {
      setTitleError('제목을 입력하세요');
      return;
    }
    if (!term) {
      setTermError('기간을 입력하세요');
      return;
    }
    if (!people) {
      setPeopleError('인원을 입력하세요');
      return;
    }
    if (!position) {
      setPositionError('담당 포지션을 입력하세요');
      return;
    }
    if (!description) {
      setDescriptionError('설명을 입력하세요');
      return;
    }
    if (title.length < 3 || title.length > 50) {
      setTitleError('제목은 3자 이상 50자 이하여야 합니다.');
      return;
    }
    if (description.length < 3 || description.length > 50) {
      setDescriptionError('제목은 3자 이상 50자 이하여야 합니다.');
      return;
    }

    const formData = new FormData();
    const imageBlob = new Blob(imageList);
    const text = JSON.stringify({
      title,
      term,
      people,
      position,
      description,
    });
    const textBlob = new Blob([text], { type: 'application/json' });
    formData.append('projectRequestDto', textBlob);
    formData.append('images', imageBlob, '.jpg' || '.png' || '.jpeg');
    setShowModal1(false);
    return createProject(formData);
  });

  const removeImage = () => {
    setImageList([]);
    setPreviewImages([]);
  };

  const handleSubmit = () => {
    mutation.mutate();
  };

  const handleCloseModal = () => {
    setShowModal1(false);
  };

  return (
    <>
      {showModal1 && (
        <ModalWrapper>
          <ModalContent>
            <StLayout>
              <h1>Create Project</h1>
              <StImageContainer>
                <StImageBox>
                  {previewImages.map((url, index) => (
                    <StImage key={index} src={url} alt="프리뷰" />
                  ))}
                </StImageBox>
                <StimageOptions>
                  <input type="file" onChange={imageHandler}></input>
                  <button onClick={removeImage}>이미지 삭제</button>
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
              <StBottom>
                <button onClick={handleSubmit}>작성완료</button>
                <button onClick={handleCloseModal}>뒤로가기</button>
              </StBottom>
            </StLayout>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default CreateProject;

// const Modal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: white;
// `;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 35px;
  background: #fefefe;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-radius: 35px;
  width: 900px;
  height: 800px;
  overflow-y: auto;
  max-height: 100%;

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
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
