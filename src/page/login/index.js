import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Icon } from 'antd';
import style from './style.css';
import { Redirect,withRouter } from 'react-router-dom';
import { userLogin, userLogout } from '../../actions/login';
import { setAuthority } from '../../utils/authority'

const FormItem = Form.Item;

class Login extends Component{
  constructor(props){
    super(props)
    this.props.submitLogout()
    setAuthority('')
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let {history, submitLogin} = this.props;
    this.props.form.validateFields((err, values) =>{
      const username = values.username
      let path = {
        pathname: '/app/chart',
        state: {
          username: username,
        }
      }
      if(!err){
				console.log("​Login -> handleSubmit -> path", path)
        submitLogin(username)
        setAuthority(username)
        history.push(path);
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

const mapStateToProps = state => ({
  username: state.username,
})

const mapDispatchToProps = dispatch => ({
  submitLogin: username => dispatch(userLogin({username})),
  submitLogout: () => dispatch(userLogout())
})

const loginForm = withRouter(Form.create()(Login));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(loginForm);