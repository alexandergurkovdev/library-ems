import React from "react";
import styled from "styled-components";

const SpinnewWrapper = styled.div `
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: ${({isBtn}) => (isBtn ? '23px' : '50px')};
  height: ${({isBtn}) => (isBtn ? '23px' : '50px')};
  position: ${({isBtn, isAbsolute}) => (isBtn || isAbsolute ? 'absolute' : 'fixed')};
`;

const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  margin: ${({isBtn}) => (isBtn ? 'auto' : '0')};
  width: ${({isBtn}) => (isBtn ? '23px' : '50px')};
  height: ${({isBtn}) => (isBtn ? '23px' : '50px')};

  & .path {
    stroke: ${({isBtn}) => (isBtn ? 'white' : '#2b2b2b')};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const Loader = ({isBtn, isAbsolute}) => (
  <SpinnewWrapper isBtn={isBtn} isAbsolute={isAbsolute}>
    <StyledSpinner isBtn={isBtn} viewBox={isBtn ? '0 0 26 26' : '0 0 50 50'}>
      <circle
        className="path"
        cx={isBtn ? '13' : '25'}
        cy={isBtn ? '13' : '25'}
        r={isBtn ? '10' : '20'}
        fill="none"
        strokeWidth="2"
      />
    </StyledSpinner>
  </SpinnewWrapper>
);

export default Loader;
