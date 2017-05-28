
const initialState = {
    value0: 18,
    value1: 36,
    value2: 18,
    value3: 36,
    value4: 18,
    value5: 36,
    value6: 18,
    value7: 36,
    value8: 18,
    value9: 36,
    value10: 18,
    value11: 36,
    value12: 18,
    value13: 36,
    checked1: true,
    checked2: true,
    checked3: true,
    checked4: true,
    checked5: true,
    checked6: true,
    checked7: true,
};
const hours = (state=initialState, action) => {
    switch (action.type) {
        case 'VALUE0':
            return {
                ...state,
                value0: action.value0,
            }
        case 'VALUE1':
            return {
                ...state,
                value1: action.value1,
            }
        case 'VALUE2':
            return {
                ...state,
                value2: action.value2,
            }
        case 'VALUE3':
            return {
                ...state,
                value3: action.value3,
            }
        case 'VALUE4':
            return {
                ...state,
                value4: action.value4,
            }
        case 'VALUE5':
            return {
                ...state,
                value5: action.value5,
            }
        case 'VALUE6':
            return {
                ...state,
                value6: action.value6,
            }
        case 'VALUE7':
            return {
                ...state,
                value7: action.value7,
            }
        case 'VALUE8':
            return {
                ...state,
                value8: action.value8,
            }
        case 'VALUE9':
            return {
                ...state,
                value9: action.value9,
            }
        case 'VALUE10':
            return {
                ...state,
                value10: action.value10,
            }
        case 'VALUE11':
            return {
                ...state,
                value11: action.value11,
            }
        case 'VALUE12':
            return {
                ...state,
                value12: action.value12,
            }
        case 'VALUE13':
            return {
                ...state,
                value13: action.value13,
            }
        case 'CHECKED1':
            return {
                ...state,
                checked1: action.checked1,
            }
        case 'CHECKED2':
            return {
                ...state,
                checked2: action.checked2,
            }
        case 'CHECKED3':
            return {
                ...state,
                checked3: action.checked3,
            }
        case 'CHECKED4':
            return {
                ...state,
                checked4: action.checked4,
            }
        case 'CHECKED5':
            return {
                ...state,
                checked5: action.checked5,
            }
        case 'CHECKED6':
            return {
                ...state,
                checked6: action.checked6,
            }
        case 'CHECKED7':
            return {
                ...state,
                checked7: action.checked7,
            }
        default:
            return state
    }
}

export default hours;
