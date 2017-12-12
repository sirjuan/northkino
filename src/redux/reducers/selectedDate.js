import moment from 'moment';
import { ADD_SELECTED_DATE } from '../actions';

const selectedDate = (state = moment().format('DD.MM.YYYY'), action) => {
  switch (action.type) {
    case ADD_SELECTED_DATE: return action.selectedDate
    default: return state
  }
}

export default selectedDate;
