import React, {Component} from 'react';
import './statics/styles/Footer.scss';
import {Copyright, Favorite} from '@material-ui/icons';
import {connect} from 'react-redux';

class FooterPrincipal extends Component {
  OnClickAime = () => {
    this.props.addAime();
  }
  render() {
    return (<footer>
      <div>
        Click mon coeur si vous aime la page{" "}
        <Favorite
          onClick={this.OnClickAime.bind(this)}
          style={{
            color: '#4e4482',
            position: 'relative',
            top: 3
          }}/>{" "}
        <span style={{color: '#4e4482'}}>{this.props.states.AIME}</span>
				<div className='line'></div>
        <p><Copyright style={{
        fontSize: 13
      }}/>
          {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>);
  }
}
const mapStateToProps = state => {
	return {states: state.Footer}
}

const mapDispatchToProps = dispatch => {
	return {
		addAime: () => {
			dispatch({type: "ADD_AIME"});
		},
		opacity2: (data) => {
			dispatch({type: "UPDATE_OPACITY2", data: data});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterPrincipal);
