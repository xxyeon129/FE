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
import { GITHUB_ID_REGEX, LINK_REGEX } from '@src/components/common/createPortfolio/validator';

const Step08Link = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [youtubeUrl, setYoutubeUrl] = useRecoilState<string>(createYoutubeState);
  const [blogUrl, setBlogUrl] = useRecoilState<string>(createBlogState);
  const [githubID, setGithubID] = useRecoilState<string>(createGithubState);

  const { onChangeInput: onChangeYoutubeUrl } = useOnChangeInput({
    setRecoilState: setYoutubeUrl,
    REGEX: LINK_REGEX,
  });
  const { onChangeInput: onChangeBlogUrl } = useOnChangeInput({
    setRecoilState: setBlogUrl,
    REGEX: LINK_REGEX,
  });
  const { onChangeInput: onChangeGithubID } = useOnChangeInput({
    setRecoilState: setGithubID,
    REGEX: GITHUB_ID_REGEX,
  });

  const selectedCategory = useRecoilValue(createCategoryState);
  const isDeveloper = selectedCategory === 'Develop';

  const title = '포트폴리오에 표시될 \n추가정보를 알려주세요';
  const description =
    '영문으로만 입력이 가능하니 한/영 키를 확인해주세요!\n추가정보를 입력하신 경우에만 링크 미리보기가 포트폴리오에 표시되고,\n입력하지 않아도 포트폴리오가 정상적으로 작성됩니다.';
  const responsiveDescription =
    '영문으로만 입력이 가능하니 한/영 키를 확인해주세요!\n\n추가정보를 입력하신 경우에만 링크 미리보기가 포트폴리오에 표시되고, 입력하지 않아도 포트폴리오가 정상적으로 작성됩니다.';

  return (
    <S.Container>
      <S.ContentContainer>
        <TitleTextLabel
          title={title}
          description={description}
          responsiveDescription={responsiveDescription}
        />
        <StInputContainer>
          <S.PersonalInfoStyle.Container>
            <S.PersonalInfoStyle.Label>Youtube</S.PersonalInfoStyle.Label>
            <StInput
              value={youtubeUrl}
              onChange={onChangeYoutubeUrl}
              placeholder="Youtube 활동을 하고 계시다면 관련 링크를 입력해주세요."
            />
            <StMobileSizeInput
              value={youtubeUrl}
              onChange={onChangeYoutubeUrl}
              placeholder="Ex) https://youtube.com"
            />
          </S.PersonalInfoStyle.Container>
          <S.PersonalInfoStyle.Container>
            <S.PersonalInfoStyle.Label>Blog</S.PersonalInfoStyle.Label>
            <StInput
              value={blogUrl}
              onChange={onChangeBlogUrl}
              placeholder="운영하는 blog가 있다면 관련 링크를 입력해주세요."
            />
            <StMobileSizeInput
              value={blogUrl}
              onChange={onChangeBlogUrl}
              placeholder="Ex) https://blog.com"
            />
          </S.PersonalInfoStyle.Container>
          {isDeveloper && (
            <S.PersonalInfoStyle.Container>
              <S.PersonalInfoStyle.Label>Github ID</S.PersonalInfoStyle.Label>
              <StInput
                value={githubID}
                onChange={onChangeGithubID}
                placeholder="작성하신 Github ID의 commit contributions이 포트폴리오에 표시됩니다."
              />
              <StMobileSizeInput
                value={githubID}
                onChange={onChangeGithubID}
                placeholder="Ex) github"
              />
            </S.PersonalInfoStyle.Container>
          )}
        </StInputContainer>
      </S.ContentContainer>
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.SEVEN)} />
        <NextStepButton onClick={() => onNextButtonClick(STEP.NINE)} />
      </S.ButtonContainer>
    </S.Container>
  );
};

const StInputContainer = styled.div`
  width: 750px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
  }
`;

const StInput = styled.input`
  width: 100%;
  border: none;
  font-size: 15px;
  &::placeholder {
    color: #b5b5b5;
  }

  @media screen and (max-width: 650px) {
    display: none;
  }
`;

const StMobileSizeInput = styled(StInput)`
  display: none;

  @media screen and (max-width: 650px) {
    display: block;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 0.8rem;
  }
`;

export default Step08Link;
