import React, { Fragment, useState } from 'react';
import BookItem from './BookItem';
import BooksFilter from './BooksFilter';
import {booksFilter} from '../../../utils';
import Heading from '../../../components/UI/Headings/Heading';
import styled from 'styled-components';

const Row = styled.div `
  display: flex;
  margin: 0 -1.5rem;
  flex-wrap: wrap;
`;

const Books = ({books, doc}) => {
  const [filter, setFilter] = useState(booksFilter[0].value);

  if (books[doc].books.length === 0) {
    return (
      <Heading size='h4' noMargin>
        Пока что в базе нет ни одной книги...
      </Heading>
    );
  } else {
    return (
      <Fragment>
        <Row>
          <BooksFilter filter={filter} setFilter={setFilter} />
          {books[doc].books.filter(item => item.category === filter).slice(0).map(book => (
            <BookItem key={book.id} book={book} />
          ))}
        </Row>
      </Fragment>
    )
  }
}

export default Books;
