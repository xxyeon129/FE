import React from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { createProject } from '@src/apis/project';

const TestCreateProjectModal: React.FC<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}> = ({ setIsModalOpen, onClick }) => {
  const [title, setTitle] = useState<string>('');
  const [term, setTerm] = useState<string>('');
  const [people, setPeople] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const termHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const peopleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPeople(e.target.value);
  };

  const positionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  const descriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const imagehandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 0) {
      const fileList = Array.from(e.target.files);
      setImageList(fileList);

      const previewURLs = fileList.map(file => URL.createObjectURL(file));
      setPreviewImages(previewURLs);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
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
      formData.append('images', imageBlob);
      return createProject(formData);
    },
    {
      onSuccess: data => {
        queryClient.setQueryData('projectData', data);
        // console.log(data);
      },
    }
  );

  const testHandler = () => {
    mutation.mutateAsync();
  };

  const handleSubmit = async () => {
    await mutation.mutateAsync();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StModal onClick={onClick}>
      <StModalDescription>프로젝트 작성</StModalDescription>
      <StInputContainer>
        <StLabel htmlFor="title">프로젝트 제목</StLabel>
        <input type="text" id="title" value={title} onChange={titleHandler} />
      </StInputContainer>
      <StInputContainer>
        <StLabel htmlFor="term">프로젝트 기간</StLabel>
        <input type="text" id="term" value={term} onChange={termHandler} />
      </StInputContainer>
      <StInputContainer>
        <StLabel htmlFor="people">프로젝트 인원</StLabel>
        <input type="text" value={people} onChange={peopleHandler} />
      </StInputContainer>
      <StInputContainer>
        <StLabel htmlFor="position">담당 포지션</StLabel>
        <input type="text" value={position} onChange={positionHandler} />
      </StInputContainer>

      <div>
        <input type="file" onChange={imagehandler}></input>
        <div>
          {previewImages.map((url, index) => (
            <img key={index} src={url} alt="프리뷰" />
          ))}
        </div>
      </div>

      <div>
        <StLabel htmlFor="position">프로젝트 설명</StLabel>
        <textarea value={description} onChange={descriptionHandler}></textarea>
      </div>
      <StButtonContainer>
        <StButton onClick={handleSubmit}>등록</StButton>
        <StButton onClick={testHandler}>test</StButton>
        <StButton onClick={handleCloseModal}>닫기</StButton>
      </StButtonContainer>
    </StModal>
  );
};

const StModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;

  display: flex;
  flex-direction: column;
`;

const StModalDescription = styled.h2``;

const StInputContainer = styled.div``;

const StLabel = styled.label``;

const StButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: right;
`;

const StButton = styled.button`
  max-width: 50px;
  border: 1px solid;
`;

export default TestCreateProjectModal;
