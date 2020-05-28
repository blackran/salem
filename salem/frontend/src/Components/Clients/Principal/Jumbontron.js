import React, {Component} from 'react';
import './statics/styles/Jumbontron.scss';
import {Paper} from '@material-ui/core'
import './statics/images/salem.jpg';

class Jumbontron extends Component {
  render() {
    return (
      <div className='Jumbontron'>
          <Paper>
            <span className='first'>
              <section className='borderBlue'>
                <h1 style={{fontFamily: 'eufm10'}}>Welcome</h1>
                <h1  style={{fontFamily: 'FZChaoCuHei-M10', fontWeight: 'normal', fontSize: 40}}>Salem Hotel</h1>
                <h1 style={{fontWeight: 'normal', fontSize: 18}}>Toujour Falifaly</h1>
              </section>
            </span>
          </Paper>
      </div>
    );
  }
}

export default Jumbontron;
