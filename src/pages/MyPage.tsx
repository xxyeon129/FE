import React, { useState, useEffect, ChangeEvent } from 'react';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, updatePassword } from '@src/apis/mypageuser';
import { useQuery, useMutation } from 'react-query';
import user from 'src/assets/default-user-profile-icon.svg';
import { useSetRecoilState } from 'recoil';
import { myPageEditState } from '@src/states/myPageEditState';
import { ReactComponent as Close } from 'src/assets/mypage-close.svg';
import WithdrawalModal from '@src/components/myPage/WithdrawalModal';
import UpdatePasswordModal from '@src/components/myPage/UpdatePasswordModal';
import UpdateProfileModal from '@src/components/myPage/UpdateProfileModal';
import MyPageInfo from '@src/components/myPage/MypageInfo';
import ProfileEditForm from '@src/components/myPage/ProfileEditForm';
import PassWordEditForm from '@src/components/myPage/PassWordEditForm';
import { useInput } from 'src/Hook/useInput';
import { Desktop, DesktopAndTablet, TabletAndMobile } from '@src/style/mediaQuery';
import { refreshToken } from '@src/apis/token';
export interface UserData {
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
  const nickname = useInput('');
  const oldpassword = useInput('');
  const newpassword = useInput('');
  const checknewpassword = useInput('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<File | null | string>(null);
  const [previewImage, setPreviewImage] = useState<File | string>('');
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [apiError, setApiError] = useState('');
  const setMyPageEdit = useSetRecoilState(myPageEditState);
  const { data, isLoading, isError, refetch } = useQuery<UserData>('userData', () =>
    getUser(Number(id))
  );

  useEffect(() => {
    if (data) {
      nickname.onChange({ target: { value: data.nickname } } as ChangeEvent<HTMLInputElement>);
      setEmail(data.email);
      setPreviewImage(data.profileImage || user);
    }
  }, [data]);

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      setShowUpdateModal(true);
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      nickname.setErrorText(error.response?.data.errorMessage as string);
    },
  });
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      alert('회원 탈퇴 되었습니다.');
    },
  });
  const updatePasswordMutation = useMutation(updatePassword, {
    onSuccess: () => {
      setShowPasswordModal(true);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setApiError(error.response?.data.errorMessage as string);
    },
  });

  const handleWithdrawal = async () => {
    if (!refreshToken) {
      alert('로그인이 필요합니다.');
      return;
    }
    await deleteUserMutation.mutateAsync(Number(id));
    navigate('/');
    setShowModal(false);
  };

  const handleSavePassword = async () => {
    if (!refreshToken) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (oldpassword.value.trim() === '') {
      oldpassword.setErrorText('현재 비밀번호를 입력해주세요.');
      return;
    }

    if (newpassword.value.trim() === '') {
      newpassword.setErrorText('새로운 비밀번호를 입력해주세요.');
      return;
    }

    if (checknewpassword.value.trim() === '') {
      checknewpassword.setErrorText('비밀번호 확인을 입력해주세요.');
      return;
    }

    const passwordData = {
      oldPassword: oldpassword.value,
      newPassword: newpassword.value,
      checkNewPassword: checknewpassword.value,
    };

    await updatePasswordMutation.mutateAsync([passwordData, Number(id)]);
    setApiError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (nickname.value.trim() === '') {
      nickname.setErrorText('닉네임을 입력하세요');
      return;
    }

    const formData = new FormData();
    const text = JSON.stringify({
      nickname: nickname.value,
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
      <StHeader isediting={isEditing}></StHeader>
      {isEditing ? (
        <StMyPageEditBox>
          <StClose>
            <Close onClick={handleCloseClick}>닫기</Close>
          </StClose>
          <StLayout>
            <ProfileEditForm
              previewImage={previewImage}
              nickname={nickname.value}
              email={email}
              nicknameError={nickname.error}
              handleProfileImageChange={handleProfileImageChange}
              handleNicknameChange={nickname.onChange}
              handleSubmit={handleSubmit}
            />
            <StMid></StMid>
            <PassWordEditForm
              handleCurrentPasswordChange={oldpassword.onChange}
              handlePasswordChange={newpassword.onChange}
              handlePasswordCheckChange={checknewpassword.onChange}
              handleSavePassword={handleSavePassword}
              oldpassword={oldpassword.value}
              newpassword={newpassword.value}
              checknewpassword={checknewpassword.value}
              oldpasswordError={oldpassword.error}
              newpasswordError={newpassword.error}
              checknewpasswordError={checknewpassword.error}
              apiError={apiError}
            />
          </StLayout>
        </StMyPageEditBox>
      ) : (
        <MyPageInfo
          data={data}
          userImage={user}
          handleEditClick={handleEditClick}
          handleWithdrawalClick={handleWithdrawalClick}
        />
      )}
      {showModal && <WithdrawalModal onWithdrawal={handleWithdrawal} onClose={handleCloseModal} />}
      {showUpdateModal && <UpdateProfileModal onClose={() => setShowUpdateModal(false)} />}
      {showPasswordModal && <UpdatePasswordModal onClose={() => setShowPasswordModal(false)} />}
      <Stbottom isediting={isEditing} />
    </Stdiv>
  );
};
export default MyPage;

const Stdiv = styled.div`
  height: 100%;
  position: relative;
`;

const Stbottom = styled.div<{ isediting: Boolean }>`
  background: #6bf65f;
  height: 60%;
  background-color: ${props => (props.isediting ? '#D3D3D3' : '#6BF65F')};
`;

const StHeader = styled.div<{ isediting: Boolean }>`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props =>
    props.isediting
      ? '#D3D3D3'
      : 'linear-gradient(135deg, #8FE7A1, #9BC7BF, #CBD0E1, #5CC3BA, #0DC49C, #6E9EB2)'};
  background-size: cover;
  background-position: center;
`;

// ...

//-------------------------------------------------------------

const StMyPageEditBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 100%;
  transform: translate(-50%, -50%);
  width: 889px;
  height: 542px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    /* padding: 20px 0px; */
    box-shadow: none;
    border-radius: 0px;
  }
`;

const StLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding: 0px 68px;
  gap: 60px;
  /*  */

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    /* gap: 10px; */
  }
`;

const StClose = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 25px;

  /* @media (max-width: 1024px) {
    padding: 10px;
  } */
`;

const StMid = styled.div`
  border: 1px solid #d3d3d3;
`;
