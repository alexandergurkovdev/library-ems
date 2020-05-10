import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../img/logo.svg';

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="ems" width="50" />
    </Link>
  )
};

export default Logo;
