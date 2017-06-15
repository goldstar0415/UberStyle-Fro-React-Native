import axios from 'axios';
// import { browserHistory } from 'react-router';
// import cookie from 'react-cookie';
import config from '../config';

//import { AUTH_URL, CLIENT_ROOT_URL, errorHandler } from '../config.json';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST
} from './types';

const LOGIN_URL = config.ROOT_URL + config.LOGIN_URL;
const REGISTER_URL = config.ROOT_URL + config.REGISTER_URL;
//= ===============================
// Authentication actions
//= ===============================

export function loginSuccess(token, user) {
  return {type: LOGIN_SUCCESS, token, user}
}

function loginRequest() {
  return {type: LOGIN_REQUEST}
}

export function loginFailure(error) {
  return {type: LOGIN_FAILURE, error}
}

export function errorHandler(dispatch, error, type) {
  let errorMessage = error.response ? error.response.data : error;
  //console.log(errorMessage);

   // NOT AUTHENTICATED ERROR
  if (error.status === 401 || (error.response && error.response.status === 401) ) {
    errorMessage = 'You are not authorized to do this.';
    return dispatch(loginFailure(errorMessage));
  }

  dispatch({
    type,
    payload: errorMessage,
  });
}

export function loginUser({ email, password }) {
  return (dispatch) => {

    // We use this to update the store state of `isLoggingIn`          
    // which can be used to display an activity indicator on the login
    // view.
    dispatch(loginRequest());

    return axios.post(`${LOGIN_URL}`, { email,password })
    .then((response) => {
      dispatch(loginSuccess(response.data.token, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, LOGIN_FAILURE);
    });
  };
}

export function registerSuccess(token, user) {
  return {type: REGISTER_SUCCESS, token, user}
}

function registerRequest() {
  return {type: REGISTER_REQUEST}
}

export function registerFailure(error) {
  return {type: REGISTER_FAILURE, error}
}

export function registerClient(client){
  console.log("----------------------")
  console.log(client)
  return dispatch => {
    dispatch(registerRequest());

    return axios.post(`${REGISTER_URL}`, client )
    .then((response) => {
      dispatch(registerSuccess(response.data.token, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, REGISTER_FAILURE);
    });
  }
}
