import React from 'react';
import styled from 'styled-components';
import {booksFilter} from '../../../utils';

const Filter = styled.div `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 2rem 0 1rem;
  padding: 0 1.5rem;
`;

const FilterBtn = styled.button `
  padding: .5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: none;
  color: var(--color-textColor);
  border: 1px solid var(--color-main)!important;
  border-radius: .5rem;
  margin: .25rem .5rem;
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

const BooksFilter = ({filter, setFilter}) => {
  return (
    <Filter>
      {
        booksFilter.map((button) => {
          return(
            <FilterBtn
              key={button.value}
              className={filter === `${button.value}` ? 'active' : ''}
              onClick={() => setFilter(button.value)}
            >
              {button.label}
            </FilterBtn>
          )
        })
      }
    </Filter>
  )
}

export default BooksFilter;
