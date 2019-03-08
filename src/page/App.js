import React, { PureComponent } from 'react'
import { Switch, Route, Redirect,withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { userLogin } from '../actions/login'
import ChartContent from './chart';  
import { getAuthority } from '../utils/authority'

const Root = () => {
  return(
    <Switch>
      <Route path="/app/chart" component={ChartContent} />
      <Redirect to="/" />
    </Switch>
  )
}
export default Root
// const mapStateToProps = state => ({
//   username: state.username,
// })
// const mapDispatchToProps = dispatch => ({
//   setUsername: username => dispatch(userLogin({username}))
// })

// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Root))