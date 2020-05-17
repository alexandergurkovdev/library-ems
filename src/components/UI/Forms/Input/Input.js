import React from 'react';
import {Error, StyledInput} from '../../../../hoc/layout/elements';
import styled from 'styled-components';

const InputWrapper = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 2.5rem;

  &:last-of-type {
    margin-bottom: 4.5rem;
  }
`;

const Input = ({field, form: {touched, errors}, ...props}) => {
  return (
    <InputWrapper>
      <StyledInput {...field} {...props} />
      <Error show={errors[field.name] && touched[field.name]}>{errors[field.name]}</Error>
    </InputWrapper>
  );
};

export default Input;
