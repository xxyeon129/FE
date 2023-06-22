import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as YouTube } from '@src/assets/portfolioDetail/portedit-youtube-icon.svg';
import { ReactComponent as Blog } from '@src/assets/portfolioDetail/portedit-blog-icon.svg';
import ErrorIcon from '@src/assets/portfolioDetail/port-error-icon.svg';

interface LinkSectionProps {
  blog: string;
  youtube: string;
  githubId: string;
  onMyBlog: () => void;
  onMyYoutube: () => void;
  onMyGit: () => void;
}

function LinkSection(props: LinkSectionProps) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  return (
    <Container>
      <div>
        <StContentTitle>링크</StContentTitle>
      </div>

      {props.youtube && (
        <StYoutube onClick={props.onMyYoutube}>
          <YouTubeIcon>
            <YouTube />
            <LinkTitle>YouTube</LinkTitle>
          </YouTubeIcon>
          <span>{props.youtube}</span>
        </StYoutube>
      )}

      {props.blog && (
        <StBlog onClick={props.onMyBlog}>
          <BlogIcon>
            <Blog />
            <LinkTitle>Blog</LinkTitle>
          </BlogIcon>
          <span>{props.blog}</span>
        </StBlog>
      )}

      <div>
        {props.githubId && (
          <StGithub onClick={props.onMyGit}>
            <StGithubContainer>
              <StGitgrass
                src={`https://ghchart.rshah.org/${props.githubId}`}
                alt="GitHub 아이디를 확인해주세요."
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = ErrorIcon;
                  e.currentTarget.style.width = '20px';
                  e.currentTarget.style.height = '20px';
                  setShowErrorMessage(true);
                }}
              />
              {showErrorMessage && <ErrorMessage>GitHub 아이디를 확인해주세요.</ErrorMessage>}
            </StGithubContainer>
          </StGithub>
        )}
      </div>

      <StLine />
    </Container>
  );
}

export default LinkSection;

const Container = styled.div`
  margin: 5%;
`;

const StContentTitle = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 30px;
  gap: 10px;

  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 15px;
  }

  @media (max-width: 479px) {
    font-size: 18px;
  }
`;

const LinkTitle = styled.span`
  margin-left: 10px;
  font-weight: bold;
  color: white;

  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 8px;
  }

  @media (max-width: 479px) {
    font-size: 8px;
  }
`;

const StBlog = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 20px 0;
  border-radius: 4px;
  border: 1px solid black;
  color: black;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }

  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 8px;
  }

  @media (max-width: 479px) {
    font-size: 8px;
  }
`;

const StYoutube = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 20px 0;
  border-radius: 4px;
  border: 1px solid black;
  color: black;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }

  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 8px;
  }

  @media (max-width: 479px) {
    font-size: 8px;
  }
`;

const StGithub = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  padding: 20px;
  margin: 5% 0;
  border-radius: 20px;
  cursor: pointer;
  justify-content: center;
`;

const StGithubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StGithubId = styled.p`
  /* @media (max-width: 1170) {
    font-size: 8px;
  } */
`;

const StGitgrass = styled.img`
  width: 100%;
  height: auto;
`;

const ErrorMessage = styled.div``;

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
  margin-right: 20px;
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
  margin-right: 20px;
`;

const StLine = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px auto;
  width: 100%;
`;
