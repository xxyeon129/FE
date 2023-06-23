export interface ThemeType {
  color: Record<string, string>;
  size: Record<string, string>;
}

const theme: ThemeType = {
  color: {
    neonGreen: '#6BF65F',
    oliveGreen: '#2C4001',
    lightGreen: '#45BE59',
    blueGreen: '#5FF6D2',
    lightGray: '#F3F3F3;',
    paleGray: '#C7C7C7',
    gray: '#E7E7E7',
    skyBlue: '#99E7FF',
    errorRed: '#F6685F',
    fontColor: '#3B3B3B',
  },
  size: {
    smallMobile: 'screen and (max-width: 380px)',
    mobileColumn: 'screen and (max-width: 480px)',
    mobileRow: 'screen and (max-width: 767px)',
    tablet: 'screen and (max-width: 1023px)',
    desktop: 'screen and (min-width: 1024px)',
    desktopAndTablet: 'screen and (min-width: 768px)',
    tabletAndMobile: 'screen and (max-width: 1023px)',
  },
};

export default theme;
