import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Error404.scss';

class Error404 extends Component {
	render() {
		return (
			<div>
				<Paper className="container">
					<Paper className="paper">
						<p className="title">404 error</p>
						<p className="body">Sorry, page not found ...</p>
					</Paper>
					<Paper className="paper">
						<p><Link to="/">home pages</Link></p>
					</Paper>
				</Paper>
			</div>
		);
	}
}

export default Error404;
