import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Button, Input } from 'antd';
import style from './style.css';

const HeaderLayer = () => (
  <div className="header-row">
    <Row gutter={16}>
      <Col span={8} className="header-col-1"><Icon type="caret-left" /></Col>
      <Col span={8} className="header-col-2">广场</Col>
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
  render(){
    return (
      <div>
        <Layout>
          <HeaderLayer />
          <ContentLayer />
          <FooterLayer />
        </Layout>
      </div>
    )
  }
}

export default ChartRoom;
