import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
//import { Button } from "shards-react";
import "./scripts/css/layout.css";
//import Cashin from "./component/cashin";
import "./scripts/css/index.css";
import "./scripts/css/transfer.css";
import {Router} from 'react-router-dom' ;
import Routes from './routes/index';
import history from './services/history';



class App extends Component {
  state = {
    view : true
  }

  resetView = ()=>{
    this.setState({view : false})
  }
  render() {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    
      
    );
  }
}

export default App;
