import React,{Component} from 'react';
//引入antd
import { Row, Col, Card  } from 'antd'
import {Link} from 'react-router-dom'

import './petnav.scss';

const { Meta } = Card;
class Petnav extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}
	render(){
	return(
		<div className="petbanner_wrap">
		  	{/*首页宠物导航*/}
		  	<Row type="flex" justify="center" className="petbanner_box">
		      <Col sm={4} xs={8} className="petbanner_col">
		      	<Link to="/petlistkind">
		      	<Card 
				    hoverable
				    style={{ width: 180 }}
				    cover={<img alt="example" src="/images/petnav01.jpg" />}
			  	>
			    <Meta 
			      title="狗狗"
			    />
			  	</Card>
			  	</Link>
		      </Col>
		      <Col sm={4} xs={8} className="petbanner_col" >
		      	<Link to="/petlistkind">
		      	<Card 
				    hoverable
				    style={{ width:180 }}
				    cover={<img alt="example" src="/images/petnav02.jpg" />}
			  	>
			    <Meta
			      title="猫咪"
			    />
			    </Card>
		      	</Link>
			  	
		      </Col>
		      <Col sm={4} xs={0} className="petbanner_col">
		      	<Link to="/petnewslist">
		      	<Card
				    hoverable
				    style={{ width: 180 }}
				    cover={<img alt="example" src="/images/petnav03.jpg" />}
			  	>
			    <Meta
			      title="宠物新闻"
			    />
			  	</Card>
			  	</Link>
		      </Col>
		      <Col sm={4} xs={8} className="petbanner_col">
		      	<Card
				    hoverable
				    style={{ width: 180 }}
				    cover={<img alt="example" src="/images/petnav04.jpg" />}
			  	>
			    <Meta
			      title="宠物社区"
			    />
			  	</Card>
		      </Col>
		      <Col sm={4} xs={0} className="petbanner_col">
		      	<Card
				    hoverable
				    style={{ width: 180 }}
				    cover={<img alt="example" src="/images/petnav05.jpg" />}
			  	>
			    <Meta
			      title="养宠指南"
			    />
			  	</Card>
		      </Col>
		    </Row>
		</div>	 
	)
}
  	
}

export default Petnav;