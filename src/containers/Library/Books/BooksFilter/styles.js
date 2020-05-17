import styled from 'styled-components';

export const FilterWrapper = styled.div `
  padding: 0 1.5rem;
`;

export const Filter = styled.div `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

export const FilterBtn = styled.button `
  padding: .5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: none;
  color: var(--color-textColor);
  border: 1px solid var(--color-main)!important;
  border-radius: .5rem;
  margin: .25rem .5rem .25rem 0;
  transition: .3s all;

  @media ${props => props.theme.mediaQueries.large} {
    font-size: 1rem;
    margin: .25rem;
  }

  &:hover{
    color: var(--color-main);
  }

  &.active{
    color: var(--color-whiteColor);
    background: var(--color-main);
    transition: .3s all;
  }
`;