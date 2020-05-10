import React from 'react';
import ReactDom from 'react-dom';
import BackDrop from './BackDrop/BackDrop';
import styled from 'styled-components';

const WrapperModal = styled.div `
  position: fixed;
  width: 90%;
  max-width: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 .5rem 3.5rem var(--shadow);
  border-radius: .5rem;
  background-color: var(--color-whiteColor);
  top: 50%;
  left: 50%;
  transform: ${({opened}) => (opened ? 'translate(-50%, -50%)' : 'translate(-50%, -150%)')};
  opacity: ${({opened}) => (opened ? '1' : '0')};
  visibility: ${({opened}) => (opened ? 'visible' : 'hidden')};
  transition: all .1s;
  z-index: 150;
  padding: 4rem 3rem;
`;

const Modal = React.memo(({opened, close, children}) => {
  return (
    ReactDom.createPortal(
      <React.Fragment>
        <BackDrop close={close} opened={opened} />
        <WrapperModal
          opened={opened}
        >
          {children}
        </WrapperModal>
      </React.Fragment>,
      document.getElementById('root-modal')
    )
  )
}, (prevProps, nextProps) => {
  return prevProps.opened === nextProps.opened;
});

export default Modal;
