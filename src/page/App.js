import React, { PureComponent } from 'react'
import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import ChartContent from './chart';  
import { getAuthority } from '../utils/authority'
import Login from './login';

const { Footer } = Layout


class Root extends PureComponent{

  render(){
    const userName = getAuthority()
		console.log('TCL: Root -> render -> userName', userName)
    if(!userName){
      return <Redirect to="/login" />
    }

    return(
      <div>
        <Switch>
          <Route path="/chart" component={ChartContent} />
        </Switch>
        <Footer style={{ textAlign: 'center'}}>
          react chart @2019 Created by woohs
        </Footer>
      </div>
    )
  }
}

export default Root