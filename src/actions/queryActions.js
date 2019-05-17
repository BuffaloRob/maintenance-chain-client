import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

export const fetchPastDue = () => async dispatch => {
  const response = await apiURL.get('/past_due');
  dispatch({ type: types.FETCH_PAST_DUE, payload: response.data });
  history.push('/pastdue');
}