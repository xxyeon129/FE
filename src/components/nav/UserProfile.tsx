import { styled } from 'styled-components';
import { ReactComponent as ProfileIcon } from '@src/assets/nav/nav-default-user-image-icon.svg';
import { useEffect, useState } from 'react';
import { getUser } from '@src/apis/user';
import useDecodeJWT from '@src/Hook/useDecodeJWT';
import { useRecoilValue } from 'recoil';
import { loginState } from '@src/states';

const UserProfile = () => {
  const isLogin = useRecoilValue(loginState);
  const [userData, setUserData] = useState({
    nickname: '로그인해 주세요.',
    email: '',
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  let userId: null | number = null;

  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token !== null) userId = useDecodeJWT().userId;

    const fetchUserData = async () => {
      if (userId !== null) {
        const serverUserData = await getUser({ id: userId });
        setUserData(serverUserData);
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [isLogin]);

  return (
    <StProfileContainer>
      {userData.profileImage !== null ? (
        <StProfileImg src={userData.profileImage} alt="user profile image" />
      ) : (
        !isLoading && <StProfileIcon />
      )}
      <StProfileTextContainer>
        {!isLoading && <StUserName>{userData.nickname}</StUserName>}
        <StUserEmail>{userData.email}</StUserEmail>
      </StProfileTextContainer>
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
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
