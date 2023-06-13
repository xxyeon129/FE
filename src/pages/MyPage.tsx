import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, updatePassword } from '@src/apis/mypageuser';
import { useQuery, useMutation } from 'react-query';
import { ReactComponent as EditIcon } from 'src/assets/mypage-edit.svg';
import user from 'src/assets/nav/nav-default-user-image-icon.svg';
import { useSetRecoilState } from 'recoil';
import { myPageEditState } from '@src/states/myPageEditState';
import { ReactComponent as Close } from 'src/assets/Group 198.svg';
import { ReactComponent as Upload } from 'src/assets/Subtract.svg';
interface UserData {
  nickname: string;
  email: string;
  profileImage: string;
}
interface ErrorResponse {
  errorMessage: string;
}

const MyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<File | null | string>(null);
  const [previewImage, setPreviewImage] = useState<File | string>('');
  const [showModal, setShowModal] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [checknewpassword, setCheckNewPassword] = useState('');
  const [oldpasswordError, setOldPasswordError] = useState('');
  const [newpasswordError, setNewPasswordError] = useState('');
  const [checknewpasswordError, setCheckNewPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const setMyPageEdit = useSetRecoilState(myPageEditState);
  const { data, isLoading, isError, refetch } = useQuery<UserData>('userData', () =>
    getUser(Number(id))
  );

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
      setEmail(data.email);
      setPreviewImage(data.profileImage || user);
    }
  }, [data]);

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.');
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setNicknameError(error.response?.data.errorMessage as string);
    },
  });
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      alert('회원 탈퇴 되었습니다.');
    },
  });
  const updatePasswordMutation = useMutation(updatePassword, {
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다.');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setApiError(error.response?.data.errorMessage as string);
    },
  });

  const handleWithdrawal = async () => {
    await deleteUserMutation.mutateAsync(Number(id));
    navigate('/');
    setShowModal(false);
  };

  const handleSavePassword = async () => {
    if (oldpassword.trim() === '') {
      setOldPasswordError('현재 비밀번호를 입력해주세요.');
      return;
    }

    if (newpassword.trim() === '') {
      setNewPasswordError('새로운 비밀번호를 입력해주세요.');
      return;
    }

    if (checknewpassword.trim() === '') {
      setCheckNewPasswordError('비밀번호 확인을 입력해주세요.');
      return;
    }

    const passwordData = {
      oldPassword: oldpassword,
      newPassword: newpassword,
      checkNewPassword: checknewpassword,
    };

    await updatePasswordMutation.mutateAsync([passwordData, Number(id)]);
    setApiError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (nickname.trim() === '') {
      setNicknameError('닉네임을 입력하세요');
      return;
    }

    const formData = new FormData();
    const text = JSON.stringify({
      nickname,
    });
    const nicknameBlob = new Blob([text], { type: 'application/json' });
    formData.append('nickname', nicknameBlob);
    console.log(profileImage);
    formData.append('profileImage', profileImage as Blob);

    try {
      await updateUserMutation.mutateAsync([formData, Number(id)]);
      refetch();
      setIsEditing(false);
      setMyPageEdit(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMyPageEdit(false);
    console.log('회원정보 수정 버튼 클릭시 : ', profileImage);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
    setOldPasswordError('');
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setNewPasswordError('');
  };

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckNewPassword(e.target.value);
    setCheckNewPasswordError('');
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const handleWithdrawalClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 0) {
      const fileList = e.target.files[0];
      setProfileImage(fileList);
      const previewURLs = URL.createObjectURL(fileList);
      setPreviewImage(previewURLs);
    }
  };

  return (
    <Stdiv>
      <StHeader></StHeader>
      {isEditing ? (
        <StMyPageEditBox>
          <StClose>
            <Close onClick={handleCloseClick}>닫기</Close>
          </StClose>
          <StLayout>
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
              {/* <StTextBox> */}
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
                <StInput
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled
                />
              </StTextWrapper>
              <div>
                <StGoodButton onClick={handleSubmit}>변경하기</StGoodButton>
              </div>
            </StContent>
            <StMid></StMid>
            <StPwContent>
              <h4>비밀번호</h4>
              <StTextWrapper>
                <StTitle>현재 비밀번호</StTitle>
                <StInput
                  type="password"
                  name="password"
                  value={oldpassword}
                  onChange={handleCurrentPasswordChange}
                  placeholder="현재 비밀번호"
                />
                {oldpasswordError && <StError>{oldpasswordError}</StError>}
              </StTextWrapper>
              <StTextWrapper>
                <StTitle>비밀번호</StTitle>
                <StInput
                  type="password"
                  name="password"
                  value={newpassword}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호"
                />
                {newpasswordError && <StError>{newpasswordError}</StError>}
              </StTextWrapper>
              <StTextWrapper>
                <StTitle>비밀번호 확인</StTitle>
                <StInput
                  type="password"
                  name="passwordCheck"
                  value={checknewpassword}
                  onChange={handlePasswordCheckChange}
                  placeholder="비밀번호 확인"
                />
                {checknewpasswordError && <StError>{checknewpasswordError}</StError>}
                {apiError && <StError>{apiError}</StError>}
              </StTextWrapper>
              <div>
                <StGoodButton onClick={handleSavePassword}>변경하기</StGoodButton>
              </div>
            </StPwContent>
          </StLayout>
        </StMyPageEditBox>
      ) : (
        <StMyPageBox>
          <StImageBox>
            {data?.profileImage ? (
              <StImage src={data.profileImage} alt="Profile" />
            ) : (
              <StImage src={user} alt="Profile" />
            )}
          </StImageBox>
          <StBottom>
            <h1>{data?.nickname}</h1>
            <p>{data?.email}</p>
            <StEditIcon onClick={handleEditClick} />
            <button onClick={handleWithdrawalClick}>회원탈퇴</button>
          </StBottom>
        </StMyPageBox>
      )}
      {showModal && (
        <ModalWrapper>
          <ModalContent>
            <h2>회원탈퇴</h2>
            <StLayout>
              <p>지금까지 폴 서비스를 이용해주셔서 감사합니다</p>
              <br />
              <p>회원 탈퇴시 폴 서비스 내 계정 정보가</p> <p>삭제되고 복구할 수 없습니다.</p>
            </StLayout>
            <StDelUser>
              <StBadButton onClick={handleWithdrawal}>탈퇴하기</StBadButton>
              <StGoodButton onClick={handleCloseModal}>취소</StGoodButton>
            </StDelUser>
          </ModalContent>
        </ModalWrapper>
      )}
      <Sttest></Sttest>
    </Stdiv>
  );
};
export default MyPage;

