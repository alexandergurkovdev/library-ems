import React from 'react';
import {Error} from '../../../../hoc/layout/elements';
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

const StyledInput = styled.input `
  padding: 1rem 1.5rem;
  background-color: var(--color-whiteColor);
  border: 1px solid var(--color-textColor);
  color: var(--color-textColor);
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: .5rem;
  width: 100%;

  &:hover, &:focus{
    border: 1px solid var(--color-yellow);
  }

  &::placeholder{
    color: var(--color-gray);
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
