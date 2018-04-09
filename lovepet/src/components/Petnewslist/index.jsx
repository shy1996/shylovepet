import React,{ Component } from 'react';
//引入antd
import { Icon, Carousel  } from 'antd';
import { Link } from 'react-router-dom';

import Header from './../Header/index.jsx';
import Footer from './../Footer/index.jsx';

import ajax from "@/api/homeData.js";

import './petnewslist.scss';

class Petnewslist extends Component {
	state = {
		petnewslist:[]
	}
	render(){
		return(
			<div className="container">
				<Header></Header>
				<div className="petnews_wrap">
					<p><Icon type="notification" />  爱在小窝 > 新闻中心</p>
					<div className="petnews_main">
					<div className="petnews_left">
					{
						this.state.petnewslist.map((item,index) => {
							return(
								<div className="petnews_box" key={index}>
								<Link to={"/petnewsdetail?newID="+item.newID}>
									<div className="petnews_list">
										<div className="petnews_img">
											<img src={item.newUrl} alt="" />
										</div>
										<div className="petnews_con">
											<h3>{item.newTitle}</h3>
											<p>随着现在养宠物的越来越多，很多新手狗爸狗妈都将面临一个很头疼的问题，那就是狗狗挑食问题，其实养宠物就跟养小孩一样的</p>
											<p>
												<span>{item.author}</span>
												<span>{item.time}</span>
											</p>
										</div>
									</div>
								</Link>
								</div>
							)
						})
					}
					</div>
					<div className="petnews_right">
						<div className="petnews_swiper">
							<Carousel autoplay>
							    <div><img src="/images/petlist01.jpg" alt=""/></div>
							    <div><img src="/images/petlist02.png" alt=""/></div>
							    <div><img src="/images/petlist03.jpg" alt=""/></div>
							    <div><img src="/images/petlist04.jpg" alt=""/></div>
						  	</Carousel>
						</div>
					</div>
					</div>
				</div>
		  		<Footer></Footer>
		    </div>
		)
  	}
	componentDidMount(){
		ajax.getpetnews((data) => {
			console.log(data);
			this.setState({
				petnewslist:data
			})
		})
	}
}

export default Petnewslist;
