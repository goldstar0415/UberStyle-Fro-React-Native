
const initialState = {
    tabHide: false,
};
const tabbar = (state=initialState, action) => {
    switch (action.type) {
        case 'TABHIDE':
            return {
                ...state,
                tabHide: action.tabHide,
            }

        default:
            return state
    }
}

export default tabbar;
