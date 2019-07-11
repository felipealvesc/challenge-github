import React from 'react';
import Home from './components/Home';
import Results from './components/Results';
import NotFound from './components/NotFound';

import {Router,Route,browserHistory} from "react-router";




const Routes = () => (

	<Router history={browserHistory}>
			<Route exact path="/" component={Home}/>
			<Route exact path="/results" component={Results}/>
			<Route exact path="/notfound" component={NotFound}/>
	</Router>
);

export default Routes;