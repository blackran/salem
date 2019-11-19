import React, { Component } from 'react'
import Fils from './Fils';

export default class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'un',
            styles: {color: "red"}
        }
    }
    fonction(){
        console.log("hello ca fonction")
    }
    clickMe(e){
        this.setState({
            id: e.target.id
        });
    }
    render() {
        return (
            <div>
                <ul>
                    <li onClick={this.clickMe.bind(this)} id="un" style={this.state.id==="un"?this.state.styles:null}>un</li>
                    <li onClick={this.clickMe.bind(this)} id="deux" style={this.state.id==="deux"?this.state.styles:null}>deux</li>
                    <li onClick={this.clickMe.bind(this)} id="trois" style={this.state.id==="trois"?this.state.styles:null}>trois</li>
                </ul>
                <Fils fonct={this.fonction} name="nantenaina"/>
            </div>
        )
    }
}
