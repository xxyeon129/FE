import { styled } from 'styled-components';
import noImage from '@src/assets/images/no-img.jpg';

interface NoImageProps {
  width?: string;
  height: string;
  borderRadius?: string;
  borderTopRadius?: string;
}

const NoImage = ({
  width = '100%',
  height,
  borderRadius = '0px',
  borderTopRadius = '0px',
}: NoImageProps) => {
  return (
    <StNoImage
      src={noImage}
      width={width}
      height={height}
      borderradius={borderRadius}
      bordertopradius={borderTopRadius}
      alt="no image representative image"
    />
  );
};

const StNoImage = styled.img<{
  width: string;
  height: string;
  borderradius: string;
  bordertopradius: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height}; //350px;
  object-fit: cover;
  border-radius: ${({ borderradius }) => borderradius}; // 10px;
  z-index: -1;
  border-top-right-radius: ${({ bordertopradius }) => bordertopradius};
  border-top-left-radius: ${({ bordertopradius }) => bordertopradius};
`;

export default NoImage;
