import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../img/logo.svg';
import styled from 'styled-components';

const LogoWrapper = styled(Link) `
  display: block;
  margin-left: 1.5rem;
`;

const Logo = () => {
  return (
    <LogoWrapper to="/">
      <img src={logo} alt="ems" width="50" />
    </LogoWrapper>
  )
};

export default Logo;
