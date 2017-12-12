import { addSelectedDate, addSchedule } from '../actions'
import { getData } from '../utils'

export const changeSelectedDate = dt => (dispatch, getState) => {
  const { area } = getState();
  dispatch(getSchedule({area:area.ID, dt})).then(() => dispatch(addSelectedDate(dt)))
}

export const getSchedule = (props) => (dispatch, getState) => {
  const options = { endpoint: '/Schedule', ...props };
  return getData(options).then(result => dispatch(addSchedule({ payload: result.Schedule.Shows.Show, options  })))
}
