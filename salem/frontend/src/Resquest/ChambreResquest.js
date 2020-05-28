import { FETCH_CLIENTS } from '../Actions/typesClients';
import axios from 'axios';

export const userLoginRequest = () => {
  return dispatch => {
      axios.get(`http://localhost/myprojects/tropik/backend/Clients/get`)
      .then( data => dispatch({ type: FETCH_CLIENTS, data: data }))
      .catch( error => { console.log(error); });
  }
};
