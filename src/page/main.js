import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './login';
import ChartRoom from './chart';  
import BackGroupCanvas from '../components/bg_canvas'

const AppRouter = () => (
  <div>
    <BackGroupCanvas />
    <Router>
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/chart/" component={ChartRoom} />
      </div>
    </Router>
  </div>
);

export default AppRouter;

