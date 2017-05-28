
const initialState = {
    calendar_state: 1,
    press_state: -1,
};
const calendar = (state=initialState, action) => {
    switch (action.type) {
        case 'CALENDAR_STATE':
            return {
                ...state,
                calendar_state: action.calendar_state,
            }
        case 'PRESS_STATE':
            return {
                ...state,
                press_state: action.press_state,
            }
        default:
            return state
    }
}

export default calendar;
