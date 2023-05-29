import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { createProject } from './test/test';

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

  const mutation = useMutation(async () => {
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
            <input type="text" value={title} onChange={titleHandler} />
            <input type="text" value={term} onChange={termHandler} />
            <input type="text" value={people} onChange={peopleHandler} />
            <input type="text" value={position} onChange={positionHandler} />
          </div>
          <div>
            <input type="file" onChange={imagehandler}></input>
            {/* 미리보기 */}
            <div>
              {previewImages.map((url, index) => (
                <img key={index} src={url} alt="프리뷰" />
              ))}
            </div>
          </div>

          <div>
            <textarea value={description} onChange={descriptionHandler}></textarea>
          </div>
          <button onClick={handleSubmit}>등록</button>
          <button onClick={handleCloseModal}>닫기</button>
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
