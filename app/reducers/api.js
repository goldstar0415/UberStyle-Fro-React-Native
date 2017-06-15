import { 
  API_FAILURE, 
  API_REQUEST, 
  GET_USER, 
  GET_SERVICE, 
  GET_CHILD_SERVICE, 
  GET_STYLIST,
  GET_CONVERSATION,
  GET_MESSAGES,
  GET_DAILYBOOKING,
  GET_STYLIST_STAT,
  GET_UPCOMING_APPOINTMENTS,
  GET_PAST_APPOINTMENTS,
  GET_PROVIDER_FILTER
} from '../actions/types';

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

  case GET_SERVICE:
    return {
      ...state,
      isRequesting: false,
      service: action.data
    }

  case GET_CHILD_SERVICE:
    return {
      ...state,
      isRequesting: false,
      childService: action.data
    }

   case GET_STYLIST:
    return {
      ...state,
      isRequesting: false,
      provider: action.data
    }

   case GET_CONVERSATION:
    return {
      ...state,
      isRequesting: false,
      conversation: action.data
    }

    case GET_DAILYBOOKING:
      return {
        ...state,
        isRequesting: false,
        dailyBookings: action.data
      }

    case GET_STYLIST_STAT:
      return {
        ...state,
        isRequesting: false,
        stats: action.data
      }

    case GET_UPCOMING_APPOINTMENTS:
      return {
        ...state,
        isRequesting: false,
        bookings: action.data
      }

    case GET_PAST_APPOINTMENTS:
      return {
        ...state,
        isRequesting: false,
        bookings: action.data
      }

    case GET_PROVIDER_FILTER:
      return {
        ...state,
        isRequesting: false,
        filterData: action.data
      }
      
  default:
    return state
  }
}

export default api;