import React from "react"
import { Card, Col } from 'antd';
import { Link } from 'react-router-dom';

import './pettype.scss'

function getImg(str = "",url = "http://localhost:8000/",reg = "http://localhost:8000/"){
	return url + str.split(reg)[1];
}

const Pettype = (props) => {
	getImg( "http://localhost:8000/")
	return(<div className="petlistkind_wrap">
		{
			props.list.map((item,index)=>{
				return (<div key={index} className="petlistkind_box">
					<Link to={"/petlistdetail?petID="+item.petID}>
					<Col sm={8} xs={8} className="petlistkind_col">
					<Card
					    hoverable
					    cover={<img alt="example" src={ getImg(item.imgUrl) } />}
				  	>
					<div className="petkindarea">
						<span>{item.area}</span>
						<span>{item.status}</span>
					</div>
					<div className="petkindsex">
						<span>性别:{item.sex}</span>
						<span>年龄:{item.age}岁</span>
					</div>
					<div className="petkindeditor"><p>{item.editor}</p></div>
				  	</Card>
				  </Col>
				  </Link>
				</div>)
			})
		}
	</div>)
}
export default Pettype;