import React from 'react';
import styled from 'styled-components';

const P = styled.p `
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({error, success}) => {
    if (error) return 'var(--color-errorRed)';
    if (success) return 'green';
    else return 'var(--color-main)';
  }};
  opacity: ${({show}) => (show ? '1' : '0')};
  transform: ${({show}) => (show ? 'translateY(30px)' : 'translateY(0)')};
  transition: all .2s;
  text-align: center;
`;

const Message = ({children, error, success, show}) => {
  return (
    <P
      error={error}
      success={success}
      show={show}
      className="error"
    >
      {children}
    </P>
  )
}

export default Message;
