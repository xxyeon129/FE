import React from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { createProject } from '@src/apis/ProjectApi';
import { error } from 'console';
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
    return createProject(formData);
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  const handleCloseModal = () => {
    setShowModal1(false);
  };

  return (
    <>
      {showModal1 && (
        <Modal>
          <div>
            <div>
              <input type="text" value={title} onChange={titleHandler} />
            </div>
            {titleError && <div>{titleError}</div>}
            <div>
              <input type="text" value={term} onChange={termHandler} />
            </div>
            {termError && <div>{termError}</div>}
            <div>
              <input type="text" value={people} onChange={peopleHandler} />
            </div>
            {peopleError && <div>{peopleError}</div>}
            <div>
              <input type="text" value={position} onChange={positionHandler} />
            </div>
            {positionError && <div>{positionError}</div>}
          </div>
          <div>
            <input type="file" onChange={imageHandler}></input>
          </div>
          <div>
            {previewImages.map((url, index) => (
              <img key={index} src={url} alt="프리뷰" />
            ))}
          </div>
          <div>
            <textarea value={description} onChange={descriptionHandler}></textarea>
            {descriptionError && <div>{descriptionError}</div>}
          </div>
          <button onClick={handleSubmit}>작성완료</button>
          <button onClick={handleCloseModal}>뒤로가기</button>
        </Modal>
      )}
    </>
  );
};

export default CreateProject;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;
