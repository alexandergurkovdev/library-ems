import React, { Fragment, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { useAlert } from 'react-alert';
import Heading from '../../../components/UI/Headings/Heading';
import StarsRating from '../../../components/UI/StarsRating/StarsRating';
import {TitlesWrapper, ButtonsWrapper} from '../../../hoc/layout/elements';
import Button from '../../../components/UI/Forms/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import Loader from '../../../components/UI/Loader/Loader';
import * as actions from '../../../store/actions';
import styled from 'styled-components';

import icon from '../../../img/delete.svg';

const ReviewItem = styled.div `
  box-shadow: var(--shadow);
  padding: 2rem 5rem 2rem 2rem;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
`;

const DeleteBtn = styled.button `
  width: 2rem;
  height: 2rem;
  position: absolute;
  border: 0;
  background: none;
  right: 2rem;
  top: 2rem;
  font-size: 2rem;
  color: var(--color-errorRed);
`;

const Icon = styled.img `
  width: 2.5rem;
  height: 2.5rem;
`;

const BooksReviewsList = ({books, doc, name, cleanUp, loadingDelete, erroreDelete, deleteBookReview, userId}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const alert = useAlert();

  const [modalOpened, setModalOpened] = useState(false);
  const [visible, setVisible] = useState(3);
  

  if (books) {
    const newBooks = books[doc].books;
    const index = newBooks.findIndex(book => book.bookName === name);
    
    return (
      <Fragment>
        {
          newBooks[index].reviews && 
          newBooks[index].reviews.length > 0 ?
          newBooks[index].reviews.slice(0, visible).map((review) => {
            return(
              <ReviewItem key={review.id}>
                <StarsRating editing={false} value={review.rating} />
                <Heading preWrap size='h4'>
                  {review.review}
                </Heading>
                <Heading bold size='h4' noMargin>
                  {review.firstName} {review.lastName}
                </Heading>
                {
                  userId === review.userId ? <DeleteBtn
                    onClick={() => setModalOpened(true)}
                  >
                    <Icon src={icon} alt="delete-review" />
                  </DeleteBtn> : null
                }
                
              </ReviewItem>
            )
          }) : <Heading size='h4' noMargin>Отзывов еще нет...</Heading>
        }
        {
          newBooks[index].reviews && visible < newBooks[index].reviews.length && 
          <Button
            onClick={
              () => {
                setVisible(visible + 3);
              }
            }
          >
            Показать еще
          </Button>
        }
        <Modal
          opened={modalOpened}
          close={() => setModalOpened(false)}
        >
          <TitlesWrapper>
            <Heading bold size="h3">
              Вы уверены, что хотите удалить отзыв?
            </Heading>
          </TitlesWrapper>
          <ButtonsWrapper>
            <Button
              disabled={loadingDelete}
              loading={loadingDelete ? <Loader isBtn /> : null}
              onClick={
                () => {
                  deleteBookReview(name);
                  setModalOpened(false);
                  if (erroreDelete) {
                    alert.error(`${erroreDelete}`)
                  } else {
                    alert.success('Отзыв успешно удалён!')
                  }
                }
              }
              deleted
              contain
            >
              Удалить
            </Button>
            <Button
              onClick={() => {
                setModalOpened(false);
              }}
              contain
            >
              Отмена
            </Button>
          </ButtonsWrapper>
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = ({books, firebase}) => ({
  loadingDelete: books.deleteReview.loading,
  erroreDelete: books.deleteReview.error,
  userId: firebase.auth.uid
});

const mapDispatchToProps = {
  cleanUp: actions.clean,
  deleteBookReview: actions.deleteBookReview
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksReviewsList);
