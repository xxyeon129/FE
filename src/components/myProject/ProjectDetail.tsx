import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getProject, updateProject } from '@src/apis/projectapi';
import { styled } from 'styled-components';
import { ReactComponent as UploadIcon } from 'src/assets/projetcimage-upload.svg';
import { ReactComponent as ImageEditIcon } from 'src/assets/projectimage-edit.svg';
import jwtDecode from 'jwt-decode';
import DefaultImg from 'public/images/no-img.jpg';

interface ProjectDetailData {
  title: string;
  term: string;
  people: string;
  position: string;
  description: string;
  projectImageList: [];
  userId: string;
}
interface ImageType {
  id: number;
  imageUrl: string;
}

const ProjectModal: React.FC<{
  showModal: boolean;
  projectId: number | null;
  setShowModal: (showModal: boolean) => void;
}> = ({ showModal, setShowModal, projectId }) => {
  // const { projectId } = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [term, setTerm] = useState<string>('');
  const [people, setPeople] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [titleError, setTitleError] = useState<string>('');
  const [termError, setTermError] = useState<string>('');
  const [peopleError, setPeopleError] = useState<string>('');
  const [positionError, setPositionError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const accessToken = localStorage.getItem('accesstoken') || '';

  const handleEdit = () => {
    if (accessToken) {
      setIsEditable(!isEditable);
    }
  };

  const { userId } = jwtDecode<{ userId: string }>(accessToken);
  console.log(userId);

  const { data, refetch } = useQuery<ProjectDetailData>('project', async () => {
    const project = await getProject(projectId);
    return project;
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setTerm(data.term);
      setPeople(data.people);
      setPosition(data.position);
      setDescription(data.description);
      setPreviewImages(
        data.projectImageList.map((image: ImageType) => image.imageUrl) || DefaultImg
      );
    }
  }, [data]);

  const updateProjectMutation = useMutation(
    async (formData: FormData) => {
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

      await updateProject(formData, projectId);
      refetch();
      setIsEditable(false);
    },
    {
      onSuccess: () => {
        alert('수정되었습니다.');
      },
    }
  );
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

  const removeImageHandler = () => {
    setImageList([]);
    setPreviewImages([]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const imageBlob = new Blob(imageList, { type: 'application/json' });
    const text = JSON.stringify({
      title,
      term,
      people,
      position,
      description,
    });
    const textBlob = new Blob([text], { type: 'application/json' });
    formData.append('projectRequestDto', textBlob);
    formData.append('images', imageBlob);

    await updateProjectMutation.mutateAsync(formData);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditable(false);
  };

  return (
    <>
      {showModal && (
        <ModalWrapper>
          <ModalContent>
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
                      <StImageUploadWrap>
                        <StLabel htmlFor="file">파일 선택</StLabel>
                        <StFileUpload type="file" id="file" onChange={imageHandler} />
                        <StImgEditDiv onClick={removeImageHandler}>이미지 삭제</StImgEditDiv>
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
                </>
              ) : (
                <>
                  <StGetImageContainer>
                    <StImageBox>
                      {data?.projectImageList.map((image: ImageType, index: number) => (
                        <StImage key={index} src={image.imageUrl} alt="Preview" />
                      ))}
                    </StImageBox>
                  </StGetImageContainer>
                  <StgetContainer>
                    <StGetTextBox>
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
                    </StGetTextBox>
                  </StgetContainer>
                </>
              )}
              {accessToken && userId === data?.userId ? (
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
              ) : (
                <StBottom>
                  <StBadButton onClick={handleCloseModal}>닫기</StBadButton>
                </StBottom>
              )}
            </StLayout>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};
export default ProjectModal;

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
  border: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
  border-radius: 15px;
  background-image: url('public/images/no-img.jpg');
  background-size: 100% 100%;
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
const StgetContainer = styled.div`
  display: grid;

  gap: 60px;
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

const StGetTextBox = styled.div`
  width: 100%;
  white-space: normal;
  word-break: break-all;
  margin-bottom: 40px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 55px;
`;

const StLabel = styled.label`
  width: 160px;
  height: 44px;
  background: #ebebeb;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StImgEditDiv = styled.div`
  width: 160px;
  height: 44px;
  background: #ebebeb;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
