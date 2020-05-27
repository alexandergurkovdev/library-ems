import styled from 'styled-components';

export const ReviewItem = styled.div `
  box-shadow: var(--shadow);
  padding: 2rem 5rem 2rem 2rem;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
`;

export const DeleteBtn = styled.button `
  width: 2rem;
  height: 2rem;
  position: absolute;
  border: 0;
  background: none;
  right: 2rem;
  top: 2rem;
  font-size: 2rem;
  color: var(--color-errorRed);
`;