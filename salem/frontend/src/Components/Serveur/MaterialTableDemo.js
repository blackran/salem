import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {connect} from 'react-redux';
import axios from 'axios';
import {urlHeader} from '../../Actions/config';

class MaterialTableDemo extends Component {
  componentDidMount() {
		// if (this.props.states.one) {
			axios.get(urlHeader+"Clients/get").then(res => res.data).then(state => this.props.fetchTableChambres(state)).catch(err => console.log("error parsing:\n", err));
			// this.props.updateOne(!this.props.states.one);
		// }
	}
  render() {
    const { columns, data } = this.props.states;
    return (
      <MaterialTable title="GESTION CLIENTS" columns={columns} data={data} editable={{
        onRowAdd: newData => new Promise(resolve => {
          setTimeout(() => {
            resolve();
            this.props.addTableChambres(newData);
          }, 600);
        }),
        onRowUpdate: (newData, oldData) => new Promise(resolve => {
          setTimeout(() => {
            resolve();
            console.log('hello');
            this.props.updateTableChambres(newData, oldData);
          },
          600);
        }),
        onRowDelete: oldData => new Promise(resolve => {
          setTimeout(() => {
            resolve();
            this.props.deleteTableChambres(oldData);
          }, 600);
        })
      }}/>
    );
  }
}

const mapStateToProps = state => {
	return {states: state.tables}
}

const mapDispatchToProps = dispatch => {
	return {
		addTableChambres: (data) => {
			dispatch({type: "ADD_TABLE_CHAMBRES", data: data});
		},
		deleteTableChambres: (oldData) => {
			dispatch({type: "DELETE_TABLE_CHAMBRES", oldData: oldData});
		}
    ,
		updateTableChambres: (newData, oldData) => {
			dispatch({type: "UPDATE_TABLE_CHAMBRES", newData: newData, oldData: oldData});
		},
    fetchTableChambres: (data) => {
			dispatch({type: "FETCH_TABLE_CHAMBRES", data: data});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);
