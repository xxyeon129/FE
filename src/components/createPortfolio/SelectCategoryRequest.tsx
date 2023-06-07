import { styled } from 'styled-components';

const SelectCategoryRequest = () => {
  return (
    <StSelectCategoryRequest>
      <StNoCategoryText>
        선택하신 직군이 없습니다.
        <br /> 직군을 선택해주세요!
      </StNoCategoryText>
    </StSelectCategoryRequest>
  );
};

const StSelectCategoryRequest = styled.div`
  display: flex;
  flex-direction: column;
`;

const StNoCategoryText = styled.div`
  color: gray;
  font-weight: bold;
  line-height: 150%;
  text-align: center;
`;

export default SelectCategoryRequest;
