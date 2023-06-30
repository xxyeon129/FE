import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { projectDataAtom } from '@src/states/createProjectState';
import { useRecoilState } from 'recoil';
import { createProject } from '@src/apis/projectapi';
import { ReactComponent as Pol } from 'src/assets/pol-icon.svg';
import { ImageField } from './ImageField';
import { useInput } from '@src/Hook/useInput';
import { FormFields } from './FormFields';
import { ReactComponent as ProFileUpdate } from 'src/assets/mypage-profile.svg';
import Modal from 'src/components/common/Modal';
import { useImageHandling } from '@src/Hook/useImageHandling';

const CreateProject: React.FC<{
  showModal1: boolean;
  setShowModal1: (showModal1: boolean) => void;
}> = React.memo(({ showModal1, setShowModal1 }) => {
  const title = useInput('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const people = useInput('');
  const position = useInput('');
  const description = useInput('');
  const [projectData, setProjectData] = useRecoilState(projectDataAtom);
  const [dateError, setDateError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { imageList, previewImages, errorMessage, imageHandler } = useImageHandling();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      const formData = new FormData();
      const imageBlob = new Blob(imageList);
      const text = JSON.stringify({
        title: title.value,
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
        setShowSuccessModal(true);
      },
    }
  );

  const isFormValid =
    title.value &&
    startDate &&
    endDate &&
    startDate <= endDate &&
    people.value &&
    position.value &&
    description.value;

  const handleSubmit = async () => {
    await mutation.mutateAsync();
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
            {showSuccessModal && (
              <Modal
                Icon={ProFileUpdate}
                mainText="프로젝트가 성공적으로 작성되었습니다."
                mainButtonText="확인"
                onClose={() => {
                  setShowSuccessModal(false);
                  setShowModal1(false);
                }}
              />
            )}
            <ScrollableContent>
              <StLayout>
                <StHeader>
                  <Pol />
                </StHeader>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
                <StBottom>
                  <StBadButton onClick={handleCloseModal}>닫기</StBadButton>
                  <StGoodButton onClick={handleSubmit} disabled={!isFormValid}>
                    등록하기
                  </StGoodButton>
                </StBottom>
              </StLayout>
            </ScrollableContent>
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
  height: 870px;
  overflow-y: auto;
  max-height: 100%;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  z-index: 9999;
  color: black;

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
const ErrorMessage = styled.div`
  font-size: 14px;
  padding: 0px 10px;
  color: red;
`;
