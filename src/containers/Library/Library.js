import React from 'react';
import {Helmet} from 'react-helmet';
import { Container } from '../../hoc/layout/elements';
import AddBook from './AddBook/AddBook';
import Books from './Books/Books';
import Heading from '../../components/UI/Headings/Heading';
import {LibraryWrapper, BooksWrapper, TitleWrapper, AddBookWrapper} from './styles';

const Library = ({userId}) => {
  return (
    <Container selfStart>
      <Helmet>
        <title>Библиотека ems</title>
      </Helmet>
      <LibraryWrapper>
        <BooksWrapper>
          <TitleWrapper>
            <Heading noMargin size='h2' bold>
              Список книг
            </Heading>
          </TitleWrapper>
          <Books userId={userId} />
        </BooksWrapper>
        <AddBookWrapper>
          <AddBook />
        </AddBookWrapper>
      </LibraryWrapper>
    </Container>
  )
}

export default Library;