import moment from 'moment'
import { ADD_SCHEDULE } from '../actions'

const scheduleReducer = (state = {}, action) => {
  const {options = {}, payload, type} = action;
  const { area = {} } = options;
  switch (type) {
    case ADD_SCHEDULE: {
      return { ...state, [area]: processSchedule(payload, state[area]) }
    }
    default: return state
  }
}

export default scheduleReducer;

// *********************** utils **************************/

const processSchedule = (schedule = [], state = {}) => {
  const capacities = {}
  return Array.isArray(schedule)

    ? schedule.reduce((acc,item) => {

        const date = moment(item.dttmShowStart).format('DD.MM.YYYY')

        if (acc[date] && acc[date].map(i => i.ID).includes(item.ID)) {
          return acc;
        }

        const capacity = capacities[item.TheatreAuditriumID]
          ? capacities[item.TheatreAuditriumID]
          : rnd(100, 300);

        const seats = arrangeSeats(capacity, item.dttmShowStart);

        if (acc[date]) {
          return {...acc, [date]: [...acc[date], { ...item, capacity, seats: { allSeats: seats, bookedSeats: [] } } ] }
        }

        return {...acc, [date]: [{ ...item, capacity, seats: { allSeats: seats, bookedSeats: [] } } ] }

      }, {...state})
    : [];
}

const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const arrangeSeats = (capacity, startTime) => {

  const bookedSeats = getBookedSeats(capacity)
  const isEvening = Number(moment(startTime).format('h')) > 17;
  const normalPrice = { name: 'Normaali', price: isEvening ? 15 : 12}
  const studentPrice = { name: 'Opiskelija', price: isEvening ? 12 : 9 }

  const prices = { normalPrice, studentPrice }

  const seats = []
  for (let i = 1; i <= capacity; i++) {
    seats.push({number: i, status: bookedSeats.includes(i) ? 'reserved' : 'free', prices, price: normalPrice})
  }

  return chunk(seats, 15);
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

const chunk = (target, size) => target.reduce((acc, cur, index) => {

  if (index % size === 0 && index !== 0) {
    acc.push([])
  }

  acc[acc.length - 1].push({...cur, row: acc.length - 1, seat: index % size})

  return acc;
}, [[]])
