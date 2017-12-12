import { ADD_SCHEDULE } from '../actions'
import { processSchedule } from '../utils'

const scheduleReducer = (state = {}, action) => {
  const {options = {}, payload, type} = action;
  const { area = {} } = options;
  switch (type) {
    case ADD_SCHEDULE: return { ...state, [area]: processSchedule(payload, state[area]) }
    default: return state
  }
}

export default scheduleReducer;
