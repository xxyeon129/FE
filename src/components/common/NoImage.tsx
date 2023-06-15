import { styled } from 'styled-components';
import noImage from '@src/assets/images/no-img.jpg';

interface NoImageProps {
  width?: string;
  height: string;
  borderRadius?: string;
  borderTopRadius?: string;
  boxShadow?: string;
}

const NoImage = ({
  width = '100%',
  height,
  borderRadius = '0px',
  borderTopRadius = '0px',
  boxShadow = 'none',
}: NoImageProps) => {
  return (
    <StNoImage
      src={noImage}
      width={width}
      height={height}
      borderradius={borderRadius}
      bordertopradius={borderTopRadius}
      boxshadow={boxShadow}
      alt="no image representative image"
    />
  );
};

const StNoImage = styled.img<{
  width: string;
  height: string;
  borderradius: string;
  bordertopradius: string;
  boxshadow: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  object-fit: cover;
  border-radius: ${({ borderradius }) => borderradius};
  z-index: -1;
  border-top-right-radius: ${({ bordertopradius }) => bordertopradius !== '0px' && bordertopradius};
  border-top-left-radius: ${({ bordertopradius }) => bordertopradius !== '0px' && bordertopradius};
  box-shadow: ${({ boxshadow }) => boxshadow};
`;

export default NoImage;
