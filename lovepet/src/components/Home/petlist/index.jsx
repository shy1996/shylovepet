import React,{Component} from 'react';
//引入antd
import { Icon } from 'antd';
import {Link} from 'react-router-dom';
import Swiper from 'swiper';

import './petlist.scss';

class Petlist extends Component{
	state = {
		
	}
	render(){
		return(
		<div className="petlist_wrap">
			<h2>带宠物回家</h2>
			<span>[领养]</span>
		  	 <div className="swiper-container">
			    <div className="swiper-wrapper">
			      <div className="swiper-slide">
			      	<div className="petlist_box">
			      		<div><img src="/images/petlist01.jpg" alt="" /></div>
			      		<div>
			      			<p>边境牧羊犬</p>
			      			<p>边牧经典黑白配，超帅哒...</p>
			      		</div>
			      	</div>
			      </div>
			      <div className="swiper-slide">
			      	<div className="petlist_box">
			      		<div><img src="/images/petlist02.png" alt="" /></div>
			      		<div>
			      			<p>边境牧羊犬</p>
			      			<p>边牧经典黑白配，超帅哒...</p>
			      		</div>
			      	</div>
			      </div>
			      <div className="swiper-slide">
			      	<div className="petlist_box">
			      		<div><img src="/images/petlist03.jpg" alt="" /></div>
			      		<div>
			      			<p>边境牧羊犬</p>
			      			<p>边牧经典黑白配，超帅哒...</p>
			      		</div>
			      	</div>
			      </div>
			      <div className="swiper-slide">
			      	<div className="petlist_box">
			      		<div><img src="/images/petlist04.jpg" alt="" /></div>
			      		<div>
			      			<p>边境牧羊犬</p>
			      			<p>边牧经典黑白配，超帅哒...</p>
			      		</div>
			      	</div>
			      </div>
			      <div className="swiper-slide">
			      	<div className="petlist_box">
			      		<div><img src="/images/petlist01.jpg" alt="" /></div>
			      		<div>
			      			<p>边境牧羊犬</p>
			      			<p>边牧经典黑白配，超帅哒...</p>
			      		</div>
			      	</div>
			      </div>
			      <div className="swiper-slide">
			      	<div className="petlist_box">
			      		<div><img src="/images/petlist02.png" alt="" /></div>
			      		<div>
			      			<p>边境牧羊犬</p>
			      			<p>边牧经典黑白配，超帅哒...</p>
			      		</div>
			      	</div>
			      </div>
			    </div>
			    <div className="swiper-button-next"></div>
			    <div className="swiper-button-prev"></div>
			  </div>
			  
			 <div className="downdrup">
			 	<Link to="/petlistkind">
				 	<Icon type="down-circle" />
				 	<p>------查看更多待领养的宠物------</p>
			 	</Link>
		 	</div>
		</div>	 
	)
	}
  	
  	componentDidMount(){
	  	new Swiper('.swiper-container', {
	      slidesPerView: 4,
	      spaceBetween: 20,
	      slidesPerGroup: 3,
	      loop: true,
	      loopFillGroupWithBlank: true,
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	      },
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	    });
  	}
}

export default Petlist;