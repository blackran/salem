import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';
import {urlHeader} from '../../Actions/config';
import { Link } from 'react-router-dom';

class AnnexGReglements extends Component {
  constructor(props){
    super(props);
    this.state={
      argentAjouter: ''
    }
  }

  UpdateArgentRecu(e, reste){
    var stock = [];
    console.log('argentAjouter:'+parseInt(this.state.argentAjouter) +' reste:'+ parseInt(reste))
    if(parseInt(this.state.argentAjouter) < parseInt(reste)){
      stock = [
        {
          numReglement:e.numReglement,
          montantReglement: parseInt(this.state.argentAjouter) + parseInt(e.montantReglement),
          etatReglement: e.etatReglement,
          anneeReglement: e.anneeReglement
        }
      ]

    }else{
      stock = [
        {
          numReglement:e.numReglement,
          montantReglement: parseInt(reste) + parseInt(e.montantReglement),
          etatReglement: '1',
          anneeReglement: e.anneeReglement
        }
      ]
      if((parseInt(this.state.argentAjouter) - parseInt(reste))>0){
        alert('donner '+(parseInt(this.state.argentAjouter) - parseInt(reste))+'Ar au clients')
      }
    }
    this.props.updateReglements(stock);
    this.setState({
      argentAjouter: ''
    })
  }

  OnChangeUpdateArgentRecu(reste, e){
    // if((parseInt(reste)-parseInt(e.target.value))>=0){
      this.setState({
        argentAjouter: e.target.value
      })
    // }
  }

  MontantReservationReglement(NumReglement){
    var montantReglement = 0;
    const stock = this.props.reserver.dataReserver.filter(e=>{
      return e.numReglement === NumReglement;
    });
    if(stock !== null && stock.length !== 0){
      const nameChambres = this.props.concerner.dataConcerner.filter(e=>{
        return e.numReservation === stock[0].numReservation
      });

      if(nameChambres !== null && nameChambres.length !== 0){
        var prix = this.props.chambres.dataChambres.filter(e=>{
          return e.nomChambre === nameChambres[0].nomChambre;
        });
        if(prix!==null && prix.length !== 0){
          const date2 = new Date(stock[0].dateFinReservation);
          const date1 = new Date(stock[0].dateDebutReservation);
          montantReglement = parseInt(prix[0].prixChambre) * (Math.round((date2 - date1) / (1000 * 3600 * 24)))
        }
        //
      }
    }
    return montantReglement;
  }
  reservationReglement(numReglement){
    const stock = this.props.reserver.dataReserver.filter(e=>{
      return e.numReglement === numReglement;
    });

    return stock;
  }
  componentDidMount() {
    if (this.props.reserver.dataReserver.length === 0) {
      axios.get(urlHeader+"Reservation/get").then(res => res.data).then(state => this.props.fetchReserver(state)).catch(err => console.log("error parsing:\n", err));
    }
    if (this.props.concerner.dataConcerner.length === 0) {
      axios.get(urlHeader+"Concerner/get").then(res => res.data).then(state => this.props.fetchConcerner(state)).catch(err => console.log("error parsing:\n", err));
    }
    if (this.props.chambres.dataChambres.length === 0) {
      axios.get(urlHeader+"Chambres/get").then(res => res.data).then(state => this.props.fetchchambres(state)).catch(err => console.log("error parsing:\n", err));
    }
  }
  render() {
    const reste = this.MontantReservationReglement(this.props.data.numReglement) - this.props.data.montantReglement
    return (
      <div style={{margin: 10, display: 'flex', justifyContent: 'space-between'}}>
        <div>
        Num: {this.props.data.numReglement}<br/>
        Montant Recu: {this.props.data.montantReglement}<br/>
        Montant Rest: {reste}<br/>
        Etat: {this.props.data.etatReglement}<br/>
        Annee: {this.props.data.anneeReglement}
        {
          this.reservationReglement(this.props.data.numReglement).map(e=>{
            return <div key={e.numReservation}>
              Reservation: {e.numReservation}<br/>
              Client: {e.numClient}
            </div>;
          })
        }
        </div>
        <div>
          {
            reste!==0?
            <div style={{marginRight: 20}} >
              <TextField type='number' onChange={this.OnChangeUpdateArgentRecu.bind(this, reste)} variant="outlined" value={this.state.argentAjouter} /><br/>
              <Button
                size='small'
                variant="contained"
                style={{marginTop:5, float: 'right'}}
                onClick={()=>this.UpdateArgentRecu(this.props.data, reste)}>
                ajouter
              </Button>
          </div>:
            <Link to={"/Facture/"+this.props.data.numReglement+'/'+this.MontantReservationReglement(this.props.data.numReglement)}>
              <Button
                size = 'small'
                variant = "contained"
                style = {
                  {
                    marginTop: 5,
                    float: 'right'
                  }
                }>
                facturer 
              </Button>
            </Link>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {reserver: state.reserver, chambres: state.chambres, concerner: state.concerner}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchchambres: (data) => {
      dispatch({type: "FETCH_CHAMBRES", data: data});
    },
    fetchReglements: (data) => {
      dispatch({type: "FETCH_REGLEMENTS", data: data});
    },
    fetchReserver: (data) => {
      dispatch({type: "FETCH_RESERVER", data: data});
    },
    fetchConcerner: (data) => {
      dispatch({type: "FETCH_CONCERNER", data: data});
    },
    updateReglements: (data) => {
      dispatch({type: "UPDATE_REGLEMENTS", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnexGReglements);
