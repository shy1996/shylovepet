import React,{ Component } from 'react';
//引入antd
import { Tabs, Icon, List, Avatar } from 'antd';

import Header from './../Header/index.jsx';
import Footer from './../Footer/index.jsx';
import api from "@/api/petlist.js";
import ajax from "@/api/homeData.js";

import Pettype from './pettype/index.jsx';

import './petlist.scss';

const TabPane = Tabs.TabPane;
class Petlistkind extends Component {
	state = {
		petlistkind:[],
		petlisttype:[],
		petlistnews:[],
		num:0
	}
	render(){
		return(
			<div className="container">
				<Header></Header>
		  		<div className="petlistcon">
					<Tabs
			          defaultActiveKey="1"
			          tabPosition="left"
			          onTabClick = { this.getpet }
			        >
        			{ this.state.petlistkind.map((i,n) =>(
					  			<TabPane  key={ i.num } 
					  			tab ={ i.petListStr }
					  			>
					  			<div className="pettypetitle"><Icon type="home" /> 爱在小窝 > 领养中心 > {i.petListStr}</div>
				  				<Pettype list={this.state.petlisttype} ></Pettype>
				  				</TabPane>
		  					)) 
        			}
        			</Tabs>
        			<div className="petlistkind_right">
        			<p>宠物新闻</p>
        					<List
					    itemLayout="horizontal"
					    dataSource={this.state.petlistnews}
					    renderItem={item => (
					      <List.Item>
					        <List.Item.Meta
					          avatar={<Avatar src={item.newUrl} />}
					          title={<a href="https://ant.design">{item.newTitle}</a>}
					          description={item.time}
					        />
					      </List.Item>
					     )}
        			/>
        			</div>
		  		</div>

        
		  		<Footer></Footer>
		    </div>
		)
  	}
	getpet = (num) =>{
		console.log(num)
		ajax.getpetlist(num,(data)=>{
			this.setState({
				petlisttype:data
			})
		})
	}
	componentDidMount(){
		//进行宠物列表的数据请求
		api.getpetlist(( data ) =>{
			console.log(data)
			this.setState({petlistkind:data})
		});
		ajax.getpetlist(this.state.num,(data)=>{
			this.setState({
				petlisttype:data
			})
		});
		//宠物新闻的数据请求
		ajax.getpetnews(( data ) =>{
			console.log(data)
			this.setState({petlistnews:data})
		});
	}
}

export default Petlistkind;
