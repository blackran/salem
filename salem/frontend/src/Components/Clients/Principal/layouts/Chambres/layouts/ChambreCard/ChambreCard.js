import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import error from './images/404.jpg';
import './statics/styles/ChambreCard.scss';

class ChambreCard extends Component {
  render() {
    const {url, numCategorie, nomCategorie} = this.props;
    return (<div className='card'>
      <img src={url!==undefined?("data:image/jpeg;base64,"+url):error} alt={url}/><br/>
      <h2>{nomCategorie}</h2>
      <Link to={'/Chambre/'+numCategorie+'/'+nomCategorie}>
        <Button type="submit" variant="outlined" size="small" color="primary">
          VOIR LES LISTES
        </Button>
      </Link>
    </div>);
  }
}

export default ChambreCard;
