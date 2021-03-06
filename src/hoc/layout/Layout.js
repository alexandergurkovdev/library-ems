import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Navbar from "../../components/Navigation/Navbar/Navbar";

import styled from 'styled-components';

const MainWrapper = styled.main `
  width: 100vw;
  margin-top: 6rem;
  left: 0;
  min-height: calc(100vh - 6rem);
  padding: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  display: block;
`;

const Layout = ({children, loggedIn, emailVerified}) => (
  <Scrollbars style={{ height: '100vh', width: '100vw' }}>
    <Navbar emailVerified={emailVerified} loggedIn={loggedIn} />
    <MainWrapper>{children}</MainWrapper>
  </Scrollbars>
);

export default Layout;