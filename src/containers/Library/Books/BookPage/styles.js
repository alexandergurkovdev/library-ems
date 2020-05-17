import styled from 'styled-components';

export const BookWrapper = styled.div `
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1.5rem;

  @media ${props => props.theme.mediaQueries.large} {
    flex-direction: column-reverse;
  }
`;

export const ReviewsWrapper = styled.div `
  width: 60%;
  position: relative;
  min-height: 30rem;

  @media ${props => props.theme.mediaQueries.large} {
    width: 100%;
    margin-top: 2rem;
  }
`;

export const AddReviewWrapper = styled.div `
  width: 35%;

  @media ${props => props.theme.mediaQueries.large} {
    width: 100%;
  }
`;