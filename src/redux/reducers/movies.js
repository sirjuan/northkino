import { ADD_MOVIES } from '../actions'

const moviesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MOVIES: return { ...state, [action.schedule]: action.payload}
    default: return state
  }
}

export default moviesReducer;
