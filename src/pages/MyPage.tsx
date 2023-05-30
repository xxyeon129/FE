import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

interface UserData {
  nickname: string;
  email: string;
  profileImage: string;
}

function MyPage() {
  const { id } = useParams();
  const [data, setData] = useState<UserData>({ nickname: '', email: '', profileImage: '' });
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
  };

  useEffect(() => {
    axios
      .get(`http://3.34.102.60:8080/api/users/2`)
      .then(response => {
        setData(response.data.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  // 수정 이미지
  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      setProfileImage(fileList);

      // 미리보기
      const previewURLs = fileList.map(file => URL.createObjectURL(file));
      setPreviewImage(previewURLs[0]);
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

  const handleWithdrawal = () => {
    axios
      .delete(`/api/users/${id}`)
      .then(() => {
        console.log('User account deleted');
      })
      .catch(error => {
        console.error(error);
      });

    setShowModal(false);
  };

  // 저장버튼
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    const profileImageBlob = new Blob(profileImage, { type: 'image' });
    formData.append('nickname', nickname);
    formData.append('profileImage', profileImageBlob);

    axios
      .patch(`/api/users/${id}`, formData)
      .then(response => {
        setData(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <h1>회원정보 수정</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일"
              disabled
            />
            {isEditingPassword && (
              <>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호"
                  required
                />
                <input
                  type="password"
                  name="passwordCheck"
                  value={passwordCheck}
                  onChange={handlePasswordCheckChange}
                  placeholder="비밀번호 확인"
                  required
                />
              </>
            )}
            {isEditingPassword ? (
              <button onClick={() => setIsEditingPassword(false)}>비밀번호 수정 취소</button>
            ) : (
              <button onClick={handleEditPasswordClick}>비밀번호 수정</button>
            )}

            <input
              type="file"
              name="profileImage"
              onChange={handleProfileImageChange}
              placeholder="프로필 이미지"
            />
            {previewImage && <img src={previewImage} alt="Preview" />}
            <button type="submit">저장</button>
            <button type="submit" onClick={handleCloseClick}>
              닫기
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>{data.nickname}</h1>
          <p>{data.email}</p>
          <div>{data.profileImage && <img src={data.profileImage} alt="Profile" />}</div>

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
