import React from 'react';
import {Helmet} from 'react-helmet';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import { Container } from '../../hoc/layout/elements';
import AddBook from './AddBook/AddBook';
import Books from './Books/Books';
import styled from 'styled-components';
import Heading from '../../components/UI/Headings/Heading';

const LibraryWrapper = styled.div `
  display: flex;
  justify-content: space-between;

  @media ${props => props.theme.mediaQueries.large} {
    flex-direction: column;
  }
`;

const BooksWrapper = styled.div `
  width: 60%;
  position: relative;
  min-height: 30rem;

  @media ${props => props.theme.mediaQueries.large} {
    width: 100%;
    margin-bottom: 2.5rem;
    text-align: center;
  }
`;

const AddBookWrapper = styled.div `
  width: 35%;

  @media ${props => props.theme.mediaQueries.large} {
    width: 100%;
  }
`;

const Library = ({books, doc}) => {
  return (
    <Container selfStart>
      <Helmet>
        <title>Библиотека ems</title>
      </Helmet>
      <LibraryWrapper>
        <BooksWrapper>
          <Heading noMargin size='h2' bold>
            Список книг
          </Heading>
          {
            books ? <Books
              books={books}
              doc={doc}
            /> : null
          }
        </BooksWrapper>
        <AddBookWrapper>
          <AddBook />
        </AddBookWrapper>
      </LibraryWrapper>
    </Container>
  )
}

const mapStateToProps = ({firestore}) => ({
  doc: 'HcDMDWiNBUTVf5Urkid6',
  books: firestore.data.books,
});

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect(props => [
    `books/${props.doc}`
  ])
)(Library);