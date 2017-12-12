import axios from 'axios';
import moment from 'moment'

const API_URL = 'https://northkino.herokuapp.com/api/xml'

export const getData = (params) => axios.get(API_URL, {params}).then(result=>result.data).catch(e => console.log(e))

export const current = item => {
  const now = new Date();
  const release = new Date(item.dtLocalRelease)
  return now >= release;
}

export const processSchedule = (schedule = [], state = {}) => {
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
