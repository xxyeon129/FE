import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Upload } from 'src/assets/mypage-upload.svg';
interface ProfileEditFormProps {
  previewImage: string | File;
  nickname: string;
  nicknameError: string;
  email: string;
  handleProfileImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNicknameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}
const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  previewImage,
  nickname,
  nicknameError,
  email,
  handleProfileImageChange,
  handleNicknameChange,
  handleSubmit,
}) => {
  return (
    <StContent>
      <h4>프로필 수정</h4>
      <StImageEditBox>
        {typeof previewImage === 'string' && <StImage src={previewImage} />}
      </StImageEditBox>
      <label htmlFor="file">
        <StCameraIcon />
      </label>
      <StFileUpload
        type="file"
        name="profileImage"
        id="file"
        onChange={handleProfileImageChange}
        placeholder="프로필 이미지"
      />
      <StTextWrapper>
        <StTitle>닉네임</StTitle>
        <StInput
          type="text"
          name="nickname"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 적어주세요"
        />
        {nicknameError && <StError>{nicknameError}</StError>}
      </StTextWrapper>
      <StTextWrapper>
        <StTitle>이메일</StTitle>
        <StInput type="email" name="email" value={email} disabled />
      </StTextWrapper>
      <div>
        <StGoodButton onClick={handleSubmit}>변경하기</StGoodButton>
      </div>
    </StContent>
  );
};
export default ProfileEditForm;

const StImage = styled.img`
  width: 100%;
  height: 100%;
  background-size: 100%;
  border-radius: 100%;
`;

const StTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StTextWrapper = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;

const StInput = styled.input`
  padding: 10px;
  width: 100%;
  /* left: 7.76%;
  right: 55.12%;
  top: 49.26%;
  bottom: 43.54%; */
  background: #ffffff;
  border: 1px solid rgba(203, 203, 203, 0.7);
  border-radius: 6px;
  /* 
  @media (max-width: 768px) {
    width: 100%;
    left: initial;
    right: initial;
    top: initial;
    bottom: initial;
  } */
`;

const StError = styled.div`
  font-size: 14px;
  color: red;
  padding: 0px 10px;
`;

const StFileUpload = styled.input`
  width: 0;
  height: 6px;
  opacity: 0;
`;

const StImageEditBox = styled.div`
  border: 3px solid #ffffff;
  /* left: 20.75%;
  right: 68.22%;
  top: 22.96%;
  bottom: 58.94%; */
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.15);
  width: 107px;
  height: 107.15px;
  border-radius: 50%;
`;

const StGoodButton = styled.button`
  width: 126px;
  height: 36px;
  left: 592px;
  top: 428px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 35px;
  border-radius: 8px;

  text-align: center;

  background-color: #6bf65f;
  &:hover {
    background-color: #4ae040;
    color: white;
  }

  /* @media (max-width: 768px) {
    width: 100%;
  } */
`;

const StContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h4 {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    margin-bottom: 15px;
  }

  /* @media (max-width: 768px) {
    h4 {
      margin-bottom: 10px;
    }
  } */
`;

const StCameraIcon = styled(Upload)`
  top: 50%;
  left: 50%;
  transform: translate(100%, -90%);
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const StMid = styled.div`
  border: 1px solid #d3d3d3;
`;
