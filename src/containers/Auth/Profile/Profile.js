import React, {useEffect, useState} from 'react';
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

const Profile = ({firebase, editProfile, loading, error, cleanUp, loadingDelete, erroreDelete, deleteUser}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const alert = useAlert();

  const [modalOpened, setModalOpened] = useState(false);

  if (!firebase.profile.isLoaded) return null;
  return (
    <Container>
      <Helmet>
        <title>Profile edit</title>
      </Helmet>
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
            onClick={() => deleteUser()}
            deleted
            contain
          >
            Удалить
          </Button>
          <Button
            onClick={() => {
              setModalOpened(false);
              if (erroreDelete) {
                alert.error(`${erroreDelete}`)
              }
            }}
            contain
          >
            Отмена
          </Button>
        </ButtonsWrapper>
      </Modal>
    </Container>
  );
};

const mapStateToProps = ({firebase, auth}) => ({
  firebase,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error,
  loadingDelete: auth.deleteUser.loading,
  erroreDelete: auth.deleteUser.error
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
