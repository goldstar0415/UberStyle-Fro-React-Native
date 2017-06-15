
const initialState = {
    isSelected1: false,
    isSelected2: false,
    isSelected3: false,
};
const service = (state=initialState, action) => {
    switch (action.type) {
        case 'SELECTED1':
            return {
                ...state,
                isSelected1: action.isSelected1,
            }
        case 'SELECTED2':
            return {
                ...state,
                isSelected2: action.isSelected2,
            }
        case 'SELECTED3':
            return {
                ...state,
                isSelected3: action.isSelected3,
            }
        case 'UNSELECTED':
            return {
              ...state,
              isSelected1: false,
              isSelected2: false,
              isSelected3: false,
            }

        case 'SET_FILTER':
            return {
                ...state,
                filters: action.filter
            }

        default:
            return state
    }
}

export default service;
