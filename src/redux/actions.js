import { getData, current } from './utils'
import moment from 'moment';

export const ADD_AREAS = 'ADD_AREAS';
export const ADD_THEATRE = 'ADD_THEATRE';
export const ADD_SCHEDULE_DATES = 'ADD_SCHEDULE_DATES';
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_SCHEDULE = 'ADD_SCHEDULE'
export const ADD_MODAL_MOVIE = 'ADD_MODAL_MOVIE'
export const CLEAR_MODAL_MOVIE = 'CLEAR_MODAL_MOVIE'
export const ADD_SEATS = 'ADD_SEATS'
export const ADD_BOOKING_MODAL_SHOW = 'ADD_BOOKING_MODAL_SHOW';
export const CLEAR_BOOKING_MODAL = 'CLEAR_BOOKING_MODAL'
export const DELETE_BOOKING = 'DELETE_BOOKING'
export const ADD_BOOKING = 'ADD_BOOKING'
export const SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL'
export const CLEAR_CONFIRM_MODAL = 'CLEAR_CONFIRM_MODAL'
export const TOGGLE_THANK_YOU_MODAL = 'TOGGLE_THANK_YOU_MODAL'
export const TOGGLE_LOADER = 'TOGGLE_LOADER'
export const ADD_SELECTED_DATE = 'ADD_SELECTED_DATE'

const addAreas = ({ payload }) => ({ type: ADD_AREAS, payload });
export const addTheatre = ({ payload }) => ({ type: ADD_THEATRE, payload });
const addMovies = ({ payload, schedule }) => ({type: ADD_MOVIES, payload, schedule })
const addSchedule = ({ payload, options }) => ({type: ADD_SCHEDULE, payload, options})
const addScheduleDates = ({ payload, options }) => ({type: ADD_SCHEDULE_DATES, payload, options})
export const addModalMovie = ({payload}) => ({ type: ADD_MODAL_MOVIE, payload })
export const clearModalMovie = () => ({ type: CLEAR_MODAL_MOVIE });
export const addSeats = ({payload}) => ({ type: ADD_SEATS, payload });
export const addBookingModalShow = (payload) => ({ type: ADD_BOOKING_MODAL_SHOW, payload})
export const clearBookingModal = () => ({ type: CLEAR_BOOKING_MODAL });

export const toggleThankYouModal = () => ({type: TOGGLE_THANK_YOU_MODAL })

export const showConfirmModal = (show) => ({ type: SHOW_CONFIRM_MODAL, show})
export const clearConfirmModal = () => ({ type: CLEAR_CONFIRM_MODAL });

export const deleteBooking = (id) => ({ type: DELETE_BOOKING, id })
export const addBooking = (booking) => ({ type: ADD_BOOKING, booking })
export const toggleLoader = () => ({ type: TOGGLE_LOADER })
export const addSelectedDate = selectedDate => ({type: ADD_SELECTED_DATE, selectedDate})

export const findAndAddModalMovie = id => (dispatch, getState) => dispatch(addModalMovie({payload: getState().movies.find(m => m.EventID === id)}))

export const addArea = ({payload}) => dispatch => {
  dispatch(addTheatre({ payload }))
  dispatch(getMovies({ schedule: 'current', area: payload.ID }))
  dispatch(getMovies({ schedule: 'upcoming', area: payload.ID }))
  dispatch(getSchedule({ area: payload.ID, date: moment().format('DD.MM.YYYY') }))
  dispatch(getScheduleDates({ area: payload.ID }))
}

const getAreas = () => dispatch => {
  const options = { endpoint: '/TheatreAreas' };
  return getData(options).then(result => dispatch(addAreas({ payload: result.TheatreAreas.TheatreArea })))
}

const getScheduleDates = (props) => (dispatch, getState) => {
  const options = { endpoint: '/ScheduleDates', ...props };
  return getData(options).then(result => {
    dispatch(addScheduleDates({ payload: result.Dates.dateTime.map(i => moment(i).format('DD.MM.YYYY')), options  }))
  })
}

export const changeSelectedDate = dt => (dispatch, getState) => {
  const { area } = getState();
  dispatch(getSchedule({area:area.ID, dt})).then(() => dispatch(addSelectedDate(dt)))
}

export const getSchedule = (props) => (dispatch, getState) => {
  const options = { endpoint: '/Schedule', ...props };
  return getData(options).then(result => dispatch(addSchedule({ payload: result.Schedule.Shows.Show, options  })))
}

export const getMovies = ({ schedule, area }) => dispatch => {

  const options = {
    endpoint: '/Events',
    listType: schedule === 'current' ? 'NowInTheatres' : 'ComingSoon',
    area,
    includeLinks: true,
    includeGallery: true,
    includePictures: true
  };

  return getData(options).then(result => {

    const movies = result.Events.Event.filter(i => typeof i.Images.EventMediumImagePortrait !== 'undefined');
    const payload = schedule === 'current' ? movies.filter(current) : movies;

    dispatch(addMovies({ payload, schedule }))
    return payload;
  })
}

export const init = () => dispatch => {
  dispatch(getAreas())
}
