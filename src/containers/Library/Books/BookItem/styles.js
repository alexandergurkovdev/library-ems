import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Col = styled.div `
  width: 33.333%;
  padding: 0 1.5rem;
  margin-top: 1.5rem;

  @media ${props => props.theme.mediaQueries.medium} {
    width: 50%;
  }

  @media ${props => props.theme.mediaQueries.small} {
    width: 100%;
  }
`;

export const Item = styled.div `
  background: var(--color-whiteColor);
  box-shadow: var(--shadow);
  border-radius: 1.5rem;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: .3s all;
  position: relative;
  &:hover{
    transform: translateY(-.3rem);
  }
`;

export const Value = styled.span `
  font-weight: 700;
  color: var(--color-yellow);
`;

export const ValueToBottom = styled.div `
  margin-top: auto;
  padding-top: 1rem;
`;

export const BtnWrap = styled.div `
  margin: 1rem 1rem 0 0;
  width: 100%;
`;

export const BookItemReviews = styled(Link) `
  display: block;
  font-size: 1.4rem;
`;