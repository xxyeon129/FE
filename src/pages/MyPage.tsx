import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
// api 테스트 완료
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
  const [profileImage, setProfileImage] = useState<File>([]);
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
      .get(`http://3.34.102.60:8080/api/users/20`)
      .then(response => {
        setData(response.data.data);
        setNickname(response.data.data.nickname);
        setEmail(response.data.data.email);
        setPreviewImage(response.data.data.profileImage);
        console.log(response.data.data);
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

  // 회원 탈퇴
  const handleWithdrawal = () => {
    axios
      .delete(`http://3.34.102.60:8080/api/users/20`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1bmRvbmdAbmF2ZXIuY29tIiwidXNlcklkIjoxOCwiZXhwIjoxNjg1NDUyNzM3LCJpYXQiOjE2ODU0NDkxMzd9.JBR-DfFoZTct5Cq7C-JbQzkvcLMZcu9MmVwOJrUf9Rk',
        },
      })
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
      .put(`http://3.34.102.60:8080/api/users/20/password`, passwordData, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlaGRkanMyMTY3QG5hdmVyLmNvbSIsInVzZXJJZCI6MjAsImV4cCI6MTY4NTQ1MzM1OCwiaWF0IjoxNjg1NDQ5NzU4fQ.jw6irGNJM-w7jNnwFCDv6G5IKKpOKpyNq_OppfPHE8E',
        },
      })

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
    console.log(nickname);
    const formData = new FormData();
    const text = JSON.stringify({
      nickname,
    });
    console.log(text);
    const profileImageBlob = new Blob([profileImage], { type: 'application/json' });
    const nicknameBlob = new Blob([text], { type: 'application/json' });
    formData.append('nickname', nicknameBlob);
    formData.append('profileImage', profileImageBlob);

    // const formData = new FormData();
    // formData.append('nickname', nickname);

    // if (profileImage.length > 0) {
    //   formData.append('profileImage', profileImage[0]);
    // }

    axios
      .patch(`http://3.34.102.60:8080/api/users/20`, formData, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlaGRkanMyMTY3QG5hdmVyLmNvbSIsInVzZXJJZCI6MjAsImV4cCI6MTY4NTQ1MzM1OCwiaWF0IjoxNjg1NDQ5NzU4fQ.jw6irGNJM-w7jNnwFCDv6G5IKKpOKpyNq_OppfPHE8E',
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
