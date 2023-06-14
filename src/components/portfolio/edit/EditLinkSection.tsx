import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

interface EditLinkSectionProps {
  youtube: string;
  blog: string;
  githubId: string;
  onYoutubeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlogHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onGithubHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

function EditLinkSection(props: EditLinkSectionProps) {
  return (
    <div>
      <StRinkWrapper>
        <div>
          <StLabel htmlFor="youtube">유튜브:</StLabel>
          <StRinkInput
            type="text"
            id="youtube"
            value={props.youtube}
            onChange={props.onYoutubeHandler}
          />
        </div>
        <div>
          <StLabel htmlFor="blog">블로그:</StLabel>
          <StRinkInput type="text" id="blog" value={props.blog} onChange={props.onBlogHandler} />
        </div>
        <div>
          <StLabel htmlFor="github">GitHub:</StLabel>
          <StRinkInput
            type="text"
            id="github"
            value={props.githubId}
            onChange={props.onGithubHandler}
          />
        </div>
      </StRinkWrapper>
    </div>
  );
}

export default EditLinkSection;

const input = `
  flex: 1;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px;
  width: 60%;
  margin-top: 10px;
`;

const StRinkWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 30px;
  margin: 30px 0;
`;

const StLabel = styled.label`
  display: inline-block;
  width: 60px;
`;

const StRinkInput = styled.input`
  ${input}
  width: 88%;
`;
