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

const NavItems = ({loggedIn}) => {
  let links;

  if (loggedIn.uid) {
    links = (
      <Ul>
        <NavItem link='/'>
          Библиотека
        </NavItem>
        <NavItem link='/profile'>
          Профиль
        </NavItem>
        <NavItem link='/logout'>
          Выйти
        </NavItem>
      </Ul>
    );
  } else {
    links = (
      <Ul>
        <NavItem link='/login'>
          Вход
        </NavItem>
        <NavItem link='/signup'>
          Регистрация
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
