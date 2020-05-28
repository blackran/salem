import React, {Component} from 'react';
import AdminNavigation from './AdminNavigation';
import {Radio} from '@material-ui/core';
import {connect} from 'react-redux';
import axios from 'axios';
import AnnexGReglements from './AnnexGReglements';
import {urlHeader} from '../../Actions/config';

class GReglements extends Component {
  constructor(props){
    super(props);
    this.state = {
      All: false,
      NonRegler: true,
      Regler: false
    }
  }
  OnClickRadio1(e){
    this.setState({
      All:!this.state.All,
      NonRegler: false,
      Regler: false
    })
  }
  OnClickRadio2(e){
    this.setState({
      NonRegler:!this.state.NonRegler,
      All: false,
      Regler: false
    })
  }
  OnClickRadio3(e){
    this.setState({
      Regler:!this.state.Regler,
      All: false,
      NonRegler: false
    })
  }

  DataFillterByRadio(){
    const data = this.props.reglements.dataReglements;
    var stock = [];
    if(this.state.NonRegler){
      stock = data.filter(e=>{
        return e.etatReglement === '0';
      })
    }else if(this.state.Regler){
      stock = data.filter(e=>{
        return e.etatReglement !== '0';
      })
    }else{
      stock = data;
    }
    return stock;
  }

  componentDidMount() {
    if (this.props.reglements.dataReglements.length === 0) {
      axios.get(urlHeader+"Reglements/get").then(res => res.data).then(state => this.props.fetchReglements(state)).catch(err => console.log("error parsing:\n", err));
    }
  }
  render() {
    return (
      <div>
        <AdminNavigation  history={this.props.history}/>
        <div style={{margin: 10}}>
          <div>
            <Radio color="primary" onClick={this.OnClickRadio1.bind(this)} checked={this.state.All} name='reglements'/>All{" "}
            <Radio color="primary" onClick={this.OnClickRadio2.bind(this)} checked={this.state.NonRegler} name='reglements'/>Non Regler{" "}
            <Radio color="primary" onClick={this.OnClickRadio3.bind(this)} checked={this.state.Regler} name='reglements'/>Regler
          </div>
          <div style={{textAlign: 'center'}}>nombres total: { this.DataFillterByRadio().length }</div>
          <hr/>
          {
            this.DataFillterByRadio().map(e=>{
              return <div  key={e.numReglement}><AnnexGReglements data={e}/><hr/></div>
            })
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {reglements: state.reglements}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReglements: (data) => {
      dispatch({type: "FETCH_REGLEMENTS", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GReglements);
