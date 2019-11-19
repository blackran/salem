import axios from 'axios';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import {TableHead, TableRow, TableBody} from '@material-ui/core';
import {DeleteRounded} from '@material-ui/icons';

class Clients extends Component {
	componentDidMount() {
		if (this.props.clients.one) {
			axios.get("http://localhost/myprojects/backend/Clients/get").then(res => res.data).then(state => this.props.fetchClients(state)).catch(err => console.log("error parsing:\n", err));
			this.props.updateOne(!this.props.clients.one);
		}
	}

	OnSubmitClient = (e) => {
		e.preventDefault();
		this.props.addClients(this.props.clients.changes);
	}

	OnChange = (e) => {
		const data = {name: e.target.name, value:e.target.value};
		this.props.onChangeInput(data);
	}

	OnDeleteClient = (id) => {
		this.props.onDeleteClient(id);
	}

	render() {
		const {clients} = this.props;
		const styles = {
			transtition: 'all 1s ease-out'
		}
		return (<div style={{padding: 20, display: "flex"}}>
			<form noValidate="noValidate" autoComplete="off" onSubmit={this.OnSubmitClient.bind(this)}>
				<TextField error={false} label="NOM" placeholder="Example" margin="normal"  value={clients.changes.NomClient} onChange={this.OnChange.bind(this)} name="NomClient"/>
				<br/>
				<TextField label="ADDRESS"  margin="normal" value={clients.changes.AddressClient} error={false} onChange={this.OnChange.bind(this)} name="AddressClient"/>
				<br/>
				<TextField error={false} label="CODE POSTAL" placeholder="Example" margin="normal"  value={clients.changes.CpClient} onChange={this.OnChange.bind(this)} name="CpClient"/>
				<br/>
				<TextField label="PAYS" margin="normal" value={clients.changes.PaysClient} error={false} onChange={this.OnChange.bind(this)} name="PaysClient"/>
				<br/>

				<TextField label="TELEPHONE" type="tel" autoComplete="current-password" margin="normal" value={clients.changes.TelClient} error={false} onChange={this.OnChange.bind(this)} name="TelClient"/>
				<br/>
				<TextField error={false} label="EMAIL" placeholder="Example@example.com" margin="normal"  value={clients.changes.EmailClient} onChange={this.OnChange.bind(this)} name="EmailClient"/>
				<br/>
				<Button type="submit" variant="contained" size="large">
					ENREGISTRER
				</Button>
			</form>
			<br/>
			<Table style={{...styles,marginLeft: 30}}>
				<TableHead>
					<TableRow>
						<th>Nom</th>
						<th>Address</th>
						<th>Code Postal</th>
						<th>Pays</th>
						<th>Tel</th>
						<th>Email</th>
						<th>Option</th>
					</TableRow>
				</TableHead>
				<TableBody>
			{
				clients.dataClients.map((client) => (<TableRow key={client.NumClient} >
					<td>{client.NomClient}</td>
					<td>{client.AddressClient}</td>
					<td>{client.CpClient}</td>
					<td>{client.PaysClient}</td>
					<td>{client.TelClient}</td>
					<td>{client.EmailClient}</td>
					<td><DeleteRounded onClick={() => this.OnDeleteClient(client.NumClient)} className="delete" large="large"
					/></td>
				</TableRow>))
			}
			</TableBody>
			</Table>
		</div>);
	}
}

const mapStateToProps = state => {
	return {clients: state.clients}
}

const mapDispatchToProps = dispatch => {
	return {
		addClients: (data) => {
			dispatch({type: "ADD_CLIENTS", data: data});
		},
		fetchClients: (data) => {
			dispatch({type: "FETCH_CLIENTS", data: data});
		},
		updateOne: data => {
			dispatch({type: "UPDATE_ONE", data: data});
		},
		onChangeInput: data => {
			dispatch({type: "ON_CHANGE_CLIENT", data: data})
		},
		onDeleteClient: id => {
			dispatch({type: "DELETE_CLIENTS", id: id})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
