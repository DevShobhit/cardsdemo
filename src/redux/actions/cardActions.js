import { ActionTypes } from '../constants/ActionTypes'
import cardApis from '../apis/cardApis'

export const fetchCards = () => async (dispatch) => {
  dispatch(fetchCardsRequest())
  try {
    const res = await cardApis.getAll()
    // console.log(res)
    dispatch(fetchCardsSuccess(res.data))
  } catch (err) {
    dispatch(fetchCardsFailure(err.message))
  }
}

export const fetchCardsRequest = () => {
  return {
    type: ActionTypes.FETCH_CARDS_REQUEST,
  }
}

export const fetchCardsSuccess = (buckets) => {
  return {
    type: ActionTypes.FETCH_CARDS_SUCCESS,
    payload: buckets,
  }
}

export const fetchCardsFailure = (err) => {
  return {
    type: ActionTypes.FETCH_CARDS_FAILURE,
    payload: err,
  }
}

export const createCard = (name, link, bucket) => async (dispatch) => {
  try {
    const res = await cardApis.create({
      name: name,
      link: link,
      bucket: bucket,
    })
    // console.log(res)
    dispatch({
      type: ActionTypes.CREATE_CARD,
      payload: res.data,
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateCard = (id, data) => async (dispatch) => {
  try {
    const res = await cardApis.update(id, data)
    console.log(res)
    dispatch({
      type: ActionTypes.UPDATE_CARD,
      payload: res.data,
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteCard = (id) => async (dispatch) => {
  try {
    const res = await cardApis.remove(id)
    dispatch({
      type: ActionTypes.REMOVE_CARD,
      payload: id,
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const setSelectedCards = (payload) => {
  return {
    type: ActionTypes.SET_SELECTED_CARDS,
    payload: payload,
  }
}

export const removeSelectedCards = (cards) => async (dispatch) => {
  cards.forEach((card) => {
    dispatch(deleteCard(card.id))
  })
  return {
    type: ActionTypes.REMOVE_SELECTED_CARDS,
  }
}
