import React from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { projectDataAtom } from '@src/states/createProjectState';
import { useRecoilState } from 'recoil';
import { createProject } from '@src/apis/projectapi';
import { ReactComponent as Pol } from 'src/assets/pol-icon.svg';
import { ImageField } from './ImageField';
import { useInput } from '@src/Hook/useInput';
import { FormFields } from './FormFields';
import imageCompression from 'browser-image-compression';

const CreateProject: React.FC<{
  showModal1: boolean;
  setShowModal1: (showModal1: boolean) => void;
}> = React.memo(({ showModal1, setShowModal1 }) => {
  const title = useInput('');
  // const term = useInput('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const people = useInput('');
  const position = useInput('');
  const description = useInput('');
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [projectData, setProjectData] = useRecoilState(projectDataAtom);

  const imageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 0) {
      const fileList = Array.from(e.target.files);
      // 이미지 리사이징 처리
      const options = {
        maxSizeMB: 0.5,
        // maxWidthOrHeight: 800,
      };
      const compressedImages = await Promise.all(
        fileList.map(file => imageCompression(file, options))
      );
      setImageList(compressedImages);
      const previewURLs = compressedImages.map(file => URL.createObjectURL(file));
      setPreviewImages(previewURLs);
    }
  };
  const removeImage = () => {
    setImageList([]);
    setPreviewImages([]);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      const formData = new FormData();
      const imageBlob = new Blob(imageList);
      const text = JSON.stringify({
        title: title.value,
        // term: term.value,
        term: `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`,
        people: people.value,
        position: position.value,
        description: description.value,
      });
      const textBlob = new Blob([text], { type: 'application/json' });
      formData.append('projectRequestDto', textBlob);
      formData.append('images', imageBlob, '.jpg' || '.png' || '.jpeg');
      return createProject(formData);
    },
    {
      onSuccess: data => {
        queryClient.setQueryData('projectData', data.data);
        setProjectData(data.data);
        alert('프로젝트가 성공적으로 작성되었습니다.');
      },
      onError: () => {
        alert('프로젝트 작성에 실패했습니다.');
      },
    }
  );

  const handleSubmit = async () => {
    const refreshToken = localStorage.getItem('refreshtoken');

    if (!refreshToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!title.value) {
      title.setErrorText('제목을 입력하세요');
      return;
    }
    // if (!term.value) {
    //   term.setErrorText('기간을 입력하세요');
    //   return;
    // }
    if (!startDate || !endDate) {
      alert('시작일과 마감일을 선택하세요');
      return;
    }
    if (!people.value) {
      people.setErrorText('인원을 입력하세요');
      return;
    }
    if (!position.value) {
      position.setErrorText('담당 포지션을 입력하세요');
      return;
    }
    if (!description.value) {
      description.setErrorText('설명을 입력하세요');
      return;
    }
    if (title.value.length < 3 || title.value.length > 50) {
      title.setErrorText('제목은 3자 이상 50자 이하여야 합니다.');
      return;
    }
    if ((description.value.length < 3 || description.value, length > 1500)) {
      description.setErrorText('설명은 3자 이상 1500자 이하여야 합니다.');
      return;
    }
    await mutation.mutateAsync();
    setShowModal1(false);
  };

  const handleCloseModal = () => {
    setShowModal1(false);
  };

  const keepModalWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {showModal1 && (
        <ModalWrapper onClick={keepModalWindow}>
          <ModalContent onClick={keepModalWindow}>
            <StLayout>
              <StHeader>
                <Pol />
              </StHeader>
              <ImageField
                previewImages={previewImages}
                imageHandler={imageHandler}
                removeImage={removeImage}
              />
              <StTextBox>
                <FormFields
                  title={title}
                  // term={term}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  people={people}
                  position={position}
                  description={description}
                />
              </StTextBox>
              <StBottom>
                <StBadButton onClick={handleCloseModal}>닫기</StBadButton>
                <StGoodButton onClick={handleSubmit}>등록하기</StGoodButton>
              </StBottom>
            </StLayout>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
});
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
  z-index: 9999;

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
