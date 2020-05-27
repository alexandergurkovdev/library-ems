import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { useAlert } from 'react-alert';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {TitlesWrapper, StyledForm, FormWrapper} from '../../../hoc/layout/elements';
import Heading from '../../../components/UI/Headings/Heading';
import Textarea from '../../../components/UI/Forms/Textarea/Textarea';
import Button from '../../../components/UI/Forms/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';
import Select from '../../../components/UI/Forms/Select/Select';
import * as actions from '../../../store/actions';
import {bookRating} from '../../../utils';

const bookReviewSchema = Yup.object().shape({
  review: Yup.string()
    .required('Поле отзыв обязательно')
    .min(20, 'Мин кол-во символов 20'),
  rating: Yup.string()
    .required('Оцените книгу')
});

const AddBookReview = ({bookId, addBookReview, loading, error, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const alert = useAlert();
  
  return (
    <Formik
      initialValues={{
        review: '',
        rating: '',
        bookId: bookId
      }}
      validationSchema={bookReviewSchema}
      onSubmit={async (values, {setSubmitting, resetForm}) => {
        await addBookReview(values);
        
        setSubmitting(false);

        document.querySelectorAll('.add-review-select').forEach((select) => {
          return select.value = '';
        })

        if (error) {
          alert.error(`${error}`)
        } else {
          alert.success('Отзыв успешно добавлен!')
        }
        
        resetForm();
      }}
    >
      {({isSubmiting, isValid, handleChange, handleBlur, touched, errors}) => (
        <FormWrapper contain>
          <TitlesWrapper>
            <Heading bold size="h3">
              Оставьте отзыв о книге
            </Heading>
          </TitlesWrapper>
          <StyledForm>
            <Field
              type='text'
              name='review'
              placeholder='Напишите ваш отзыв...'
              component={Textarea}
            />
            <Select
              name="rating"
              changeFn={handleChange}
              blurFn={handleBlur}
              classname='add-review-select'
              firstOption="Ваша оценка"
              items={bookRating}
              errors={errors}
              touched={touched}
            />
            <Button
              disabled={!isValid || isSubmiting}
              loading={loading  ? <Loader isBtn /> : null}
              type="submit"
            >
              Отправить
            </Button>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  )
}

const mapStateToProps = ({books}) => ({
  loading: books.addReview.loading,
  error: books.addReview.error
});

const mapDispatchToProps =  {
  addBookReview: actions.addBookReview,
  cleanUp: actions.clean
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookReview);
