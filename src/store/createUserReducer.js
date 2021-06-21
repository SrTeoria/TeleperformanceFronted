import axios from "axios"

const CHANGE_EMAIL = 'CHANGE_EMAIL'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_LAST_NAME = 'CHANGE_LAST_NAME'
const CHANGE_ROLE = 'CHANGE_ROLE'
const CHANGE_SALARY = 'CHANGE_SALARY'
const CHANGE_DATE_OF_ADMISION = 'CHANGE_DATE_OF_ADMISION'
const CHANGE_USER_TYPE = 'CHANGE_USER_TYPE'
const CHANGE_ACTIVE = 'CHANGE_ACTIVE'
const CHANGE_ERROR = 'CHANGE_ERROR'

const USERS_LOADING = "USERS_LOADING"
const USER_SUCCESS = "USER_SUCCESS"
const USERS_SUCCESS = "USERS_SUCCESS"
const USERS_FINISHED = "USERS_FINISHED"
export const USERS_ERROR = "USERS_ERROR"

export function changeEmail(value){
  return {
    type: CHANGE_EMAIL,
    payload: value,
  }
}

export function changePassword(value){
  return {
    type: CHANGE_PASSWORD,
    payload: value,
  }
}

export function changeName(value){
  return {
    type: CHANGE_NAME,
    payload: value,
  }
}

export function changeLastName(value){
  return {
    type: CHANGE_LAST_NAME,
    payload: value,
  }
}

export function changeRole(value){
  return {
    type: CHANGE_ROLE,
    payload: value,
  }
}

export function changeSalary(value){
  return {
    type: CHANGE_SALARY,
    payload: value,
  }
}

export function changeDateOfAdmision(value){
  return {
    type: CHANGE_DATE_OF_ADMISION,
    payload: value,
  }
}

export function changeIsAdmin(value){
  return {
    type: CHANGE_USER_TYPE,
    payload: value,
  }
}

export function changeActive(value){
  return {
    type: CHANGE_ACTIVE,
    payload: value,
  }
}

export function changeError(value){
  return {
    type: CHANGE_ERROR,
    payload: value,
  }
}

export function getUser(userId){
  return async function (dispatch) {
    dispatch({ type: USERS_LOADING })
    dispatch({ type: USERS_ERROR, payload: "" })
    try {
      const token = localStorage.getItem("token")

      const { data } = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/users/getuser/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: USER_SUCCESS, payload: data })
      dispatch({ type: CHANGE_EMAIL, payload: data.user.email })
      dispatch({ type: CHANGE_PASSWORD, payload: data.user.password })
      dispatch({ type: CHANGE_NAME, payload: data.user.name })
      dispatch({ type: CHANGE_LAST_NAME, payload: data.user.lastName })
      dispatch({ type: CHANGE_ROLE, payload: data.user.role })
      dispatch({ type: CHANGE_SALARY, payload: data.user.salary })
      dispatch({ type: CHANGE_DATE_OF_ADMISION, payload: data.user.dateOfAdmision })
      dispatch({ type: CHANGE_USER_TYPE, payload: data.user.userType })
      dispatch({ type: CHANGE_ACTIVE, payload: data.user.active })
      console.log(data)
    } catch (error) {
      dispatch({ type: USERS_ERROR, payload: error })
    } finally {
      dispatch({ type: USERS_FINISHED })
    }
  };
}

export function getUsers(){
  return async function (dispatch) {
    dispatch({ type: USERS_LOADING })
    dispatch({ type: USERS_ERROR, payload: "" })
    try {
      const token = localStorage.getItem("token")

      const { data } = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/users",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: USERS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: USERS_ERROR, payload: error })
    } finally {
      dispatch({ type: USERS_FINISHED })
    }
  };
}

const initialState = {
  email: '',
  password: '',
  name: '',
  lastName: '',
  role: '',
  salary: '',
  dateOfAdmision: '',
  userType: '',
  active: '',
  error: '',
  loading: false,
  users: [],
  user: {},
}

export function createUserReducer(state = initialState, action){
  switch(action.type){
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload
      }
    case CHANGE_LAST_NAME:
      return {
        ...state,
        lastName: action.payload
      }
    case CHANGE_ROLE:
      return {
        ...state,
        role: action.payload
      }
    case CHANGE_SALARY:
      return {
        ...state,
        salary: action.payload
      }
    case CHANGE_DATE_OF_ADMISION:
      return {
        ...state,
        dateOfAdmision: action.payload
      }
    case CHANGE_USER_TYPE:
      return {
        ...state,
        userType: action.payload
      }
    case CHANGE_ACTIVE:
      return {
        ...state,
        active: action.payload
      }
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case USERS_FINISHED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}