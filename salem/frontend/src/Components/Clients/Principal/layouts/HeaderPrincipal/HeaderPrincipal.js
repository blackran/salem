import React, {Component} from 'react';
import './statics/styles/HeaderPrincipal.scss';
import {Link} from 'react-router-dom';
import {Lock} from '@material-ui/icons';

class HeaderPrincipal extends Component {
  render() {
    return (
      <div className='HeaderPrincipal' id='accueil'>
        <h1>salem</h1>
        <ul className='navigation'>
          <a href='#accueil'><li>Accueil</li></a>
          <a href='#chambres'><li>Chambres</li></a>
          <a href='#contacts'><li>Contacts</li></a>
        </ul>
        <ul className='navigation2'>
          <Link to="/login"><li><Lock/><span style={{position:'relative', bottom: 3}}>Login</span></li></Link>
        </ul>
      </div>
    );
  }
}

export default HeaderPrincipal;
