import { ActionTypes } from '../constants/ActionTypes'

const initialState = {
  loading: false,
  cards: [],
  selectedcards: [],
  error: '',
}

export const cardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_CARDS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ActionTypes.FETCH_CARDS_SUCCESS:
      return {
        loading: false,
        cards: payload,
        error: '',
        selectedcards: [],
      }

    case ActionTypes.FETCH_CARDS_FAILURE:
      return {
        loading: false,
        cards: [],
        selectedcards: [],
        error: payload,
      }

    case ActionTypes.CREATE_CARD:
      return { ...state, cards: [...state.cards, payload] }

    case ActionTypes.UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === payload.id ? payload : card
        ),
      }

    case ActionTypes.REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== payload),
      }

    case ActionTypes.SET_SELECTED_CARDS:
      return {
        ...state,
        selectedcards: payload,
      }

    case ActionTypes.REMOVE_SELECTED_CARDS:
      return {
        ...state,
        selectedcards: [],
      }

    default:
      return state
  }
}
