// eslint-disable-next-line no-unused-vars
import React from 'react';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import Error404 from './Components/Error/Error404';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Principal from './Components/Clients/Principal/Principal';
import DiscreteSlider from './Components/Clients/ChambresDetails/DiscreteSlider1';

import Login from './Components/Serveur/Login';
import ChambresDetails from './Components/Clients/ChambresDetails/ChambresDetails';

import GChambres from './Components/Serveur/GChambres';
import GReservation from './Components/Serveur/GReservation';
import GClients from './Components/Serveur/GClients';
import GResponsables from './Components/Serveur/GResponsables';
import GReglements from './Components/Serveur/GReglements';
import Facture from './Components/Serveur/Facture';

import Parent from './Components/Parent';

const theme = createMuiTheme({
  palette:{
    primary: lightBlue
  }
});

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Principal}/>
            <Route exact path="/parent" component={Parent}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/GChambres" component={GChambres}/>
            <Route exact path="/GReservation" component={GReservation}/>
            <Route exact path="/GClients" component={GClients}/>
            <Route exact path="/GResponsables" component={GResponsables}/>
            <Route exact path="/DiscreteSlider" component={DiscreteSlider}/>
            <Route path="/Chambre/:types/:nom" component={ChambresDetails}/>
            <Route exact path="/GReglements" component={GReglements}/>
            <Route exact path="/Facture/:id/:client" component={Facture}/>
            <Route component={Error404}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
