import React, { Component } from 'react';
import Pdf from "react-to-pdf";
import './styles/Facture.scss';
import {
    Button
} from '@material-ui/core';
import {
    PictureAsPdf,
    KeyboardArrowLeft
} from '@material-ui/icons';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router-dom';

class Facture extends Component {
    render() {
       const ref = React.createRef();
        return ( 
            <div className="Facture">
                <div>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <Link to='/GReglements'>
                            <Button type = "submit"
                                variant = "outlined"
                                size = "small"
                            >
                            <KeyboardArrowLeft/> {"  "}Retour
                            </Button>
                        </Link>
                        <Pdf targetRef = { ref } filename = "facture.pdf" > 
                            {
                                ({ toPdf }) => <button style={{padding: '0 5px', borderRadius: 2}} onClick = {  toPdf } ><PictureAsPdf/> <span style={{position:'relative', top: -5}}>Generate Pdf</span> </button>
                            } 
                        </Pdf>
                    </div> 
                    <div ref={ref} className='pdf'>
                        <div>
                            <div className="header">
                                <h1>SALEM HOTEL</h1> <span>date: {new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}</span><span></span>
                            </div>
                            <div className='body'>   
                                <h2> Facture pour vous </h2> <br/>
                                Numero de facture: {
                                    this.props.match.params.id
                                    } <br/>
                                Montant deja payer: {
                                        this.props.match.params.client
                                    } Ar<br/>
                            </div>
                        </div>
                        <div>
                            <span style={{fontFamily: 'purisa',fontSize:18, marginLeft: 10, opacity: 0.6}}> merci  de votre visite</span>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        reserver: state.reserver,
        chambres: state.chambres,
        concerner: state.concerner
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Facture);
