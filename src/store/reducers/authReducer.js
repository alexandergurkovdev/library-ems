import * as actions from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false
  },
  recoverPassword: {
    error: null,
    loading: false
  },
  profileEdit: {
    error: null,
    loading: false
  },
  deleteUser: {
    error: null,
    loading: false
  }
};

// Auth
const authStart = state => {
  return {
    ...state,
    loading: true
  };
};
const authEnd = state => {
  return {
    ...state,
    loading: false
  };
};
const authFailed = (state, payload) => {
  return {
    ...state,
    error: payload
  };
};
const authSuccess = state => {
  return{
    ...state,
    error: false
  };
};

// Verify
const verifyStart = state => {
  return{
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: true
    }
  };
};
const verifySuccess = state => {
  return{
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
      error: false
    }
  };
};
const verifyFail = (state, payload) => {
  return{
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
      error: payload
    }
  };
};

// Recovery
const recoveryStart = state => {
  return{
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: true
    }
  };
};
const recoverySuccess = state => {
  return{
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: false
    }
  };
};
const recoveryFail = (state, payload) => {
  return{
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: payload
    }
  };
};

// Profile Edit
const profileEditStart = state => {
  return{
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: true
    }
  };
};
const profileEditSuccess = state => {
  return{
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: false
    }
  };
};
const profileEditFail = (state, payload) => {
  return{
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: payload
    }
  };
};

// Delete account
const deleteStart = state => {
  return{
    ...state,
    deleteUser: {
      ...state.deleteUser,
      loading: true
    }
  };
};
const deleteFail = (state, payload) => {
  return{
    ...state,
    deleteUser: {
      ...state.deleteUser,
      loading: false,
      error: payload
    }
  };
};

const cleanUp = state => {
  return{
    ...state,
    error: null,
    loading: false,
    verifyEmail: {
      ...state.verifyEmail,
      error: null,
      loading: false,
    },
    recoverPassword: {
      ...state.recoverPassword,
      error: null,
      loading: false,
    },
    profileEdit: {
      ...state.profileEdit,
      error: null,
      loading: false,
    },
    deleteUser: {
      ...state.profileEdit,
      error: null,
      loading: false,
    }
  };
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.CLEAN_UP:
      return cleanUp(state);
    
    case actions.AUTH_START:
      return authStart(state);
      
    case actions.AUTH_END:
      return authEnd(state);

    case actions.AUTH_FAILED:
      return authFailed(state, payload);

    case actions.AUTH_SUCCESS:
      return authSuccess(state);

    case actions.VERIFY_START:
      return verifyStart(state);

    case actions.VERIFY_SUCCESS:
      return verifySuccess(state);

    case actions.VERIFY_FAIL:
      return verifyFail(state, payload);

    case actions.RECOVERY_START:
      return recoveryStart(state);

    case actions.RECOVERY_SUCCESS:
      return recoverySuccess(state);

    case actions.RECOVERY_FAIL:
      return recoveryFail(state, payload);

    case actions.PROFILE_EDIT_START:
      return profileEditStart(state);
  
    case actions.PROFILE_EDIT_SUCCESS:
      return profileEditSuccess(state);
  
    case actions.PROFILE_EDIT_FAIL:
      return profileEditFail(state, payload);

    case actions.DELETE_START:
      return deleteStart(state);
  
    case actions.DELETE_FAIL:
      return deleteFail(state, payload);

    default:
      return state;
  }
};
