import {FETCH_CONCERNER, ADD_CONCERNER} from '../Actions/typesConcerner';
import axios from 'axios';
import {urlHeader} from '../Actions/config';

const initState = {
	dataConcerner: [
    // {
    //   NumReservation: 0,
    //   NomChambre: 'Acacias'
    // },
    // {
    //   NumReservation: 1,
    //   NomChambre: 'Acacias'
    // },
    // {
    //   NumReservation: 0,
    //   NomChambre: 'Azalée'
    // },
    // {
    //   NumReservation: 3,
    //   NomChambre: 'Tulipe'
    // },
	]
}

const ReserverReducers = (state = initState, action) => {
	switch (action.type) {
		case FETCH_CONCERNER:
			state.dataConcerner = [];
		  state.dataConcerner = [
		    ...action.data
		  ];
		  return Object.assign({}, state, state.dataConcerner);

		case ADD_CONCERNER:
			console.log('ADD_CONCERNER');
			console.log(action.data)
			axios.post(
				urlHeader+"Concerner/post",
				action.data
				//,{
				//	headers: {
				//		'Content-Type': 'application/json;charset=UTF-8',
				//		'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
				//	}
				//}
			).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
			state.dataConcerner = [
				...state.dataConcerner, action.data
			];
			return Object.assign({}, state, state.Clients);

		default:
			return state;
	}
}

export default ReserverReducers;
