import React, {Component} from 'react';
import './statics/styles/Principal.scss';
import {connect} from 'react-redux';
import Chambres from './layouts/Chambres/Chambres';

//import of layouts
import HeaderPrincipal from './layouts/HeaderPrincipal/HeaderPrincipal';
// import ProduitsPrincipal from './layouts/ProduitsPrincipal/ProduitsPrincipal';
import FooterPrincipal from './layouts/FooterPrincipal/FooterPrincipal'
import Jumbontron from './Jumbontron';
import Contacts from './layouts/Contacts/Contacts';
import {Fab} from '@material-ui/core';
import {KeyboardArrowUp} from '@material-ui/icons';

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: false
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (window.scrollY < 10) {
        this.setState({fixed: false})
      } else {
        this.setState({fixed: true})
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  OnClick(){
    setTimeout(()=>{
      this.setState({fixed: false})

    },1000)
  }

  render() {
    return (
      <div className='Principal'>
        <HeaderPrincipal/>
        <div style={{margin: '0px 50px'}}>
          <Jumbontron/>
          {/* <ProduitsPrincipal/> */}
          <Chambres/>
          <Contacts/>
          <FooterPrincipal/>
        </div>
        {
          this.state.fixed?
          <div className="BtnUp">
            <a href='#accueil'><Fab onClick={this.OnClick.bind(this)} className='newAnimat'><KeyboardArrowUp/></Fab></a>
          </div>
          :null
        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {clients: state.clients}
}

const mapDispatchToProps = dispatch => {
  return {
    // updateOne: (data) => {
    //   dispatch({type: UPDATE_ONE, data});
    // },
    // fetchClients: (data) => {
    //   dispatch({type: FETCH_CLIENTS, data: data});
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principal);
