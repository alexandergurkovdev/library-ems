import React, {Fragment, useState, useEffect} from 'react';
import { useAlert } from 'react-alert';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Heading from '../../../../components/UI/Headings/Heading';
import Button from '../../../../components/UI/Forms/Button/Button';
import * as actions from '../../../../store/actions';
import {Col, Item, Value, ValueToBottom, BtnWrap, BookItemInfo, BookItemReviews} from './styles';
import LikeButton from '../../../../components/UI/Like/Like';
import Loader from '../../../../components/UI/Loader/Loader';

const BookItem = ({book, rentBook, userId, returnBook, likeBook, deleteLike, isAdmin, deleteBook, cleanUp, loading}) => {
  const {renter} = book;
  const {bookItems} = useState(book.items);

  const alert = useAlert();

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Col>
      <Item>
        <Heading bold size='h4' noMargin >
          <Link to={`/book/${book.id}`} style={{paddingRight: '2rem', display: 'block'}}>
            {book.bookName}
          </Link>
        </Heading>
        <Heading size='h4' noMargin>
          Автор: {book.bookAuthor}
        </Heading>
        <ValueToBottom>
          {
            renter.length > 0 ?
            <Heading bold size='h4' noMargin>
              Где книга: {
                renter ? 
                renter.map((user, i) => {
                  let divider = i < renter.length - 1 && <Fragment>, </Fragment>;
                  return(
                    <Fragment key={user.lastName}>
                      {
                        user.userId === userId ?
                        <Fragment>
                          у меня 
                        </Fragment> :
                        <Fragment>
                          У {user.firstName} {user.lastName}
                        </Fragment>
                      }
                      {divider}
                    </Fragment>
                  )
                }) : <Fragment>В офисе</Fragment>
              }
            </Heading> : null 
          }
          <BookItemInfo>
            <div>
              <Heading bold size='h4' noMargin>
                Количество: <Value>{book.items}</Value>
              </Heading>
              <BookItemReviews to={`/book/${book.id}`}>
                Отзывы о&nbsp;книге ({book.reviews ? book.reviews.length : 0})
              </BookItemReviews>
            </div>
            <LikeButton
              userId={userId}
              likes={book.likes ? book.likes : null}
              likesValue={book.likes ? book.likes.length : 0}
              likeBook={likeBook}
              deleteLike={deleteLike}
              bookId={book.id}
            />
          </BookItemInfo>
          <BtnWrap>
            {
              renter.findIndex(user => user.userId === userId)
              && book.items > 0 ?
                <Button
                  type="button"
                  onClick={async () => await rentBook(book.id)}
                  disabled={book.items === 0 ? true : false}
                >
                  Взять почитать
                </Button> :
              renter.find(user => user.userId === userId)
              && book.items !== bookItems ? 
                <Button
                  type="button"
                  warning
                  onClick={async () => await returnBook(book.id)}
                >
                  Вернуть книгу
                </Button>
              : null
            }
          </BtnWrap>
          {
            isAdmin ? 
              <Button
                type="button"
                deleted
                disabled={loading}
                loading={loading ? <Loader isBtn /> : null}
                style={{marginTop: '1rem'}}
                onClick={
                  async () => {
                    await deleteBook(book.id);
                    alert.success('Книга успешно удалена!');
                  }
                }
              >
                Удалить книгу
              </Button> : null
          }
        </ValueToBottom>
      </Item>
    </Col>
  )
}

const mapStateToProps = ({books}) => ({
  loading: books.deleteBook.loading
});

const mapDispatchToProps = {
  rentBook: actions.rentBook,
  returnBook: actions.returnBook,
  likeBook: actions.likeBook,
  deleteLike: actions.deleteLike,
  deleteBook: actions.deleteBook,
  cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
