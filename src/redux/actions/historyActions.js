import { ActionTypes } from '../constants/ActionTypes'
import historyApis from '../apis/historyApis'

export const fetchHistory = () => async (dispatch) => {
  try {
    const res = await historyApis.getAll()
    // console.log(res)
    dispatch({
      type: ActionTypes.FETCH_LOG_HISTORY,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const setHistoryLog = (name, link, time) => async (dispatch) => {
  try {
    const res = await historyApis.create(name, link, time)
    // console.log(res)
    dispatch({
      type: ActionTypes.SET_LOG_HISTORY,
      payload: res.data,
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}
