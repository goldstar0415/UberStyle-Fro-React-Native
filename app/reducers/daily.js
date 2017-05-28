
import alerts from './alerts_appointments';

var daily_badge = 0;
alerts.map((alert, i) => {
  if(!alert.reading)daily_badge++
})

const initialState = {
    daily_badge: daily_badge,
    photo_state: 0,
    service_state: 0,
    address_state: 0,
    about_state: 0,
};
const daily = (state=initialState, action) => {
    switch (action.type) {
        case 'DAILY_BADGE':
            return {
                ...state,
                daily_badge: action.daily_badge,
            }
        case 'PHOTO_STATE':
            return {
                ...state,
                photo_state: action.photo_state,
            }
        case 'SERVICE_STATE':
            return {
                ...state,
                service_state: action.service_state,
            }
        case 'ADDRESS_STATE':
            return {
                ...state,
                address_state: action.address_state,
            }
        case 'ABOUT_STATE':
            return {
                ...state,
                about_state: action.about_state,
            }

        default:
            return state
    }
}

export default daily;
