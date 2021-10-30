import './App.css';
import React,{Component} from 'react';
import LandingPage from './components/landing-page/landing-page';
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";
import Nav from './components/nav/nav';
import PrivateRoute from './components/private-route/private-route';

class App extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <Router>
      <div>
        <hr/>
        <Switch>
                <Route exact path='/' component={LandingPage}/>
                <PrivateRoute exact path='/post' component={Nav}/>
        </Switch>

      </div>
    </Router>

    );

  }
}



export default App;
