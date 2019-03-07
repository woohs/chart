import React, { PureComponent } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { userLogin } from '../actions/login'
import ChartContent from './chart';  
import { getAuthority } from '../utils/authority'

const Root = ({...props}) => {
  const { setUsername, location } = props
	console.log('TCL: Root -> props', props)
  const getAuthorityUsername = getAuthority()
	console.log('TCL: Root -> getAuthorityUsername', getAuthorityUsername)
  const pathState = (location.state && location.state.username)

  if(pathState){
    setUsername(pathState)
  }else if(!getAuthorityUsername){
    return <Redirect to="/login" />
  }else{
    setUsername(getAuthorityUsername)
  }

  return(
    <Switch>
      <Route path="/app/chart" component={ChartContent} />
      <Redirect to="/" />
    </Switch>
  )
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