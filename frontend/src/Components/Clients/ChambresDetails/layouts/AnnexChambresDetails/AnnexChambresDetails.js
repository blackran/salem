import './statics/styles/Chambres.scss';

import {PanoramaFishEyeOutlined} from '@material-ui/icons';
import axios from 'axios';
import React, {lazy, Component, Suspense} from 'react';
import {connect} from 'react-redux';
import {urlHeader} from '../../../../../Actions/config';

const ChambreCardPattern = lazy(() => import ('./layouts/ChambreCardPattern/ChambreCardPattern'));

class AnnexChambresDetails extends Component {
  _isMounted = false;

  // otherGetChambrePrix(){
  //   const stock = lazy(new Promise((resolve, reject) => {
  //       return resolve(this.getChambrePrix());
  //   }))
  //   return stock;
  // }
  getChambrePrix() {
    var reservation = this.props.reserver.dataReserver.filter((e) => {
      const d1 = new Date(e.dateDebutReservation);
      const d2 = new Date(e.dateFinReservation);
      const d3 = this.props.reserver.date1;
      const d4 = this.props.reserver.date2;
      const d5 = d1 - d3 //si d5>0 d3 < d1
      const d6 = d2 - d4 //si d6>0 d4 < d2
      const d7 = d3 - d2 //si d7>0 d2 < d3
      const d8 = d4 - d1 //si d8>0 d1 < d4

      // d3 < d1 && d2 < d4                 d5>0 && d6<0
      // d3 < d1 && d4 < d2  && d1 < d4     d5>0 && d6>0 && d8>0
      // d1 < d3 && d4 < d2                 d5<0 && d6>0
      // d1 < d3 && d2 < d4  && d3 < d2     d5<0 && d6<0 && d7<0

      var stock = false;
      if ((d5 > 0 && d6 < 0) || (d5 > 0 && d6 > 0 && d8 > 0) || (d5 < 0 && d6 > 0) || (d5 < 0 && d6 < 0 && d7 < 0)) {
        stock = true;
      }
      return (stock);
    })

    const newStock = reservation.map((h) => {
      return h.numReservation;
    })

    const concerner = this.props.concerner.dataConcerner.filter((e) => {
      return newStock.includes(e.numReservation);
    })

    const newConcerner = concerner.map((e) => {
      return e.nomChambre;
    })

    var chambres = this.props.chambres.newDataChambres.filter((e) => {
      return ((parseInt(e.prixChambre) <= parseInt(this.props.chambres.slide)) && (!newConcerner.includes(e.nomChambre)))
    })
    return chambres
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.chambres.newDataChambres.length === 0) {
      axios.get(urlHeader+"Chambres/get").then(res => res.data).then(state => {
        return this.props.newDataChambres(state.filter(e => e.numType === parseInt(this.props.types)))
      }).catch(err => console.log("error parsing:\n", err));
    }
    if (this.props.reserver.dataReserver.length === 0) {
      axios.get(urlHeader + "Reservation/get").then(res => res.data).then(state => this.props.fetchReserver(state)).catch(err => console.log("error parsing:\n", err));
    }
  }

  // devient active quand cette component est demonter
  componentWillUnmount() {
    this._isMounted = false;
    this.props.newDataChambres([])
  }

  render() {
    return (<div className="AllListChambre">
      <Suspense fallback={<div style = {{position: 'relative', top: 100}} > <PanoramaFishEyeOutlined className="loading"/></div>}>
      {/* {console.log(this.getChambrePrix())} */}
        {
          this.getChambrePrix().length !== 0
            ? (this.getChambrePrix().map((e, k) => {
              return <div key={e.nomChambre}>
                <ChambreCardPattern data={e} delay={k} key={e.nomChambre}/>
              </div>
            }))
            : (<h1 style={{
                position: 'relative',
                top: 100
              }}>Ces types de chambres n'existent pas chez nous</h1>)
        }
        </Suspense>
        </div>);
  }
}
const mapStateToProps = state => {
  return {chambres: state.chambres, reserver: state.reserver, concerner: state.concerner, clients: state.clients}
}

const mapDispatchToProps = dispatch => {
  return {
    updateOne: (data) => {
      dispatch({type: "UPDATE_ONE", data});
    },
    updateEroor: (data) => {
      dispatch({type: "UPDATE_EROOR", data: data});
    },
    fetchchambres: (data) => {
      dispatch({type: "FETCH_CHAMBRES", data: data});
    },
    updateSlide: (data) => {
      dispatch({type: "ON_CHANGE_SLIDER", data: data});
    },
    updateDate1: (data) => {
      dispatch({type: "UPDATE_DATE_1", data: data});
    },
    updateDate2: (data) => {
      dispatch({type: "UPDATE_DATE_2", data: data});
    },
    fetchClients: (data) => {
      dispatch({type: "FETCH_CLIENTS", data: data});
    },
    newDataChambres: (data) => {
      dispatch({type: "NEW_DATA_CHAMBRES", data: data});
    },
    fetchReserver: (data) => {
      dispatch({
        type: "FETCH_RESERVER",
        data: data
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnexChambresDetails);
