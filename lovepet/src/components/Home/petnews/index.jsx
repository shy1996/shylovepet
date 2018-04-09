import React from 'react';
//引入antd
import { Icon, Row, Col, Card } from 'antd';
import {Link} from 'react-router-dom';

import './petnews.scss';

const Petnews = function(props) {
	const { Meta } = Card;
	return(
		<div className="petlist_wrap">
			<h2>宠物新闻</h2>
			<span>[关注]</span>
		  	{/*首页宠物新闻导航*/}
		  	<Row type="flex" justify="center" className="petlist_box ">
		      <Col sm={4} xs={8} className="petlist_col ">
		      	<div className="hoverbox">

		      	</div>
	      		<div className="peterweima"><img src="/images/peterwei.png" alt="" /></div>
		      	<Card 
				    hoverable
				    style={{ width: 270 }}
				    cover={<img alt="example" src="/images/petlist01.jpg" />}
			  	>
			    <Meta
			      title="萨摩耶"
			      description="纯白的洁白的耶耶公主..."
			    />
			  	</Card>
		      </Col>
		      <Col sm={4} xs={8} className="petlist_col ">
		      	<div className="hoverbox"></div>
	      		<div className="peterweima"><img src="/images/peterwei.png" alt="" /></div>
		      	<Card 
				    hoverable
				    style={{ width:270 }}
				    cover={<img alt="example" src="/images/petlist02.png" />}
			  	>
			    <Meta
			      title="边境牧羊犬"
			      description="边牧经典黑白配，超帅哒..."
			    />
			  	</Card>
		      </Col>
		      <Col sm={4} xs={0} className="petlist_col ">
		      	<div className="hoverbox"></div>
	      		<div className="peterweima"><img src="/images/peterwei.png" alt="" /></div>
		      	<Card
				    hoverable
				    style={{ width: 270 }}
				    cover={<img alt="example" src="/images/petlist03.jpg" />}
			  	>
			    <Meta
			      title="土耳其梵猫"
			      description="希望有爱猫的人给猫一个家！"
			    />
			  	</Card>
		      </Col>
		      <Col sm={4} xs={8} className="petlist_col ">
		      	<div className="hoverbox"></div>
	      		<div className="peterweima"><img src="/images/peterwei.png" alt="" /></div>
		      	<Card
				    hoverable
				    style={{ width: 270 }}
				    cover={<img alt="example" src="/images/petlist04.jpg" />}
			  	>
			    <Meta
			      title="深灰起司猫"
			      description="仅限北京，科学喂养，终身不离不弃。"
			    />
			  	</Card>
		      </Col>
		      <Col sm={4} xs={8} className="petlist_col ">
		      	<div className="hoverbox"></div>
	      		<div className="peterweima"><img src="/images/peterwei.png" alt="" /></div>
		      	<Card 
				    hoverable
				    style={{ width: 270 }}
				    cover={<img alt="example" src="/images/petlist01.jpg" />}
			  	>
			    <Meta
			      title="萨摩耶"
			      description="纯白的洁白的耶耶公主..."
			    />
			  	</Card>
		      </Col>
		   </Row>
			 <div className="downdrup">
			 	<Link to="/petnewslist">
				 	<Icon type="down-circle" />
				 	<p>------查看更多宠物新闻------</p>
			 	</Link>
		 	</div>
		</div>	 
	)
  	
}

export default Petnews;