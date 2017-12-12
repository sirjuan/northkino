import { ADD_BOOKING, DELETE_BOOKING } from '../actions'

const bookingReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKING: return [ ...state, action.booking ]
    case DELETE_BOOKING: return state.filter(i => i.id !== action.id)
    default: return state
  }
}

export default bookingReducer;
