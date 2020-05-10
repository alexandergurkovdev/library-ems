import * as actions from '../actions/actionTypes';

const initialState = {
  stateerror: null,
  stateloading: false
};

// Add Book
const addBookStart = state => {
  return {
    stateerror: null,
    stateloading: true
  };
};
const addBookSuccess = state => {
  return {
    stateloading: false,
    stateerror: false
  };
};
const addBookFail = (state, payload) => {
  return {
    stateloading: false,
    stateerror: payload
  };
};

const cleanUp = state => {
  return{
    error: null,
    loading: false,
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

    default:
      return state;
  }
};

