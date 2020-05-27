import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Li = styled.li `
  display: flex;
  height: 100%;
`;

const StyledNavLink = styled(NavLink) `
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  padding: 0 1rem;
  color: var(--color-textColor);
  transition: all 0.2s;
  @media ${props => props.theme.mediaQueries.small} {
    font-size: 2rem;
  }
  &:hover, &.active {
    color: var(--color-yellow);
  }
  &.active{
    font-weight: 700;
  }
`;

const NavItem = ({link, children}) => {
  return (
    <Li>
      <StyledNavLink
        exact
        activeClassName="active"
        to={link}
      >
        {children}
      </StyledNavLink>
    </Li>
  );
}

export default NavItem;
