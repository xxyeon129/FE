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
import { mainPageFilterswiperBreakpoints } from '@src/shared/utils/swiperBreakpoints';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

  return (
    <StContainer className="swiper-container">
      <StSwiperWrapper className="swiper-wrapper">
        <Swiper
          centeredSlides={false}
          spaceBetween={1}
          navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
          modules={[Pagination, Navigation]}
          breakpoints={mainPageFilterswiperBreakpoints}
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

const StFilterButton = styled.button<{ isselected: string; color: string }>`
  font-size: 16px;
  width: 140px;
  height: 37px;
  margin: 7px 0;
  border-radius: 50px;
  background-color: ${({ theme, isselected, color }) =>
    isselected === 'true' ? color : theme.color.lightGray};
  font-weight: ${({ isselected }) => isselected === 'true' && '800'};

  @media ${({ theme }) => theme.size.mobileRow} {
    font-size: 13px;
    width: 100px;
  }
`;

export default Filter;
