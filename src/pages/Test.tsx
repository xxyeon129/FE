import React, { useState } from 'react';
import ProjectModal from '@src/components/myProject/ProjectDetail';
import AutoSearch from '@src/components/AutoSearch';
import Project from '@src/components/myProject/CreateProject';
import NaverLogin from '@src/components/NaverLogin';
const Test: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  return (
    <>
      test
      <button onClick={() => setShowModal(true)}>Details</button>
      <button onClick={() => setShowModal1(true)}>Project</button>
      <ProjectModal showModal={showModal} setShowModal={setShowModal} />
      <Project showModal1={showModal1} setShowModal1={setShowModal1} />
      <AutoSearch />
      <NaverLogin />
    </>
  );
};

export default Test;
