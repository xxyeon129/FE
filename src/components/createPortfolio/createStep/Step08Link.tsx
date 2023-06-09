import useOnChangeInput from '@src/Hook/useOnChangeInput';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import * as S from '@src/style/common/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import {
  createBlogState,
  createCategoryState,
  createGithubState,
  createYoutubeState,
} from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

const Step08Link = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [youtubeUrl, setYoutubeUrl] = useRecoilState<string>(createYoutubeState);
  const [blogUrl, setBlogUrl] = useRecoilState<string>(createBlogState);
  const [githubID, setGithubID] = useRecoilState<string>(createGithubState);

  const { onChangeInput: onChangeYoutubeUrl } = useOnChangeInput({ setRecoilState: setYoutubeUrl });
  const { onChangeInput: onChangeBlogUrl } = useOnChangeInput({ setRecoilState: setBlogUrl });
  const { onChangeInput: onChangeGithubID } = useOnChangeInput({ setRecoilState: setGithubID });

  const selectedCategory = useRecoilValue(createCategoryState);
  const isDeveloper = selectedCategory === 'Develop';

  const title = '포트폴리오에 표시될 추가정보를 알려주세요';
  const description =
    '입력하신 경우에만 링크 미리보기가 포트폴리오에 표시되고,\n입력하지 않아도 포트폴리오가 정상적으로 작성됩니다.';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} />
      <StOutLineDiv isgithubexist={`${isDeveloper}`}>
        <StUrlItem>
          <StLabel>Youtube</StLabel>
          <StInput
            value={youtubeUrl}
            onChange={onChangeYoutubeUrl}
            placeholder="Youtube 활동을 하고 계시다면 관련 링크를 입력해주세요."
          />
        </StUrlItem>
        <StUrlItem>
          <StLabel>Blog</StLabel>
          <StInput
            value={blogUrl}
            onChange={onChangeBlogUrl}
            placeholder="작성 중인 blog가 있다면 관련 링크를 입력해주세요."
          />
        </StUrlItem>
        {isDeveloper && (
          <StUrlItem>
            <StLabel>Github ID</StLabel>
            <StInput
              value={githubID}
              onChange={onChangeGithubID}
              placeholder="작성하신 Github ID의 commit contributions이 포트폴리오에 표시됩니다."
            />
          </StUrlItem>
        )}
      </StOutLineDiv>
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.SEVEN)} />
        <NextStepButton onClick={() => onNextButtonClick(STEP.NINE)} />
      </S.ButtonContainer>
    </S.Container>
  );
};

const StOutLineDiv = styled.div<{ isgithubexist: string }>`
  width: 600px;
  height: ${({ isgithubexist }) => (isgithubexist === 'true' ? '195px' : '130px')};
  border: 1px solid gray;
  border-radius: 10px;
`;

const StUrlItem = styled.div`
  width: 600px;
  height: 65px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 10px;

  border-bottom: 1px solid gray;

  &:last-child {
    border: none;
  }
`;

const StLabel = styled.div`
  color: gray;
  font-size: 15px;
`;

const StInput = styled.input`
  height: 100%;
  border: none;

  &::placeholder {
    color: #b5b5b5;
  }
`;

export default Step08Link;
