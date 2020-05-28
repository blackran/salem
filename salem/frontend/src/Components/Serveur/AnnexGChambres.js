import React, {Component} from 'react';
import './styles/GChambres.scss';
import {Fab, Paper} from '@material-ui/core';
import {Create, Check, Delete} from '@material-ui/icons';
import error from './images/404.jpg';
import {connect} from 'react-redux';

class AnnexGChambres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomChambre: '',
      telChambre: '',
      etageChambre: '',
      chauffeauChambre: '',
      prixChambre: '',
      numCategorie: '',
      numType: '',
      imageChambre: '',
      error: false,
      hide: false,
      edit: false
    }
  }
  componentDidMount() {
    this.setState({
      nomChambre: this.props.data.nomChambre,
      telChambre: this.props.data.telChambre,
      etageChambre: this.props.data.etageChambre,
      chauffeauChambre: this.props.data.chauffeauChambre,
      prixChambre: this.props.data.prixChambre,
      numCategorie: this.props.data.numCategorie,
      numType: this.props.data.numType,
      imageChambre: this.props.data.imageChambre
    })
  }
  OnClickDeleteChambre(id, e) {
    e.preventDefault();
    // eslint-disable-next-line
    if (confirm('Voulez-vous suprimer ?')) {
      this.props.deleteChambres(id);
    }
  }
  OnChangeLoginInputImage = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      // const formData = {file: e.target.result
      this.setState({imageChambre: e.target.result})
    }
  }
  update(e) {
    var data = {
      nomChambre: this.state.nomChambre,
      telChambre: this.state.telChambre,
      etageChambre: this.state.etageChambre,
      chauffeauChambre: this.state.chauffeauChambre,
      prixChambre: this.state.prixChambre,
      numCategorie: this.state.numCategorie,
      numType: this.state.numType,
      imageChambre: this.state.imageChambre
    }
    this.props.upadateChambres(data);
    this.setState({
      edit: !this.state.edit
    })
  }
  onChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (<Paper style={{
        padding: '3px 3px 10px 3px',
        margin: '5px',
        width: 206
      }}>
      <div className='cardChambre animat'>

        {
          !this.state.edit
            ? <div>
                <div style={{width: 200, height: 133, overflow: 'hidden'}}>
                <img src={this.state.imageChambre !== ''
                    ? this.state.imageChambre
                    : error} alt={'url'} width='200'/>
                </div>
                <div style={{
                    marginLeft: 10
                  }}>
                  <h1 style={{
                      textAlign: 'center',
                      marginLeft: -10
                    }}>{this.state.nomChambre}</h1>
                  Prix:<span>{this.state.prixChambre}Ar</span>{" "}
                  Tel:<span>{this.props.data.telChambre}</span>{" "}
                  Etage:<span>{this.props.data.etageChambre}</span>{" "}
                  Chauffeau:<span>{this.props.data.chauffeauChambre}</span>{" "}
                  Categorie:<span>{this.props.data.numCategorie}</span>{" "}
                  Type:<span>{this.props.data.numType}</span><br/>
                  <div style={{
                      marginTop: 5
                    }}>
                    {
                      this.state.edit
                        ? <Fab size='small' onClick={() => this.setState({
                              edit: !this.state.edit
                            })}><Check/></Fab>
                        : <Fab size='small' onClick={() => this.setState({
                              edit: !this.state.edit
                            })}><Create/></Fab>

                    }{" "}
                    <Fab size='small' color="secondary" onClick={this.OnClickDeleteChambre.bind(this, this.state.nomChambre)} style={{
                        marginLeft: 10
                      }}><Delete/></Fab>
                  </div>
                </div>
              </div>
            : <div>
              <div style={{width: 200, height: 109, overflow: 'hidden'}}>
              <img src={this.state.imageChambre !== ''
                  ? this.state.imageChambre
                  : error} alt={'url'} width='200'/>
              </div>
                <input type="file" onChange={this.OnChangeLoginInputImage.bind(this)} name="imageChambre" style={{width: 87}}/><br/>
                <div style={{
                    marginLeft: 10
                  }}>
                  <input value={this.state.nomChambre} style={{
                      textAlign: 'center',
                      marginLeft: -10,
                      fontWeight: 'bold',
                      fontSize: 18
                    }} onChange={this.onChangeInput.bind(this)} name="nomChambre"/>
                  Prix:<span><input value={this.state.prixChambre} style={{ width: 50 }} onChange={this.onChangeInput.bind(this)} name="prixChambre"/></span>{" "}

                  Tel:<span><input value={this.state.telChambre} style={{ width: 70 }} onChange={this.onChangeInput.bind(this)} name="telChambre" /></span>{" "}

                  Etage:<span><input value={this.state.etageChambre} style={{ width: 15 }} onChange={this.onChangeInput.bind(this)} name="etageChambre"/></span>{" "}<br/>

                  Chauffeau:<span><input value={this.state.chauffeauChambre} style={{
                  width: 93
                }} onChange={this.onChangeInput.bind(this)} name="chauffeauChambre"/></span>{" "}
                  Categorie:<span><input value={this.state.numCategorie} style={{
                  width: 15
                }} onChange={this.onChangeInput.bind(this)} name="etegorieChambre"/></span>{" "}
                  Type:<span><input value={this.props.data.numType} style={{
                  width: 15
                }} onChange={this.onChangeInput.bind(this)} name="typeChambre"/></span><br/>
                  <div style={{
                      marginTop: 5
                    }}>
                    {
                      this.state.edit
                        ? <span><Fab size='small' onClick={this.update.bind(this)}><Check/></Fab>{" "}
                        <Fab size='small' color="secondary"
                          onClick={() => this.setState({
                              edit: !this.state.edit
                            })}
                          style={{
                            marginLeft: 10
                          }}>X</Fab></span>
                        : <span><Fab size='small' onClick={() => this.setState({
                              edit: !this.state.edit
                            })}><Create/></Fab>{" "}
                            <Fab size='small' color="secondary" onClick={this.OnClickDeleteChambre.bind(this, this.state.nomChambre)} style={{
                                marginLeft: 10
                              }}><Delete/></Fab></span>

                    }
                  </div>
                </div>
              </div>
        }
      </div>
    </Paper>);
  }
}
const mapStateToProps = state => {
  return {responsables: state.responsables}
}

const mapDispatchToProps = dispatch => {
  return {
    deleteChambres: (id) => {
      dispatch({type: "DELETE_CHAMBRES", id});
    },
    upadateChambres: (data) => {
      dispatch({type: "UPDATE_CHAMBRES", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnexGChambres);
