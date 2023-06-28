import { fadeInAnimation } from '@src/style/common/commonStyles';
import { useEffect, useRef, useState } from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { keyframes, styled } from 'styled-components';

const ScrollLeadText = () => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsScroll(!entry.isIntersecting);
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(onScroll, observerOptions);

    scrollRef.current && observer.observe(scrollRef.current);

    return () => {
      scrollRef.current && observer.unobserve(scrollRef.current);
    };
  }, []);

  return (
    <>
      <StIndicator ref={scrollRef} />
      <StFadeinTextWrapper>
        <StScrollLeadText scroll={`${isScroll}`}>
          <MdKeyboardDoubleArrowDown /> 스크롤을 내려주세요!
        </StScrollLeadText>
      </StFadeinTextWrapper>
    </>
  );
};

const StFadeinTextWrapper = styled.div`
  position: absolute;
  top: 710px;

  opacity: 0;
  animation: ${fadeInAnimation} ease-in 1s;
  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-delay: 3.9s;
`;

const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100%{
    transform: translateY(0);
  }
`;

const StScrollLeadText = styled.div<{ scroll: string }>`
  z-index: 2;
  color: gray;
  animation: ${bounceAnimation} 1.7s infinite;
  display: ${({ scroll }) => (scroll === 'true' ? 'none' : 'block')};
  animation-delay: 3.9s;
`;

const StIndicator = styled.div`
  position: absolute;
  margin-top: 10px;
  padding: 10px;
`;

export default ScrollLeadText;
