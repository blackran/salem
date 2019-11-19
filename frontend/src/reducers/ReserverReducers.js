import {FETCH_RESERVER, ADD_RESERVER, TEST_ONE, UPDATE_DATE_1,UPDATE_DATE_2} from '../Actions/typesReserver';
import axios from 'axios';
import {urlHeader} from '../Actions/config';

const now = new Date();
const initState = {
  dataReserver: [
    // {
    //   NumReservation: 0,
    //   DateDebutReservation: '2019-09-12',
    //   DateFinReservation: '2019-09-23',
    //   NbJourReservation: '1',
    //   EtatReservation: '0',
    //   ConditionReservation: 'Diner et dejener',
    //   NumClient: 't41RyQBRM',
    //   NumResponsable: 1,
    //   NumReglement: 1
    // }, {
    //   NumReservation: 1,
    //   DateDebutReservation: '2019-01-12',
    //   DateFinReservation: '2019-01-23',
    //   NbJourReservation: '11',
    //   EtatReservation: '1',
    //   ConditionReservation: 'Diner et dejener',
    //   NumClient: '1',
    //   NumResponsable: 1,
    //   NumReglement: 1
    // }, {
    //   NumReservation: 2,
    //   DateDebutReservation: '2019-09-16',
    //   DateFinReservation: '2019-09-23',
    //   NbJourReservation: '11',
    //   EtatReservation: '1',
    //   ConditionReservation: 'Diner et dejener',
    //   NumClient: '1',
    //   NumResponsable: 1,
    //   NumReglement: 1
    // }, {
    //   NumReservation: 3,
    //   DateDebutReservation: '2019-09-20',
    //   DateFinReservation: '2019-09-23',
    //   NbJourReservation: '11',
    //   EtatReservation: '1',
    //   ConditionReservation: 'Diner et dejener',
    //   NumClient: '1',
    //   NumResponsable: 1,
    //   NumReglement: 1
    // }
  ],
	date1: new Date(),
	date2: new Date(now.setDate(now.getDate()+1))
}

const ReserverReducers = (state = initState, action) => {
  switch (action.type) {
    case FETCH_RESERVER:
      state.dataReserver = [];
      state.dataReserver = [...action.data];
      return Object.assign({}, state, state.dataReserver);

    case ADD_RESERVER:
      console.log('ADD_RESERVER');
      const std =[{
        ...action.data
        }]
      console.log({...action.data})

      axios.post(urlHeader + "Reservation/post", action.data
          //,{
          //  headers: {
          //    'Content-Type': 'application/x-www-form-urlencoded',
          //    'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
          //  }
          //}
      ).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
      state.dataReserver = [
        ...state.dataReserver,
        std[0]
      ];
      return Object.assign({}, state, state.dataReserver);

    case TEST_ONE:
      return {'test': 'coucou ca fonction'};

    case UPDATE_DATE_1:
      state.date1 = action.data;
      return Object.assign({}, state, state.date1);
    case UPDATE_DATE_2:
      state.date2 = action.data;
      return Object.assign({}, state, state.date2);

    default:
      return state;
  }
}

export default ReserverReducers;
