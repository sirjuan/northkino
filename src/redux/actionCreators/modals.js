import { addModalMovie } from '../actions'

export const findAndAddModalMovie = id => (dispatch, getState) => (
  dispatch(addModalMovie({payload: getState().movies.find(m => m.EventID === id)}))
)
