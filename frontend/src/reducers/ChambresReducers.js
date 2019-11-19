import axios from 'axios';
import {ADD_CHAMBRES, DELETE_CHAMBRES, UPDATE_CHAMBRES, FETCH_CHAMBRES, UPDATE_ONE, ON_CHANGE_CHAMBRES, ON_CHANGE_SLIDER, NEW_DATA_CHAMBRES} from '../Actions/typesChambres';
import {urlHeader} from '../Actions/config';

const initState = {
	dataChambres: [
		// {
		//   "nomChambre": "Coquelicot",
		//   "telChambre": "0349354341",
		//   "etageChambre": "1",
		//   "chauffeauChambre": "GAZ",
		//   "prixChambre": 20000,
		//   "numCategorie": 1,
		//   "numType": 1,
		//   "imageChambre": ""
		// },
		// {
		//   "nomChambre": "Jonquille",
		//   "telChambre": "0349354341",
		//   "etageChambre": "1",
		//   "chauffeauChambre": "GAZ",
		//   "prixChambre": 20000,
		//   "numCategorie": 1,
		//   "numType": 1,
		//   "imageChambre": ""
		// }
	  ],
	mocksChambres: '',
	one: true,
	submitReusit: true,
	changes : {
		nomChambre: "",
		telChambre: "",
		etageChambre: "",
		chauffeauChambre: "",
		prixChambre: "",
		numCategorie: "",
		numType: ""
	},
	slide: 0,
	dateNow: '',
	newDataChambres: []
}

const ChambresReducers = (state = initState, action) => {
	switch (action.type) {
		case ADD_CHAMBRES:

			axios.post(urlHeader+"Chambres/post", action.data,{
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
					}
				}).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
			state.dataChambres = [
				...state.dataChambres, ...action.data
			];
			return Object.assign({}, state, state.dataChambres);

		case DELETE_CHAMBRES:
			const st = state.dataChambres.filter(e => {
				return e.nomChambre !== action.id;
			});
			state.dataChambres = [...st];
			axios.delete(urlHeader+"Chambres/delete/" + action.id,{
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
					}
				}).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.dataChambres);

		case UPDATE_CHAMBRES:
			const std1 = state.dataChambres.filter(e => {
				return e.nomChambre !== action.data.nomChambre;
			});
			const sto1 = action.data;
			state.dataChambres = [
				...std1,
				sto1
			];
			console.log(sto1);
			axios.post(urlHeader+"Chambres/put/" + action.data.nomChambre, sto1,{
					headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
					}
				}).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));

			return Object.assign({}, state, state.dataChambres);

		case FETCH_CHAMBRES:
			state.dataChambres = [];
			state.newDataChambres = [];
		  state.dataChambres = [
		     ...action.data
		   ];
		   console.log(action.data)

			state.dataChambres.map((e)=>{
				if(e.prixChambre >= state.slide){
					state.slide = e.prixChambre;
				}
				return null;
			})
			const date = new Date();
			const years = date.getFullYear();
			const mounth = ((parseInt(date.getMonth())<10)?'0':'') + date.getMonth();
			const days = ((parseInt(date.getDate())<10)?'0':'')+date.getDate();
			state.dateNow= years +"-"+mounth+"-"+days
		  return Object.assign({}, state, state.dataChambres);

		case UPDATE_ONE:
			state.one = action.data;
			return Object.assign({}, state, state.one);

		case ON_CHANGE_CHAMBRES:
			state.changes[action.data.name] = action.data.value;
			return Object.assign({}, state, state.changes);

		case ON_CHANGE_SLIDER:
			state.slide = action.data;
			return Object.assign({}, state, state.slide);

		case NEW_DATA_CHAMBRES:
			state.newDataChambres = []
			state.newDataChambres = action.data;
			return Object.assign({}, state, state.newdataChambres);

		default:
			return state;
	}
}

export default ChambresReducers;
