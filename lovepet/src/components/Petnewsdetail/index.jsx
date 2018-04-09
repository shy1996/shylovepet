import React,{ Component } from 'react';
//引入antd
import {  } from 'antd';

import Header from './../Header/index.jsx';
import Footer from './../Footer/index.jsx';

import ajax from "@/api/homeData.js";

import './petnewsdetail.scss';

class Petnewsdetail extends Component {
	state = {
		petnewsdetail:[]
	}
	render(){
		return(
			<div className="container">
				<Header></Header>
				<div className="newsdetail_wrap">
					<div>
						{
							this.state.petnewsdetail.map((item,index) => {
								return(<div className="newsdetail_con" key={index}>
									<h3>{item.newTitle}</h3>
									<p>更新时间:{item.time}</p>
									<div dangerouslySetInnerHTML = { {__html:item.editor}}></div>
								</div>)
							})
						}
					</div>
				</div>
		  		<Footer></Footer>
		    </div>
		)
  	}
	componentDidMount(){
		ajax.getnewsdetail(this.props.location.search,(data) => {
			console.log(data);
			this.setState({
				petnewsdetail:data
			})
		})
	}
}

export default Petnewsdetail;
