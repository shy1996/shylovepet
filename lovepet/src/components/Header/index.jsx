import React from 'react';
//引入antd
import { Layout, Row, Col, Avatar } from 'antd';
import {Link} from 'react-router-dom'

const Header = function(props) {
	let { Header } = Layout;
	return(
		<Header>
	    <Row type="flex" justify="center">
	      <Col sm={3} xs={6}>
	      	<Avatar src="/favicon1.ico" />
	      </Col>
	      <Col sm={3} xs={6}><Link to="/home">首页 </Link></Col>
	      <Col sm={3} xs={6}><Link to="/petnewslist">新闻中心</Link></Col>
	      <Col sm={3} xs={6}><Link to="/petlistkind">宠物领养</Link></Col>
	 	  <Col sm={3} xs={0}>养宠指南</Col>
	      <Col sm={3} xs={0}>宠物社区</Col>
	      <Col sm={3} xs={0}>关于我们</Col>
	      <Col sm={3} xs={0}><Link to="/login">登录</Link></Col>
	    </Row>
	    </Header>
	)
  	
}

export default Header;