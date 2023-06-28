import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterState, selectedCategoryState } from '@src/states';
import { CATEGORY_KEYWORD } from '@src/constants/portfolioFilteringData';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import theme from '@src/style/theme';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
SwiperCore.use([Pagination, Navigation]);

interface FilterPropsType {
  filterList: string[];
  onClickFilterButton: (filterKeyword: string) => Promise<void>;
}

const Filter = ({ filterList, onClickFilterButton }: FilterPropsType) => {
  const [filter, setFilter] = useRecoilState<string>(filterState);
  const [backgroundColor, setBackgroundColor] = useState('');
  const selectedCategory = useRecoilValue(selectedCategoryState);

  const onClickFilter = (filterKeyword: string) => {
    setFilter(filterKeyword);
    onClickFilterButton(filterKeyword);
  };

  useEffect(() => {
    switch (selectedCategory) {
      case CATEGORY_KEYWORD.DEVELOP:
        setBackgroundColor(theme.color.neonGreen);
        break;
      case CATEGORY_KEYWORD.DESIGN:
        setBackgroundColor(theme.color.blueGreen);
        break;
      case CATEGORY_KEYWORD.PHOTOGRAPHER:
        setBackgroundColor(theme.color.skyBlue);
        break;
      default:
        break;
    }
  }, [selectedCategory]);

  const swiperBreakpoints = {
    0: { slidesPerView: 1, spaceBetween: 1 },
    435: { slidesPerView: 1, spaceBetween: 1 },
    458: { slidesPerView: 1.3, spaceBetween: 1 },
    508: { slidesPerView: 1.5, spaceBetween: 1 },
    543: { slidesPerView: 2, spaceBetween: 1 },
    560: { slidesPerView: 2.3, spaceBetween: 1 },
    615: { slidesPerView: 2.5, spaceBetween: 1 },
    651: { slidesPerView: 3, spaceBetween: 1 }, //
    675: { slidesPerView: 3.3, spaceBetween: 1 },
    767: { slidesPerView: 3.5, spaceBetween: 1 },
    785: { slidesPerView: 1.5, spaceBetween: 5 },
    825: { slidesPerView: 2, spaceBetween: 5 },
    865: { slidesPerView: 2.3, spaceBetween: 5 },
    940: { slidesPerView: 2.5, spaceBetween: 5 },
    995: { slidesPerView: 3, spaceBetween: 1 },
    1135: { slidesPerView: 3.5, spaceBetween: 1 },
    1165: { slidesPerView: 4.5, spaceBetween: 1 },
    1315: { slidesPerView: 5.5, spaceBetween: 1 },
    1440: { slidesPerView: 6.5, spaceBetween: 1 },
    1600: { slidesPerView: 7.5, spaceBetween: 1 },
    1786: { slidesPerView: 8, spaceBetween: 10 },
  };

  return (
    <StContainer className="swiper-container">
      <StSwiperWrapper className="swiper-wrapper">
        <Swiper
          centeredSlides={false}
          spaceBetween={1}
          navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
          modules={[Pagination, Navigation]}
          breakpoints={swiperBreakpoints}
          style={{ marginLeft: '60px', marginRight: '60px', position: 'unset' }}
          className="mySwiper"
        >
          {filterList.map((filterKeyword, filterItemIndex) => (
            <SwiperSlide key={filterItemIndex}>
              <StFilterButton
                onClick={() => onClickFilter(filterKeyword)}
                isselected={`${filterKeyword === filter}`}
                color={backgroundColor}
              >
                {filterKeyword}
              </StFilterButton>
            </SwiperSlide>
          ))}
        </Swiper>
        <StPrevIcon className="swiper-button-prev" />
        <StNextIcon className="swiper-button-next" />
      </StSwiperWrapper>
    </StContainer>
  );
};

const StContainer = styled.div`
  width: 100%;
  padding: 50px 0;
`;

const StSwiperWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const StNextIcon = styled(FaChevronRight)`
  color: white;
  filter: drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.3));
`;

const StPrevIcon = styled(FaChevronLeft)`
  color: white;
  filter: drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.3));
`;

const StFilterListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-auto-rows: min-content;
  row-gap: 10px;
  column-gap: 10px;

  padding: 50px 0;

  @media screen and (min-width: 1580px) {
    display: flex;
    justify-content: space-between;
  }

  @media ${({ theme }) => theme.size.mobileRow} {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const StFilterButton = styled.button<{ isselected: string; color: string }>`
  font-size: 16px;
  width: 140px;
  height: 37px;
  margin: 7px 0;
  border-radius: 50px;
  background-color: ${({ theme, isselected, color }) =>
    isselected === 'true' ? color : theme.color.lightGray};
  font-weight: ${({ isselected }) => isselected === 'true' && '800'};

  /* &:first-child {
    margin-left: 50px;
  } */
  /* &:last-child {
    margin-right: 200px;
  } */

  @media ${({ theme }) => theme.size.mobileRow} {
    font-size: 13px;
    width: 100px;
  }
`;

export default Filter;
