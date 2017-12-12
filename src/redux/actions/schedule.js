export const ADD_SEATS = 'ADD_SEATS'
export const ADD_SELECTED_DATE = 'ADD_SELECTED_DATE'
export const ADD_SCHEDULE = 'ADD_SCHEDULE'

export const addSeats = ({payload}) => ({ type: ADD_SEATS, payload });
export const addSelectedDate = selectedDate => ({type: ADD_SELECTED_DATE, selectedDate})
export const addSchedule = ({ payload, options }) => ({type: ADD_SCHEDULE, payload, options})
