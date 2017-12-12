export const ADD_MODAL_MOVIE = 'ADD_MODAL_MOVIE'
export const CLEAR_MODAL_MOVIE = 'CLEAR_MODAL_MOVIE'
export const ADD_BOOKING_MODAL_SHOW = 'ADD_BOOKING_MODAL_SHOW';
export const CLEAR_BOOKING_MODAL = 'CLEAR_BOOKING_MODAL'
export const SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL'
export const CLEAR_CONFIRM_MODAL = 'CLEAR_CONFIRM_MODAL'
export const TOGGLE_THANK_YOU_MODAL = 'TOGGLE_THANK_YOU_MODAL'

//MovieModal
export const addModalMovie = ({payload}) => ({ type: ADD_MODAL_MOVIE, payload })
export const clearModalMovie = () => ({ type: CLEAR_MODAL_MOVIE });

//BookingModal
export const addBookingModalShow = (payload) => ({ type: ADD_BOOKING_MODAL_SHOW, payload})
export const clearBookingModal = () => ({ type: CLEAR_BOOKING_MODAL });

//ThankYouModal
export const toggleThankYouModal = () => ({type: TOGGLE_THANK_YOU_MODAL })

//ConfirmModal
export const showConfirmModal = (show) => ({ type: SHOW_CONFIRM_MODAL, show})
export const clearConfirmModal = () => ({ type: CLEAR_CONFIRM_MODAL });
