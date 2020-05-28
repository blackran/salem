import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
// import Slide from '@material-ui/core/Slide';
import {connect} from 'react-redux';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

class AlertDialogSlideR extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      openSnack: false
    }
  }
  // const [open, setOpen] = React.useState(false);

  handleClickOpen() {
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  handleCloseReserver() {
    if (this.props.NomChambre !== null && this.props.dataReserver !== null){
      this.props.addReglement(this.props.dataReserver[0]);
      this.props.addReservation(this.props.dataReserver[1]);
      const stock =
        {
          'numReservation': this.props.dataReserver[1].numReservation,
          'nomChambre': this.props.NomChambre
        }

      this.props.addConcerner(stock)
      this.handleClose();
       this.setState({
         openSnack: true
       })
    }
  }
  handleCloseSnack(){
    this.setState({
      openSnack: false
    })
  }
  render(){
    return(<span>
      <Button variant="contained" onClick={this.handleClickOpen.bind(this)} color="primary">
        Reserver
      </Button>
      <Dialog
        open={this.state.open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose.bind(this)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{minWidth: 80}}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Affirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Acceptez vous cette reservation?<br/>
            Nom du chambre: {this.props.NomChambre}<br/>
            Date debut: {this.props.dataReserver[1].dateDebutReservation}<br/>
            Date fin: {this.props.dataReserver[1].dateDebutReservation}<br/>
            {this.props.dataReserver[1].conditionReservation!==''?'Condition: ':null} {this.props.dataReserver[1].conditionReservation}
            {/* Total: {this.props.dataReserver[0].MontantReglement} Ar */}

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseReserver.bind(this)} color="primary">
            Valider
          </Button>
          <Button onClick={this.handleClose.bind(this)} color="primary">
            Refuser
          </Button>
        </DialogActions>
      </Dialog>



      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.openSnack}
        autoHideDuration={6000}
        onClose={this.handleCloseSnack.bind(this)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Reservation reusir</span>}
        action={[
          // <Button key="undo" color="secondary" size="small" onClick={handleClose}>
          //   UNDO
          // </Button>,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            // className={classes.close}
            onClick={this.handleCloseSnack.bind(this)}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </span>)
    }
  }
/*  */

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
        dispatch({type: "ADD_REGLEMENTS", data});
      },
      addConcerner: (data) => {
        dispatch({type: "ADD_CONCERNER", data});
      },
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialogSlideR);
