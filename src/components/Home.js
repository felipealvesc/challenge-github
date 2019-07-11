import React, { Component } from 'react';
import Search from  './Search';
import {browserHistory} from  'react-router';

export default class Home extends Component {

    render(){
        return (
	        <div className="home-content">
	        	<div className="header-search-results">
     				<Search/>
                </div>
	        </div>
        );
    }
}