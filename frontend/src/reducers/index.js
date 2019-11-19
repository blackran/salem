import {combineReducers} from 'redux';
import ClientsReducers from './ClientsReducers';
import ChambresReducers from './ChambresReducers';
import TypesReducers from './TypesReducers';
import OtherReducers from './OtherReducers';
import TableClientsReducers from './TableClientsReducers';
import FooterReducers from './FooterReducers';
import ReserverReducers from './ReserverReducers';
import ConcernerReducers from './ConcernerReducers';
import ResponsablesReducers from './ResponsablesReducers';
import ReglementReducers from './ReglementReducers';
import TableReservationsReducers from './TableReservationsReducers';
import ProduitsReducers from './ProduitsReducers';


export default combineReducers({
	produits: ProduitsReducers,
	clients: ClientsReducers,
	chambres: ChambresReducers,
	types: TypesReducers,
	other: OtherReducers,
	tablesClients: TableClientsReducers,
	TablesReservations: TableReservationsReducers,
	Footer: FooterReducers,
	reserver: ReserverReducers,
	concerner: ConcernerReducers,
	responsables: ResponsablesReducers,
	reglements: ReglementReducers
});
