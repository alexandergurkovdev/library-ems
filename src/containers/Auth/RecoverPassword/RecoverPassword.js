import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import { useAlert } from 'react-alert';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions';
import {FormWrapper, StyledForm, TitlesWrapper, Container} from '../../../hoc/layout/elements';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректный e-mail')
    .required('Поле e-mail обязательно')
});

const RecoverPassword = ({sendEmail, error, loading, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const alert = useAlert();

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={RecoverSchema}
      onSubmit={async (values, {setSubmitting}) => {
        await sendEmail(values);
        setSubmitting(false);
        if (error) {
          alert.error(`${error}`)
        } else {
          alert.success('Проверьте ваш почтовый ящик')
        }
      }}
    >
      {({isSubmitting, isValid}) => (
        <Container>
          <Helmet>
            <title>Password recovery</title>
          </Helmet>
          <FormWrapper>
            <TitlesWrapper>
              <Heading bold size='h2'>
                Восстановить пароль
              </Heading>
            </TitlesWrapper>
            <StyledForm>
              <Field
                type='email'
                name='email'
                placeholder='E-mail'
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                loading={loading ? <Loader isBtn /> : null}
              >
                Отправить письмо
              </Button>
            </StyledForm>
          </FormWrapper>
        </Container>
      )}
    </Formik>
  )
};

const mapStateToProps = ({auth}) => ({
  loading: auth.recoverPassword.loading,
  error: auth.recoverPassword.error
});

const mapDispatchToProps = {
  sendEmail: actions.recoverPassword,
  cleanUp: actions.clean
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
