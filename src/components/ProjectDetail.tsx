import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useQuery, useMutation } from 'react-query';
import { getProject, updateProject } from '@src/apis/ProjectApi';
// 프로젝트 상세페이지 및 수정 기능
interface ProjectDetailData {
  title: string;
  term: string;
  people: string;
  position: string;
  description: string;
  projectImageList: [];
}

const ProjectModal: React.FC<{
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}> = ({ showModal, setShowModal }) => {
  const { projectId } = useParams();
  const [isEditable, setIsEditable] = useState(false);
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

  const handleEdit = () => setIsEditable(!isEditable);

  const { data, refetch } = useQuery<ProjectDetailData>('project', async () => {
    const project = await getProject();
    return project;
  });

  const updateProjectMutation = useMutation(async (formData: FormData) => {
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
    await updateProject(formData);
    refetch();
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setTerm(data.term);
      setPeople(data.people);
      setPosition(data.position);
      setDescription(data.description);
      setPreviewImages(data.projectImageList.map((image: any) => image.imageUrl));
    }
  }, [data]);

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
    const textBlob = new Blob([text], { type: 'image' });
    formData.append('projectRequestDto', textBlob);
    formData.append('images', imageBlob);

    try {
      await updateProjectMutation.mutateAsync(formData);
      console.log('Project updated');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditable(false);
  };

  return (
    <>
      {showModal && (
        <Modal>
          {isEditable ? (
            <>
              <div>
                <div>
                  {previewImages.map((url, index) => (
                    <img key={index} src={url} alt="Preview" />
                  ))}
                </div>
                <input type="file" onChange={imageHandler} />
              </div>
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
                <textarea value={description} onChange={descriptionHandler}></textarea>
              </div>
              {descriptionError && <div>{descriptionError}</div>}
            </>
          ) : (
            <>
              <div>
                {data?.projectImageList.map((image: any, index: number) => (
                  <img key={index} src={image.imageUrl} alt="Preview" />
                ))}
              </div>
              <div>{data?.title}</div>
              <div>{data?.term}</div>
              <div>{data?.people}</div>
              <div>{data?.position}</div>
              <div>{data?.description}</div>
            </>
          )}
          {isEditable ? (
            <>
              <button onClick={handleSubmit}>수정완료</button>
              <button onClick={handleEdit}>취소</button>
            </>
          ) : (
            <button onClick={handleEdit}>수정하기</button>
          )}
          <button onClick={handleCloseModal}>닫기</button>
        </Modal>
      )}
    </>
  );
};

export default ProjectModal;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;
