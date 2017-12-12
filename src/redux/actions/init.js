export const ADD_AREAS = 'ADD_AREAS';
export const ADD_THEATRE = 'ADD_THEATRE';
export const ADD_SCHEDULE_DATES = 'ADD_SCHEDULE_DATES';
export const ADD_MOVIES = 'ADD_MOVIES';

export const addAreas = ({ payload }) => ({ type: ADD_AREAS, payload });
export const addTheatre = ({ payload }) => ({ type: ADD_THEATRE, payload });
export const addScheduleDates = ({ payload, options }) => ({type: ADD_SCHEDULE_DATES, payload, options})
export const addMovies = ({ payload, schedule }) => ({type: ADD_MOVIES, payload, schedule })
