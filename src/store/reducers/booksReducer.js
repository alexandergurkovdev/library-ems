import * as actions from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  addReview: {
    error: null,
    loading: false
  },
  deleteReview: {
    error: null,
    loading: false
  },
  deleteBook: {
    loading: false
  }
};

// Add Book
const addBookStart = state => {
  return {
    ...state,
    error: null,
    loading: true
  };
};
const addBookSuccess = state => {
  return {
    ...state,
    loading: false,
    error: false
  };
};
const addBookFail = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload
  };
};

// Delete book
const deleteBookStart = state => {
  return{
    ...state,
    deleteBook: {
      ...state.deleteBook,
      loading: true
    }
  };
};
const deleteBookSuccess= state => {
  return{
    ...state,
    deleteBook: {
      ...state.deleteBook,
      loading: false
    }
  };
};

// Add Book review
const addBookReviewStart = state => {
  return {
    ...state,
    addReview: {
      ...state.addReview,
      loading: true
    }
  };
};
const addBookReviewSuccess = state => {
  return {
    ...state,
    addReview: {
      ...state.addReview,
      error: false,
      loading: false
    }
  };
};
const addBookReviewFail = (state, payload) => {
  return {
    ...state,
    addReview: {
      ...state.addReview,
      loading: true,
      error: payload
    }
  };
};

// Delete review
const deleteReviewStart = state => {
  return{
    ...state,
    deleteReview: {
      ...state.deleteReview,
      loading: true
    },
  };
};
const deleteReviewSuccess= state => {
  return{
    ...state,
    deleteReview: {
      ...state.deleteReview,
      loading: false,
      error: false
    }
  };
};
const deleteReviewFail = (state, payload) => {
  return{
    ...state,
    deleteReview: {
      ...state.deleteReview,
      loading: true,
      error: payload
    }
  };
};

const cleanUp = state => {
  return{
    error: null,
    loading: false,
    addReview: {
      error: null,
      loading: false
    },
    deleteReview: {
      ...state.deleteReview,
      error: null,
      loading: false,
    },
    deleteBook: {
      ...state.deleteBook,
      error: null,
      loading: false
    }
  };
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAN_UP:
      return cleanUp(state);

    case actions.ADD_BOOK_START:
      return addBookStart(state);

    case actions.ADD_BOOK_SUCCESS:
      return addBookSuccess(state);

    case actions.ADD_BOOK_FAIL:
      return addBookFail(state, payload);

    case actions.DELETE_BOOK_START:
      return deleteBookStart(state);

    case actions.DELETE_BOOK_SUCCESS:
      return deleteBookSuccess(state);

    case actions.ADD_BOOK_REVIEW_START:
      return addBookReviewStart(state);

    case actions.ADD_BOOK_REVIEW_SUCCESS:
      return addBookReviewSuccess(state);

    case actions.ADD_BOOK_REVIEW_FAIL:
      return addBookReviewFail(state, payload);

    case actions.DELETE_BOOK_REVIEW_START:
      return deleteReviewStart(state);

    case actions.DELETE_BOOK_REVIEW_SUCCESS:
      return deleteReviewSuccess(state);

    case actions.DELETE_BOOK_REVIEW_FAIL:
      return deleteReviewFail(state, payload);

    default:
      return state;
  }
};

