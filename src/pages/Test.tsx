import React, { useState } from 'react';
import ProjectModal from '@src/components/myProject/ProjectDetail';
import AutoSearch from '@src/components/AutoSearch';
import Project from '@src/components/myProject/CreateProject';
import NaverLogin from '@src/components/socialLogin/NaverLogin';
import GoogleLogin from '@src/components/socialLogin/GoogleLogin';
import { styled } from 'styled-components';
const Test = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  return (
    <TestContainer>
      {/* <button onClick={() => setShowModal(true)}>Details</button>
      <button onClick={() => setShowModal1(true)}>Project</button> */}
      {/* <ProjectModal showModal={showModal} setShowModal={setShowModal} /> */}
      {/* <Project showModal1={showModal1} setShowModal1={setShowModal1} />
      <AutoSearch /> */}
      <NaverLogin />
      <GoogleLogin />
    </TestContainer>
  );
};

const TestContainer = styled.div`
  margin-left: 10px;
  display: flex;
  gap: 1rem;
`;

export default Test;
