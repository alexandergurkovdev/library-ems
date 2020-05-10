import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import Heading from '../../../components/UI/Headings/Heading';
import Button from '../../../components/UI/Forms/Button/Button';
import styled from 'styled-components';

import * as actions from '../../../store/actions';

const Col = styled.div `
  width: 33.333%;
  padding: 0 1.5rem;
  margin-top: 1.5rem;

  @media ${props => props.theme.mediaQueries.largest} {
    width: 50%;
  }

  @media ${props => props.theme.mediaQueries.medium} {
    width: 100%;
  }
`;

const Item = styled.div `
  background: var(--color-whiteColor);
  box-shadow: var(--shadow);
  border-radius: 1.5rem;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: .3s all;
  position: relative;
  &:hover{
    transform: translateY(-.3rem);
  }
`;

const Value = styled.span `
  font-weight: 700;
  color: var(--color-yellow);
`;

const ValueToBottom = styled.div `
  margin-top: auto;
  padding-top: .5rem;
`;

const BtnWrap = styled.div `
  margin-top: 1rem;
`;

const BookItem = ({book, rentBook, fName, returntBook}) => {
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
          <Heading bold size='h4' noMargin>
            {book.location === 'office' ? <Value>Бумажный экземпляр</Value> : null}
          </Heading>
          {
          book.location === 'office' && renter.length > 0 ?
            <Heading bold size='h4' noMargin>
              Где книга: {
                renter ? 
                renter.map((user, i) => {
                  let divider = i < renter.length - 1 && <Fragment>, </Fragment>;
                  return(
                    <Fragment key={user.firstName}>
                      {
                        user.firstName === fName ?
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
          {
            book.location === 'office'
            && renter.findIndex(user => user.firstName === fName)
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
              && renter.find(user => user.firstName === fName)
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

const mapStateToProps = ({firebase}) => ({
  fName: firebase.profile.firstName
});

const mapDispatchToProps = {
  rentBook: actions.rentBook,
  returntBook: actions.returntBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
