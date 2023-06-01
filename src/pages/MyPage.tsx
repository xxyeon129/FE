import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, updatePassword } from '@src/apis/mypageuser';

// api 테스트 완료
interface UserData {
  nickname: string;
  email: string;
  profileImage: string;
}

function MyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<UserData>({ nickname: '', email: '', profileImage: '' });
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // 수정 사항
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // 비밀번호
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [checknewpassword, setCheckNewPassword] = useState('');

  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
  };
  // 회원 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setData(userData);
        setNickname(userData.nickname);
        setEmail(userData.email);
        setPreviewImage(userData.profileImage);
        console.log(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckNewPassword(e.target.value);
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
      await deleteUser();
      console.log('User account deleted');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  // 비밀번호 수정
  const handleSavePassword = async () => {
    const passwordData = {
      oldPassword: oldpassword,
      newPassword: newpassword,
      checkNewPassword: checknewpassword,
    };

    try {
      await updatePassword(passwordData);
      console.log('Password updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  // 저장버튼
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(nickname);
    const formData = new FormData();
    const text = JSON.stringify({
      nickname,
    });

    const nicknameBlob = new Blob([text], { type: 'application/json' });
    formData.append('nickname', nicknameBlob);
    profileImage && formData.append('profileImage', profileImage);

    try {
      const response = await updateUser(formData);
      setData(response);
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
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={newpassword}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="passwordCheck"
                    value={checknewpassword}
                    onChange={handlePasswordCheckChange}
                    placeholder="비밀번호 확인"
                  />
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
          <div>{data.profileImage && <img src={data.profileImage} alt="Profile" />}</div>
          <h1>{data.nickname}</h1>
          <p>{data.email}</p>

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
}

export default MyPage;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;
