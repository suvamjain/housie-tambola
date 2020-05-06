import React from "react";
import styled from "styled-components";

export const DETAILS_MODAL_HEADER = (toggle) => {
  return <ModalHeader toggle={toggle}>Details</ModalHeader>;
};

export const EMPLOYMENT_INFO_HEADER = (toggle) => {
  return <ModalHeader toggle={toggle}>Update Information</ModalHeader>;
};

export const PORTFOLIO_INFO_HEADER = (toggle, headerText) => {
  return (
    <ModalHeader toggle={toggle}>
      {headerText || "New Portfolio Item"}
    </ModalHeader>
  );
};

export const DROPDOWN_ACTION_HEADER = (toggle, headerText) => {
  return <ModalHeader toggle={toggle}>{headerText || "New Item"}</ModalHeader>;
};

export const CONFIRMATION_MODAL_HEADER = (toggle, content) => {
  return <ModalHeader toggle={toggle}>{content}</ModalHeader>;
};

export const SUBJECTIVE_SUCCESSFUL_SUBMISSION_BODY = (toggle) => {
  return (
    <ModalHeader toggle={toggle}>Thank you for the submission!</ModalHeader>
  );
};

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  white-space: pre-line;
  align-items: flex-start;
  justify-content: center;
  font-family: OpenSansBold;
  font-size: 2rem;
  line-height: 1.4;
  color: #000a19;
`;
