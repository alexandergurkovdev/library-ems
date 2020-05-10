import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(Link) `
  font-size: 1.6rem;
  color: var(--color-main);
  &:hover, &.active {
    color: var(--color-yellow);
  }
`;

const ItemLink = ({link, children}) => {
  return (
    <StyledNavLink
      exact="true"
      to={link}
    >
      {children}
    </StyledNavLink>
  )
}

export default ItemLink;
