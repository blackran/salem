import {ADD_TABLE_CLIENTS, DELETE_TABLE_CLIENTS, UPDATE_TABLE_CLIENTS, FETCH_TABLE_CLIENTS} from '../Actions/typesTableClients';
import axios from 'axios';
import {urlHeader} from '../Actions/config';

const initState = {
  columns: [
    {
      title: 'Num',
      field: 'NumClient'
    }, {
      title: 'Nom',
      field: 'NomClient'
    }, {
      title: 'Address',
      field: 'AddressClient'
    }, {
      title: 'Code Postal',
      field: 'CpClient'
    }, {
      title: 'Pays',
      field: 'PaysClient',
      lookup: {
        'Madagascar': 'Madagascar',
        'USA': 'USA',
        72: 'France'
      }
    }, {
      title: 'Tel',
      field: 'TelClient'
    }, {
      title: 'Email',
      field: 'EmailClient'
    }, {
      title: 'Annee',
      field: 'AnneeCreClient'
    }
  ],

  data: [
    // {
    //   NumClient: 'Mehmet',
    //   NomClient: 'Baran',
    //   AddressClient: 'Fianarantsoa',
    //   CpClient: '301',
    //   PaysClient: 'Madagascar',
    //   TelClient: '0343949863',
    //   EmailClient: 'rasolondraibeandrianantenaina@gmail.com',
    //   AnneeCreClient: '2019'
    // }, {
    //   NumClient: 'Zerya Betül',
    //   NomClient: 'Baran',
    //   AddressClient: 'Antanarivo',
    //   CpClient: '101',
    //   PaysClient: 'Madagascar',
    //   TelClient: '0343949863',
    //   EmailClient: 'rasolondraibeandrianantenaina@gmail.com',
    //   AnneeCreClient: '2019'
    // }, {
    //   NumClient: 'Zerya',
    //   NomClient: 'Baran',
    //   AddressClient: 'Ambalavao',
    //   CpClient: '303',
    //   PaysClient: 'Madagascar',
    //   TelClient: '0343949863',
    //   EmailClient: 'rasolondraibeandrianantenaina@gmail.com',
    //   AnneeCreClient: '2019'
    // }
  ]
}

const TableClientsReducers = (state = initState, action) => {
  switch (action.type) {
    case ADD_TABLE_CLIENTS:
      state.data = [
        ...state.data,
        action.data
      ]

      var stockAdd = action.data;

      var dataAdd = [
        {
          NumClient: stockAdd.NumClient,
          NomClient: stockAdd.NomClient,
          AddressClient: stockAdd.AddressClient,
          CpClient: stockAdd.CpClient,
          PaysClient: stockAdd.PaysClient,
          TelClient: stockAdd.TelClient,
          EmailClient: stockAdd.EmailClient,
          AnneeCreClient: new Date().getFullYear()
        }
      ]
      console.log(dataAdd);
      axios.post(urlHeader+"Clients/post", dataAdd, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
        }
      }).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
      return Object.assign({}, state, state.data);

    case DELETE_TABLE_CLIENTS:
      const mocks1 = [...state.data];
      mocks1.splice(mocks1.indexOf(action.oldData), 1);
      state.data = [...mocks1];
      axios.delete(urlHeader+"Clients/delete/" + action.oldData.NumClient, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
        }
      }).then(res => res.data).then(state => this.props.fetchTableClients(state)).catch(err => console.log("error parsing:\n", err));
      return Object.assign({}, state, state.data);

    case UPDATE_TABLE_CLIENTS:
      const mocks2 = [...state.data];
      mocks2[mocks2.indexOf(action.oldData)] = action.newData;

      state.data = [...mocks2];
      var stock = action.newData;

      var data = [
        {
          NumClient: stock.NumClient,
          NomClient: stock.NomClient,
          AddressClient: stock.AddressClient,
          CpClient: stock.CpClient,
          PaysClient: stock.PaysClient,
          TelClient: stock.TelClient,
          EmailClient: stock.EmailClient,
          AnneeCreClient: new Date().getFullYear()
        }
      ]
      console.log(data);
      axios.post(urlHeader+"Clients/put/" + action.oldData.NumClient, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
        }
      }).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
      return Object.assign({}, state, state.data);

    case FETCH_TABLE_CLIENTS:
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

export default TableClientsReducers;
