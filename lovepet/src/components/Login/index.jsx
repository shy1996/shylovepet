//引入antd
import React, { Component } from 'react';
import { } from 'antd';
import { Button, InputItem, Toast,WhiteSpace } from 'antd-mobile';
import userData from '@/api/userdata';
import Header from './../Header/index.jsx';
import Footer from './../Footer/index.jsx';
import './login.scss';
class Login extends Component {
  state = {
    hasPhoneError: false,
    hasPasswordError: false,
    phonevalue: '',
    passwordvalue: '',
  }
  onPhoneErrorClick = () => {
    if (this.state.hasPhoneError) {
      Toast.info('请输入正确的手机号码');
    }
  }
  onPhoneChange = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasPhoneError: true,
      });
    } else {
      this.setState({
        hasPhoneError: false,
      });
    }
    this.setState({
      phonevalue: value
    });
  }
  onPasswordErrorClick = () => {
    if (this.state.hasPasswordError) {
      Toast.info('请输入正确格式的密码');
    }
  }
  onPasswordChange = (value) => {
    if (value.replace(/\s/g, '').length < 6) {
      this.setState({
        hasPasswordError: true,
      });
    } else {
      this.setState({
        hasPasswordError: false,
      });
    }
    this.setState({
      passwordvalue: value
    });
  }  
  
  
  
  
  login(){
  	if(this.state.phonevalue.length<1){
  		this.state.hasPhoneError = true
  	}else{
  		this.state.hasPhoneError = false
  	}
  	if(this.state.phonevalue.length<1){
  		this.state.hasPasswordError = true
  	}else{
  		this.state.hasPasswordError = false
  	}
  	
  	if(this.state.hasPhoneError === false && this.state.hasPasswordError === false){
  			
	  		var obj = {
							phone: (this.state.phonevalue).replace(/\s/g, ""),
							password: this.state.passwordvalue
						} 
					userData.login((data)=> {
						if(data === '1') {
							Toast.fail('账号或密码错误', 1);							
						} else if(data === '0') {
							Toast.fail('账号不存在', 1);
							
						}else if(data === '2'){
							Toast.success('登录成功', 1);
							this.props.history.push('/home')
							localStorage.setItem("userID",(this.state.phonevalue).replace(/\s/g, ""))
						}
					}, obj)
  	
  	}
  }
  goregister(){
  	this.props.history.push('/register')
  }
  back(){
  	
  	this.props.history.push('/home')
  }
  render() {
    
    return (   
			<div className="box">
       <Header></Header>
        <div className = "content">
        				<WhiteSpace />
		                <InputItem
		                  type="phone"
		                  placeholder="请输入手机号"
		                  error={this.state.hasPhoneError}
		                  onErrorClick={this.onPhoneErrorClick}
		                  onChange={this.onPhoneChange}
		                  value={this.state.phonevalue}
		                  editable={true}
						          disabled={false}
						          clear={true}
		                ></InputItem>
		                <InputItem
		                  type="password"
		                  placeholder="请输入密码"
		                  error={this.state.hasPasswordError}
		                  onErrorClick={this.onPasswordErrorClick}
		                  onChange={this.onPasswordChange}
		                  value={this.state.passwordvalue}
		                ></InputItem>
		                
                <WhiteSpace />
                <Button className = 'loginBtn' onClick = {this.login.bind(this)}>登录</Button>
        </div>
        <div className = 'register'>
        		<span onClick = { this.goregister.bind(this)}>手机快速注册</span>
        </div>
				<Footer></Footer>
				</div>
    )
  }
  
  componentDidMount() {
    
  }
  
}

export default Login;