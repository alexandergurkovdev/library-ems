import React, {useEffect} from 'react';
import { useAlert } from 'react-alert';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {TitlesWrapper, StyledForm, FormWrapper} from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import Loader from '../../../components/UI/Loader/Loader';
import Select from '../../../components/UI/Forms/Select/Select';
import {booksFilter} from '../../../utils';
import * as actions from '../../../store/actions';

const addBookSchema = Yup.object().shape({
  bookAuthor: Yup.string()
    .required('Поле автор обязательно')
    .min(4, 'Мин кол-во символов 4'),
  bookName: Yup.string()
    .required('Поле название обязательно')
    .min(4, 'Мин кол-во символов 4'),
  items: Yup.string()
    .required('Поле кол-во обязательно')
    .min(1, 'Мин кол-во символов 1'),
  category: Yup.string()
    .required('Поле категория обязательно')
});

const AddBook = ({addBook, loading, error, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const alert = useAlert();

  return (
    <Formik
      initialValues={{
        bookAuthor: '',
        bookName: '',
        items: '',
        category: ''
      }}
      validationSchema={addBookSchema}
      onSubmit={async (values, {setSubmitting, resetForm}) => {
        await addBook(values);
        
        setSubmitting(false);

        document.querySelectorAll('.add-book-select').forEach((select) => {
          return select.value = '';
        })

        if (error) {
          alert.error(`${error}`)
        } else {
          alert.success('Книга добавлена успешно')
        }
        
        resetForm();
      }}
    >
      {({isSubmiting, isValid, handleChange, handleBlur, touched, errors}) => (
        <FormWrapper contain>
          <TitlesWrapper>
            <Heading bold size="h3">
              Здесь можно добавить книгу
            </Heading>
          </TitlesWrapper>
          <StyledForm>
            <Field
              type='text'
              name='bookAuthor'
              placeholder='Автор'
              component={Input}
            />
            <Field
              type='text'
              name='bookName'
              placeholder='Введите название книги'
              component={Input}
            />
            <Field
              type='text'
              name='items'
              placeholder='Введите кол-во'
              component={Input}
            />
            <Select
              name="category"
              changeFn={handleChange}
              blurFn={handleBlur}
              classname='add-book-select'
              firstOption="Выберите категорию"
              items={booksFilter}
              errors={errors}
              touched={touched}
            />
            <Button
              disabled={!isValid || isSubmiting}
              loading={loading  ? <Loader isBtn /> : null}
              type="submit"
            >
              Добавить
            </Button>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  )
};

const mapStateToProps = ({books}) => ({
  loading: books.loading,
  error: books.error
});

const mapDispatchToProps = {
  addBook: actions.addBook,
  cleanUp: actions.clean
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
