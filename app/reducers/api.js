import { API_FAILURE, API_REQUEST, GET_USER } from '../actions/types';

const initialState = { isRequesting: false };

const api = (state = initialState, action) => {
  switch (action.type) {
  case API_REQUEST:
    return {
      isRequesting: true, // Show a loading indicator.
    }
      
  case API_FAILURE:
    return {isRequesting: false, url: action.url, error: action.payload }
      
  case GET_USER:
    return {
      isRequesting: false,
      user: action.data
    }
      
  default:
    return state
  }
}

export default api;