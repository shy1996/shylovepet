import React,{ Component } from 'react';
//引入antd
import { Layout } from 'antd'

//引入Header
import Header from './../Header/index.jsx';
import Footer from './../Footer/index.jsx';
import Banner from './banner/index.jsx';
import Petnav from './petnav/index.jsx';
import Petlist from './petlist/index.jsx';
import Petnews from './petnews/index.jsx';

import './home.scss';

let { Content } = Layout;

class Home extends Component {
//	constructor(props){
//		super(props);
//		this.setState({
//			
//		})
//	}
	state={
		
	}
	render(){
		return(
			<div className="container">
				<Layout>
				  <Header></Header>
				  <Content >
				  	{/*首页轮播图*/}
				  	<Banner></Banner>
				  	{/*首页宠物导航*/}
				  	<Petnav></Petnav>
				  	{/*首页宠物列表*/}
				  	<Petlist></Petlist>
				  	{/*首页宠物新闻列表*/}
				  	<Petnews></Petnews>
				  </Content>
				  <Footer></Footer>
				</Layout>
		    </div>
		)
  	}
	
	componentDidMount(){
		
	}
}

export default Home;
