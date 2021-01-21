import { combineReducers } from 'redux'
import updateResponses from './responseReducer'

const rootReducer = combineReducers({
  response: updateResponses,

})

export default rootReducer