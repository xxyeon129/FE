import { styled } from 'styled-components';
import noImage from '@src/assets/images/no-img.jpg';

const NoImage = () => {
  return <StNoImage src={noImage} />;
};

const StNoImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  z-index: -1;
`;

export default NoImage;
