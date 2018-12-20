import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './login';
import ChartRoom from './chart';  

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/chart/" component={ChartRoom} />
    </div>
  </Router>
);

export default AppRouter;

