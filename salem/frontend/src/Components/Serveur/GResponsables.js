import React, {Component} from 'react';
import AdminNavigation from './AdminNavigation';
import AnnexGResponsables from './AnnexGResponsables';
import './styles/GResponsables.scss';
import {connect} from 'react-redux';
import axios from 'axios';
import error from './images/404.jpg';
import {Paper, Button} from '@material-ui/core';
import {urlHeader} from '../../Actions/config';

class GResponsables extends Component {
  constructor(props){
    super(props);
    this.state = {
      numero: '',
      nom: '',
      prenom: '',
      pseudo: '',
      password: '',
      telephone: '',
      address: '',
      droit: 'SUPER',
      images: ''
    }
  }
  componentDidMount() {
    axios.get(urlHeader+"Responsables/get").then(res => res.data).then(state => this.props.fetchResponsables(state)).catch(err => console.log("error parsing:\n", err));
  }

  OnChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

  OnchangeFiles(e){
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({images: e.target.result})
    }
  }

  OnClickAjouter(e){
    e.preventDefault();
    const stock = [{
      NumResponsable: this.state.numero,
      NomResponsable: this.state.nom,
      PseudoResponsable: this.state.pseudo,
      PasswordResponsable: this.state.password,
      PrenomResponsable: this.state.prenom,
      AddressResponsable: this.state.address,
      TelResponsable: this.state.telephone,
      DroitResponsable: this.state.droit,
      ImageUrlResponsable: this.state.images,
    }]
    this.props.addResponsables(stock);
    this.setState({
      numero: '',
      nom: '',
      prenom: '',
      pseudo: '',
      password: '',
      telephone: '',
      address: '',
      droit: '',
      images: ''
    })
  }

  render() {
    return (
      <div>
        <AdminNavigation  history={this.props.history}/>
        <div className='GResponsables'>
          {
            this.props.responsables.dataResponsables.length!==0?
            this.props.responsables.dataResponsables.map(e => {
              return <AnnexGResponsables data={e} key={e.NumResponsable}/>
            }):<h1>error de serveur</h1>
          }
          <Paper style={{width: 400, height: 260, padding: 5,margin: 3}}>
            <div className='AnnexGResponsables'>
              <div>
                <img src={this.state.images!==''?this.state.images:error} alt='hotel'/><br/>
                <input type='file' name='images' style={{width: 88, border: 'none'}} onChange={this.OnchangeFiles.bind(this)}/>
              </div>
              <div className='containtes'>
                  <div>
                    {/* <label>Numero:</label> <input value={this.state.numero} type='text' name='numero' onChange={this.OnChange.bind(this)}  disabled/><br/><br/> */}
                    <label>Nom:</label> <input type='text' value={this.state.nom} name='nom' onChange={this.OnChange.bind(this)}/><br/><br/>
                    <label>Prenom:</label> <input type='text' value={this.state.prenom} name='prenom' onChange={this.OnChange.bind(this)}/><br/><br/>
                    <label>Pseudo:</label> <input type='text' value={this.state.pseudo} name='pseudo' onChange={this.OnChange.bind(this)}/><br/><br/>
                    <label>Password:</label> <input type='text' value={this.state.password} name='password' onChange={this.OnChange.bind(this)}/><br/><br/>
                    <label>Telephone:</label> <input type='text' value={this.state.telephone} name='telephone' onChange={this.OnChange.bind(this)}/><br/><br/>
                    <label>Address:</label> <input type='text' value={this.state.address} name='address' onChange={this.OnChange.bind(this)}/><br/><br/>
                    <label>Droit d'utilisateur:</label>
                    <select name="droit" id="pays" value={this.state.droit} onChange={this.OnChange.bind(this)}>
                      <option value="SUPER">SUPER</option>
                      <option value="USER">USER</option>
                    </select><br/>

                    <Button type="submit" variant="contained" color='primary' size="small" onClick={this.OnClickAjouter.bind(this)} style={{position: 'relative', top: 7}}>
                      Ajouter
                    </Button>
                  </div>

              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {responsables: state.responsables}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResponsables: data => {
      dispatch({type: "FETCH_RESPONSABLES", data})
    },
    addResponsables: (data) => {
      dispatch({type: "ADD_RESPONSABLES", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GResponsables);
