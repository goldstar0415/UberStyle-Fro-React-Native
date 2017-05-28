import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_FAILURE } from '../actions/types';

const initialState = { isLoggingIn: false, isAuthenticated: false };

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      isLoggingIn: true, // Show a loading indicator.
      isAuthenticated: false
    }
      
  case LOGIN_FAILURE:
    return {isLoggingIn: false, isAuthenticated: false, error: action.error }
      
  case LOGIN_SUCCESS:
    return {
      isLoggingIn: false,
      isAuthenticated: true, // Dismiss the login view.
      token: action.token, // Used in subsequent API requests.
      user: action.user
    }

  case REGISTER_REQUEST:
    return {
      isRegistering: true, // Show a loading indicator.
      isAuthenticated: false
    }
      
  case REGISTER_FAILURE:
    return {isRegistering: false, isAuthenticated: false, error: action.payload.data }
      
  case REGISTER_SUCCESS:
    return {
      isRegistering: false,
      isAuthenticated: true, // Dismiss the login view.
      token: action.token, // Used in subsequent API requests.
      user: action.user
    }  
      
  default:
    return state
  }
}

export default user;