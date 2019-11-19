import {ADD_TABLE_RESERVATIONS, DELETE_TABLE_RESERVATIONS, UPDATE_TABLE_RESERVATIONS, FETCH_TABLE_RESERVATIONS} from '../Actions/typesTableReservations';
import axios from 'axios';
import {urlHeader} from '../Actions/config';

const initState = {
  columns: [
    {
      title: 'Num',
      field: 'NumReservation'
    }, {
      title: 'Debut',
      field: 'DateDebutReservation'
    }, {
      title: 'Fin',
      field: 'DateFinReservation'
    }, {
      title: 'Jour',
      field: 'NbJourReservation'
    }, {
      title: 'Condition',
      field: 'ConditionReservation'
    }, {
      title: 'Client',
      field: 'NumClient'
    }, {
      title: 'Reglement',
      field: 'NumReglement'
    }
  ],

  data: [
    // {
    //   "NumReservation":"1",
    //   "DateDebutReservation":"2019-01-02",
    //   "DateFinReservation":"2019-01-03",
    //   "NbJourReservation":"1",
    //   "ConditionReservation":"Diner et dejener",
    //   "NumClient":"1",
    //   "NumReglement":null
    // }
  ]
}

const TableReservationsReducers = (state = initState, action) => {
  switch (action.type) {
    case ADD_TABLE_RESERVATIONS:
      state.data = [
        ...state.data,
        action.data
      ]

      var stockAdd = action.data;

      var dataAdd = [
        {
          NumReservation: parseInt(stockAdd.NumReservation),
          DateDebutReservation: stockAdd.DateDebutReservation,
          DateFinReservation: stockAdd.DateFinReservation,
          NbJourReservation: parseInt(stockAdd.NbJourReservation),
          ConditionReservation: stockAdd.ConditionReservation,
          NumClient: stockAdd.NumClient,
          NumReglement: stockAdd.NumReglement
        }
      ]
      console.log(dataAdd);
      axios.post(urlHeader+"Reservation/post", dataAdd, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
        }
      }).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
      return Object.assign({}, state, state.data);

    case DELETE_TABLE_RESERVATIONS:
      const mocks1 = [...state.data];
      mocks1.splice(mocks1.indexOf(action.oldData), 1);
      state.data = [...mocks1];
      axios.delete(urlHeader+"Reservation/delete/" + action.oldData.NumReservation, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
        }
      }).then(res => res.data).then(state => this.props.fetchTableReservation(state)).catch(err => console.log("error parsing:\n", err));
      return Object.assign({}, state, state.data);

    case UPDATE_TABLE_RESERVATIONS:
      const mocks2 = [...state.data];
      mocks2[mocks2.indexOf(action.oldData)] = action.newData;

      state.data = [...mocks2];
      var stock = action.newData;

      var data = [
        {
          NumReservation: stock.NumReservation,
          DateDebutReservation: stock.DateDebutReservation,
          DateFinReservation: stock.DateFinReservation,
          NbJourReservation: stock.NbJourReservation,
          ConditionReservation: stock.ConditionReservation,
          NumClient: stock.NumClient,
          NumReglement: stock.NumReglement
        }
      ]
      console.log(data);
      axios.post(urlHeader+"Reservation/put/" + action.oldData.NumReservation, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
        }
      }).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
      return Object.assign({}, state, state.data);

    case FETCH_TABLE_RESERVATIONS:
      state.data = [];
      state.data = action.data;
      const date = new Date();
      const years = date.getFullYear();
      const mounth = (
        (parseInt(date.getMonth()) < 10)
        ? '0'
        : '') + date.getMonth();
      const days = (
        (parseInt(date.getDate()) < 10)
        ? '0'
        : '') + date.getDate();
      state.dateNow = years + "-" + mounth + "-" + days
      return Object.assign({}, state, state.dataChambres);

    default:
      return state;
  }
}

export default TableReservationsReducers;
