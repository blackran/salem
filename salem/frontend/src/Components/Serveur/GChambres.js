import './styles/GChambres.scss';
import AdminNavigation from './AdminNavigation';
import AnnexGChambres from './AnnexGChambres';
import error from './images/404.jpg';
import {
  Button,
  Fab,
  FormControl,
  Input,
  InputAdornment,
  InputLabel
} from '@material-ui/core';
import {
  AccountCircle,
  Add,
  Ballot,
  Clear,
  Dashboard,
  HotTub,
  LocationCity,
  Money,
  Phone
} from '@material-ui/icons';
import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {urlHeader} from '../../Actions/config';


class GChambres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NomChambre: '',
      TelChambre: '',
      EtageChambre: '',
      ChauffeauChambre: '',
      PrixChambre: '',
      NumCategorie: '',
      NumType: '',
      ImageChambre: '',
      error: false,
      hide: false,
      edit: false
    }
  }
  componentDidMount() {
    if (this.props.chambres.dataChambres.length === 0) {
      axios.get(urlHeader+"Chambres/get").then(res => res.data).then(state => this.props.fetchchambres(state, this.props.match.params.types)).catch(err => console.log("error parsing:\n", err));
    }
  }
  OnChangeLoginInputPseudo = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  OnChangeLoginInputImage = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      // const formData = {file: e.target.result
      this.setState({ImageChambre: e.target.result})
    }
  }
  OnClickAjouter = (e) => {
    e.preventDefault();
    const std = [this.state]
    this.props.addChambres(std);
    this.setState({
      hide: !this.state.hide
    })
  }
  OnClickModifier = (nom, e) => {
    e.preventDefault();
    const std = [this.state]

    axios.post(urlHeader+"Chambres/put/" + nom, std).then(h => console.log(h)).catch(err => console.log("error parsing:\n", err));
  }
  OnClickHide = () => {
    this.setState({
      hide: !this.state.hide
    })
  }

  render() {
    return (<div className='GChambres'>
      <AdminNavigation history={this.props.history}/>
      <div style={{
          position: 'fixed',
          margin: '70vh 0 0 90%',
          zIndex: 20
        }}>
        {
          this.state.hide
            ? null
            : <Fab color='primary' onClick={this.OnClickHide.bind(this)} size="medium" style={{
                  float: 'right'
                }}><Add/></Fab>
        }
      </div>
      <div style={{
          margin: 10
        }}>
        {
          this.state.hide
            ? <div style={{
                  width: '100%',
                  position: 'fixed',
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: 100
                }}>
                <div style={{
                    float: 'left',
                    padding: 10,
                    zIndex: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    marginLeft: '30%',
                    width: 400,
                    margin: 'auto',
                    boxShadow: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
                    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0',
                    display: 'flex'
                  }} className='animat'>

                  <img src={this.state.imageChambre === ""
                      ? error
                      : this.state.imageChambre} alt="images import" width="140" height="140" style={{
                      margin: '50px 10px 0 0'
                    }}/>

                  <div>
                    <Clear onClick={this.OnClickHide.bind(this)} style={{
                        float: 'right'
                      }}/>
                    <form>
                      <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Nom chambre</InputLabel>
                        <Input error={this.state.error} id="input-with-icon-adornment" style={{
                            width: '100%'
                          }} onChange={this.OnChangeLoginInputPseudo.bind(this)} value={this.state.NomChambre} name="NomChambre" startAdornment={<InputAdornment position = "start" > <AccountCircle/>
                        </InputAdornment>}/>
                      </FormControl><br/>
                      <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Numero Telephone</InputLabel>
                        <Input error={this.state.error} id="input-with-icon-adornment" name="TelChambre" onChange={this.OnChangeLoginInputPseudo.bind(this)} value={this.state.TelChambre} startAdornment={<InputAdornment position = "start" > <Phone/>
                        </InputAdornment>}/>
                      </FormControl><br/>
                      <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Etage du chambre</InputLabel>
                        <Input error={this.state.error} id="input-with-icon-adornment" value={this.state.EtageChambre} onChange={this.OnChangeLoginInputPseudo.bind(this)} name="EtageChambre" startAdornment={<InputAdornment position = "start" > <LocationCity/>
                        </InputAdornment>}/>
                      </FormControl><br/>
                      <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Type de chauffeau</InputLabel>
                        <Input error={this.state.error} id="input-with-icon-adornment" value={this.state.ChauffeauChambre} onChange={this.OnChangeLoginInputPseudo.bind(this)} name="ChauffeauChambre" startAdornment={<InputAdornment position = "start" > <HotTub/>
                        </InputAdornment>}/>
                      </FormControl><br/>
                      <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Prix d'une chambre</InputLabel>
                        <Input error={this.state.error} id="input-with-icon-adornment" value={this.state.PrixChambre} onChange={this.OnChangeLoginInputPseudo.bind(this)} name="PrixChambre" startAdornment={<InputAdornment position = "start" > <Money/>
                        </InputAdornment>}/>
                      </FormControl><br/>

                      <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Categorie</InputLabel>
                        <Input error={this.state.error} id="input-with-icon-adornment" value={this.state.NumCategorie} onChange={this.OnChangeLoginInputPseudo.bind(this)} name="NumCategorie" startAdornment={<InputAdornment position = "start" > <Ballot/>
                        </InputAdornment>}/>
                      </FormControl><br/>
                      <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Type</InputLabel>
                        <Input error={this.state.error} id="input-with-icon-adornment" variant="outlined" value={this.state.NumType} onChange={this.OnChangeLoginInputPseudo.bind(this)} name="NumType" startAdornment={<InputAdornment position = "start" > <Dashboard/>
                        </InputAdornment>}/>
                      </FormControl>
                      <br/>
                      <br/>
                      <input type="file" onChange={this.OnChangeLoginInputImage.bind(this)} name="ImageChambre"/>
                      <br/>
                      <br/>
                      <Button type="submit" variant="contained" color="primary" size="small" onClick={this.OnClickAjouter.bind(this)}>
                        Ajouter
                      </Button>{" "}
                      <Button type="submit" variant="contained" size="small" onClick={this.OnClickModifier.bind(this, this.state.NomChambre)}>
                        Modifier
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            : null

        }
        <div className="listDeChambres">
          {
            this.props.chambres.dataChambres.map(e => {
              return <AnnexGChambres data={e} key={e.nomChambre}/>
            })
          }
        </div>
      </div>
    </div>);
  }
}
const mapStateToProps = state => {
  return {chambres: state.chambres}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchchambres: (data, types) => {
      dispatch({type: "FETCH_CHAMBRES", data: data, types: types});
    },
    addChambres: (data) => {
      dispatch({type: "ADD_CHAMBRES", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GChambres);
