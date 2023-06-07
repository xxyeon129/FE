import { useState } from 'react';
import { css, styled } from 'styled-components';
import { SetterOrUpdater } from 'recoil';
import { GrClose } from 'react-icons/gr';

interface TechStackTagProps {
  techStack: string[];
  setTechStack: SetterOrUpdater<string[]>;
  StWidth: string;
}

const TechStackTag = ({ techStack, setTechStack, StWidth }: TechStackTagProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };

  const createTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newTag = event.currentTarget.value;

    const pressEnter = event.key === 'Enter';
    const notBlankInput = newTag !== '';
    const compareTagArray = techStack.map(tag => tag.toUpperCase());
    const notSameText = !compareTagArray.includes(newTag.toUpperCase());

    const isNewTag = pressEnter && notBlankInput && notSameText;
    const isExistTag = pressEnter && !notSameText;

    if (isNewTag) {
      setTechStack([...techStack, newTag]);
      setInputValue('');
    }

    if (isExistTag) setInputValue('');
  };

  const deleteTag = (tagIndexToDelete: number) => {
    const deletedTechStack = techStack.filter((_, index) => index !== tagIndexToDelete);
    setTechStack(deletedTechStack);
  };

  const onFocusInput = () => setIsInputFocused(true);

  const onBlurInput = () => setIsInputFocused(false);

  return (
    <StTechStackTagContainer isfocused={`${isInputFocused}`} width={StWidth}>
      <StTechStackTagUnorderedList>
        {techStack.length !== 0 &&
          techStack.map((tag, index) => (
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
        onChange={onChangeInput}
        value={inputValue}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        placeholder="입력 후 Enter로 태그를 생성해주세요."
      />
    </StTechStackTagContainer>
  );
};

const StTechStackTagContainer = styled.div<{ isfocused: string; width: string }>`
  display: flex;

  padding: 1rem;
  outline: 1px solid gray;
  border-radius: 10px;
  width: ${({ width }) => width};
  flex-flow: wrap;
  gap: 1rem;

  ${({ isfocused }) =>
    isfocused === 'true' &&
    css`
      outline: 2px solid;
    `}
`;

const StTechStackTagUnorderedList = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

const StTechStackTagList = styled.li`
  display: flex;
  align-items: center;

  background-color: #e3e3e3;
  border-radius: 50px;
  padding: 8px 12px;
`;

const StTechStackTagText = styled.span``;

const StTagDeleteIcon = styled(GrClose)`
  font-size: 12px;
  padding: 0;
  margin-left: 6px;
  cursor: pointer;
`;

const StTechStackTagInput = styled.input`
  border: none;
  width: 220px;
`;

export default TechStackTag;
