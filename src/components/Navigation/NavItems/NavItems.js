import React from 'react';
import NavItem from './NavItem/NavItem';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  margin-top: ${props => (props.mobile ? '-6rem' : null)};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
`;

const Label = styled.span `
  padding-left: .5rem;

  @media ${props => props.theme.mediaQueries.small} {
    display: none;
  }
`;

const NavItems = ({loggedIn, emailVerified}) => {
  let links;

  if (loggedIn && emailVerified) {
    links = (
      <Ul>
        <NavItem link='/'>
          <i className="fas fa-book"></i>
          <Label>
            Библиотека
          </Label>
        </NavItem>
        <NavItem link='/profile'>
          <i className="far fa-user"></i>
          <Label>
            Профиль
          </Label>
        </NavItem>
        <NavItem link='/logout'>
          <i className="fas fa-sign-out-alt"></i>
          <Label>
            Выйти
          </Label>
        </NavItem>
      </Ul>
    );
  } else {
    links = (
      <Ul>
        <NavItem link='/login'>
         <i className="fas fa-sign-in-alt"></i>
          <Label>
            Вход
          </Label>
        </NavItem>
        <NavItem link='/signup'>
          <i className="fas fa-user-plus"></i>
          <Label>
            Регистрация
          </Label>
        </NavItem>
      </Ul>
    );
  }

  return (
    <Nav>
      {links}
    </Nav>
  )
}

export default NavItems;
