import axios from 'axios';
import shortid from 'shortid';
import {ADD_TYPES, DELETE_TYPES, UPDATE_TYPES, FETCH_TYPES, UPDATE_ONE, ON_CHANGE_TYPES} from '../Actions/typesTypes';
import {urlHeader} from '../Actions/config';

const initState = {
	dataTypes: [
		// {
		// 		NumType:1,
		// 	  NomType:"Simple",
		// 	  DescriptionType: "je ne peux pas resoudre cette exo."
		// },
		// {
		// 		NumType:2,
		// 	  NomType:"Double",
		// 	  DescriptionType: "je ne peux pas resoudre cette exo."
		// },
		// {
		// 		NumType:3,
		// 	  NomType:"Double single",
		// 	  DescriptionType: "je ne peux pas resoudre cette exo."
		// },
		// {
		// 		NumType:4,
		// 	  NomType:"Double Triple",
		// 	  DescriptionType: "je ne peux pas resoudre cette exo."
		// },
		// {
		// 		NumType:5,
		// 	  NomType:"Familiale",
		// 	  DescriptionType: "je ne peux pas resoudre cette exo."
		// }
	],
	mocksTypes: '',
	one: true,
	submitReusit: true,
	changes : {
    NumType:"",
    NomType:"",
    DescriptionType: ""
	}
}

const TypesReducers = (state = initState, action) => {
	switch (action.type) {
		case ADD_TYPES:
			state.changes["NumClient"] = shortid.generate();
			state.changes["AnneeCreClient"] = new Date().getFullYear();
			const std = [{
				...state.changes
			}]
			axios.post(urlHeader+"Types/post", std).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
			state.dataTypes = [
				...state.dataTypes, state.changes
			];
			return Object.assign({}, state, state.Types);

		case DELETE_TYPES:
			const st = state.dataTypes.filter(e => {
				return e.NumClient !== action.id;
			});
			state.dataTypes = [...st];
			axios.delete(urlHeader+"Types/delete/" + action.id).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.dataTypes);

		case UPDATE_TYPES:
			const std1 = state.dataTypes.filter(e => {
				return e.id !== action.id;
			});
			const sto1 = action.data;
			state.dataTypes = [
				...std1,
				...sto1
			];
			axios.put(urlHeader+"Types/put/" + action.id).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));

			return Object.assign({}, state, state.dataTypes);

		case FETCH_TYPES:
			state.dataTypes = [];
		  state.dataTypes = [
		    ...action.data
		  ];
		  return Object.assign({}, state, state.dataTypes);

		case UPDATE_ONE:
			state.one = action.data;
			return Object.assign({}, state, state.one);

		case ON_CHANGE_TYPES:
			state.changes[action.data.name] = action.data.value;
			return Object.assign({}, state, state.changes);

		default:
			return state;
	}
}

export default TypesReducers;
