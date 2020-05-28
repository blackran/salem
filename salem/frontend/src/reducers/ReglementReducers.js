import axios from 'axios';
import {ADD_REGLEMENTS, FETCH_REGLEMENTS, UPDATE_REGLEMENTS} from '../Actions/typesReglement';
import {urlHeader} from '../Actions/config';

const initState = {
	dataReglements: [
		// {
		// 	NumReglement:1,
		// 	MontantReglement: 30000,
		// 	EtatReglement: "1",
		// 	AnneeReglement: "2019"
		// }
	]
}

const ReglementsReducers = (state = initState, action) => {
	switch (action.type) {
		case ADD_REGLEMENTS:
			const std = [{
				...action.data
			}]
			const act = [action.data];
			console.log("ADD_REGLEMENTS")
			console.log(act);

			axios.post(
				urlHeader+"Reglements/post",
				action.data
				//,{
        //    headers: {
        //    'Content-Type': 'application/x-www-form-urlencoded',
        //    'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
        //    }
        //  }
			).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
			state.dataReglements = [
				...state.dataReglements, std[0]
			];
			return Object.assign({}, state, state.dataReglements);
		case FETCH_REGLEMENTS:
			state.dataReglements = [];
		  state.dataReglements = [
		    ...action.data
		  ];
		  return Object.assign({}, state, state.dataReglements);

		case UPDATE_REGLEMENTS:
			// console.log(action.data)
			if(action.data !== null){
				const std1 = state.dataReglements.filter(e => {
					return e.numReglement !== action.data[0].numReglement;
				});
				const sto1 = {...action.data}[0];
				state.dataReglements = [
					...std1,
					sto1
				];
				console.log(sto1)
				axios.post(urlHeader+"Reglements/put/" + action.data[0].numReglement,
				sto1
				).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));
				}


			return Object.assign({}, state, state.dataReglements);

		default:
			return state;
	}
}

export default ReglementsReducers;
