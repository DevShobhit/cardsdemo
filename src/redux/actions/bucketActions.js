import { ActionTypes } from '../constants/ActionTypes'
import bucketApis from '../apis/bucketApis'

export const createBucket = (name) => async (dispatch) => {
  try {
    const res = await bucketApis.create(name)
    // console.log(res)
    dispatch({
      type: ActionTypes.CREATE_BUCKET,
      payload: res.data,
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const fetchBuckets = () => async (dispatch) => {
  try {
    const res = await bucketApis.getAll()
    // console.log(res)
    dispatch({
      type: ActionTypes.FETCH_BUCKETS,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}
