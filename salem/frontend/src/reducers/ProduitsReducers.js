// import axios from 'axios';
import shortid from 'shortid';
import {ADD_CLIENTS, DELETE_CLIENTS, UPDATE_CLIENTS, FETCH_CLIENTS, UPDATE_ONE, ON_CHANGE_CLIENT, UPDATE_NAME_CLIENT} from '../Actions/typesProduits';
// import {urlHeader} from '../Actions/config';

const initState = {
	dataProduits: [
		{
			numproduit: 1,
			imagenameproduit: "blackran",
			nomproduit: "stylo",
			prixproduit: "500",
			qtproduit: "5"
		},
		{
			numproduit: 2,
			imagenameproduit: "blackran",
			nomproduit: "cahier",
			prixproduit: "1000",
			qtproduit: "15"
		}
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
			// const std = [{
			// 	...state.changes
			// }]

			// axios.post(
			// 	"http://localhost/myprojects/backend/Clients/post",
			// 	std,
			// 	{
      //       headers: {
			// 			'Accept': 'application/json',
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //       }
      //     }
			// ).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
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
			// axios.delete("http://localhost/myprojects/backend/Clients/delete/" + action.id,{
			// 		headers: {
			// 			'Accept': 'application/json',
			// 			'Content-Type': 'application/x-www-form-urlencoded'
			// 		}
			// 	}).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));
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
			// axios.put("http://localhost/myprojects/backend/Clients/put/" + action.id).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));

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
			if(state.changes!==undefined){
				state.changes["NomClient"] = action.data
			}
			return Object.assign({}, state, state.changes);

		default:
			return state;
	}
}

export default ClientsReducers;
