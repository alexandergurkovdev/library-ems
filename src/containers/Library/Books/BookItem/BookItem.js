import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import Heading from '../../../../components/UI/Headings/Heading';
import Button from '../../../../components/UI/Forms/Button/Button';
import * as actions from '../../../../store/actions';
import {Col, Item, Value, ValueToBottom, BtnWrap, BookItemReviews} from './styles';

const BookItem = ({book, rentBook, userId, returntBook}) => {
  const {renter} = book;
  const {bookItems} = useState(book.items);

  return (
    <Col>
      <Item>
        <Heading bold size='h4' noMargin>
          {book.bookName}
        </Heading>
        <Heading size='h4' noMargin>
          Автор: {book.bookAuthor}
        </Heading>
        <ValueToBottom>
          {
          book.location === 'office' && renter.length > 0 ?
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
            </Heading>
            : null 
          }
          <Heading bold size='h4' noMargin>
            Количество: <Value>{book.items}</Value>
          </Heading>
          <BookItemReviews to={`/book/${book.bookName}`}>
            Отзывы о&nbsp;книге ({book.reviews ? book.reviews.length : 0})
          </BookItemReviews>
          {
          book.location === 'office'
          && renter.findIndex(user => user.userId === userId)
          && book.items > 0 ?
            <BtnWrap>
              <Button
                type="button"
                onClick={
                  async () => {
                    await rentBook(book.id);
                  }
                }
                disabled={
                  book.items === 0 ? true : false
                }
              >
                Взять почитать
              </Button>
            </BtnWrap> :
            book.location === 'office'
            && renter.find(user => user.userId === userId)
            && book.items !== bookItems ? 
            <BtnWrap>
              <Button
                type="button"
                deleted
                onClick={
                  async () => {
                    await returntBook(book.id)
                  }
                }
              >
                Вернуть книгу
              </Button>
            </BtnWrap> : null
          }
        </ValueToBottom>
      </Item>
    </Col>
  )
}

const mapDispatchToProps = {
  rentBook: actions.rentBook,
  returntBook: actions.returntBook
};

export default connect(null, mapDispatchToProps)(BookItem);
