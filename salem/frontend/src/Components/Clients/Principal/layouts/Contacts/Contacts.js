import React, {Component} from 'react';
import './statics/styles/Contacts.scss';
import localisation from './statics/images/localisation.png';
import mail from './statics/images/mail.png';
import phone from './statics/images/phone2.png';
import {ArrowLeft} from '@material-ui/icons';

class Mocks extends Component {
  render() {
    return (<div className='Mocks' id='contacts'>
      <div className='listContacts'>
        <div className='listContactsItems'>
          <img src={localisation} alt='localisation'/>
          <div>
            <ArrowLeft/>
            <span className='containtes'>
              <h1>Localisation</h1>
              <p>Talatamaty fianarantsoa</p>
            </span>
          </div>
        </div>
        <div className='listContactsItems'>
          <img src={mail} alt='mail'/>
          <div>
            <ArrowLeft/>
            <span className='containtes'>
              <h1>E-mail</h1>
              <p>salem-hotel@gmail.com</p>
            </span>
          </div>
        </div>
        <div className='listContactsItems'>
          <img src={phone} alt='phone'/>
          <div>
            <ArrowLeft/>
            <span className='containtes'>
              <h1>Contacts</h1>
              <p>0343949863</p>
            </span>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Mocks;
