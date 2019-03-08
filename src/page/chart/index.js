import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Button, Input, message } from 'antd';
import { Link, withRouter, Redirect  } from 'react-router-dom'
import style from './style.css';
import { connect } from 'react-redux';
import { userLogout, userLogin } from '../../actions/login';
import { getAuthority } from '../../utils/authority';

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
    let msg = {
      name: this.state.username,
      message: this.state.inputValue,
    }
    let lastRecord = this.state.record;
    lastRecord.push(msg);
		console.log("​ChartRoom -> handleSubmit -> lastRecord", lastRecord)
    this.setState(lastRecord);
  }
  
  render(){
    console.log('chart page render');
    return (
      <div>
        <Layout>
          <HeaderLayer roomName={this.state.roomName}/>
          <ContentLayer record={this.state.record}/>
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
      <Col span={8} className="header-col-3"><Icon type="bars" /></Col>
    </Row>
  </div>
)

const ContentLayer = (props) => {
  const list = props.record;

  return(
    <div className="content-row">
      <ul>
        {list.map((val, index) => (
          <li key={index}>
            {val.name} : {val.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

// class FooterLayer extends Component{
//   render(){
//     return(
//       <div className="footer-row">
//         <Input value={this.props.inputValue} onChange={this.props.handleChange}/>
//         <Button type="primary" onClick={this.props.handleSubmit}>发送</Button>
//       </div>
//     )
//   }
// }
const FooterLayer = (props) => (
  <div className="footer-row">
    <Input value={props.inputValue} onChange={props.handleChange}/>
    <Button type="primary" onClick={props.handleSubmit}>发送</Button>
  </div>
)

const mapStateToProps = state => ({
  username: state.login.username,
})
const mapDispatchToProps = dispatch => ({
  submitLogout: username => dispatch(userLogout({username})),
  setUsername: (username, history) => dispatch(userLogin({username,history}))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartRoom))
