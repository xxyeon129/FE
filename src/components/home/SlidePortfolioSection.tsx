import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { getAllChart } from '@src/apis/chart';
import { PortfolioDataType } from '@src/types/portfolioType';
import { fadeInAnimationType } from '@src/types/commonType';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import NoImage from '../common/NoImage';

interface SlidePortfolioSection {
  fadeInAnimation: fadeInAnimationType;
  latestPortfolioList: PortfolioDataType[];
}

const SlidePortfolioSection = (props: SlidePortfolioSection) => {
  const [imageLoadError, setImageLoadError] = useState<Record<number, boolean>>({});
  const [allPortfolioCount, setAllPortfolioCount] = useState<number>(0);

  const onImageError = (slideIndex: number) => {
    setImageLoadError(prevState => ({
      ...prevState,
      [slideIndex]: true,
    }));
  };

  const fetchPortfoiloCount = async () => {
    const portfoiloCountData = await getAllChart();
    setAllPortfolioCount(portfoiloCountData.all);
  };

  useEffect(() => {
    fetchPortfoiloCount();
  }, []);

  return (
    <StSlidePortfolioContainer>
      <StTitle {...props.fadeInAnimation}>
        POL에 등록된&nbsp;<span>{allPortfolioCount}+</span>개의 다양한 포트폴리오를 살펴보세요.
      </StTitle>
      <StPortfolioListContainer>
        <Swiper
          spaceBetween={10}
          speed={3000}
          loop={true}
          slidesPerView={6}
          autoplay={{ delay: 0, disableOnInteraction: true }}
          modules={[Autoplay]}
          allowTouchMove={false}
        >
          {props.latestPortfolioList.map((popularPortfolio, index) => (
            <SwiperSlide style={{ width: '20%' }}>
              {!imageLoadError[index] ? (
                <StPortfolioImage
                  src={popularPortfolio.portfolioImage}
                  onError={() => onImageError(index)}
                />
              ) : (
                <NoImage
                  width="150px"
                  height="100px"
                  borderRadius="10px"
                  boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.3)"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </StPortfolioListContainer>
    </StSlidePortfolioContainer>
  );
};

const StSlidePortfolioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StTitle = styled.h1`
  display: flex;
  justify-content: center;

  > span {
    color: ${({ theme }) => theme.color.lightGreen};
  }
`;

const StPortfolioListContainer = styled.div``;

const StPortfolioImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
`;

export default SlidePortfolioSection;