const Stdiv = styled.div`
  height: 100%;
  position: relative;
`;

const Sttest = styled.div`
  background: #6bf65f;
  height: 60%;
`;

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
  border-radius: 15px;
  padding: 60px 0px;
  background: #fefefe;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 600px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const StMyPageBox = styled.div`
  position: absolute;
  width: 916px;
  height: 470px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.02);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 15px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const StHeader = styled.div`
  width: 100%;
  height: 40%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StImageBox = styled.div`
  border: 5px solid #ffffff;
  width: 138.42px;
  height: 138.42px;
  left: 815.29px;
  top: 381.29px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.15);
  border-radius: 100%;
  display: flex;
  background: #ffffff;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const StImage = styled.img`
  width: 100%;
  height: 100%;
  background-size: 100%;
  border-radius: 100%;
`;

const StBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    margin-top: 30px;
  }
  h1 {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
  }
`;

const StEditButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-left: 300px;
  width: 24px;
  height: 24px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
    align-items: center;
  }
`;

//-------------------------------------------------------------

const StMyPageEditBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 889px;
  height: 542px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  border-radius: 20px;

  @media (max-width: 768px) {
    width: 90%;
    height: 100%;
  }
`;

const StLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px 68px;
  gap: 60px;
`;

const StTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StTextBox = styled.div`
  width: 100%;
  white-space: normal;
  word-break: break-all;
  div {
    padding-bottom: 15px;
  }
`;

const StTextWrapper = styled.div`
  margin-bottom: 25px;
`;
const StInput = styled.input`
  padding: 10px;
  width: 308px;
  left: 7.76%;
  right: 55.12%;
  top: 49.26%;
  bottom: 43.54%;
  background: #ffffff;
  border: 1px solid rgba(203, 203, 203, 0.7);
  border-radius: 6px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StError = styled.div`
  font-size: 14px;
  color: #767676;
  padding: 0px 10px;
`;

const StFileUpload = styled.input`
  width: 0;
  height: 5px;
  opacity: 0;
`;

const StImageEditBox = styled.div`
  border: 3px solid #ffffff;
  left: 20.75%;
  right: 68.22%;
  top: 22.96%;
  bottom: 58.94%;
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
`;

const StBadButton = styled.button`
  padding: 10px 20px;
  width: 100%;
  margin: 0px 20px 0px;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-weight: bold;
  color: gray;
  &:hover {
    background-color: #d3d3d3;
  }
`;

const StEditIcon = styled(EditIcon)`
  width: 24px;
  height: 24px;
  border-radius: 100%;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const StContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    margin-bottom: 15px;
  }
`;

const StPwContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    margin-bottom: 77px;
  }
`;

const StDelUser = styled.div`
  display: flex;
  width: 300px;
`;

const StClose = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 25px;
`;

const StCameraIcon = styled(Upload)`
  top: 50%;
  left: 50%;
  transform: translate(100%, -90%);
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const StLabel = styled.label`
  display: none;
`;

const StMid = styled.div`
  border: 1px solid #d3d3d3;
`;
