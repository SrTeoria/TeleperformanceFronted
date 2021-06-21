const CHANGE_EMAIL_LOGIN = 'CHANGE_EMAIL_LOGIN'
const CHANGE_PASSWORD_LOGIN = 'CHANGE_PASSWORD_LOGIN'
const CHANGE_ERROR_LOGIN = 'CHANGE_ERROR_LOGIN'

export function changeEmail(value){
  return {
    type: CHANGE_EMAIL_LOGIN,
    payload: value,
  }
}

export function changePassword(value){
  return {
    type: CHANGE_PASSWORD_LOGIN,
    payload: value,
  }
}

export function changeError(value){
  return {
    type: CHANGE_ERROR_LOGIN,
    payload: value,
  }
}

const initialState = {
  email: '',
  password: '',
  error: '',
}


export function loginReducer(state = initialState, action){
  switch(action.type){
    case CHANGE_EMAIL_LOGIN:
      return {
        ...state,
        email: action.payload
      }
    case CHANGE_PASSWORD_LOGIN:
      return {
        ...state,
        password: action.payload
      }
    case CHANGE_ERROR_LOGIN:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}