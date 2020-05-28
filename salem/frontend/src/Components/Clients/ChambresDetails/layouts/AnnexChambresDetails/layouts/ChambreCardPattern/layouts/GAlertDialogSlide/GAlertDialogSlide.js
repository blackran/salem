import React from 'react';
import {
  Button,
  Fab,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';
import {Add} from '@material-ui/icons/';
import {connect} from 'react-redux';
import shortid from 'shortid';
import AlertConfirmationReservation from './layouts/AlertConfirmationReservation';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}/>;
});

class AlertDialogSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      NumClient: "",
      ConditionReservation: "",
      error: false
    }
    this.date1 = this.props.date1;
    this.date2 = this.props.date2;
  }

  OnChange(e) {
    this.setState({
      NumClient: e.target.value
    })
  }

  OnChangePress (e){
      const stock = this.props.clients.dataClients.filter(function(h){
          return h.numClient === e.target.value;
      });
      if(stock.length!==0){
          this.setState({
              error: false
          })
          this.props.updateNameClient(stock[0].nomClient);
      }else{
          this.props.updateNameClient("");
          this.setState({
              error: true
          })
      }
  }

  handleClickOpen() {
    this.setState({
      open: true
    })
    this.props.updateNameClient("");
    this.setState({
      ConditionReservation: ""
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
    //this.date2 = "";
    //this.date1 = "";
    this.props.updateNameClient("");
    this.setState({
      ConditionReservation: ""
    })
  }

  dataReserver() {
    const StockNumReglement = shortid.generate();
    // const prix = props.chambres.dataChambres.filter(e=>{
    //   return e.NomChambre === NomChambre;
    // })[0].PrixChambre;
    const st = {
  			numReglement: StockNumReglement,
  			// MontantReglement: parseInt(prix) * (Math.round((date2 - date1) / (1000 * 3600 * 24))),
  			montantReglement: 0,
  			etatReglement: "0",
  			anneeReglement: new Date().getFullYear().toString()
    }
    const stock = {
      numReservation: shortid.generate(),
      dateDebutReservation: this.formattedDateDatabase(this.date1),
      dateFinReservation: this.formattedDateDatabase(this.date2),
      nbJourReservation: Math.round((this.date2 - this.date1) / (1000 * 3600 * 24)),
      conditionReservation: this.state.ConditionReservation,
      numClient: this.state.NumClient,
      numReglement: StockNumReglement
    }
    return ([st, stock]);
  }


  formattedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return `${day}/${month}/${year}`;
  }

  formattedDateDatabase(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return `${year}-${month}-${day}`;
  }
  OnChangeConditionReservation(e) {
    this.setState({
      ConditionReservation: e.target.value
    })
  }

  OnClickAddClient(e){
    var stock = this.props.clients.dataClients.filter(e=>{
      return e.NomClient === this.props.clients.changes.NomClient;
    }).length === 0;
    if(stock){
      this.props.addClients();
      var client = this.props.clients.dataClients.filter(e=>{
        return e.NomClient === this.props.clients.changes.NomClient;
      })[0].NumClient;
      this.setState({
        NumClient: client
      })
    }else{
      alert("name already exist")
    }
  }

  OnChangeNameClients(e){
    this.props.onChangeClient(e.target);
  }
  render(){
  return (<span>
    <Fab color='primary' variant="extended" size='small' aria-label="delete" className='addReservation' onClick={this.handleClickOpen.bind(this)}>
      <Add/>
      reserver
    </Fab>{" "}
    <Dialog open={this.state.open} TransitionComponent={Transition} keepMounted={true} onClose={this.handleClose.bind(this)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
      <DialogTitle id="alert-dialog-slide-title">{"Reservation chambres"}</DialogTitle>
      <DialogContent>
        <TextField label="NOM CHAMBRE" placeholder="Example" margin="normal" name="pseudo" value={this.props.NomChambre} style={{width: 140}}/>
        <br/>
        <TextField label="DATE DEBUT" placeholder="Example" margin="normal" name="pseudo" value={this.formattedDate(this.props.date1)} style={{width: 120}}/>{" "}
        <TextField label="DATE FIN" placeholder="Example" margin="normal" name="pseudo" value={this.formattedDate(this.props.date2)} style={{width: 120}}/>
        <TextField
          label="JOURS"
          placeholder="Example"
          margin="normal"
          name="pseudo"
          value={Math.round((this.props.date2 - this.props.date1) / (1000 * 3600 * 24))}
          style={{width: 50, marginLeft: 20}}
        /><br/>

        <TextField
          label="N°"
          placeholder="1"
          margin="normal"
          name="NumClient"
          style={{width: 100}}
          value={this.state.NumClient}
          onChange={this.OnChange.bind(this)}
          onKeyDown={ev => ev.key === 'Enter' && this.OnChangePress(ev) }
          error={this.state.error}
        />{" "}
        <TextField label="Votre nom" placeholder="persone" margin="normal" name="NomClient" value={this.props.clients.changes.NomClient} onChange={this.OnChangeNameClients.bind(this)}/>{" "}
        <Button
          variant="outlined"
          style={{position: 'relative',top:30, padding:5, minWidth: 35}}
          onClick={this.OnClickAddClient.bind(this)}>
          <Add/>
        </Button>
        <br/>

        <TextField id="outlined-multiline-flexible" label="Remarque" multiline={true} rowsMax="4" margin="normal" helperText="votre petit remarque ici ..." variant="outlined" value={this.state.ConditionReservation} onChange={this.OnChangeConditionReservation.bind(this)}/>
        <br/>

      </DialogContent>
      <DialogActions>
        <AlertConfirmationReservation
          handleClose = {() =>
            this.handleClose.bind(this)
          }
          NomChambre = {
            this.props.NomChambre
          }
          dataReserver = {
            this.dataReserver()
          }
        />

        <Button onClick={this.handleClose.bind(this)} color="primary" variant='outlined'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </span>);
  }
}
const mapStateToProps = state => {
	return {clients: state.clients, chambres: state.chambres}
}

const mapDispatchToProps = dispatch => {
	return {
    addClients: () => {
      dispatch({type: "ADD_CLIENTS"});
    },
    onChangeClient: (data) => {
      dispatch({type: "ON_CHANGE_CLIENT", data});
    },
    updateNameClient: (data) => {
      dispatch({type: "UPDATE_NAME_CLIENT", data});
    },
    addReservation: (data) => {
      dispatch({type: "ADD_RESERVER", data});
    },
    addReglement: (data) => {
      dispatch({type: "ADD_REGLEMENT", data});
    },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialogSlide);
