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
  EDIT_USER_WORK,
  EDIT_USER_SOCIAL,
  GET_CHILD_SERVICE,
  GET_SERVICE,
  GET_STYLIST,
  GET_CONVERSATION,
  SAVE_BOOK,
  GET_DAILYBOOKING,
  GET_STYLIST_STAT,
  GET_UPCOMING_APPOINTMENTS,
  GET_PAST_APPOINTMENTS,
  ACCEPT_APPOINTMENT,
  CANCEL_APPOINTMENT,
  GET_PROVIDER_FILTER
} from './types';

const USERS_URL = config.ROOT_URL + config.USERS_URL;
const PROVIDER_URL = config.ROOT_URL + config.PROVIDERS_URL
const SERVICE_URL = config.ROOT_URL + config.SERVICE_URL
const MESSAGE_URL = config.ROOT_URL + config.MESSAGE_URL
const BOOK_URL = config.ROOT_URL + config.BOOKING_URL
const SEARCH_URL = config.ROOT_URL + config.SEARCH_URL

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
    let url = `${PROVIDER_URL}/editProvider`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      location: location
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_LOCATION, response.data))
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

export function editUserSocial(token, social) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${PROVIDER_URL}/editProvider`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      social: social
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_SOCIAL, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function getParentServices() {
  return (dispatch) => {

    dispatch(apiRequest("getService"));
    let url = `${SERVICE_URL}/parents`;
    return axios.get(url)
    .then((response) => {
      dispatch(apiSuccess(GET_SERVICE, response.data.services))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function getChildServices(parent_id) {
  return (dispatch) => {

    dispatch(apiRequest("getService"));
    let url = `${SERVICE_URL}/children/${parent_id}`;
    return axios.get(url)
    .then((response) => {
      dispatch(apiSuccess(GET_CHILD_SERVICE, response.data.services))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function addService(token, id, name, description, duration, price, show) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${PROVIDER_URL}/addService`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.put(url, 
    { 
      serviceId: id,
      name: name,
      description: description,
      duration: duration,
      price: price,
      showOnProfile: show
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_SOCIAL, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function getStylist(token, stylist_id) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${PROVIDER_URL}/${stylist_id}`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.get(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(GET_STYLIST, response.data.provider))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function getConversation(token) {
  return (dispatch) => {

    dispatch(apiRequest("fetchConversation"));
    let url = `${MESSAGE_URL}?lastMsg=true`;
    return axios.get(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(GET_CONVERSATION, response.data.conversations))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function saveBook(token, data) {
  return (dispatch) => {

    dispatch(apiRequest("editUser"));
    let url = `${BOOK_URL}`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      providerId: data.stylist_id,
      serviceId: data.service_id,
      options: data.options,
      startDatetime: data.startDataTime,
      travelType: data.travelType,
      location: (data.location) ? data.location:"",
      price: data.price,
      duration: data.duration,
      coupon: data.coupon,
      payment: data.payment,
      message: data.message,
      discoverProvider: data.discoverProvider?data.discoverProvider: "",
      status: data.status
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(SAVE_BOOK, response.data.user))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function getDailyBookings(token) {
  return (dispatch) => {

    dispatch(apiRequest("getDailyBookings"));
    let url = `${PROVIDER_URL}/dailyBookings`;
    return axios.get(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(GET_DAILYBOOKING, response.data.bookings))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function getStylistStat(token) {
  return (dispatch) => {

    dispatch(apiRequest("getStylistStat"));
    let url = `${PROVIDER_URL}/stats`;
    return axios.get(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(GET_STYLIST_STAT, response.data.stats))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function getUpcomingAppointments(token) {
  return (dispatch) => {

    dispatch(apiRequest("getUpcomingAppointments"));
    let url = `${BOOK_URL}/upcoming`;
    return axios.get(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(GET_UPCOMING_APPOINTMENTS, response.data.bookings))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function getPastAppointments(token) {
  return (dispatch) => {

    dispatch(apiRequest("getPastAppointments"));
    let url = `${BOOK_URL}/past`;
    return axios.get(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(GET_PAST_APPOINTMENTS, response.data.bookings))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function acceptAppointment(token, book_id) {
  return (dispatch) => {

    dispatch(apiRequest("acceptAppointment"));
    let url = `${BOOK_URL}/${book_id}/accept`;
    return axios.post(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(ACCEPT_APPOINTMENT, response.data))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function cancelAppointment(token, book_id, reason, msg) {
  return (dispatch) => {

    dispatch(apiRequest("cancelAppointment"));
    let url = `${BOOK_URL}/${book_id}/cancel`;
    return axios.post(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(CANCEL_APPOINTMENT, response.data))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function getProvidersWithFilter(token, filter) {
  return (dispatch) => {

    dispatch(apiRequest("getProviderFilter"));
    var url = `${SEARCH_URL}`;
    var query = ``;
    if (filter) {
      if (filter.service) {
        query += (query == ``) ? `?`:`&`
        query += `serviceId=${filter.service.id}`
      }
    } else {

    }
    url = url + query
    return axios.get(url, {
      headers: { Authorization: token },
    })
    .then((response) => {
      dispatch(apiSuccess(GET_PROVIDER_FILTER, response.data.providers))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}

export function giveReview(token, book_id, description, recommended, clean, communication, punctuality, service, isPrivate) {
  return (dispatch) => {

    dispatch(apiRequest("giveReview"));
    let url = `${BOOK_URL}/${book_id}/review`;
    var config = {
      headers: {Authorization: token}
    };
    return axios.post(url, 
    { 
      description: description,
      recommended: recommended,
      clean: clean,
      communication: communication,
      punctuality: punctuality,
      service: service,
      isPrivate: isPrivate
    }, 
    config)
    .then((response) => {
      dispatch(apiSuccess(EDIT_USER_LOCATION, response.data))
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_FAILURE, url);
    });
  };
}