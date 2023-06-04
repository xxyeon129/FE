import { styled } from 'styled-components';
import { ReactComponent as ProfileIcon } from '@src/assets/nav/nav-default-user-image-icon.svg';
import { useEffect, useState } from 'react';
import { getUser } from '@src/apis/user';
import useDecodeJWT from '@src/Hook/useDecodeJWT';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    nickname: '로그인해 주세요.',
    email: '',
    profileImage: null,
  });

  const isLogin = localStorage.getItem('accesstoken');
  let userId: null | number = null;
  if (isLogin !== null) userId = useDecodeJWT().userId;

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId !== null) {
        const serverUserData = await getUser({ id: userId });
        setUserData(serverUserData);
      }
    };
    fetchUserData();
  }, []);

  return (
    <StProfileContainer>
      {userData.profileImage !== null ? (
        <StProfileImg src={userData.profileImage} alt="user profile image" />
      ) : (
        <StProfileIcon />
      )}
      <StProfileTextContainer>
        <StUserName>{userData.nickname}</StUserName>
        <StUserEmail>{userData.email}</StUserEmail>
      </StProfileTextContainer>
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StProfileImg = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  object-fit: cover;
`;

const StProfileIcon = styled(ProfileIcon)`
  flex-shrink: 0;
`;

const StProfileTextContainer = styled.div`
  padding-left: 13px;

  overflow: hidden;
  white-space: nowrap;
`;

const StUserName = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StUserEmail = styled.p`
  font-size: 14px;
  margin-top: 5px;

  overflow: hidden;
  text-overflow: ellipsis;
`;

export default UserProfile;
