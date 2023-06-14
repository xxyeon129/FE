import React from 'react';
import { styled } from 'styled-components';

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
          <span>{props.blog}</span>
        </StBlog>
      )}

      {props.youtube && (
        <StYoutube onClick={props.onMyYoutube}>
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
  height: 120px;
  margin: 20px 0;
  border-radius: 8px;
  padding: 8px;
  background-color: #f2f2f2;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const StYoutube = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  border-radius: 8px;
  padding: 8px;
  background-color: #f2f2f2;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
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

const StLine = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px auto;
  width: 100%;
`;
