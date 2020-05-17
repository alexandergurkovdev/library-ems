import React from 'react';
import {useParams} from 'react-router-dom';
import {Container} from '../../../../hoc/layout/elements';
import AddBookReview from '../AddBookReview';
import BooksReviewsList from '../BooksReviewsList';
import Loader from '../../../../components/UI/Loader/Loader';
import {BookWrapper, ReviewsWrapper, AddReviewWrapper} from './styles';

const BookPage = ({books, doc, uid}) => {
  let {name} = useParams();
  
  return (
    <Container>
      <BookWrapper>
        <ReviewsWrapper>
          {
            books ? <BooksReviewsList uid={uid} books={books} doc={doc} name={name} /> : <Loader isAbsolute />
          }
        </ReviewsWrapper>
        <AddReviewWrapper>
          <AddBookReview bookName={name} />
        </AddReviewWrapper>
      </BookWrapper>
    </Container>
  )
}

export default BookPage;
