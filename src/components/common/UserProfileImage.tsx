import { styled } from 'styled-components';
import { ReactComponent as ProfileIcon } from '@src/assets/nav/nav-default-user-image-icon.svg';

interface UserProfileImageProps {
  isExistToken?: boolean;
  imgSrc: null | string;
  isLoading?: boolean;
  size: string;
}

const UserProfileImage = ({ isExistToken, imgSrc, isLoading, size }: UserProfileImageProps) => {
  return (
    <>
      {/* TO DO: Nav에 적용할 경우 isExistToken && 조건 적용해야 함 */}
      {imgSrc !== null ? (
        <StProfileImg src={imgSrc} size={size} alt="user profile image" />
      ) : (
        !isLoading && <StProfileIcon size={size} />
      )}
    </>
  );
};

const StProfileImg = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  object-fit: cover;
`;

const StProfileIcon = styled(ProfileIcon)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  flex-shrink: 0;
`;

export default UserProfileImage;
