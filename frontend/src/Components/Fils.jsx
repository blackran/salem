import React, { Component } from 'react'

export default class Fils extends Component {
    render() {
        return (
            <div>
                <input type="button" onClick={this.props.fonct} value={this.props.name}/>
            </div>
        )
    }
}
