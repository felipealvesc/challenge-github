import React, { Component }  from 'react';
import Search from  './Search';

export default class Results extends Component {

	render(){
      
	  return (

	    <div className="content-not-found">
	    	<div className="header-search-found">
	    		<Search/>
	    	</div>
	    	<div className="not-found-message">
	    		<span>User not found :(</span>
	    	</div>	
	    </div>
	  );
	}
}

