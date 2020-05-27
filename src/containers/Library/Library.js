import React from 'react';
import {Helmet} from 'react-helmet';
import { Container } from '../../hoc/layout/elements';
import AddBook from './AddBook/AddBook';
import Books from './Books/Books';
import Heading from '../../components/UI/Headings/Heading';
import {LibraryWrapper, BooksWrapper, TitleWrapper, AddBookWrapper} from './styles';

const Library = ({userId, books, doc, isAdmin}) => {
  return (
    <Container selfStart>
      <Helmet>
        <title>Библиотека ems</title>
      </Helmet>
      <LibraryWrapper>
        <BooksWrapper isAdmin={isAdmin}>
          <TitleWrapper>
            <Heading noMargin size='h2' bold>
              Список книг
            </Heading>
          </TitleWrapper>
          <Books books={books} doc={doc} userId={userId} isAdmin={isAdmin} />
        </BooksWrapper>
        {
          isAdmin ? <AddBookWrapper>
            <AddBook />
          </AddBookWrapper> : null
        }
      </LibraryWrapper>
    </Container>
  )
}

export default Library;