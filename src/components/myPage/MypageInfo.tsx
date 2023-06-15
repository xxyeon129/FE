import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as EditIcon } from 'src/assets/mypage-edit.svg';
import { UserData } from '@src/pages/MyPage';

interface MyPageInfoProps {
  data: UserData | undefined;
  userImage: string;
  handleEditClick: () => void;
  handleWithdrawalClick: () => void;
}

const MyPageInfo: React.FC<MyPageInfoProps> = ({
  data,
  userImage,
  handleEditClick,
  handleWithdrawalClick,
}) => {
  return (
    <StMyPageBox>
      <StImageBox>
        {data?.profileImage ? (
          <StImage src={data.profileImage} alt="Profile" />
        ) : (
          <StImage src={userImage} alt="Profile" />
        )}
      </StImageBox>
      <StBottom>
        <h1>{data?.nickname}</h1>
        <p>{data?.email}</p>
        <StEditIcon onClick={handleEditClick} />
        <button onClick={handleWithdrawalClick}>회원탈퇴</button>
      </StBottom>
    </StMyPageBox>
  );
};

export default MyPageInfo;

const StMyPageBox = styled.div`
  position: absolute;
  width: 916px;
  max-width: 100%;
  height: 470px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.02);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 15px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const StImageBox = styled.div`
  border: 5px solid #ffffff;
  width: 138.42px;
  height: 138.42px;
  left: 815.29px;
  top: 381.29px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.15);
  border-radius: 100%;
  display: flex;
  background: #ffffff;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const StImage = styled.img`
  width: 100%;
  height: 100%;
  background-size: 100%;
  border-radius: 100%;
`;

const StBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    margin-top: 30px;
  }
  h1 {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
  }
`;

const StEditIcon = styled(EditIcon)`
  width: 24px;
  height: 24px;
  border-radius: 100%;

  &:hover {
    background-color: #d3d3d3;
  }
`;
