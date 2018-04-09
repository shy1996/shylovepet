import React from 'react';
//引入antd
import { Layout, Row, Col, Avatar } from 'antd'

import './footer.scss';

const Footer = function(props) {
	let { Footer } = Layout;
	return(
		<Footer className="footer_wrap">
	    <Row type="flex" justify="center" className="footertop">
	      <Col sm={6} xs={0} className="footerlogo">
	      	<Avatar src="/favicon1.ico" />爱在小窝
	      </Col>
	      <Col sm={3} xs={8} >
	        <div className="footertext">
	      	<span>我们平台</span>
	      	<span>平台原理</span>
	      	<span>成为宠物主</span>
	      	</div>
	      </Col>
	      <Col sm={3} xs={8}>
	      <div className="footertext">
			<span>我们的服务</span>
	      	<span>服务理念</span>
	      	<span>新手指南</span>	
	      	<span>特色服务</span>
	      	<span>养宠保障</span>	
	      	</div>
	      </Col>
	 	  <Col sm={3} xs={8}>
	 	  <div className="footertext">
	 	  	<span>关于我们</span>
	      	<span>网站简介</span>
	      	<span>网站愿景</span>	
	      	<span>加入我们</span>
	      	</div>
	 	  </Col>
	      <Col sm={3} xs={0} >
	      <div className="footertext">
	      	<span>赞助我们</span>
	      	<span>联系方式</span>
	      	<span>发送邮件</span>	
	      	<span>给我们留言</span>
	      	</div>
	      </Col>
	      <Col sm={6} xs={0} className=" footererwei">
	      <div className="footertext">
	      	<span>微信公众号</span>
	      	<Avatar className="footerwechat" src="/images/wechatma.jpg" />
	      </div>
	      </Col>
	    </Row>
	    <Row type="flex" justify="center" className="footerdetail">
	    	<p>本网站是呼吁人们去关爱身边的流浪动物,给它们足够的关心与保护,让它们在有限的生命中,有一个温暖的回忆</p>
	    	<p>Copyright @ 2018 www.sunhuiying.top all Rights Reserved 豫ICP备1121747038</p>
	    </Row>
	    
	    </Footer>
	)
  	
}

export default Footer;