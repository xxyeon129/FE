import { styled } from 'styled-components';
import { ReactComponent as LightIcon } from '@src/assets/nav/nav-light-mode-icon.svg';

const LightAndDarkMode = () => {
  return (
    <StLightAndDarkMode>
      <LightIcon />
      <StLabel>Dark mode</StLabel>
    </StLightAndDarkMode>
  );
};

const StLightAndDarkMode = styled.div`
  display: flex;
  align-items: center;
  /* background-color: lightpink; */
`;

const StLabel = styled.span`
  margin-left: 10px;
`;

export default LightAndDarkMode;
