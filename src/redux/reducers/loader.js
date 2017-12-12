import { TOGGLE_LOADER } from '../actions'

const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_LOADER: return !state
    default: return state
  }
}

export default loaderReducer;
