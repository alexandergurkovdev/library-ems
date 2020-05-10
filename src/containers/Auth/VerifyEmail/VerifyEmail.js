import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import { useAlert } from 'react-alert';
import {connect} from 'react-redux';
import Heading from '../../../components/UI/Headings/Heading';
import Button from '../../../components/UI/Forms/Button/Button';
import {Container, TitlesWrapper, FormWrapper} from '../../../hoc/layout/elements';
import * as actions from '../../../store/actions';

import styled from 'styled-components';
import Loader from '../../../components/UI/Loader/Loader';

const Wrapper = styled.div `
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerifyEmail = ({sendVerification, error, loading, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const alert = useAlert();
  
  if (error) {
    alert.error(`${error}`)
  }

  return (
    <Container>
      <Helmet>
        <title>Email verification</title>
      </Helmet>
      <FormWrapper>
        <Wrapper>
          <TitlesWrapper>
            <Heading noMargin size='h2' bold>
              Подтвердите регистрацию
            </Heading>
            <Heading size='h4' bold>
              Перейдите в&nbsp;почтовый ящик и&nbsp;откройте ссылку в&nbsp;письме, для подтверждения регистрации. После вернитесь в&nbsp;приложение и&nbsp;перезагрузите страницу.
            </Heading>
          </TitlesWrapper>
          <Button
            loading={loading ? <Loader isBtn /> : null}
            onClick={
              () => {
                sendVerification();
                if (loading === false && error === false) {
                  alert.success('Сообщение успешно отправлено!')
                }
              }
            }
            disabled={loading}
          >
            Отправить еще раз
          </Button>
        </Wrapper>
      </FormWrapper>
    </Container>
  )
};

const mapStateToProps = ({auth}) => ({
  loading: auth.verifyEmail.loading,
  error: auth.verifyEmail.error
});

const mapDispatchToProps = {
  sendVerification: actions.verifyEmail,
  cleanUp: actions.clean
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
