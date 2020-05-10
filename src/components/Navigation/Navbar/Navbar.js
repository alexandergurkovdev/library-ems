import React from 'react';
import Logo from '../../Logo/Logo';
import {Container} from "../../../hoc/layout/elements";
import NavItems from '../NavItems/NavItems';
import styled from 'styled-components';

const FixedWrapper = styled.header `
  position: fixed;
  background-color: var(--color-whiteColor);
  height: 6rem;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  box-shadow: var(--shadow);
  display: block;
`;

const Wrapper = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export const Navbar = ({loggedIn}) => {
  return (
    <FixedWrapper>
      <Container>
        <Wrapper>
        <Logo />
          <NavItems loggedIn={loggedIn} />
        </Wrapper>
      </Container>
    </FixedWrapper>
  )
};

export default Navbar;
