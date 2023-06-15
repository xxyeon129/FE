import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as YouTube } from '@src/assets/portfolioDetail/portedit-youtube-icon.svg';
import { ReactComponent as Blog } from '@src/assets/portfolioDetail/portedit-blog-icon.svg';

interface LinkSectionProps {
  blog: string;
  youtube: string;
  githubId: string;
  onMyBlog: () => void;
  onMyYoutube: () => void;
  onMyGit: () => void;
}

function LinkSection(props: LinkSectionProps) {
  return (
    <Container>
      <div>
        <StContentTitle>링크</StContentTitle>
      </div>
      {props.blog && (
        <StBlog onClick={props.onMyBlog}>
          <BlogIcon />
          <span>{props.blog}</span>
        </StBlog>
      )}

      {props.youtube && (
        <StYoutube onClick={props.onMyYoutube}>
          <YouTubeIcon />
          <span>{props.youtube}</span>
        </StYoutube>
      )}

      {props.githubId && (
        <StGithub onClick={props.onMyGit}>
          <StGitgrass
            src={`https://ghchart.rshah.org/${props.githubId}`}
            alt="GitHub Contributions"
          />
        </StGithub>
      )}

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
`;

const StBlog = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 20px 0;
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
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
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
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
`;

const StGitgrass = styled.img`
  width: 100%;
  height: auto;
`;

const YouTubeIcon = styled(YouTube)`
  width: 30%;
  height: 40px;
  background-color: black;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  padding: 10px;
  margin-right: 20px;
`;

const BlogIcon = styled(Blog)`
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
