import { styled } from 'styled-components';
import { ReactComponent as LightIcon } from '@src/assets/nav/nav-light-mode-icon.svg';
import { ReactComponent as DarkIcon } from '@src/assets/nav/nav-darkmodeicon.svg';
import { useRecoilState } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';
const LightAndDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeState);

  const onChangeMode = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      return;
    }
    setIsDarkMode(true);
  };

  return (
    <StToggleContainer onClick={onChangeMode}>
      <StToggleBackground className={isDarkMode ? 'lightMode' : 'darkMode'} />
      <StToggleCircle className={isDarkMode ? 'lightMode' : 'darkMode'}>
        {!isDarkMode && <LightIcon />}
        {isDarkMode && <DarkIcon />}
      </StToggleCircle>
    </StToggleContainer>
  );
};

const StToggleContainer = styled.div`
  cursor: pointer;
  position: relative;
`;

const StToggleBackground = styled.div`
  width: 55px;
  height: 33px;
  border-radius: 30px;
  background-color: #333333;

  &.darkMode {
    background-color: ${({ theme }) => theme.color.neonGreen};
    transition: 0.5s;
  }
`;

const StToggleCircle = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1px;
  left: 24px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.color.neonGreen};
  transition: 0.5s;

  &.darkMode {
    left: 1px;
    transition: 0.5s;
    background-color: black;
  }
`;

const StLightAndDarkMode = styled.div`
  /* display: flex;
  align-items: center; */
`;

const StLabel = styled.span`
  margin-left: 10px;
`;

export default LightAndDarkMode;
