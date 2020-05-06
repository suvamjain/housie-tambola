import React from "react";
import styled from "styled-components";

export const CONFIRMATION_MODAL_BODY = (content) => {
  return (
    <ModalBody>
      <ContentText>{content}</ContentText>
    </ModalBody>
  );
};

export const CREATE_NEW_PROJECT = (projValue, error, onTitleChange) => {
  return (
    <>
      <ModalBody>
        <ContentText>
          This will create a new project under which you will be able to place
          content orders. You can access your projects from the projects section
          of your profile.
        </ContentText>
        <InputWrapper>
          {/* <Input
            name="proj_title"
            type="text"
            label="Project Title"
            placeholder="Your title goes here"
            value={projValue}
            error={error}
            onTextChange={onTitleChange}
          /> */}
        </InputWrapper>
      </ModalBody>
    </>
  );
};

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const CommonP = styled.p`
  text-align: left;
  padding: 0;
  margin: 0;
`;

const ContentText = styled(CommonP)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  white-space: pre-line;
  font-family: OpenSansRegular;
  font-size: 1.4rem;
  line-height: 1.5;
  color: #222832;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin: 3.2rem 0 1.6rem;
`;
