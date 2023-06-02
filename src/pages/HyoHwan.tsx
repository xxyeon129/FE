import React, { useState } from 'react';
import Login from '@src/components/Login';
import Signup from '@src/components/Signup';

function HyoHwan() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

  const onLoginButtonClick = () => {
    setLoginModalOpen(true);
  };

  const onLoginCloseModal = () => {
    setLoginModalOpen(false);
  };

  const onSignUpButtonClick = () => {
    setSignUpModalOpen(true);
  };

  const onSignUpCloseModal = () => {
    setSignUpModalOpen(false);
  };

  return (
    <div>
      <button onClick={onLoginButtonClick}>로그인 모달</button>
      {isLoginModalOpen && (
        <Login onClose={onLoginCloseModal} onSignUpClick={onSignUpButtonClick} />
      )}
      {isSignUpModalOpen && <Signup onClose={onSignUpCloseModal} />}
    </div>
  );
}

export default HyoHwan;
