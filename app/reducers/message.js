
import messages from './config';

var badge = 0;
messages.map((message, i) => {
  if(!message.reading)badge++
})

const initialState = {
    badge: badge,
};
const message = (state=initialState, action) => {
    switch (action.type) {
        case 'BADGE':
            return {
                ...state,
                badge: action.badge,
            }

        default:
            return state
    }
}

export default message;
