import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Button, Input, message, Menu, Dropdown } from 'antd';
import { Link, withRouter, Redirect  } from 'react-router-dom'
import style from './style.css';
import { connect } from 'react-redux';
import { userLogout, userLogin } from '../../actions/login';
import { getAuthority } from '../../utils/authority';
import { sendMessage } from '../../actions/chart';

class ChartRoom extends Component{
  constructor(props){
    super(props);
    this.state = {
      roomName: '广场',
      username: this.props.username,
      record: [{'name': 'wujun', 'message': 'hello~'}],
      inputValue: '',
    }
    message.config({
      top: 50,
      duration: 2,
      maxCount: 3,
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const getAuthorityUsername = getAuthority()
    const {username, history, setUsername} = this.props
    if(!getAuthorityUsername){
      message.warning(`请先取个帅气的名字`);
      history.push('/')
    }else if(!username){
      setUsername(getAuthorityUsername, history)
    }
    
  }

  
  handleChange(e){
   console.log("​ChartRoom -> handleChange -> e", e.target.value)
    this.setState({inputValue: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    const {sendMessage, username} = this.props
    let msg = {
      username: username,
      message: this.state.inputValue,
      messageType: 'client_msg'
    }
    sendMessage(msg)
  }
  
  render(){
    console.log('chart page render');
    const {chart} = this.props
    return (
      <div>
        <Layout>
          <HeaderLayer roomName={this.state.roomName}/>
          <ContentLayer record={chart} />
          <FooterLayer inputValue={this.state.inputValue} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        </Layout>
      </div>
    )
  }
}

const HeaderLayer = (props) => (
  <div className="header-row">
    <Row gutter={16}>
      <Col span={8} className="header-col-1">
        <Link to="/login"><Icon type="caret-left" /></Link>
      </Col>
      <Col span={8} className="header-col-2">{props.roomName}</Col>
      <Col span={8} className="header-col-3">{DropMenu}</Col>
    </Row>
  </div>
)
const menu = (
  <Menu>
    <Menu.Item key="0">
      聊天室
    </Menu.Item>
    <Menu.Item key="1">
      开发中
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <a href="https://github.com/woohs/chart">github地址</a>
    </Menu.Item>
  </Menu>
);
const DropMenu = (
  <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" href="#">
      <Icon type="bars" />
    </a>
  </Dropdown>
)

const ContentLayer = (props) => {
  const list = props.record;

  return(
    <div className="content-row">
      <ul>
        {list.map((val, index) => (
          handleChartData(val, index)
        ))}
      </ul>
    </div>
  )
}

function handleChartData(val, index){
	console.log('TCL: handleChartData -> val', val)
  if(val && val.messageType.length <= 0){
    return ;
  }
  switch (val.messageType || '') {
    case 'client_join':
      return (
        <li key={index} className='content-li li-info'>
          {`[${val.time}] ${val.message}`}
        </li>
      )
    case 'client_quite':
      return(
        <li key={index} className='content-li li-warning'>
          {`[${val.time}] ${val.message}`}
        </li>
      )
    case 'client_msg':
      return(
        <li key={index} className='content-li li-msg' style={{backgroundColor: `${val.client_color}`}}>
          {`[${val.time.slice(11, 20)}] ${val.username} : ${val.message}`}
        </li>
      )
  
    default:
      return ''
  }
}

const FooterLayer = (props) => (
  <div className="footer-row">
    <Input value={props.inputValue} onChange={props.handleChange}/>
    <Button type="primary" onClick={props.handleSubmit}>发送</Button>
  </div>
)

const mapStateToProps = state => ({
  username: state.login.username,
  chart:state.chart.receive,
})
const mapDispatchToProps = dispatch => ({
  submitLogout: username => dispatch(userLogout({username})),
  setUsername: (username, history) => dispatch(userLogin({username,history})),
  sendMessage: payload => dispatch(sendMessage({payload})),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartRoom))
