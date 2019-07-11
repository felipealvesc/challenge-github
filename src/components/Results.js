import React, { Component }  from 'react';
import Search from  './Search';
import {browserHistory} from  'react-router';

export default class Results extends Component {

	constructor(props) {
    	super(props);

    	this.state = {repos: [],user : [] };

	}
	componentDidMount(){
		fetch(`https://api.github.com/users/${localStorage.getItem('auth-user')}`)
          .then(response => response.json())

          .then(user => {
            
            if(user.id){
              if(this.props.callbackUser) this.props.callbackUser(user)
              this.setState({user:user});
              browserHistory.push('/results')
            }else{
              browserHistory.push('/notfound')
            }
	          
		})
		fetch(`https://api.github.com/users/${localStorage.getItem('auth-user')}/repos`)
			.then(response => response.json())
			.then(repos => {
			 	if(this.props.callback) this.props.callbackrepos(repos)
				const sorted = repos.sort((a,b) =>{			
					if(a.stargazers_count < b.stargazers_count) return 1
					if(b.stargazers_count < a.stargazers_count) return -1
					return 0

				})	
		        this.setState({repos: sorted});
		    

		})
	}

		
			
	
    //onChildChangedUser = user => this.setState({user: user})
	
	render(){
      const infoUser = this.state.user;
	  return (

	    <div className="content-resuts">
	    	<div className="header-search-results">
	    		<Search/>
	    	</div>
	    	<div className="body-results">
		    	<div className="body-results-sidbar">
		    		<figure>
		    			<img src={infoUser.avatar_url} alt="Foto Avatar"/>
		    		</figure>
		    		<div className="info-personal">
		    			<h2>{infoUser.name}</h2>
		    			<p>{infoUser.login}</p>
		    		</div>
		    		<div className="infos-geral">
		    			<ul>
		    				<li><span className="organization">{infoUser.company}</span></li>
		    				<li><span className="location">{infoUser.location}</span> </li>
		    				<li><span className="star">{infoUser.following}</span></li>
		    				<li><span className="repositorie">{infoUser.public_repos}</span></li>
		    				<li><span className="followers">{infoUser.followers}</span></li>
		    			</ul>
		    		</div>
		    	</div> 	
		    	<div className="body-results-repos">
		    		<ul>
		    		{
                      this.state.repos.map((repo) => {
                        return (
				    		
				    			<li key={repo.id}>
				    				<h2>{repo.name}</h2>
				    				<p>{repo.description}</p>
				    				<span className="star-repos">{repo.stargazers_count}</span>
				    			</li>
				    		
				    		);
                      	})
                    }
                    </ul>
		    	</div>
		    </div>		
	    </div>
	  );
	}
}