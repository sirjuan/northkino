import { combineReducers } from 'redux'
import area from './area'
import areas from './areas'
import bookings from './bookings'
import loader from './loader'
import modals from './modals'
import movies from './movies'
import schedule from './schedule'
import selectedDate from './selectedDate'

const rootReducer = combineReducers({
  area,
  movies,
  areas,
  schedule,
  modals,
  bookings,
  loader,
  selectedDate,
})

export default rootReducer
