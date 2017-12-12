import moment from 'moment'
import { addAreas, addTheatre, addScheduleDates, addMovies } from '../actions'
import { getSchedule } from './schedule'
import { getData, current } from '../utils'


export const init = () => dispatch => {
  dispatch(getAreas())
}

const getAreas = () => dispatch => {
  const options = { endpoint: '/TheatreAreas' };
  return getData(options).then(result => dispatch(addAreas({ payload: result.TheatreAreas.TheatreArea })))
}

export const addArea = ({payload}) => dispatch => {
  dispatch(addTheatre({ payload }))
  dispatch(getMovies({ schedule: 'current', area: payload.ID }))
  dispatch(getMovies({ schedule: 'upcoming', area: payload.ID }))
  dispatch(getSchedule({ area: payload.ID, date: moment().format('DD.MM.YYYY') }))
  dispatch(getScheduleDates({ area: payload.ID }))
}

const getScheduleDates = (props) => (dispatch, getState) => {
  const options = { endpoint: '/ScheduleDates', ...props };
  return getData(options).then(result => {
    dispatch(addScheduleDates({ payload: result.Dates.dateTime.map(i => moment(i).format('DD.MM.YYYY')), options  }))
  })
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
