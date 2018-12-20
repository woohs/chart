import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

class ChartRoom extends Component{
  render(){
    return (
      <div>
        <Layout>
          <Header>
            页头
          </Header>
          <Content>
            内容
          </Content>
          <Footer>
            页脚
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default ChartRoom;
