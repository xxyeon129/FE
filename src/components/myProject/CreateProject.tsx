import React from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { projectDataAtom } from '@src/states/createProjectState';
import { useRecoilState } from 'recoil';
import { createProject } from '@src/apis/projectapi';
import { ReactComponent as UploadIcon } from 'src/assets/projetcimage-upload.svg';
import { ReactComponent as ImageEditIcon } from 'src/assets/projectimage-edit.svg';

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

  const [projectData, setProjectData] = useRecoilState(projectDataAtom);

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

      const previewURLs = fileList.map(file => URL.createObjectURL(file));
      setPreviewImages(previewURLs);
    }
  };

  const mutation = useMutation(createProject, {
    onSuccess: () => {
      alert('프로젝트가 성공적으로 작성되었습니다.');
    },
    onError: () => {
      alert('프로젝트 작성에 실패했습니다.');
    },
  });

  const removeImage = () => {
    setImageList([]);
    setPreviewImages([]);
  };

  const handleSubmit = async () => {
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

    // const recoilData = { title, term, people, position, description, imageList };
    // setProjectData(recoilData);
    return createProject(formData);
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
                  <StImageUploadWrap>
                    <label htmlFor="file">
                      <UploadIcon />
                    </label>
                    <StFileUpload type="file" id="file" onChange={imageHandler}></StFileUpload>
                    <ImageEditIcon onClick={removeImage} />
                  </StImageUploadWrap>
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
              <StBottom>
                <StGoodButton onClick={handleSubmit}>작성완료</StGoodButton>
                <StBadButton onClick={handleCloseModal}>닫기</StBadButton>
              </StBottom>
            </StLayout>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default CreateProject;

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
  /* border: 3px solid rgba(0, 0, 0, 0.2); */
  /* border-radius: 35px; */
  width: 900px;
  height: 865px;
  overflow-y: auto;
  max-height: 100%;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

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
const StTitleContainer = styled.div`
  display: flex;
  width: 20%;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 100%;
  }
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
  background-image: url('public/images/no-img.jpg');
  background-size: 100% 100%;
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
  padding-left: 165px;
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

const StFileUpload = styled.input`
  width: 0;
  height: 42px;
  opacity: 0;
`;

const StImageUploadWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0px;
`;
