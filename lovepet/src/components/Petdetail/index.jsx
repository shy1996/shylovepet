import React,{ Component } from 'react';
//引入antd
import {  } from 'antd';

import Header from './../Header/index.jsx';
import Footer from './../Footer/index.jsx';

import ajax from "@/api/homeData.js";

import './petdetail.scss';

class Petlistdetail extends Component {
	state = {
		petlistdetail:[]
	}
	render(){
		return(
			<div className="container">
				<Header></Header>
				<div className="petdetail_wrap">
					<div className="petdetail_con">
					{
						this.state.petlistdetail.map((item,index) => {
							return(
								<div className="petdetail_main" key={index}>
									<div className="petdetail_img">
										<img src={item.imgUrl} alt=""/>
									</div>
									<div className="petdetail_list">
										<h2>{item.petListType}</h2>
										<p>{item.editor}</p>
										<div className="petdetail_jiben">
											<h4>基本信息</h4>
											<p>
												<span>性别:{item.sex}</span>
												<span>现地址:{item.area}</span>
											</p>
											<p>
												<span>现主人:{item.owner}</span>
												<span>领养状态:{item.status}</span>
											</p>
											<p>
												<span>体型:小型犬</span>
												<span>寿命:12-14年</span>
											</p>
										</div>
									</div>
								</div>
							)
						})
					}
					</div>
				</div>
		  		<Footer></Footer>
		    </div>
		)
  	}
	componentDidMount(){
		ajax.getpetdetail(this.props.location.search,(data)=>{
			this.setState({
				petlistdetail:data
			})
			console.log(data)
		})
	}
}

export default Petlistdetail;
