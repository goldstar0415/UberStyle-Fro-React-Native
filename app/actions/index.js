import * as AuthActions from './auth';
import * as ApiActions from './api';

export function selected1(isSelected1) {
  return {
    type: 'SELECTED1',
    isSelected1,
  }
}
export function selected2(isSelected2) {
  return {
    type: 'SELECTED2',
    isSelected2,
  }
}
export function selected3(isSelected3) {
  return {
    type: 'SELECTED3',
    isSelected3
  }
}

export function unselected() {
  return {
    type: 'UNSELECTED',
  }
}

export function s_value0(value0) {
  return {
    type: 'VALUE0',
    value0
  }
}
export function s_value1(value1) {
  return {
    type: 'VALUE1',
    value1
  }
}
export function s_value2(value2) {
  return {
    type: 'VALUE2',
    value2
  }
}
export function s_value3(value3) {
  return {
    type: 'VALUE3',
    value3
  }
}
export function s_value4(value4) {
  return {
    type: 'VALUE4',
    value4
  }
}
export function s_value5(value5) {
  return {
    type: 'VALUE5',
    value5
  }
}
export function s_value6(value6) {
  return {
    type: 'VALUE6',
    value6
  }
}
export function s_value7(value7) {
  return {
    type: 'VALUE7',
    value7
  }
}
export function s_value8(value8) {
  return {
    type: 'VALUE8',
    value8
  }
}
export function s_value9(value9) {
  return {
    type: 'VALUE9',
    value9
  }
}
export function s_value10(value10) {
  return {
    type: 'VALUE10',
    value10
  }
}
export function s_value11(value11) {
  return {
    type: 'VALUE11',
    value11
  }
}
export function s_value12(value12) {
  return {
    type: 'VALUE12',
    value12
  }
}
export function s_value13(value13) {
  return {
    type: 'VALUE13',
    value13
  }
}

export function s_checked1(checked1) {
  return {
    type: 'CHECKED1',
    checked1
  }
}
export function s_checked2(checked2) {
  return {
    type: 'CHECKED2',
    checked2
  }
}
export function s_checked3(checked3) {
  return {
    type: 'CHECKED3',
    checked3
  }
}
export function s_checked4(checked4) {
  return {
    type: 'CHECKED4',
    checked4
  }
}
export function s_checked5(checked5) {
  return {
    type: 'CHECKED5',
    checked5
  }
}
export function s_checked6(checked6) {
  return {
    type: 'CHECKED6',
    checked6
  }
}
export function s_checked7(checked7) {
  return {
    type: 'CHECKED7',
    checked7
  }
}

export function setBadge(badge) {
  return {
    type: 'BADGE',
    badge
  }
}

export function setTabbar(tabHide) {
  return {
    type: 'TABHIDE',
    tabHide
  }
}

export function setDailyBadge(daily_badge) {
  return {
    type: 'DAILY_BADGE',
    daily_badge
  }
}

export function setPhotoState(photo_state) {
  return {
    type: 'PHOTO_STATE',
    photo_state
  }
}

export function setServiceState(service_state) {
  return {
    type: 'SERVICE_STATE',
    service_state
  }
}

export function setAddressState(address_state) {
  return {
    type: 'ADDRESS_STATE',
    address_state
  }
}

export function setAboutState(about_state) {
  return {
    type: 'ABOUT_STATE',
    about_state
  }
}
export function dataSave(save_data) {
  return {
    type: 'SAVE_DATA',
    save_data
  }
}
export function dataDelete() {
  return {
    type: 'ADD_DATA'
  }
}

export function setCalendarState(calendar_state) {
  return {
    type: 'CALENDAR_STATE',
    calendar_state
  }
}

export function setPressState(press_state) {
  return {
    type: 'PRESS_STATE',
    press_state
  }
}

export function setFilter(filter) {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export const ActionCreators = Object.assign({},
  AuthActions, ApiActions
);