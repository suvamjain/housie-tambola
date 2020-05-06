import React from "react";
import styled from "styled-components";

export const CONFIRMATION_MODAL_FOOTER = (
  negative,
  positive,
  negativeAction,
  positiveAction,
  className
) => {
  return (
    <ModalFooter>
      {negative ? (
        <ButtonWrapper>
          <Button onClick={negativeAction}>{negative}</Button>
        </ButtonWrapper>
      ) : null}
      {positive ? (
        <ButtonWrapper>
          <Button onClick={positiveAction}>{positive}</Button>
        </ButtonWrapper>
      ) : null}
    </ModalFooter>
  );
};

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.8rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const ButtonWrapper = styled.div`
  width: 9rem;
  &:not(:last-child) {
    margin-right: 3.2rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #222832;
  border-radius: 2px;
  border: 1px solid #222832;
  padding: 1rem;
  outline: none;
  background-color: white;

  &:hover,
  &:active {
    cursor: pointer;
    background-color: #222832;
    color: white;
  }
`;
