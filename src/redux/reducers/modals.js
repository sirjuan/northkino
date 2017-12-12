import { combineReducers } from 'redux';
import {
  ADD_MODAL_MOVIE,
  CLEAR_MODAL_MOVIE,
  CLEAR_BOOKING_MODAL,
  ADD_BOOKING_MODAL_SHOW,
  CLEAR_CONFIRM_MODAL,
  SHOW_CONFIRM_MODAL,
  TOGGLE_THANK_YOU_MODAL
} from '../actions'

const movieModalReducer = (state = null, action) => {
  switch (action.type) {
    case CLEAR_MODAL_MOVIE: return null
    case ADD_MODAL_MOVIE: return action.payload
    default: return state
  }
}

const bookingModalReducer = (state = null, action) => {
  switch (action.type) {
    case CLEAR_BOOKING_MODAL: return null
    case ADD_BOOKING_MODAL_SHOW: return action.payload
    default: return state
  }
}

const confirmModalReducer = (state = null, action) => {
  switch (action.type) {
    case CLEAR_CONFIRM_MODAL: return null
    case SHOW_CONFIRM_MODAL: return action.show
    default: return state
  }
}

const thankYouModalReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_THANK_YOU_MODAL: return !state
    default: return state
  }
}

const modalReducer = combineReducers({
  movie: movieModalReducer,
  booking: bookingModalReducer,
  confirm: confirmModalReducer,
  thankYou: thankYouModalReducer,
})

export default modalReducer
