import { createLocationState, createResidenceState } from '@src/states';
import { useRecoilState } from 'recoil';
import SelectDropdown from '../common/createPortfolio/SelectDropdown';
import { styled } from 'styled-components';

const LocationForm = () => {
  const [residence, setResidence] = useRecoilState(createResidenceState);
  const [location, setLocation] = useRecoilState(createLocationState);

  const regionList = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청도',
    '전라도',
    '경상도',
    '제주특별자치도',
    '해외',
  ];

  return (
    <>
      <StLocationWrapper>
        <SelectDropdown
          dropdownOptions={regionList}
          selectBarDefaultText="포트폴리오에 표시될 거주지를 선택해주세요."
          selectBarDefaultTextMobileSize="거주지 선택"
          selectedOption={residence}
          setSelectedOption={setResidence}
          label="거주지"
          isPersonalInfo={true}
        />
      </StLocationWrapper>
      <SelectDropdown
        dropdownOptions={regionList}
        selectBarDefaultText="포트폴리오에 표시될 희망 근무지역을 선택해주세요."
        selectBarDefaultTextMobileSize="희망 근무지 선택"
        selectedOption={location}
        setSelectedOption={setLocation}
        label="희망 근무지역"
        isPersonalInfo={true}
      />
    </>
  );
};

const StLocationWrapper = styled.div`
  z-index: 2;
`;

export default LocationForm;
