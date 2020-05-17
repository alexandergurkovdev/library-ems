import styled from 'styled-components';

export const LibraryWrapper = styled.div `
  display: flex;
  justify-content: space-between;

  @media ${props => props.theme.mediaQueries.large} {
    flex-direction: column;
  }
`;

export const BooksWrapper = styled.div `
  width: 60%;
  position: relative;

  @media ${props => props.theme.mediaQueries.large} {
    width: 100%;
    margin-bottom: 2.5rem;
    text-align: center;
  }
`;

export const TitleWrapper = styled.div `
  padding: 0 1.5rem;
`;

export const AddBookWrapper = styled.div `
  width: 35%;

  @media ${props => props.theme.mediaQueries.large} {
    width: 100%;
  }

  @media ${props => props.theme.mediaQueries.medium} {
    padding: 0 1.5rem;
  }
`;