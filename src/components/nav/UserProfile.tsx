import { styled } from 'styled-components';
import { ReactComponent as ProfileIcon } from '@src/assets/nav-default-user-image-icon.svg';
import { useEffect, useState } from 'react';
import { getUser } from '@src/apis/user';
import useDecodeJWT from '@src/Hook/useDecodeJWT';

const UserProfile = () => {
  const userId = useDecodeJWT().userId;
  const [userData, setUserData] = useState({ nickname: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const serverUserData = await getUser({ id: userId });
      setUserData(serverUserData);
    };
    fetchUserData();
  }, []);

  return (
    <StProfileContainer>
      <StProfileIcon />
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
