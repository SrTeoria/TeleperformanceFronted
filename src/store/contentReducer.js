import axios from "axios"

export const CONTENT_SUCCESS = 'CONTENT_SUCCESS'

export async function getContent(token){

  const { data } = await axios({
    method: 'GET',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: "/api",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return data
}

const initialState = {
  content: [],
}

export function contentReducer(state = initialState, action){
  switch(action.type){
    case CONTENT_SUCCESS:
      return {
        ...state,
        content: action.payload
      }
    default:
      return state
  }
}