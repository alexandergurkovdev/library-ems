import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import { useAlert } from 'react-alert';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {Container, TitlesWrapper, StyledForm, FormWrapper} from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import Loader from '../../../components/UI/Loader/Loader';
import * as actions from '../../../store/actions';
import {validateEmail} from '../../../utils';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Поле имя обязательно')
    .min(3, 'Мин кол-во символов 3')
    .max(25, 'Макс кол-во символов 25'),
  lastName: Yup.string()
    .required('Поле фамилия обязательно')
    .min(3, 'Мин кол-во символов 3')
    .max(25, 'Макс кол-во символов 25'),
  password: Yup.string()
    .required('Поле пароль обязательно')
    .min(8, 'Минимальное кол-во символов 8'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Пароли не совпадают`)
    .required('Вам необходимо подтвердить пароль')
});

const SignUp = ({signUp, loading, error, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const alert = useAlert();
  
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        team: '',
        mail: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, {setSubmitting}) => {
        await signUp(values);
        setSubmitting(false);
        if (error) {
          alert.error(`${error}`)
        }
      }}
    >
      {({isSubmitting, isValid}) => (
        <Container>
          <Helmet>
            <title>SignUp to library ems</title>
          </Helmet>
          <FormWrapper>
            <TitlesWrapper>
              <Heading size="h2" bold>
                Создайте аккаунт
              </Heading>
            </TitlesWrapper>
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
                type='text'
                name='mail'
                validate={validateEmail}
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
                Зарегистрироваться
              </Button>
            </StyledForm>
          </FormWrapper>
        </Container>
      )}
    </Formik>
  );
};

const mapStateToProps = ({auth}) => ({
  loading: auth.loading,
  error: auth.error
});

const mapDispatchToProps = {
  signUp: actions.signUp,
  cleanUp: actions.clean
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
