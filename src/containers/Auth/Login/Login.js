import React, {useEffect} from 'react';
import {Helmet} from "react-helmet";
import { useAlert } from 'react-alert';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {Container, TitlesWrapper, StyledForm, FormWrapper} from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import * as actions from '../../../store/actions';
import CustomLink from '../../../components/UI/CustomLink/CustomLink';
import Loader from '../../../components/UI/Loader/Loader';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Не корректный e-mail')
    .required('Поле e-mail обязательно'),
  password: Yup.string()
    .required('Поле пароль обязательно')
    .min(8, 'Минимальное кол-во символов 8')
});

const Login = ({login, loading, error, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const alert = useAlert();
  
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, {setSubmitting}) => {
        await login(values);
        setSubmitting(false);

        if (error) {
          alert.error(`${error}`)
        }
      }}
    >
      {({isSubmiting, isValid}) => (
        <Container>
          <Helmet>
            <title>Login to wiki ems</title>
          </Helmet>
          <FormWrapper>
            <TitlesWrapper>
              <Heading bold size="h2">
                Войти в&nbsp;аккаунт
              </Heading>
            </TitlesWrapper>
            <StyledForm>
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
              <Button
                disabled={!isValid || isSubmiting}
                type="submit"
                loading={loading ? <Loader isBtn /> : null}
              >
                Войти
              </Button>
              <CustomLink link="/recover">
                Забыли пароль?
              </CustomLink>
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
  login: actions.signIn,
  cleanUp: actions.clean
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
