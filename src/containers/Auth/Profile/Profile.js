import React, {useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { useAlert } from 'react-alert';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions';
import {FormWrapper, StyledForm, Container, TitlesWrapper, ButtonsWrapper} from '../../../hoc/layout/elements';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import Loader from '../../../components/UI/Loader/Loader';

import styled from 'styled-components';

const DeleteWrapper = styled.div`
  cursor: pointer;
  color: var(--color-errorRed);
  font-size: 1.3rem;
  text-decoration-color: var(--color-errorRed);
  margin-top: 1rem;
  font-weight: 700;
`;

const ProfileWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 1.5rem;
  @media ${props => props.theme.mediaQueries.medium} {
    flex-direction: column;
  }
`;

const BookRentWrapper = styled.div `
  width: 60%;
  @media ${props => props.theme.mediaQueries.medium} {
    width: 100%;
    margin-bottom: 2.5rem;
  }
`;

const ProfileEditWrapper = styled.div `
  width: 35%;

  @media ${props => props.theme.mediaQueries.medium} {
    width: 100%;
  }

  div {
    @media ${props => props.theme.mediaQueries.medium} {
      width: 100%;
      max-width: 100%;
      text-align: center;
    }
  }
`;

const BookItems = styled.div `
  position: relative;
  min-height: 5rem;
  width: 100%;
  font-size: 1.6rem;
`;

const BookItem = styled(Link) `
  font-weight: 700;
  margin-right: 2rem;
  display: block;
`;

const BookItemWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-gray);
`;

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Поле имя обязательно')
    .min(3, 'Мин кол-во символов 3')
    .max(25, 'Макс кол-во символов 25'),
  lastName: Yup.string()
    .required('Поле фамилия обязательно')
    .min(3, 'Мин кол-во символов 3')
    .max(25, 'Макс кол-во символов 25'),
  email: Yup.string()
    .email('Не корректный e-mail')
    .required('Поле e-mail обязательно'),
  password: Yup.string()
    .min(8, 'Минимальное кол-во символов 8'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Пароли не совпадают`)
});

const Profile = ({firebase, editProfile, loading, error, cleanUp, loadingDelete, erroreDelete, deleteUser, userId, books, doc, returnBook}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const alert = useAlert();

  const [modalOpened, setModalOpened] = useState(false);

  let rentBooks;

  if (books && userId) {
    const findBooks = books[doc].books.filter(book => (book.renter.filter(renter => renter.userId === userId).length > 0));
    rentBooks = (
      findBooks
    );
  }

  if (!firebase.profile.isLoaded) return null;
  return (
    <Container>
      <Helmet>
        <title>Profile edit</title>
      </Helmet>
      <ProfileWrapper>
        <BookRentWrapper>
          <Heading size="h2" bold>
            Книги на руках
          </Heading>
          <BookItems>
            {
              books ?
              rentBooks.length > 0 ?
              rentBooks.map((book) => {
                return (
                  <BookItemWrapper key={book.id}>
                    <BookItem to={`/book/${book.id}`}>
                      {book.bookName}
                    </BookItem>
                    <Button
                      deleted
                      contain
                      onClick={async () => await returnBook(book.id)}
                    >
                      Вернуть книгу
                    </Button>
                  </BookItemWrapper>
                )
              }) : <Fragment>У вас нет ни одной книги...</Fragment> : 
              <Loader isAbsolute />
            }
          </BookItems>
        </BookRentWrapper>
        <ProfileEditWrapper>
          <Formik
            initialValues={{
              firstName: firebase.profile.firstName,
              lastName: firebase.profile.lastName,
              email: firebase.auth.email,
              password: '',
              confirmPassword: '',
            }}
            validationSchema={ProfileSchema}
            onSubmit={async (values, {setSubmitting}) => {
              await editProfile(values);
              setSubmitting(false);
            
              if (error) {
                alert.error(`${error}`)
              } else {
                alert.success('Профиль успешно обновлен!')
              }
            }}
          >
            {({isSubmitting, isValid}) => (
              <FormWrapper>
                <Heading size="h2" bold>
                  Редактировать профиль
                </Heading>
                <StyledForm>
                  <Field
                    type='text'
                    name='firstName'
                    placeholder='Имя'
                    component={Input}
                  />
                  <Field
                    type='text'
                    name='lastName'
                    placeholder='Фамилия'
                    component={Input}
                  />
                  <Field
                    type='email'
                    name='email'
                    placeholder='E-mail'
                    component={Input}
                  />
                  <Field
                    type='password'
                    name='password'
                    placeholder='Пароль'
                    component={Input}
                  />
                  <Field
                    type='password'
                    name='confirmPassword'
                    placeholder='Подтвердите пароль'
                    component={Input}
                  />
                  <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                    loading={loading ? <Loader isBtn /> : null}
                  >
                    Редактировать
                  </Button>
                </StyledForm>
                <DeleteWrapper onClick={() => setModalOpened(true)}>Удалить аккаунт</DeleteWrapper>
              </FormWrapper>
            )}
          </Formik>
        </ProfileEditWrapper>
      </ProfileWrapper>
      <Modal
        opened={modalOpened}
        close={() => setModalOpened(false)}
      >
        <TitlesWrapper>
          <Heading bold size="h2">
            Вы уверены, что хотите удалить аккаунт?
          </Heading>
        </TitlesWrapper>
        <ButtonsWrapper>
          <Button
            disabled={loadingDelete}
            loading={loading ? <Loader isBtn /> : null}
            onClick={
              () => {
                deleteUser();
                if (erroreDelete) {
                  alert.error(`${erroreDelete}`);
                }
                setModalOpened(false);
              }
            }
            deleted
            contain
          >
            Удалить
          </Button>
          <Button
            onClick={() => setModalOpened(false)}
            contain
          >
            Отмена
          </Button>
        </ButtonsWrapper>
      </Modal>
    </Container>
  );
};

const mapStateToProps = ({firebase, firestore, auth}) => ({
  firebase,
  doc: 'HcDMDWiNBUTVf5Urkid6',
  books: firestore.data.books,
  userId: firebase.auth.uid,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error,
  loadingDelete: auth.deleteUser.loading,
  erroreDelete: auth.deleteUser.error,
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteUser,
  returnBook: actions.returnBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
