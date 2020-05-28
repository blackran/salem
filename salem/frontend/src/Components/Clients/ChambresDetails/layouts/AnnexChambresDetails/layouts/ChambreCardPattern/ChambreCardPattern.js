import GAlertDialogSlide from './layouts/GAlertDialogSlide/GAlertDialogSlide';
import error from './statics/images/404.jpg';
import {Fab} from '@material-ui/core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spring} from 'react-spring/renderprops';
import './statics/styles/Chambres.scss';

class ChambreCardPattern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      opacity: 1
    }
  }
  OnClickShow = () => {
    this.setState({opacity: 0.1})
    setTimeout(() => {
      this.setState({
        opacity: 1,
        show: !this.state.show
      })
    }, 500);
  }

  ValueShow = (e) => {
    if (this.state.show) {
      return (<div>tel: {e.TelChambre}<br/>
        etage: {e.etageChambre}<br/>
        Chauffeau: {e.chauffeauChambre}<br/></div>)
    } else {
      return null;
    }
  }
  render() {
    const {data, delay} = this.props;
    return (
      <Spring
        from={{
          opacity: 0
        }}
        to={{
          opacity: 1
        }}
        config={{
          delay: delay * 500,
          duration: delay * 500
        }}
      >
      {
        props => (<div style={props}>
          <div key={data.nomChambre} className='cardChambre animat' style={{
              opacity: this.state.opacity
            }}>
            <p style={{
                height: 120,
                overflow: 'hidden'
              }}>
              <img src={data.imageChambre !== ""? data.imageChambre : error} alt={'url'} />
            </p>
            <h1>{data.nomChambre}</h1>
            <div>Prix: {data.prixChambre}</div>
            {this.ValueShow(data)}
            <br/>
              <div style={{ display: 'flex' }}>

              <GAlertDialogSlide date1={this.props.reserver.date1} date2={this.props.reserver.date2} NomChambre={data.nomChambre}/>
              <Fab color='default' variant="extended" size='small' aria-label="delete" className='addReservation' onClick={this.OnClickShow}>
                {
                  !this.state.show
                    ? "details"
                    : "cacher"
                }
              </Fab>
            </div>
          </div>
        </div>)
      }
    </Spring>);
  }
}

const mapStateToProps = state => {
  return {chambres: state.chambres, clients: state.clients, reserver: state.reserver}
}

const mapDispatchToProps = dispatch => {
  return {
    updateOne: (data) => {
      dispatch({type: "UPDATE_ONE", data});
    },
    fetchClients: (data) => {
      dispatch({type: "FETCH_CLIENTS", data: data});
    },
    onChangeClient: (data) => {
      dispatch({
        type: "ON_CHANGE_CLIENT",
        data: data
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChambreCardPattern);
