import React from 'react';
import {Error, StyledTextarea} from '../../../../hoc/layout/elements';
import styled from 'styled-components';

const TextareaWrapper = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 2rem;
`;

const Textarea = ({field, form: {touched, errors}, ...props}) => {
  return (
    <TextareaWrapper>
      <StyledTextarea {...field} {...props} />
      <Error show={errors[field.name] && touched[field.name]}>{errors[field.name]}</Error>
    </TextareaWrapper>
  );
};

export default Textarea;
