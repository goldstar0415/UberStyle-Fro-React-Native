import { combineReducers } from 'redux';
import service from './service';
import hours from './hours';
import message from './message';
import tabbar from './tabbar';
import daily from './daily';
import addService from './addService';
import calendar from './calendar';
import auth from './auth';
import api from './api';

const appReducer = combineReducers({
    service,
    hours,
    message,
    tabbar,
    daily,
    addService,
    calendar,
    auth,
    api
});

export default (state, action) => {
    return appReducer(state, action)
}
