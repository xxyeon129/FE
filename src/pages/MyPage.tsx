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
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  // 수정 사항
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<File[]>([]);
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
    axios
      .get(`http://3.34.102.60:8080/api/users/2`)
      .then(response => {
        setData(response.data.data);
        setNickname(response.data.data.nickname);
        setEmail(response.data.data.email);
        setProfileImage(response.data.data.profileImage);
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

  // 회원 탈퇴
  const handleWithdrawal = () => {
    axios
      .delete(`http://3.34.102.60:8080/api/users/2`)
      .then(() => {
        console.log('User account deleted');
      })
      .catch(error => {
        console.error(error);
      });

    setShowModal(false);
  };

  // 비밀번호 수정
  const handleSavePassword = () => {
    const passwordData = {
      oldPassword: oldpassword,
      newPassword: newpassword,
      checkNewPassword: checknewpassword,
    };

    axios
      .put(`/api/users/2/password`, passwordData)
      .then(response => {
        console.log('Password updated successfully');
      })
      .catch(error => {
        console.error(error);
      });
  };

  // 저장버튼
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    const profileImageBlob = new Blob(profileImage, { type: 'application/json' });
    formData.append('nickname', nickname);
    formData.append('profileImage', profileImageBlob, 'image.jpeg');

    // const formData = new FormData();
    // formData.append('nickname', nickname);

    // if (profileImage.length > 0) {
    //   formData.append('profileImage', profileImage[0]);
    // }

    axios
      .patch(`http://3.34.102.60:8080/api/users/2`, formData, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb3p5QG5hdmVyLmNvbSIsInVzZXJJZCI6MiwiZXhwIjoxNjg1NDQwNTEyLCJpYXQiOjE2ODU0MzY5MTJ9.7FwmZHqAwYCE7NfqcLxxuIUY72v9UrWAHhB_xCWAV1s',
        },
      })
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  value={oldpassword}
                  onChange={handleCurrentPasswordChange}
                  placeholder="현재 비밀번호"
                />
                <input
                  type="password"
                  name="password"
                  value={newpassword}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호"
                />
                <input
                  type="password"
                  name="passwordCheck"
                  value={checknewpassword}
                  onChange={handlePasswordCheckChange}
                  placeholder="비밀번호 확인"
                />
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
