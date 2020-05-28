import React, {Component} from 'react';
import './styles/GResponsables.scss';
import {Paper, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import error from './images/404.jpg';

class AnnexGResponsables extends Component {
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
      droit: '',
      images: '',
      edit: false
    }
  }
  OnClickEdit(){
    this.setState({
      edit: !this.state.edit
    })
  }
  OnChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }
  OnClickAnnuller(){
    this.setState({
      edit: false
    })
  }
  OnClickSuprimer(h){
    console.log(this.props.responsables.dataResponsables)
    if(this.props.responsables.dataResponsables.length!==1){
      this.props.deleteResponsables(h);
    }
  }
  OnClickEnregistrer(e){
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
    this.props.upadateResponsables(stock);
    this.setState({
      edit: !this.state.edit
    })
  }
  componentDidMount(){
    this.setState({
      numero: this.props.data.NumResponsable,
      nom: this.props.data.NomResponsable,
      prenom: this.props.data.PrenomResponsable,
      pseudo: this.props.data.PseudoResponsable,
      address: this.props.data.AddressResponsable,
      password: this.props.data.PasswordResponsable,
      telephone: this.props.data.TelResponsable,
      droit: this.props.data.DroitResponsable,
      images: this.props.data.ImageUrlResponsable
    })
  }
  OnchangeFiles(e){
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({images: e.target.result})
    }
  }
  render() {
    return (
      <Paper style={{width: 400, height: 260, padding: 5,margin: 3}}>
        <div className='AnnexGResponsables'>
          <div>
            <img src={this.state.images!==''?this.state.images:error} alt='hotel'/><br/>
            {this.state.edit?<input type='file' name='images' style={{width: 88, border: 'none'}} onChange={this.OnchangeFiles.bind(this)}/>:null}
          </div>
          <div className='containtes'>
            {
              this.state.edit?
              <div>
                {/* <label>Numero:</label> <input value={this.state.numero} type='text' name='numero' onChange={this.OnChange.bind(this)}  disabled/><br/><br/> */}
                <label>Nom:</label> <input type='text' value={this.state.nom} name='nom' onChange={this.OnChange.bind(this)}/><br/><br/>
                <label>Prenom:</label> <input type='text' value={this.state.prenom} name='prenom' onChange={this.OnChange.bind(this)}/><br/><br/>
                <label>Pseudo:</label> <input type='text' value={this.state.pseudo} name='pseudo' onChange={this.OnChange.bind(this)}/><br/><br/>
                <label>Password:</label> <input type='text' value={this.state.password} name='password' onChange={this.OnChange.bind(this)}/><br/><br/>
                <label>Telephone:</label> <input type='text' value={this.state.telephone} name='telephone' onChange={this.OnChange.bind(this)}/><br/><br/>
                <label>Address:</label> <input type='text' value={this.state.address} name='address' onChange={this.OnChange.bind(this)}/><br/><br/>
                <label>Droit d'utilisateur:</label> <input type='text' value={this.state.droit} style={{width:60}} name='droit' onChange={this.OnChange.bind(this)}/><br/><br/>

                <Button type="submit" variant="contained" color='primary' size="small" onClick={this.OnClickEnregistrer.bind(this)}>
                  Enregistrer
                </Button>{" "}
                <Button type="submit" variant="outlined" color='secondary' size="small" onClick={this.OnClickAnnuller.bind(this)}>
                  Annuller
                </Button>
              </div>:
              <div>
                {/* <label>Numero:</label> <input value={this.state.numero} type='text' name='numero' onChange={this.OnChange.bind(this)} disabled/><br/><br/> */}
                <label>Nom:</label> <input type='text' value={this.state.nom} name='nom' onChange={this.OnChange.bind(this)} disabled/><br/><br/>
                <label>Prenom:</label> <input type='text' value={this.state.prenom} name='prenom' onChange={this.OnChange.bind(this)} disabled/><br/><br/>
                <label>Pseudo:</label> <input type='text' value={this.state.pseudo} name='pseudo' onChange={this.OnChange.bind(this)} disabled/><br/><br/>
                <label>Password:</label> <input type='text' value={this.state.password} name='password' onChange={this.OnChange.bind(this)} disabled/><br/><br/>
                <label>Telephone:</label> <input type='text' value={this.state.telephone} name='telephone' onChange={this.OnChange.bind(this)} disabled/><br/><br/>
                <label>Address:</label> <input type='text' value={this.state.address} name='address' onChange={this.OnChange.bind(this)} disabled/><br/><br/>
                <label>Droit d'utilisateur:</label> <input type='text' value={this.state.droit} style={{width:60}} name='droit' onChange={this.OnChange.bind(this)} disabled/><br/><br/>

                <Button type="submit" variant="contained" color='primary' size="small" onClick={this.OnClickEdit.bind(this)}>
                  Editer
                </Button>{" "}
                <Button type="submit" variant="outlined" color='secondary' size="small" disabled={this.props.responsables.dataResponsables.length===1} onClick={()=>this.OnClickSuprimer(this.state.numero)}>
                  Suprimer
                </Button>
              </div>
            }

          </div>
        </div>
      </Paper>
    );
  }
}
const mapStateToProps = state => {
  return {responsables: state.responsables}
}

const mapDispatchToProps = dispatch => {
  return {
    deleteResponsables: (id) => {
      dispatch({type: "DELETE_RESPONSABLES", id});
    },
    upadateResponsables: (data) => {
      dispatch({type: "UPDATE_RESPONSABLES", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnexGResponsables);
