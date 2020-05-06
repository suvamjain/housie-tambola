import React, { Component } from "react";
import styled from "styled-components";
import Modal, { BaseModalBackground } from "styled-react-modal";

/*
  ---------------- Read Materials - styled-react-modal ----------------
  https://github.com/AlexanderRichey/styled-react-modal
  https://codesandbox.io/s/styled-react-modal-demo-evvwv?file=/src/index.js:1523-1562

*/

function modal({
  modal,
  toggle,
  headerText,
  isOpen,
  positiveAction,
  negativeAction,
  showSaveButton,
  className,
  wrapClassName,
  backdrop,
}) {
  return (
    <StyledModal
      isOpen={isOpen}
      // afterOpen={afterOpen}
      // beforeClose={beforeClose}
      // onBackgroundClick={toggle}
      // onEscapeKeydown={toggle}
      allowScroll={false}
      backgroundProps={{ background: backdrop ? "" : "transparent" }}
    >
      <Wrapper>
        {modal.header && modal.header(toggle, headerText)}
        {modal.body()}
        {modal.footer &&
          modal.footer(negativeAction, positiveAction, showSaveButton)}
      </Wrapper>
    </StyledModal>
  );
}

class ModalProvider extends Component {
  render() {
    return modal(this.props);
  }
}

// ModalProvider.propTypes = {
//   isOpen: {
//     type: Boolean,
//     required: true,
//   },
// };

export default ModalProvider;

const StyledModal = Modal.styled`
  width: 90vw;
  min-height: 20rem;
  display: flex;
  z-index: 30;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f2f2f2;
  padding: 3.2rem 0;

  /* uncomment these lines if modal can scroll along with content */
  max-height: 75vh;
  
  @media (min-width: 768px) {
    max-width: 80rem;
    width: auto;

    /* uncomment this line if modal can scroll along with content */
    max-height: 40rem;
  }

  
`;

const Wrapper = styled.div`
  display: grid;
  // width: 100%;
  align-items: start;
  grid-template-columns: 100%;
  grid-template-rows: repeat(3, auto-fit);
  grid-row-gap: 2.4rem;
  font-size: 1.6rem;
  padding: 0 3.2rem;

  overflow-x: hidden;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 0 4.8rem;
  }

  /* --- Custom scrollbar styling --- */

  /* width */
  &::-webkit-scrollbar {
    width: 4px !important;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #ebebeb;
    -webkit-border-radius: 2px !important;
    border-radius: 2px !important;
    margin: 1.5rem 0;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #222832;
    border-radius: 6px !important;
    -webkit-border-radius: 6px !important;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
  }
`;
