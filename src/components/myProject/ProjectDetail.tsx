import React, { useState, useEffect, ChangeEvent } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getProject, updateProject } from '@src/apis/projectapi';
import { styled } from 'styled-components';
import jwtDecode from 'jwt-decode';
import DefaultImg from '@src/assets/images/no-img.jpg';
import { ReactComponent as Pol } from 'src/assets/pol-icon.svg';
import { ReactComponent as Close } from 'src/assets/mypage-close.svg';
import { ReactComponent as Edit } from 'src/assets/project-edit.svg';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { ImageField } from './ImageField';
import { useInput } from '@src/Hook/useInput';
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
  const [isEditable, setIsEditable] = useState(false);
  const title = useInput('');
  const term = useInput('');
  const people = useInput('');
  const position = useInput('');
  const description = useInput('');
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const accessToken = localStorage.getItem('accesstoken') || '';

  const handleEdit = () => {
    if (accessToken) {
      setIsEditable(!isEditable);
    }
  };

  const { userId } = jwtDecode<{ userId: string }>(accessToken);

  const { data, refetch } = useQuery<ProjectDetailData>('project', async () => {
    const project = await getProject(projectId);
    return project;
  });

  useEffect(() => {
    if (data) {
      title.onChange({ target: { value: data.title } } as ChangeEvent<HTMLInputElement>);
      term.onChange({ target: { value: data.term } } as ChangeEvent<HTMLInputElement>);
      people.onChange({ target: { value: data.people } } as ChangeEvent<HTMLInputElement>);
      position.onChange({ target: { value: data.position } } as ChangeEvent<HTMLInputElement>);
      description.onChange({
        target: { value: data.description },
      } as ChangeEvent<HTMLTextAreaElement>);
      setPreviewImages(
        data.projectImageList.map((image: ImageType) => image.imageUrl) || DefaultImg
      );
    }
  }, [data]);

  const updateProjectMutation = useMutation(
    async (formData: FormData) => {
      if (!title.value) {
        title.setErrorText('제목을 입력하세요');
        throw new Error();
      }
      if (!term.value) {
        term.setErrorText('기간을 입력하세요');
        throw new Error();
      }
      if (!people.value) {
        people.setErrorText('인원을 입력하세요');
        throw new Error();
      }
      if (!position.value) {
        position.setErrorText('담당 포지션을 입력하세요');
        throw new Error();
      }
      if (!description.value) {
        description.setErrorText('설명을 입력하세요');
        throw new Error();
      }
      if (title.value.length < 3 || title.value.length > 45) {
        title.setErrorText('제목은 3자 이상 45자 이하여야 합니다.');
        throw new Error();
      }
      if (description.value.length < 3 || description.value.length > 1500) {
        description.setErrorText('설명은 3자 이상 1500자 이하여야 합니다.');
        throw new Error();
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
    console.log(imageList);
    const formData = new FormData();
    const imageBlob = new Blob(imageList, { type: 'application/json' });
    const text = JSON.stringify({
      title: title.value,
      term: term.value,
      people: people.value,
      position: position.value,
      description: description.value,
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
              <StHeader>
                <Pol />
                <Close onClick={handleCloseModal}></Close>
              </StHeader>
              {isEditable ? (
                <>
                  <ImageField
                    previewImages={previewImages}
                    imageHandler={imageHandler}
                    removeImage={removeImageHandler}
                  />
                  <StTextBox>
                    <InputField
                      title="프로젝트 제목"
                      value={title.value}
                      onChange={title.onChange}
                      placeholder="프로젝트 제목을 입력하세요"
                      error={title.error}
                    />
                    <InputField
                      title="프로젝트 기간"
                      value={term.value}
                      onChange={term.onChange}
                      placeholder="프로젝트 기간을 입력하세요"
                      error={term.error}
                    />
                    <InputField
                      title="프로젝트 인원"
                      value={people.value}
                      onChange={people.onChange}
                      placeholder="프로젝트 인원을 입력하세요"
                      error={people.error}
                    />
                    <InputField
                      title="해당 포지션"
                      value={position.value}
                      onChange={position.onChange}
                      placeholder="해당 포지션을 입력하세요"
                      error={position.error}
                    />
                    <TextAreaField
                      title="프로젝트 설명"
                      value={description.value}
                      onChange={description.onChange}
                      placeholder="프로젝트 설명을 입력하세요"
                      error={description.error}
                    />
                  </StTextBox>
                </>
              ) : (
                <div>
                  <StGetImageContainer>
                    <StGetImageBox>
                      {data?.projectImageList.map((image: ImageType, index: number) => (
                        <StImage key={index} src={image.imageUrl} alt="Preview" />
                      ))}
                    </StGetImageBox>
                    <StGetHeader>
                      {accessToken && userId === data?.userId && <Edit onClick={handleEdit}></Edit>}
                      <h1>{data?.title}</h1>
                      <p>{data?.term}</p>
                    </StGetHeader>
                  </StGetImageContainer>
                  <div>
                    <StGetTextWrap>
                      <div>프로젝트 인원</div>
                      <p>{data?.people}</p>
                    </StGetTextWrap>
                    <StGetTextWrap>
                      <div>해당 포지션</div>
                      <p>{data?.position}</p>
                    </StGetTextWrap>
                  </div>
                  <StTextWrap>
                    <StTitle>프로젝트 설명</StTitle>
                    <StText>{data?.description}</StText>
                  </StTextWrap>
                </div>
              )}
              {isEditable && (
                <StBottom>
                  <StGoodButton onClick={handleSubmit}>수정완료</StGoodButton>
                  <StBadButton onClick={handleEdit}>취소</StBadButton>
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
  border-radius: 35px;
  background: #fefefe;
  width: 700px;
  height: 840px;
  overflow-y: auto;
  max-height: 100%;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const StLayout = styled.div`
  padding: 50px 56px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StTextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  width: 100%;
  margin-bottom: 1px;
`;

const StImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const StText = styled.div`
  width: 100%;
  padding: 5px 0px;
  /* margin-bottom: 20px; */
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  width: 595px;
  height: 230px;
  left: 50px;
  top: 530px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }
`;

const StTextBox = styled.div`
  width: 100%;
  white-space: normal;
  word-break: break-all;
  margin-bottom: 40px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 11px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const StBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StGoodButton = styled.button`
  width: 160px;
  height: 53px;
  left: 270px;
  top: 735px;
  border-radius: 8px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;

  background-color: #6bf65f;
  &:hover {
    background-color: #4ae040;
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const StBadButton = styled.button`
  border: 1px solid lightgray;
  font-weight: bold;
  width: 160px;
  height: 53px;
  left: 270px;
  top: 735px;
  border-radius: 8px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  color: gray;

  &:hover {
    background-color: #d3d3d3;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const StGetImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StGetImageBox = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

const StGetHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  h1 {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 40px;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  p {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }
`;

const StGetTextWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  div {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    margin-right: 20px;
  }
  p {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
  }
`;
