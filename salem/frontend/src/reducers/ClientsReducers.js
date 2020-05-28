import axios from 'axios';
import shortid from 'shortid';
import {ADD_CLIENTS, DELETE_CLIENTS, UPDATE_CLIENTS, FETCH_CLIENTS, UPDATE_ONE, ON_CHANGE_CLIENT, UPDATE_NAME_CLIENT} from '../Actions/typesClients';
import {urlHeader} from '../Actions/config';

const initState = {
	dataClients: [
		// {
		// 	id:"1",
		// 	idPersones:"blackran",
		// 	contentComentaire: "je ne peux pas resoudre cette exo.",
		// 	idPost: "1"
		// }
	],
	mocksClients: '',
	one: true,
	submitReusit: true,
	changes : {
		NumClient: "",
		NomClient: "",
		AddressClient: "",
		CpClient: "",
		PaysClient: "",
		TelClient: "",
		EmailClient: "",
		AnneeCreClient: ""
	}
}

const ClientsReducers = (state = initState, action) => {
	switch (action.type) {
		case ADD_CLIENTS:
			state.changes["NumClient"] = shortid.generate();
			state.changes["AnneeCreClient"] = new Date().getFullYear();
			const std = [{
				...state.changes
			}]

			axios.post(
				urlHeader+"Clients/post",
				std,
				{
            headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
            }
          }
			).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
			state.dataClients = [
				...state.dataClients, state.changes
			];
			return Object.assign({}, state, state.Clients);

		case DELETE_CLIENTS:
			console.log(state)
			const st = state.dataClients.filter(e => {
				return e.NumClient !== action.id;
			});
			state.dataClients = [...st];
			axios.delete(urlHeader+"Clients/delete/" + action.id,{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
						'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
					}
				}).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.dataClients);

		case UPDATE_CLIENTS:
			const std1 = state.dataClients.filter(e => {
				return e.id !== action.id;
			});
			const sto1 = action.data;
			state.dataClients = [
				...std1,
				...sto1
			];
			axios.put(urlHeader+"Clients/put/" + action.id).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));

			return Object.assign({}, state, state.dataClients);

		case FETCH_CLIENTS:
			state.dataClients = [];
		  state.dataClients = [
		    ...action.data
		  ];
		  return Object.assign({}, state, state.dataClients);

		case UPDATE_ONE:
			state.one = action.data;
			return Object.assign({}, state, state.one);

		case ON_CHANGE_CLIENT:
			console.log('ON_CHANGE_CLIENT')
			state.changes[action.data.name] = action.data.value;
			return Object.assign({}, state, state.changes);

		case UPDATE_NAME_CLIENT:
			state.changes["NomClient"] = action.data;
			return Object.assign({}, state, state.changes);

		default:
			return state;
	}
}

export default ClientsReducers;
