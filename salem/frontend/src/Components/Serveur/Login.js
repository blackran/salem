import React, {Component} from 'react';
import {TextField, Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './styles/Login.scss';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import axios from 'axios';
import {urlHeader} from '../../Actions/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: "",
      password: "",
      showPassword: false
    }
  }
  OnSubmitLogin = (e) => {
    e.preventDefault();
    console.log(this.props.states.dataResponsables)
    const stock = this.props.states.dataResponsables.filter(h => {
      return h.pseudoResponsable === e.target.pseudo.value && h.passwordResponsable === e.target.password.value;
    });
    console.log(stock)
    if (!stock.length > 0) {
      this.props.updateEroor(true);
    }
    const bool = e.target.pseudo.value && e.target.password.value && stock.length > 0;
    if (bool) {
      this.props.userConnecter(stock[0]);
      this.props.history.push('/GChambres');
    }
  }
  OnChangeLoginInputPseudo = (e) => {
    this.setState({pseudo: e.target.value});
  }

  OnChangeLoginInputPassword = (e) => {
    this.setState({password: e.target.value});
  }

  handleClickShowPassword = (e) => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  componentDidMount() {
    axios.get(urlHeader+"Responsables/get").then(res => res.data).then(state => this.props.fetchResponsables(state)).catch(err => console.log("error parsing:\n", err));
  }

  render() {
    const styles = {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#d4d2ed',
      height: '100vh'
    }

    return (<div style={styles}>
      <div className='slideLogin'>
      <Paper style={{
          padding: 10,
          marginTop: 30,
          height: 300
        }}>
        <p style={{opacity: 0.7, fontFamily: 'sans serif', marginLeft: 10, fontSize: 20}}>ADMIN</p>
        <form noValidate="noValidate" autoComplete="off" onSubmit={this.OnSubmitLogin.bind(this)}>
          <TextField error={this.props.states.error} label="PSEUDO" placeholder="Example" margin="normal" style={{width: '100%'}} variant="outlined" value={this.state.pseudo} onChange={this.OnChangeLoginInputPseudo.bind(this)} name="pseudo"/>
          <br/>

          <TextField  name="password" id="outlined-adornment-password" error={this.props.states.error}  margin="normal" variant="outlined" type={this.state.showPassword
              ? 'text'
              : 'password'} label="Password" value={this.state.password} onChange={this.OnChangeLoginInputPassword.bind(this)} InputProps={{
              endAdornment: (<InputAdornment position="end">
                <IconButton edge="end" aria-label="toggle password visibility" onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                  {
                    this.state.showPassword
                      ? <VisibilityOff/>
                      : <Visibility/>
                  }
                </IconButton>
              </InputAdornment>)
            }}/>
          <br/>
          <br/>

          <Button type="submit" variant="contained" color='primary' size="medium">
            Connecter
          </Button>{" "}
          <Link to='/'>
            <Button type="submit" variant="contained" size="medium">
              Cancel
            </Button>
          </Link>
        </form>
      </Paper>
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return {states: state.responsables}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResponsables: data => {
      dispatch({type: "FETCH_RESPONSABLES", data})
    },
    updateEroor: (data) => {
      dispatch({type: "UPDATE_EROOR", data: data});
    },
    userConnecter: (data) => {
      dispatch({type: "USER_CONNECTER", data: data});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
