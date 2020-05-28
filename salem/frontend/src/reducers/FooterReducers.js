import {ADD_AIME, FETCH_AIME} from '../Actions/typesAime';
// import {urlHeader} from '../Actions/config';

const initState = {
	AIME: 0
}

const ClientsFooter = (state = initState, action) => {
	switch (action.type) {
		case ADD_AIME:
			// axios.post("http://localhost/myprojects/tropik/backend/Clients/post", std).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
      		const stock = state.AIME + 1;
			state.AIME = stock;
			return Object.assign({}, state, state.AIME);

		case FETCH_AIME:
			// state.dataClients = [];
		  // state.dataClients = [
		  //   ...action.data
		  // ];
		  return Object.assign({}, state, state.dataClients);

		default:
			return state;
	}
}

export default ClientsFooter;
