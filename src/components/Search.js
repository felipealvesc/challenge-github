import React, { Component } from 'react';
import {browserHistory} from  'react-router';

export default class Search extends Component {
    constructor(props){
      super(props);
      this.state = { 
        newUser: '',
        user: '',
        repos: '',
      };

      this.searchUser = this.searchUser.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
      this.setState({ newUser: e.target.value })
    }
    
    
      searchUser(e){
        e.preventDefault();
        localStorage.removeItem('auth-user');
        
        fetch(`https://api.github.com/users/${this.state.newUser}`)
            .then(response => response.json())

            .then(user => {
              
              if(user.id){
                if(this.props.callbackUser) this.props.callbackUser(user)
                this.setState({user:user});
                localStorage.setItem('auth-user', this.state.newUser)
                browserHistory.push('/results')
              }else{
                browserHistory.push('/notfound')
              }
            
        })
        fetch(`https://api.github.com/users/${this.state.newUser}/repos`)
          .then(response => response.json())
          .then(repos => {
            if(this.props.callback) this.props.callback(repos)
            this.setState({repos:repos});

        })
      }
    
    render(){
        return (
          <>
            <p className="github-search"><b>Github</b> Search</p>
            <form className="search-form" onSubmit={this.searchUser.bind(this)}>
              <input className="search-user" type="text" name="search-user"
                value={this.state.newUser}
                onChange={this.handleTextChange}
              />
                <input type="submit" value="Buscar" className="busca-submit" onClick={this.loadRepo} /> 
            </form>
          </>  
           
        );
    }
}
