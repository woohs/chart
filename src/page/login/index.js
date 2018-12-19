import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import style from './style.css';

const FormItem = Form.Item;

class Login extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) =>{
      if(!err){
        console.log(values);
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{required: true, message: '请输入昵称'},{min: 2, message: '昵称不能少于两位字符'}],
          })(
            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="请输入昵称" className='login-form-name'/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            进入！
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const loginForm = Form.create()(Login);

export default loginForm;