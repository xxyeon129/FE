import useCreatePortfolioInput from '@src/Hook/useCreatePortfolioInput';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { SetterOrUpdater } from 'recoil';
import { TiDelete } from 'react-icons/ti';

interface TechStackTagProps {
  setTechStackRequestData: SetterOrUpdater<string>;
}

const TechStackTag = ({ setTechStackRequestData }: TechStackTagProps) => {
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

  const deleteTag = (tagIndexToDelete: number) => {
    tagArray.splice(tagIndexToDelete, 1);
    setTagArray([...tagArray]);
  };

  useEffect(() => {
    const tagStringData = tagArray.toString();
    setTechStackRequestData(tagStringData);
  }, [tagArray]);

  return (
    <StTechStackTagContainer>
      <StTechStackTagUnorderedList>
        {tagArray.map((tag, index) => (
          <StTechStackTagList key={index}>
            <StTechStackTagText>{tag}</StTechStackTagText>
            <StTagDeleteIcon onClick={() => deleteTag(index)} />
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
  border: 1px solid gray;
  border-radius: 10px;
  width: 600px;
  flex-flow: wrap;
  gap: 1rem;
`;

const StTechStackTagUnorderedList = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

const StTechStackTagList = styled.li`
  display: flex;
  align-items: center;

  background-color: lightgray;
  border-radius: 5px;
  padding: 2px 5px 2px 10px;
`;

const StTechStackTagText = styled.span``;

const StTagDeleteIcon = styled(TiDelete)`
  font-size: 20px;
  padding: 0;
  margin: 0;
`;

const StTechStackTagInput = styled.input`
  border: none;
  width: 220px;
`;

export default TechStackTag;
