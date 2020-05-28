import {ADD_RESPONSABLES, FETCH_RESPONSABLES, UPDATE_EROOR, USER_CONNECTER, DELETE_RESPONSABLES, UPDATE_RESPONSABLES} from '../Actions/typesResponsables';
import axios from 'axios';
import shortid from 'shortid';
import {urlHeader} from '../Actions/config';

const initState = {
	dataResponsables: [
    // {
    //   NumResponsable: 1,
    //   NomResponsable: 'RASOLONDRAIBE',
    //   PseudoResponsable: 'blackran',
    //   PasswordResponsable: 'iloveyou',
    //   PrenomResponsable: 'Andrianantenaina',
    //   AddressResponsable: 'ambohitrandriana ambalavao',
    //   TelResponsable: '0343949863',
    //   DroitResponsable: 'SUPERS',
    //   ImageUrlResponsable: 'lorem upsom',
    // },
    // {
    //   NumResponsable: 2,
    //   NomResponsable: 'RASOLONDRAIBE',
    //   PseudoResponsable: 'root',
    //   PasswordResponsable: 'password',
    //   PrenomResponsable: 'Feno Sitraka',
    //   AddressResponsable: 'ambohitrandriana ambalavao',
    //   TelResponsable: '',
    //   DroitResponsable: 'USER',
    //   ImageUrlResponsable: 'lorem upsom',
    // },
	],
  error: false,
  idUserConnect: null
}

const ResponsablesReducers = (state = initState, action) => {
	switch (action.type) {
		case FETCH_RESPONSABLES:
			state.dataResponsables = [];
		  state.dataResponsables = [
		    ...action.data
		  ];
		  return Object.assign({}, state, state.dataResponsables);

		case ADD_RESPONSABLES:
			action.data[0].NumResponsable = shortid.generate();
		  state.dataResponsables = [
		    ...state.dataResponsables, ...action.data
		  ];
			axios.post(urlHeader+"Responsables/post", action.data,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
				}
			}).catch(err => console.log("error parsing:\n", err));
		  return Object.assign({}, state, state.dataResponsables);

		case DELETE_RESPONSABLES:
			const st = state.dataResponsables.filter(e => {
				return e.NumResponsable !== action.id;
			});
			state.dataResponsables = [...st];
			console.log(st)
			axios.delete(urlHeader+"Responsables/delete/" + action.id,{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
						'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
					}
				}).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.dataResponsables);

		case UPDATE_RESPONSABLES:
			const std1 = state.dataResponsables.filter(e => {
				return e.NumResponsable !== action.data[0].NumResponsable;
			});
			// console.log(std1)
			const sto1 = action.data;
			state.dataResponsables = [
				...std1,
				...sto1
			];
			axios.post(urlHeader+"Responsables/put/" + action.data[0].NumResponsable,
			sto1,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
				}
			}).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));

			return Object.assign({}, state, state.dataResponsables);

    case UPDATE_EROOR:
			state.error = action.data;
			return Object.assign({}, state, state.error);
    case USER_CONNECTER:
			state.idUserConnect = action.data;
			return Object.assign({}, state, state.idUserConnect);

		default:
			return state;
	}
}

export default ResponsablesReducers;
