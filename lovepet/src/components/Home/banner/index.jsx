import React from 'react';
//引入antd
import { Carousel, Avatar, Row, Col, Select, Button } from 'antd'

import './banner.scss';

const Option = Select.Option;
const children = [];
const Banner = function(props) {
	for (let i = 10; i < 36; i++) {
	  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
	}
	
	function handleChange(value) {
	  console.log(`selected ${value}`);
	}
	
	function handleBlur() {
	  console.log('blur');
	}
	
	function handleFocus() {
	  console.log('focus');
	}
	return(
		<div className="lunbobox">
		<Carousel autoplay className="banner_wrap">
		    <div className="banner_box"><Avatar className="banner_bg" src="/images/banner_01.jpg" /></div>
		    <div className="banner_box"><Avatar className="banner_bg" src="/images/banner_02.jpg" /></div>
		    <div className="banner_box"><Avatar className="banner_bg" src="/images/banner_03.jpg" /></div>
		    <div className="banner_box"><Avatar className="banner_bg" src="/images/banner_04.jpg" /></div>
	  	</Carousel>	
	  	<div className="searchbanner">
	  	 <Row>
	  	  <Col span={4} className="searchtitle">爱宠搜索</Col>
	      <Col span={6}>
	      	<Select
			    showSearch
			    style={{ width: 200 }}
			    placeholder="Select a person"
			    optionFilterProp="children"
			    onChange={handleChange}
			    onFocus={handleFocus}
			    onBlur={handleBlur}
			    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			  >
			    <Option value="jack">Jack</Option>
			    <Option value="lucy">Lucy</Option>
			    <Option value="tom">Tom</Option>
			  </Select>
	      </Col>
	      <Col span={6}>
	      	<Select
			    mode="tags"
			    style={{ width: '100%' }}
			    onChange={handleChange}
			    tokenSeparators={[',']}
			  >
			    {children}
		  	</Select>
	      </Col>
	      <Col span={6}>
	      	<div className="searchbtn">
	      		 <Button type="primary" icon="search">搜索</Button>
		    </div>
	      </Col>
    	</Row>
	    </div>
	    </div>
	)
  	
}

export default Banner;