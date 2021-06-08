import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// Component Imports
import Home from './components/Home'
import Main from './components/Main'
import NotFound from './components/Not_Found';

function App() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Home }></Route>
          <Route exact path="/search" component={ Main }></Route>
          <Route path="/search/:searchTerm" component={ Main }></Route>
          <Route component={ NotFound }/>
        </Switch>
      </Router>
    );
}
  
export default App;
