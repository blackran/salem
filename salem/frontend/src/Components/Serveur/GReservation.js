import React, {Component} from 'react';
import AdminNavigation from './AdminNavigation';
import {connect} from 'react-redux';
import MaterialTable from 'material-table';
import axios from 'axios';
import {urlHeader} from '../../Actions/config';

class GReservation extends Component {


  componentDidMount() {
    axios.get(urlHeader+"Reservation/get").then(res => res.data).then(state => this.props.fetchTableReservations(state)).catch(err => console.log("error parsing:\n", err));
  }

  render() {
    const {columns, data} = this.props.states;
    return (<div>
      <AdminNavigation  history={this.props.history}/>
      <MaterialTable style={{width: '100%'}} title="GESTION RESERVATIONS" columns={columns} data={data} editable={{
          onRowAdd: newData => new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.props.addTableReservations(newData);
            }, 600);
          }),
          onRowUpdate: (newData, oldData) => new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.props.updateTableReservations(newData, oldData);
            }, 600);
          }),
          onRowDelete: oldData => new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.props.deleteTableReservations(oldData);
            }, 600);
          })
        }}/>
    </div>);
  }
}

const mapStateToProps = state => {
  return {states: state.TablesReservations}
}

const mapDispatchToProps = dispatch => {
  return {
    addTableReservations: (data) => {
      dispatch({type: "ADD_TABLE_RESERVATIONS", data: data});
    },
    deleteTableReservations: (oldData) => {
      dispatch({type: "DELETE_TABLE_RESERVATIONS", oldData: oldData});
    },
    updateTableReservations: (newData, oldData) => {
      dispatch({type: "UPDATE_TABLE_RESERVATIONS", newData: newData, oldData: oldData});
    },
    fetchTableReservations: (data) => {
      dispatch({type: "FETCH_TABLE_RESERVATIONS", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GReservation);
