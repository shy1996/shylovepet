import React, { Component } from 'react';
import {Button, InputItem, Toast,WhiteSpace } from 'antd-mobile';
import userData from '@/api/userdata';
class Register extends Component {
  
  state = {
    msg:'验证码',
    hasPhoneError: false,
    hasPasswordError: false,
    phonevalue: '',
    passwordvalue: '',
    codevalue: '',
    code:''
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
  onCodeChange = (value) => {
     this.setState({
      codevalue: value
    });
  }
  
  getCode(){
  	var phone = (this.state.phonevalue).replace(/\s/g, "")
  	this.state.phonevalue = phone
		userData.sendCode((data) => {
	
					this.state.code = data
	
				},phone)

  }
  
  register(){
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
  			if(this.state.codevalue === this.state.code){
  				var obj = {
						phone: (this.state.phonevalue).replace(/\s/g, ""),
						password: this.state.passwordvalue
					} 
  				userData.register((data)=> {
						if(data === '1') {
							Toast.fail('账号已存在', 1);
						} else if(data === '0') {
							Toast.success('注册成功', 1);
							this.props.history.push('/login')
						}
					}, obj)
  	}
  			}
  }
  
  back(){
  	this.props.history.goBack()
  }
  render() {
    
    return (
      <div className="box">
        <header className="loginheader">
       		<i className = 'iconfont icon-fanhui' onClick = {this.back.bind(this)} ></i>
        	<span>优选注册</span>
        	<em></em>
        </header>
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
	          type="code"
	          placeholder="请输入验证码"
	          onChange={this.onCodeChange}
	          value={this.state.codevalue}
	          extra={<Button type="ghost" size="small" style={ {color: "#000",border:0} } inline>发送短信验证码</Button>}
	          onExtraClick = { this.getCode.bind(this) }
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
	        <Button className='registerBtn' onClick ={ this.register.bind(this)}>注册</Button>
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    
  }
  
}

export default Register;