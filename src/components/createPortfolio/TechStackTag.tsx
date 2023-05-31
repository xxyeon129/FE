import useCreatePortfolioInput from '@src/Hook/useCreatePortfolioInput';
import { useState } from 'react';
import { styled } from 'styled-components';

interface TechStackTagProps {
  techstackRequestData: string;
  setTechStackRequestData: React.Dispatch<React.SetStateAction<string>>;
}

const TechStackTag = ({ techstackRequestData, setTechStackRequestData }: TechStackTagProps) => {
  const [tagArray, setTagArray] = useState<string[]>([]);
  const {
    inputData: tagInputValue,
    setInputData: setTagInputValue,
    onChangeInput: onChangeTagInputValue,
  } = useCreatePortfolioInput();

  const createTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newTag = event.currentTarget.value;

    const pressEnter = event.key === 'Enter';
    const notBlankInput = newTag !== '';
    const compareTagArray = tagArray.map(tag => tag.toUpperCase());
    const notSameText = !compareTagArray.includes(newTag.toUpperCase());

    const isNewTag = pressEnter && notBlankInput && notSameText;
    const isExistTag = pressEnter && !notSameText;

    if (isNewTag) {
      setTagArray([...tagArray, newTag]);
      setTagInputValue('');
    }

    if (isExistTag) setTagInputValue('');
  };

  return (
    <StTechStackTagContainer>
      <StTechStackTagUnorderedList>
        {tagArray.map((tag, index) => (
          <StTechStackTagList key={index}>
            <StTechStackTagText>{tag}</StTechStackTagText>
          </StTechStackTagList>
        ))}
      </StTechStackTagUnorderedList>

      <StTechStackTagInput
        type="text"
        id="techstack"
        onKeyUp={createTag}
        onChange={onChangeTagInputValue}
        value={tagInputValue}
        placeholder="입력 후 Enter로 태그를 생성해주세요."
      />
    </StTechStackTagContainer>
  );
};

const StTechStackTagContainer = styled.div`
  display: flex;

  padding: 1rem;
  border: 1px solid;
`;

const StTechStackTagUnorderedList = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

const StTechStackTagList = styled.li``;

const StTechStackTagText = styled.span`
  background-color: lightgray;
  border-radius: 5px;
  padding: 2px 10px;
`;

const StTechStackTagInput = styled.input`
  /* border: none; */
`;

export default TechStackTag;
