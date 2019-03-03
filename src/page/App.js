import React, { PureComponent } from 'react'
import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { userLogin } from '../actions/login'
import ChartContent from './chart';  
import { getAuthority } from '../utils/authority'
import Login from './login';

const { Footer } = Layout


class Root extends PureComponent{

  render(){
    const { setUsername } = this.props
    const username = getAuthority()
		console.log('TCL: Root -> render -> username', username)
    if(username){
      setUsername(username)
    }else{
      return <Redirect to="/login" />
    }

    return(
      <Switch>
        <Route path="/app/chart" component={ChartContent} />
      </Switch>
    )
  }
}
const mapStateToProps = state => ({
  username: state.username,
})
const mapDispatchToProps = dispatch => ({
  setUsername: username => dispatch(userLogin({username}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)