import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getProject, updateProject } from '@src/apis/projectapi';
import { styled } from 'styled-components';
import ProjectDetailContent from './ProjectDetailContent';
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
  const [titleError, setTitleError] = useState<string>('');
  const [termError, setTermError] = useState<string>('');
  const [peopleError, setPeopleError] = useState<string>('');
  const [positionError, setPositionError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const accessToken = localStorage.getItem('accesstoken');

  // 돌려줘
  const handleEdit = () => {
    if (accessToken) {
      setIsEditable(!isEditable);
    }
  };

  const { data, refetch } = useQuery<ProjectDetailData>('project', async () => {
    const project = await getProject();
    return project;
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
    setIsEditable(false);
  });

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
        <ModalWrapper>
          <ModalContent>
            <ProjectDetailContent
              isEditable={isEditable}
              data={data}
              previewImages={previewImages}
              title={title}
              term={term}
              people={people}
              position={position}
              description={description}
              imageList={imageList}
              titleError={titleError}
              termError={termError}
              peopleError={peopleError}
              positionError={positionError}
              descriptionError={descriptionError}
              accessToken={accessToken}
              handleEdit={handleEdit}
              titleHandler={titleHandler}
              termHandler={termHandler}
              peopleHandler={peopleHandler}
              positionHandler={positionHandler}
              descriptionHandler={descriptionHandler}
              imageHandler={imageHandler}
              removeImageHandler={removeImageHandler}
              handleSubmit={handleSubmit}
              handleCloseModal={handleCloseModal}
            />
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
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-radius: 35px;
  width: 900px;
  height: 865px;
  overflow-y: auto;
  max-height: 100%;

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
