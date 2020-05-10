import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ color }) =>
  color === 'white' ? 'var(--color-whiteColor)' : 'var(--color-textColor)'};
  font-weight: 700;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  cursor: pointer;
  display: block;
  text-align: center;
  &:active {
    color: var(--color-yellow);
  }
`;

const CustomLink = ({ link, color, children }) => {
  return (
    <StyledLink to={link} color={color}>
      {children}
    </StyledLink>
  );
};

export default CustomLink;