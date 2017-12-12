import { ADD_THEATRE, ADD_SCHEDULE_DATES } from '../actions'

const areaReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_THEATRE: return action.payload;
    case ADD_SCHEDULE_DATES: return {...state, dates: action.payload }
    default: return state
  }
}

export default areaReducer;
