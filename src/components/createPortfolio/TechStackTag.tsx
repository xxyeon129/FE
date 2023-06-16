import { useState } from 'react';
import { css, styled } from 'styled-components';
import { SetterOrUpdater } from 'recoil';
import { IoCloseOutline } from 'react-icons/io5';

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
              <StTagDeleteIconWrapper>
                <StTagDeleteIcon onClick={() => deleteTag(index)} />
              </StTagDeleteIconWrapper>
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
  flex-wrap: wrap;
  /* flex-flow: wrap; */
  gap: 1rem;

  ${({ isfocused }) =>
    isfocused === 'true' &&
    css`
      outline: 2px solid;
    `}

  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
  }
`;

const StTechStackTagUnorderedList = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StTechStackTagList = styled.li`
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.color.gray};
  border-radius: 50px;
  position: relative;
`;

const StTechStackTagText = styled.span`
  font-weight: 700;
  padding: 10px 35px;
`;

const StTagDeleteIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
`;

const StTagDeleteIcon = styled(IoCloseOutline)`
  font-size: 15px;
  color: gray;

  cursor: pointer;
`;

const StTechStackTagInput = styled.input`
  border: none;
  width: 225px;
`;

export default TechStackTag;
