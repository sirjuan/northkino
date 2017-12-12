import { combineReducers } from 'redux'
import moment from 'moment'

const areaReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_THEATRE': return action.payload;
    case 'ADD_SCHEDULE_DATES': return {...state, dates: action.payload }
    default: return state
  }
}

const areasReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_AREAS': return action.payload//.reduce((acc, cur) => ({...acc, [cur.ID]: cur}),{});
    default: return state
  }
}

const datesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_SCHEDULE_DATES': return action.payload;
    default: return state
  }
}

const moviesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MOVIES': return { ...state, [action.schedule]: action.payload}
    default: return state
  }
}

const processSchedule = (schedule = [], state = {}) => {
  const capacities = {}
  return Array.isArray(schedule)
    ? schedule.reduce((acc,item) => {
        const date = moment(item.dttmShowStart).format('DD.MM.YYYY')
        if (acc[date] && acc[date].map(i => i.ID).includes(item.ID)) return acc;
        const capacity = capacities[item.TheatreAuditriumID] ? capacities[item.TheatreAuditriumID] : rnd(100, 300);
        const seats = arrangeSeats(capacity, item.dttmShowStart);
        if (acc[date]) return {...acc, [date]: [...acc[date], { ...item, capacity, seats: { allSeats: seats, bookedSeats: [] } } ] }
        return {...acc, [date]: [{ ...item, capacity, seats: { allSeats: seats, bookedSeats: [] } } ] }
      },{...state})
    : []
}

const scheduleReducer = (state = {}, action) => {
  const {options = {}, payload, type} = action;
  const { area = {} } = options;
  switch (type) {
    case 'ADD_SCHEDULE': {
      return { ...state, [area]: processSchedule(payload, state[area]) }
    }
    default: return state
  }
}

const selectedDate = (state = moment().format('DD.MM.YYYY'), action) => {
  switch (action.type) {
    case 'ADD_SELECTED_DATE': return action.selectedDate
    default: return state
  }
}

const movieModalReducer = (state = null, action) => {
  switch (action.type) {
    case 'CLEAR_MODAL_MOVIE': return null
    case 'ADD_MODAL_MOVIE': return action.payload
    default: return state
  }
}

const bookingModalReducer = (state = null, action) => {
  switch (action.type) {
    case 'CLEAR_BOOKING_MODAL': return null
    case 'ADD_BOOKING_MODAL_SHOW': return action.payload
    default: return state
  }
}

const confirmModalReducer = (state = null, action) => {
  switch (action.type) {
    case 'CLEAR_CONFIRM_MODAL': return null
    case 'SHOW_CONFIRM_MODAL': return action.show
    default: return state
  }
}

const thankYouModalReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_THANK_YOU_MODAL': return !state
    default: return state
  }
}



function rnd(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const getBookedSeats = capacity => {
  const bookSeat = (booked, capacity) => {
    const seatNumber = rnd(1, capacity);
    if (booked.includes(seatNumber)) bookSeat(booked)
    else return seatNumber
  }

  const numberBooked = rnd(0, capacity);
  const booked = Array(numberBooked);
  for (let i = 0; i < numberBooked; i++) {
    booked.push(bookSeat(booked, capacity))
  }

  return booked;
}

const chunk = (target, size) => {
  return target.reduce((acc, cur, index) => {
    if (index % size === 0 && index !== 0) acc.push([])
    acc[acc.length - 1].push({...cur, row: acc.length - 1, seat: index % size})
    return acc
  }, [[]])
}

const arrangeSeats = (capacity, startTime) => {
  const bookedSeats = getBookedSeats(capacity)
  const isEvening = Number(moment(startTime).format('h')) > 17;
  const normalPrice = {name: 'Normaali', price: isEvening ? 15 : 12}
  const studentPrice = {name: 'Opiskelija', price: isEvening ? 12 : 9 }
  const prices = { normalPrice, studentPrice }

  const seats = []
  for (let i = 1; i <= capacity; i++) {
    seats.push({number: i, status: bookedSeats.includes(i) ? 'reserved' : 'free', prices, price: normalPrice})
  }

  return chunk(seats, 15);
}

const bookingReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BOOKING': return [ ...state, action.booking ]
    case 'DELETE_BOOKING': return state.filter(i => i.id !== action.id)
    default: return state
  }
}

const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADER': return !state
    default: return state
  }
}

const modalReducer = combineReducers({
  movie: movieModalReducer,
  booking: bookingModalReducer,
  confirm: confirmModalReducer,
  thankYou: thankYouModalReducer,
})

const rootReducer = combineReducers({
  area: areaReducer,
  dates: datesReducer,
  movies: moviesReducer,
  areas: areasReducer,
  schedule: scheduleReducer,
  modals: modalReducer,
  bookings: bookingReducer,
  loader: loaderReducer,
  selectedDate
})

export default rootReducer
