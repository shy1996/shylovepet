import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './index.scss';
import App from '@/components/App';
import registerServiceWorker from './registerServiceWorker';

import store from '@/store/index.js';

//入口文件，定义render函数渲染DOM结构
function render(){
	ReactDOM.render(
	<Router>
		<Switch>
			<Route path = "/" component = {App} />
		</Switch>
	</Router>
	, document.getElementById('root'));
}
render();

//监听组件状态改变，再次渲染DOM页面
store.subscribe(render);
registerServiceWorker();
