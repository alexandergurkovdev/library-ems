import React from 'react';
import {useParams} from 'react-router-dom';
import {Container} from '../../../../hoc/layout/elements';
import AddBookReview from '../AddBookReview';
import BooksReviewsList from '../BooksReviewsList/BooksReviewsList';
import Loader from '../../../../components/UI/Loader/Loader';
import {BookWrapper, ReviewsWrapper, AddReviewWrapper} from './styles';

const BookPage = ({books, doc, uid}) => {
  let {id} = useParams();

  if (books){
    return (
      <Container>
        <BookWrapper>
          <ReviewsWrapper>
            <BooksReviewsList uid={uid} books={books} doc={doc} bookId={id} />
          </ReviewsWrapper>
          <AddReviewWrapper>
            <AddBookReview bookId={id} />
          </AddReviewWrapper>
        </BookWrapper>
      </Container>
    )
  } else {
    return (
      <Loader isAbsolute />
    )
  }
}

export default BookPage;
