import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, updatePassword } from '@src/apis/mypageuser';
import { useQuery, useMutation } from 'react-query';

// api 테스트 완료 및 구현 완료
interface UserData {
  nickname: string;
  email: string;
  profileImage: string;
}

const MyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // 수정 사항
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nicknameError, setNicknameError] = useState('');

  // 비밀번호
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [checknewpassword, setCheckNewPassword] = useState('');
  const [oldpasswordError, setOldPasswordError] = useState('');
  const [newpasswordError, setNewPasswordError] = useState('');
  const [checknewpasswordError, setCheckNewPasswordError] = useState('');

  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
  };

  // 회원 조회
  const { data, isLoading, isError, refetch } = useQuery<UserData>('userData', getUser);

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
      setEmail(data.email);
      setPreviewImage(data.profileImage);
    }
  }, [data]);

  const updateUserMutation = useMutation(updateUser);
  const deleteUserMutation = useMutation(deleteUser);
  const updatePasswordMutation = useMutation(updatePassword);

  const handleEditClick = () => {
    setIsEditing(true);
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

  // 수정 이미지
  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 0) {
      const fileList = e.target.files[0];
      setProfileImage(fileList);

      // 미리보기
      const previewURLs = URL.createObjectURL(fileList);
      setPreviewImage(previewURLs);
    }
  };

  // const removeProfileImage = () => {
  //   setProfileImage(null);
  //   setPreviewImage(null);
  // };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const handleWithdrawalClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleWithdrawal = async () => {
    try {
      await deleteUserMutation.mutateAsync();
      console.log('User account deleted');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  // 비밀번호 수정
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

    if (newpassword !== checknewpassword) {
      setCheckNewPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    const passwordData = {
      oldPassword: oldpassword,
      newPassword: newpassword,
      checkNewPassword: checknewpassword,
    };

    try {
      await updatePasswordMutation.mutateAsync(passwordData);
      console.log('Password updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  // 저장버튼
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (nickname.trim() === '') {
      setNicknameError('닉네임을 적어주세요.');
      return;
    }
    console.log(nickname);
    const formData = new FormData();
    const text = JSON.stringify({
      nickname,
    });

    const nicknameBlob = new Blob([text], { type: 'application/json' });
    formData.append('nickname', nicknameBlob);
    profileImage && formData.append('profileImage', profileImage);

    // if (previewImage) {
    //   formData.append('profileImage', profileImage);
    // } else {
    //   formData.append('profileImage', null);
    // }

    try {
      await updateUserMutation.mutateAsync(formData);
      refetch();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <h1>회원정보 수정</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {previewImage && <img src={previewImage} alt="Preview" />}
            {/* <button onClick={removeProfileImage}>이미지 삭제</button> */}
            <div>
              <input
                type="file"
                name="profileImage"
                onChange={handleProfileImageChange}
                placeholder="프로필 이미지"
              />
            </div>
            <div>
              <input
                type="text"
                name="nickname"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="닉네임"
              />
              {nicknameError && <p>{nicknameError}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일"
                disabled
              />
            </div>
            {isEditingPassword && (
              <>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={oldpassword}
                    onChange={handleCurrentPasswordChange}
                    placeholder="현재 비밀번호"
                  />
                  {oldpasswordError && <p>{oldpasswordError}</p>}
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={newpassword}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호"
                  />
                  {newpasswordError && <p>{newpasswordError}</p>}
                </div>
                <div>
                  <input
                    type="password"
                    name="passwordCheck"
                    value={checknewpassword}
                    onChange={handlePasswordCheckChange}
                    placeholder="비밀번호 확인"
                  />
                  {checknewpasswordError && <p>{checknewpasswordError}</p>}
                </div>
              </>
            )}
            {isEditingPassword ? (
              <>
                <button onClick={() => setIsEditingPassword(false)}>비밀번호 수정 취소</button>
                <button onClick={handleSavePassword}>비밀번호 저장</button>
              </>
            ) : (
              <button onClick={handleEditPasswordClick}>비밀번호 수정</button>
            )}
            <div>
              <button type="submit">저장</button>
              <button type="submit" onClick={handleCloseClick}>
                닫기
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div>{data?.profileImage && <img src={data.profileImage} alt="Profile" />}</div>
          <h1>{data?.nickname}</h1>
          <p>{data?.email}</p>

          <button onClick={handleEditClick}>회원정보수정</button>
          <button onClick={handleWithdrawalClick}>회원탈퇴</button>
        </div>
      )}
      {showModal && (
        <Modal>
          <div>
            <h2>회원탈퇴</h2>
            <p>정말로 탈퇴하시겠습니까?</p>
            <button onClick={handleWithdrawal}>탈퇴하기</button>
            <button onClick={handleCloseModal}>취소</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyPage;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;
