import { PortfolioDataType } from '@src/types/portfolioType';
import { styled } from 'styled-components';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import NoImage from '../common/NoImage';
import { useState } from 'react';

interface SlidePortfolioSection {
  fadeInAnimation: {
    ref: React.RefObject<HTMLDivElement>;
    style: {
      opacity: number;
      transform: string | undefined;
    };
  };
  latestPortfolioList: PortfolioDataType[];
}

const SlidePortfolioSection = (props: SlidePortfolioSection) => {
  const [imageLoadError, setImageLoadError] = useState<Record<number, boolean>>({});

  const onImageError = (slideIndex: number) => {
    setImageLoadError(prevState => ({
      ...prevState,
      [slideIndex]: true,
    }));
  };

  return (
    <StSlidePortfolioContainer>
      <StTitle {...props.fadeInAnimation}>
        POL에 등록된 79+개의 다양한 포트폴리오를 살펴보세요
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
  text-align: center;
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
