export const DELETE_BOOKING = 'DELETE_BOOKING'
export const ADD_BOOKING = 'ADD_BOOKING'

export const deleteBooking = (id) => ({ type: DELETE_BOOKING, id })
export const addBooking = (booking) => ({ type: ADD_BOOKING, booking })
