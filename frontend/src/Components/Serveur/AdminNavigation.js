import './styles/AdminNavigation.scss';

import {Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {PowerSettingsNew, PriorityHighOutlined} from '@material-ui/icons';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
// import shadows from '@material-ui/core/styles/shadows';

class AdminNavigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false 
    }
    this.styles1 = {color: "#000",
     textShadow: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
     transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0'
    };
    this.styles2 = {color: "#585d58"};
  }

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

  handleAffirmeClose() {
    this.setState({
      open: false
    })
    this.props.history.push("/")
  }
  clickMe(e){
    this.props.updateId(e.target.id);
  }

  render() {
    return (
      <Paper className='AdminNavigation'>
        <h1 style={{fontSize: 25}}>GESTION D'HOTEL</h1>

        <ul>
          <Link to='/GChambres'><li onClick={this.clickMe.bind(this)} id="un" style={this.props.state.id==="un"?this.styles1:this.styles2}>CHAMBRES</li></Link>
          <Link to='/GReservation'><li onClick={this.clickMe.bind(this)} id="deux" style={this.props.state.id==="deux"?this.styles1:this.styles2}>RESERVATIONS</li></Link>
          <Link to='/GClients'><li onClick={this.clickMe.bind(this)} id="trois" style={this.props.state.id==="trois"?this.styles1:this.styles2}>CLIENTS</li></Link>
          <Link to='/GResponsables'><li onClick={this.clickMe.bind(this)} id="quatre" style={this.props.state.id==="quatre"?this.styles1:this.styles2}>RESPONSABLES</li></Link>
          <Link to='/GReglements'><li onClick={this.clickMe.bind(this)} id="cinq" style={this.props.state.id==="cinq"?this.styles1:this.styles2}>REGLEMENTS</li></Link>
        </ul>

        <span>
          <p  variant="contained" onClick={this.handleClickOpen.bind(this)} className='logout'>
          <PowerSettingsNew/>{"  "}
          <span style={{position: 'relative', top: '-5px'}}>Logout</span>
          </p>
          <Dialog
            open={this.state.open}
            keepMounted
            onClose={this.handleClose.bind(this)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            style={{minWidth: 80}}
          >
            <DialogTitle id="alert-dialog-slide-title"><span style={{ padding: '15px 9px 5px', border: '2px solid #202020', borderRadius: '100%'}}><PriorityHighOutlined/></span> <span style={{position: 'relative',bottom: 3, fontWeight: 'bold', fontSize: 22}}>{"Affirmation"}</span></DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Vous voulez quitter?<br/>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleAffirmeClose.bind(this)} color="primary">
                Quitter
              </Button>
              <Button onClick={this.handleClose.bind(this)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      </Paper>
    );
  }
}
const mapStateToProps = state => {
  return {state: state.other}
}

const mapDispatchToProps = dispatch => {
  return {
    updateId: (data) => {
      dispatch({type: "UPDATE_ID", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavigation);
