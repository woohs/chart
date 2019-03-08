import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Login from './login';
import App from './App';
import BackGroupCanvas from '../components/bg_canvas'
import ChartContent from './chart';  

const AppRouter = () => (
  <div>
    <BackGroupCanvas />
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} /> 
        <Route path="/app/chart" component={ChartContent} />
        <Redirect to="/" />
        
      </Switch>
    </Router>
  </div>
);

export default AppRouter;

