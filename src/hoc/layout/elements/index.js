import styled from 'styled-components';
import {Form} from 'formik';

export const Container = styled.div `
  width: 100%;
  max-width: 140rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  align-self: ${({selfStart}) => (selfStart ? 'flex-start' : 'center')};

  @media ${props => props.theme.mediaQueries.medium} {
    padding: 0;
  }
`;

export const FormWrapper = styled.div `
  width: 100%;
  max-width: ${({contain}) => (contain ? 'none' : '50rem')};
  border-radius: 1rem;
  background-color: var(--color-whiteColor);
  box-shadow: var(--shadow);
  padding: 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

export const StyledForm = styled(Form) `
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

export const TitlesWrapper = styled.div`
  text-align: center;
`;

export const SelectWrapper = styled.div `
  position: relative;
  margin-bottom: 2.5rem;
  width: 100%;
`;

export const StyledSelect = styled.select `
  display: block;
  padding: 1rem 1.5rem;
  background-color: var(--color-whiteColor);
  border: 1px solid var(--color-textColor);
  color: var(--color-textColor);
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: .5rem;
  width: 100%;
  transition: .2s all;

  &:hover, &:focus{
    border: 1px solid var(--color-yellow);
  }
`;

export const Error = styled.div `
  color: var(--color-errorRed);
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0rem 1.5rem;
  visibility: ${({show}) => (show ? 'visible' : 'hidden')};
  opacity: ${({show}) => (show ? '1' : '0')};
  transform: ${({show}) => (show ? 'translateY(20px)' : 'translateY(10px)')};
  transition: all .1s;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const StyledInput = styled.input `
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

export const StyledTextarea = styled.textarea `
  padding: 1rem 1.5rem;
  background-color: var(--color-whiteColor);
  border: 1px solid var(--color-textColor);
  color: var(--color-textColor);
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: .5rem;
  width: 100%;
  resize: none;
  min-height: 10rem;
  white-space: pre-wrap;

  &:hover, &:focus{
    border: 1px solid var(--color-yellow);
  }

  &::placeholder{
    color: var(--color-gray);
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: relative;
  flex-wrap: wrap;

  @media ${props => props.theme.mediaQueries.medium} {
    flex-direction: column;
  }

  button{
    &:first-child{
      @media ${props => props.theme.mediaQueries.medium} {
        margin-bottom: 1.5rem;
      }
    }
  }
`;
