import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, updatePassword } from '@src/apis/mypageuser';
import { useQuery, useMutation } from 'react-query';
import { ReactComponent as EditIcon } from 'src/assets/mypage-edit.svg';
import { ReactComponent as UploadIcon } from 'src/assets/image-upload.svg';
import { ReactComponent as DeleteIcon } from 'src/assets/mypageimage-del.svg';
interface UserData {
  nickname: string;
  email: string;
  profileImage: string;
}

const MyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
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
  const { data, isLoading, isError, refetch } = useQuery<UserData>('userData', () =>
    getUser(Number(id))
  );

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
      setEmail(data.email);
      setPreviewImage(data.profileImage);
    }
  }, [data]);

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.');
      refetch();
    },
    onError: error => {
      setNicknameError(error.response.data.errorMessage);
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
    onError: error => {
      setApiError(error.response.data.errorMessage);
    },
  });

  const handleWithdrawal = async () => {
    try {
      await deleteUserMutation.mutateAsync(Number(id));
      console.log('User account deleted');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
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

    try {
      await updatePasswordMutation.mutateAsync([passwordData, Number(id)]);
      setApiError('');
      console.log('Password updated successfully');
    } catch (error) {
      console.log(error.response.data.errorMessage);
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    const text = JSON.stringify({
      nickname,
    });
    const nicknameBlob = new Blob([text], { type: 'application/json' });
    formData.append('nickname', nicknameBlob);
    formData.append('profileImage', profileImage || '');

    try {
      await updateUserMutation.mutateAsync([formData, Number(id)]);
      // refetch();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
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

  const removeProfileImage = () => {
    setProfileImage(null);
    setPreviewImage('');
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
    <div>
      <StHeader></StHeader>
      {isEditing ? (
        <StMyPageEditBox>
          <StLayout>
            <StImageEditBox>
              {typeof previewImage === 'string' && <StImage src={previewImage} alt="Preview" />}
            </StImageEditBox>
            <StImageUploadWrap>
              <label htmlFor="file">
                <UploadIcon />
              </label>
              <StFileUpload
                type="file"
                name="profileImage"
                id="file"
                onChange={handleProfileImageChange}
                placeholder="프로필 이미지"
              />
              <DeleteIcon onClick={removeProfileImage} />
            </StImageUploadWrap>
            <StTextBox>
              <div>
                <StTitle>닉네임</StTitle>
                <StInput
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="닉네임을 적어주세요"
                />
              </div>
              {nicknameError && <StError>{nicknameError}</StError>}
              <div>
                <StTitle>이메일</StTitle>
                <StInput
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled
                />
              </div>
              <div>
                <StGoodButton onClick={handleSubmit}>저장</StGoodButton>
              </div>
            </StTextBox>

            <StTextBox>
              <div>
                <StTitle>현재 비밀번호</StTitle>
                <StInput
                  type="password"
                  name="password"
                  value={oldpassword}
                  onChange={handleCurrentPasswordChange}
                  placeholder="현재 비밀번호"
                />
                {oldpasswordError && <StError>{oldpasswordError}</StError>}
              </div>
              <div>
                <StTitle>비밀번호</StTitle>
                <StInput
                  type="password"
                  name="password"
                  value={newpassword}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호"
                />
                {newpasswordError && <StError>{newpasswordError}</StError>}
              </div>
              <div>
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
              </div>
              <div>
                <StGoodButton onClick={handleSavePassword}>비밀번호 저장</StGoodButton>
              </div>
            </StTextBox>
            <StBadButton type="submit" onClick={handleCloseClick}>
              닫기
            </StBadButton>
          </StLayout>
        </StMyPageEditBox>
      ) : (
        <StMyPageBox>
          <StEditButton>
            <StEditIcon onClick={handleEditClick} />
          </StEditButton>
          <StImageBox>
            {data?.profileImage && <StImage src={data.profileImage} alt="Profile" />}
          </StImageBox>
          <StBottom>
            <h1>{data?.nickname}</h1>
            <p>{data?.email}</p>
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
    </div>
  );
};

export default MyPage;

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
  /* border: 3px solid rgba(0, 0, 0, 0.2); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 600px;
  /* overflow-y: auto;
  max-height: 100%; */
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const StMyPageBox = styled.div`
  position: relative;
  width: 916px;
  height: 550px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: rgba(184, 227, 180, 0.7); */
  background: white;
  /* opacity: 0.85; */
  /* border: 1px solid black; */
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  /* box-shadow: 2px 6px 8px rgba(255, 245, 190, 0.25); */
  border-radius: 15px;
`;

const StHeader = styled.div`
  /* position: relative; */
  width: 100%;
  height: 311px;
  background: #a9a9a9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StImageBox = styled.div`
  border: 1px solid #d3d3d3;
  width: 168px;
  height: 168px;
  margin: 20px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const StBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    margin-top: 100px;
  }
`;

const StEditButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-left: 300px;
`;

//-------------------------------------------------------------

const StMyPageEditBox = styled.div`
  position: fixed;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -47%);
  width: 458px;
  height: 860px;
  background: white;
  /* border: 1px solid rgba(0, 0, 0, 0.02); */
  /* box-shadow: 2px 6px 8px rgba(255, 245, 190, 0.25); 
  */
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  border-radius: 15px;
`;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 75px;
`;

const StTitle = styled.div`
  font-weight: bold;
`;

const StTextBox = styled.div`
  width: 100%;
  white-space: normal;
  word-break: break-all;
  div {
    padding-bottom: 15px;
  }
`;
const StInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 20px;
  background: #fafafa;
  border: 0.6px solid black;
  width: 308px;
  height: 39px;
  left: 684px;
  top: 509px;
  background: #ffffff;
  border: 2px solid rgba(203, 203, 203, 0.7);
  border-radius: 40px;
`;
// const StInput = styled.input`
//   width: 100%;

//   height: 3.3em;
//   background: #fafafa;
//   border: 1px solid #d6d6d6;
//   border-radius: 10px;
//   transition: font-size 0.3s;
//   font-size: 15px;
// `;

// const StButton = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 10px;
//   cursor: pointer;
//   border: 1px solid black;
//   width: 100%;
//   height: 30px;
//   margin-bottom: 20px;
//   border-radius: 20px;
// `;

const StError = styled.div`
  font-size: 14px;
  padding: 4px;
  color: #767676;
`;

const StFileUpload = styled.input`
  width: 0;
  height: 42px;
  opacity: 0;
`;

const StImageEditBox = styled.div`
  border: 1px solid #d3d3d3;
  width: 120px;
  height: 120px;
  left: 786px;
  top: 236px;
  margin: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StGoodButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: bold;

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
  width: 60px;
  height: 60px;
  border-radius: 100%;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const StImageUploadWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const StDelUser = styled.div`
  display: flex;
  width: 300px;
`;
