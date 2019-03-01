import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './login';
import App from './App';
import BackGroupCanvas from '../components/bg_canvas'


const AppRouter = () => (
  <div>
    <BackGroupCanvas />
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/login" component={Login} /> 
      </div>
    </Router>
  </div>
);

export default AppRouter;

