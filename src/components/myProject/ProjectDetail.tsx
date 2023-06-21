import React, { useState, useEffect, ChangeEvent, ChangeEventHandler } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getProject, updateProject } from '@src/apis/projectapi';
import { styled } from 'styled-components';
import jwtDecode from 'jwt-decode';
import DefaultImg from '@src/assets/images/no-img.jpg';
import { ReactComponent as Pol } from 'src/assets/pol-icon.svg';
import { ReactComponent as Close } from 'src/assets/mypage-close.svg';
import { ImageField } from './ImageField';
import { useInput } from '@src/Hook/useInput';
import { FormFields } from './FormFields';
import { GetProject } from './GetProject';
import imageCompression from 'browser-image-compression';
import { ReactComponent as ProFileUpdate } from 'src/assets/mypage-profile.svg';
import Modal from 'src/components/common/Modal';
export interface ProjectDetailData {
  title: string;
  term: string;
  people: string;
  position: string;
  description: string;
  projectImageList: [];
  userId: string;
  nickname: string;
}
export interface ImageType {
  id: number;
  imageUrl: string;
}
const ProjectModal: React.FC<{
  showModal: boolean;
  projectId: number | null;
  setShowModal: (showModal: boolean) => void;
  getMyPortfolio: () => void;
}> = React.memo(({ showModal, setShowModal, projectId, getMyPortfolio }) => {
  const [isEditable, setIsEditable] = useState(false);
  const title = useInput('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateError, setDateError] = useState('');
  const people = useInput('');
  const position = useInput('');
  const description = useInput('');
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const accessToken = localStorage.getItem('accesstoken') || '';
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleEdit = () => {
    if (accessToken) {
      setIsEditable(!isEditable);
    }
  };
  let userId;
  if (accessToken) {
    userId = jwtDecode<{ userId: string }>(accessToken).userId;
  }
  const { data, refetch } = useQuery<ProjectDetailData>('project', async () => {
    const project = await getProject(projectId);
    return project;
  });

  useEffect(() => {
    if (data) {
      title.onChange({ target: { value: data.title } } as ChangeEvent<HTMLInputElement>);
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
      if (!startDate || !endDate) {
        setDateError('시작일과 마감일을 선택하세요');
        throw new Error();
      }
      if (startDate > endDate) {
        setDateError('시작일은 마감일보다 이전이어야 합니다.');
        throw new Error();
      }
      if (!title.value) {
        title.setErrorText('제목을 입력하세요');
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
      if (position.value.length < 3 || position.value.length > 20) {
        position.setErrorText('20자 이내로 입력하세요');
        throw new Error();
      }

      await updateProject(formData, projectId);
      refetch();
      setIsEditable(false);
    },
    {
      onSuccess: () => {
        getMyPortfolio();
        setShowSuccessModal(true);
      },
    }
  );

  const imageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 0) {
      const fileList = Array.from(e.target.files);
      const options = {
        maxSizeMB: 0.5,
      };
      const compressedImages = await Promise.all(
        fileList.map(file => imageCompression(file, options))
      );
      setImageList(compressedImages);
      const previewURLs = compressedImages.map(file => URL.createObjectURL(file));
      setPreviewImages(previewURLs);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const imageBlob = new Blob(imageList, { type: 'application/json' });
    const text = JSON.stringify({
      title: title.value,
      term: `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`,
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

  const keepModalWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {showModal && (
        <ModalWrapper onClick={keepModalWindow}>
          <ModalContent>
            {showSuccessModal && (
              <Modal
                Icon={ProFileUpdate}
                mainText="프로젝트가 성공적으로 수정되었습니다."
                mainButtonText="확인"
                onClose={() => {
                  setShowSuccessModal(false);
                  setShowModal(false);
                }}
              />
            )}
            <ScrollableContent>
              <StLayout>
                <StHeader>
                  <Pol />
                  <Close onClick={handleCloseModal}></Close>
                </StHeader>
                {isEditable ? (
                  <>
                    <ImageField previewImages={previewImages} imageHandler={imageHandler} />
                    <StTextBox>
                      <FormFields
                        title={title}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        dateError={dateError}
                        people={people}
                        position={position}
                        description={description}
                      />
                    </StTextBox>
                  </>
                ) : (
                  <GetProject
                    projectData={data}
                    handleEdit={handleEdit}
                    accessToken={accessToken}
                    userId={userId}
                  />
                )}
                {isEditable && (
                  <StBottom>
                    <StBadButton onClick={handleEdit}>취소</StBadButton>
                    <StGoodButton onClick={handleSubmit}>수정완료</StGoodButton>
                  </StBottom>
                )}
              </StLayout>
            </ScrollableContent>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
});
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
  z-index: 9999;
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

const ScrollableContent = styled.div`
  height: 100%;
  overflow-y: auto;
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
  background-color: #c7c7c7;

  &:hover {
    background-color: #d3d3d3;
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;
