import { ActionTypes } from '../constants/ActionTypes'

const initialState = []

export const historyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_LOG_HISTORY:
      return payload

    case ActionTypes.SET_LOG_HISTORY:
      return [...state, payload]

    default:
      return state
  }
}
