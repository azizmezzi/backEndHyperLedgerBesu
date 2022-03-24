import React, { Component, } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { Button } from "shards-react";
import "../scripts/css/layout.css";
import "../scripts/css/index.css";
import "../scripts/css/transfer.css";
import "../scripts/css/cashout.css";
import { Link } from "react-router-dom";
import axios from "axios";



class Login extends Component {
  
  state = {
    redirect: null,
    email: "",
    password: "",
     rememberMe: false
  };
  

  handleChange = event => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    this.setState({ [event.target.id]: value});
    
    //this.setState({ password: event.target.value});
  };
  componentDidMount() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const email = rememberMe ? localStorage.getItem('email') : '';
    this.setState({ email, rememberMe });
  }

  handleSubmit = event => {
    event.preventDefault();

    const adherent = {
      email: this.state.email,
      password: this.state.password,
      rememberMe : this.state.rememberMe
    };
  //  const { email, rememberMe } = this.state;
  //  localStorage.setItem('rememberMe', rememberMe);
    //localStorage.setItem('email', rememberMe ? email : '');
    
    axios
      .post(`http://18.233.98.67:3001/adherentlogin`, adherent)
      .then(res => {
        
        console.log(res.data.data);

      })
      .catch(error => {
        if (error.response.status === 801) {
          console.log(error.response);
          localStorage.setItem('user',JSON.stringify(error.response.data));

          this.props.history.push("/home");
        }
      });
      
  };

  render() {
    return (
      <div id="wrapper2">
        <header>
          <div id="logo"></div>
        </header>
        <section>
          <form id="login-form">
            <div className="form-field2s">
              <div className="form-field2">
                <label htmlFor="form-field2-email">Email</label>
                <input
                  type="text"
                  id="email"
                  className="field"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-field2">
                <label htmlFor="form-field2-password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="field"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                
              <label>
              <input id="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox"/> Remember me
              </label>
              </div>

              <Button
                onClick={this.handleSubmit}
                className="form-submit"
                theme="light"
              >
                Se connecter
              </Button>
             
             
            </div>
          </form>
          <div>
            <Link to="/Signup"> Créer un compte</Link>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
