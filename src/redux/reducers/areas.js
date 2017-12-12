import { ADD_AREAS } from '../actions'

const areasReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_AREAS: return action.payload
    default: return state
  }
}

export default areasReducer;
