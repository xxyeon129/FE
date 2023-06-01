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
  const handleEdit = () => setIsEditable(!isEditable);

  const { data, refetch } = useQuery<ProjectDetailData>('project', async () => {
    const project = await getProject();
    return project;
  });

  const updateProjectMutation = useMutation(async (formData: FormData) => {
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
                <input type="text" value={title} onChange={titleHandler} />
                <input type="text" value={term} onChange={termHandler} />
                <input type="text" value={people} onChange={peopleHandler} />
                <input type="text" value={position} onChange={positionHandler} />
              </div>
              <div>
                <input type="file" onChange={imageHandler} />
                <div>
                  {previewImages.map((url, index) => (
                    <img key={index} src={url} alt="Preview" />
                  ))}
                </div>
              </div>
              <div>
                <textarea value={description} onChange={descriptionHandler}></textarea>
              </div>
            </>
          ) : (
            <>
              <div>{data?.title}</div>
              <div>{data?.term}</div>
              <div>{data?.people}</div>
              <div>{data?.position}</div>
              <div>{data?.description}</div>
              <div>
                {data?.projectImageList.map((image: any, index: number) => (
                  <img key={index} src={image.imageUrl} alt="Preview" />
                ))}
              </div>
            </>
          )}
          {isEditable ? (
            <>
              <button onClick={handleSubmit}>Save</button>
              <button onClick={handleEdit}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
          <button onClick={handleCloseModal}>Close</button>
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
