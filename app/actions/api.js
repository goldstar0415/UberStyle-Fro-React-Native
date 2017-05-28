import axios from 'axios';
import config from '../config';

import { 
  API_FAILURE, 
  API_REQUEST, 
  GET_USER, 
  EDIT_USER_BIRTHDAY,
  EDIT_USER_DESCRIPTION,
  EDIT_USER_EMAIL,
  EDIT_USER_GENDER,
  EDIT_USER_LANGUAGE,
  EDIT_USER_LOCATION,
  EDIT_USER_NAME,
  EDIT_USER_PHONENUMBER,
  EDIT_USER_SCHOOL,
  EDIT_USER_WORK
} from './types';

const USERS_URL = config.ROOT_URL + config.USERS_URL;

export function apiSuccess(type, data) {
  return {type: type, data}
}

function apiRequest(name) {
  return {type: API_REQUEST, name:name}
}

function apiFailure(url, error) {
  return {type: API_FAILURE, url, payload: error}
}

export function errorHandler(dispatch, error, type, url) {
  let errorMessage = error.response ? error.response.data : error;
  //console.log(errorMessage);

   // NOT AUTHENTICATED ERROR
  if (error.status === 401 || (error.response && error.response.status === 401) ) {
    errorMessage = 'You are not authorized to do this.';
    return dispatch(apiFailure(url, errorMessage));
  }

  dispatch({
    type,
    url,
    payload: errorMessage,
  });
}

export function fetchUser(userId, token) {
  return (dispatch) => {

    dispatch(apiRequest("fetchUser"));
    let url = `${USERS_URL}/${userId}`;
    return axios.get(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(GET_USER, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserName(token, first, last) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      firstName: first,
      lastName: last 
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_NAME, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserDescription(token, description) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      description: description
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_DESCRIPTION, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserPhoneNumber(token, phone) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      phoneNumber: phone
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_PHONENUMBER, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserSchool(token, school) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      school: school
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_SCHOOL, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserWork(token, work) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      work: work
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_WORK, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserLanguage(token, lang) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      language: lang
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_LANGUAGE, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserGender(token, gender) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      gender: gender
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_GENDER, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserBirthDay(token, day) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      birthdate: day
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_BIRTHDAY, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserLocation(token, location) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      location:{
        name: location
      }
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_LOCATION, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function editUserEmail(token, email) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${USERS_URL}/edit`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      email: email
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_LOCATION, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}