
const initialState = {
    save_data: []
};
const addService = (state=initialState, action) => {
    switch (action.type) {
        case 'SAVE_DATA':
            return {
                ...state,
                save_data: action.save_data,
            }
        case 'ADD_DATA':
            return {
              ...state,
              save_data: []
            }

        default:
            return state
    }
}

export default addService;
