import { ActionTypes } from '../constants/ActionTypes'

const initialState = []

export const bucketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_BUCKETS:
      return payload

    case ActionTypes.CREATE_BUCKET:
      return [...state, payload]

    default:
      return state
  }
}
