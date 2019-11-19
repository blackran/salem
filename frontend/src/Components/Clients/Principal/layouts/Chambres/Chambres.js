import React, {Component} from 'react';
import './statics/styles/Chambres.scss';
import ChambreCard from './layouts/ChambreCard/ChambreCard';
import {Paper} from '@material-ui/core';
import {connect} from 'react-redux';
import axios from 'axios';
import {urlHeader} from '../../../../../Actions/config';

class Chambres extends Component {
  componentDidMount() {
		if (this.props.types.dataTypes.length===0) {
			axios.get(urlHeader+"Types/get").then(res => res.data).then(state => this.props.fetchtypes(state)).catch(err => console.log("error parsing:\n", err));
		}
	}
  render() {
    return (<div className='Chambres' id='chambres'>
      <h1 className='textAligne'>LES CHAMBRES DISPONIBLES</h1>
      <div className='list'>
        {
          this.props.types.dataTypes.length!==0? this.props.types.dataTypes.map((e)=>{
            return (
              <Paper key={e.nomType}>
                <ChambreCard url={e.imagesType} nomCategorie={e.nomType} numCategorie={e.numType}/>
      				</Paper>
            )
          }): <p>desole, il n'y a pas de chambres disponibles</p>
        }
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
	return {types: state.types}
}

const mapDispatchToProps = dispatch => {
	return {
    updateOne: (data) => {
      dispatch({type: "UPDATE_ONE", data});
    },
		updateEroor: (data) => {
			dispatch({type: "UPDATE_EROOR", data: data});
		},
		fetchtypes: (data) => {
			dispatch({type: "FETCH_TYPES", data: data});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chambres);
