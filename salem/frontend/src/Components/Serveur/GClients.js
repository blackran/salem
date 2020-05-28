import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {connect} from 'react-redux';
import axios from 'axios';
import AdminNavigation from './AdminNavigation';
import {urlHeader} from '../../Actions/config';

class GClients extends Component {
  componentDidMount() {
    axios.get(urlHeader+"Clients/get").then(res => res.data).then(state => this.props.fetchTableClients(state)).catch(err => console.log("error parsing:\n", err));
  }
  render() {
    const {columns, data} = this.props.states;
    return (<div>
      <AdminNavigation  history={this.props.history}/>
      <MaterialTable style={{width: '100%'}} title="GESTION CLIENTS" columns={columns} data={data} editable={{
          onRowAdd: newData => new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.props.addTableClients(newData);
            }, 600);
          }),
          onRowUpdate: (newData, oldData) => new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.props.updateTableClients(newData, oldData);
            }, 600);
          }),
          onRowDelete: oldData => new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.props.deleteTableClients(oldData);
            }, 600);
          })
        }}/>
    </div>);
  }
}

const mapStateToProps = state => {
  return {states: state.tablesClients}
}

const mapDispatchToProps = dispatch => {
  return {
    addTableClients: (data) => {
      dispatch({type: "ADD_TABLE_CLIENTS", data: data});
    },
    deleteTableClients: (oldData) => {
      dispatch({type: "DELETE_TABLE_CLIENTS", oldData: oldData});
    },
    updateTableClients: (newData, oldData) => {
      dispatch({type: "UPDATE_TABLE_CLIENTS", newData: newData, oldData: oldData});
    },
    fetchTableClients: (data) => {
      dispatch({type: "FETCH_TABLE_CLIENTS", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GClients);
