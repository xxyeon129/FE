import { useMediaQuery } from 'react-responsive';

export const Desktop = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? children : null;
};

export const Tablet = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? children : null;
};

export const MobileRow = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export const MobileColumn = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  return isMobile ? children : null;
};

export const DesktopAndTablet = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const isTabletAndMobile = useMediaQuery({ minWidth: 768 });
  return isTabletAndMobile ? children : null;
};

export const TabletAndMobile = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const isTabletAndMobile = useMediaQuery({ maxWidth: 1023 });
  return isTabletAndMobile ? children : null;
};
