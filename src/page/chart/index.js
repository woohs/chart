import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Button, Input, message } from 'antd';
import style from './style.css';

const HeaderLayer = (props) => (
  <div className="header-row">
    <Row gutter={16}>
      <Col span={8} className="header-col-1"><Icon type="caret-left" /></Col>
      <Col span={8} className="header-col-2">{props.roomName}</Col>
      <Col span={8} className="header-col-3"><Icon type="bars" /></Col>
    </Row>
  </div>
)

const FooterLayer = () => (
  <div className="footer-row">
      <Input />
      <Button type="primary">发送</Button>
  </div>
)

const ContentLayer = () => (
  <div className="content-row">

  </div>
)

class ChartRoom extends Component{
  constructor(props){
    super(props);
    this.state = {
      roomName: '广场',
      username: this.props.location.state.username,
    }
    message.config({
      top: 50,
      duration: 2,
      maxCount: 3,
    });
  }

  componentDidMount(){
    message.success(`欢迎您 ${this.state.username}`);
  }
  
  render(){
    return (
      <div>
        <Layout>
          <HeaderLayer roomName={this.state.roomName}/>
          <ContentLayer />
          <FooterLayer />
        </Layout>
      </div>
    )
  }
}

export default ChartRoom;
