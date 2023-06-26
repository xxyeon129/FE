import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Git } from '@src/assets/portfolioDetail/portedit-git-icon.svg';
import { ReactComponent as YouTube } from '@src/assets/portfolioDetail/portedit-youtube-icon.svg';
import { ReactComponent as Blog } from '@src/assets/portfolioDetail/portedit-blog-icon.svg';
import { DesktopAndTablet } from '@src/style/mediaQuery.ts';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';

interface EditLinkSectionProps {
  youtube: string;
  blog: string;
  githubId: string;
  onYoutubeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlogHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onGithubHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

function EditLinkSection(props: EditLinkSectionProps) {
  const isDarkMode = useRecoilValue(isDarkModeState);

  return (
    <div>
      <StRinkWrapper>
        <StRinkWrapperTitle>링크 추가</StRinkWrapperTitle>
        <StRinkInputWithIcon isdarkmode={`${isDarkMode}`}>
          <YouTubeIcon>
            <YouTube />
            <DesktopAndTablet>
              <LinkTitle>YouTube</LinkTitle>
            </DesktopAndTablet>
          </YouTubeIcon>
          <StRinkInput
            isdarkmode={`${isDarkMode}`}
            type="text"
            id="youtube"
            value={props.youtube}
            onChange={props.onYoutubeHandler}
            placeholder="운영하는 YouTube가 있다면 링크를 입력해주세요."
          />
        </StRinkInputWithIcon>
        <StRinkInputWithIcon isdarkmode={`${isDarkMode}`}>
          <BlogIcon>
            <Blog />
            <DesktopAndTablet>
              <LinkTitle>Blog</LinkTitle>
            </DesktopAndTablet>
          </BlogIcon>
          <StRinkInput
            isdarkmode={`${isDarkMode}`}
            type="text"
            id="blog"
            value={props.blog}
            onChange={props.onBlogHandler}
            placeholder="운영하는 Blog가 있다면 링크를 입력해주세요."
          />
        </StRinkInputWithIcon>
        <div>
          <StRinkInputWithIcon isdarkmode={`${isDarkMode}`}>
            <GitIcon>
              <Git />
              <DesktopAndTablet>
                <LinkTitle>Git</LinkTitle>
              </DesktopAndTablet>
            </GitIcon>
            <StRinkInput
              isdarkmode={`${isDarkMode}`}
              type="text"
              id="github"
              value={props.githubId}
              onChange={props.onGithubHandler}
              placeholder="운영하는 Github가 있다면 ID를 입력해주세요."
            />
          </StRinkInputWithIcon>
        </div>
      </StRinkWrapper>
      <StLine />
    </div>
  );
}

export default EditLinkSection;

const input = `
  flex: 1;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  height: 40px;
  width: 70%;
  margin-top: 10px;
`;

const StRinkWrapper = styled.div`
  margin: 50px 0;
`;

const StRinkWrapperTitle = styled.h1`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 479px) {
    font-size: 15px;
  }
`;

const StRinkInput = styled.input<{ isdarkmode: string }>`
  ${input}
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: 0px;
`;

const StRinkInputWithIcon = styled.div<{ isdarkmode: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  /* border: ${({ isdarkmode }) =>
    isdarkmode === 'true' ? '2px solid #red' : '1px solid #ccc'}; */
  /* border: 1px solid red; */
`;

const GitIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 40px;
  background-color: black;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  padding: 10px;
  border: 1px solid;
  border-right: none;
`;

const YouTubeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 40px;
  background-color: black;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  padding: 10px;
  border: 1px solid;
  border-right: none;
`;

const BlogIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 40px;
  background-color: black;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  padding: 10px;
  border: 1px solid;
  border-right: none;
`;

const LinkTitle = styled.span`
  margin-left: 10px;
  font-weight: bold;
  color: white;
`;

const StLine = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px auto;
  width: 100%;
  margin: 50px 0;
`;
