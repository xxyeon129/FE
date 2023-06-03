import { styled } from 'styled-components';
import { ReactComponent as ProfileIcon } from '@src/assets/default-user-image-icon.svg';

const UserProfile = () => {
  return (
    <StProfileContainer>
      <StProfileIcon />
      <StProfileTextContainer>
        <StUserName>USER ID4389534789435754398</StUserName>
        <StUserEmail>email@gmail.com</StUserEmail>
      </StProfileTextContainer>
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: lightblue;
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
