import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/lab/Slider';
import { Slider } from '@material-ui/core';
import SimpleSnackbar from './SimpleSnackbar';


export default class DiscreteSlider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      marks : [
        {
          value: 0,
          label: '0°C',
        },
        {
          value: 20,
          label: '20°C',
        },
        {
          value: 37,
          label: '37°C',
        },
        {
          value: 100,
          label: '100°C',
        },
      ],
      value:''
    }
  }

  valuetext(value){
    return `${value}°C`;
  }

  // newvalue(e){
  //   var stock = e.target.children[2]
  //   console.log(stock.valu)
  //   this.setState({
  //     value: 30
  //   })
  // }

  valueLabelFormat(value) {
    return this.state.marks.findIndex(mark => mark.value === value) + 1;
  }

  render(){

    return (
      <div style={{width: 500, margin: 'auto', marginTop: 10}}>
        <SimpleSnackbar/>
        <div/>
        <Typography id="discrete-slider-restrict" gutterBottom>
          Choisir la Temperature
        </Typography>
        <Slider
          defaultValue={20}
          valueLabelFormat={this.valueLabelFormat.bind(this)}
          getAriaValueText={this.valuetext.bind(this)}
          getSliderValue={(key) => console.log(key)}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          valueLabelDisplay="auto"
          marks={this.state.marks}
          // onChange={this.newvalue.bind(this)}
          // value={this.state.value}
        />
      </div>
    );
  }
}








