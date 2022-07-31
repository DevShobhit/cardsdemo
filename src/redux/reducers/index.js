import { combineReducers } from 'redux'
import { cardReducer } from './cardReducer'
import { bucketReducer } from './bucketReducer'
import { historyReducer } from './historyReducers'

const reducers = combineReducers({
  cards: cardReducer,
  buckets: bucketReducer,
  history: historyReducer,
})

export default reducers
