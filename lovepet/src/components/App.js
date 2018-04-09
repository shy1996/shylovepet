import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '@/components/Home/index.jsx';
import News from '@/components/News/index.jsx';
import Petlistkind from "@/components/Petlist/index.jsx";
import Petlistdetail from "@/components/Petdetail/index.jsx";
import Petnewslist from "@/components/Petnewslist/index.jsx";
import Petnewsdetail from "@/components/Petnewsdetail/index.jsx";
import Login from "@/components/Login/index.jsx";
import Register from "@/components/Register/index.jsx";

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
    	
    }
  }
  render(){
    return (
    	<Router>
			<Switch>
				<Route path = "/register" component = { Register } />
				<Route path = "/login" component = { Login } />
				<Route path = "/petnewsdetail" component = { Petnewsdetail } />
				<Route path = "/petnewslist" component = { Petnewslist } />
				<Route path = "/petlistdetail" component = { Petlistdetail } />
				<Route path = "/petlistkind" component = { Petlistkind } />
	   		<Route path = "/news" component = { News } />
	   		<Route path = "/home" component = { Home } />
	   		<Route path = "/" component = { Home } />
			</Switch>
			</Router>
    )
  }
  componentDidMount(){
  }
}

export default App;
