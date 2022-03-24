import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { Button } from "shards-react";
import "../scripts/css/layout.css";
import "../scripts/css/signup.css";
import "../scripts/css/transfer.css";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class Inscription extends Component {
  submit = () => {
    const user = {
      firstname : this.state.firstname,
      lastname : this.state.lastname,
      email: this.state.email ,
      username : this.state.username,
      Address : this.state.Address,
      password : this.state.password 
    };
    console.log(user);
    
    axios.post(`http://18.233.98.67:3001/adherentsignup`, user)
      .then(res => {
     
        console.log(res);
        console.log(res.data);  
      })
      .catch(error => { if(error.response.status ===800) {
        console.log(error.response);
        
      }
     
      })
    confirmAlert({
      title: 'Confirmation de l inscription',
      message: 'votre compte est crée avec succeé',
      buttons: [
        {
          label: 'Ok',
          
          onClick: () => {this.props.history.push('/');
          
        }
        },
        
      ]
    });
  };
  state = { redirect: null };
  state = {
    firstname : '',
    lastname : '',
    email : '',
    username : '',
    Address : '',
    password : '',

   
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      firstname : this.state.firstname,
      lastname : this.state.lastname,
      email: this.state.email ,
      username : this.state.username,
      Address : this.state.Address,
      password : this.state.password 
    };
    console.log(user);
    
    axios.post(`http://18.233.98.67:3001/adherentsignup`, user)
      .then(res => {
     
        console.log(res);
        console.log(res.data);  
      })
      .catch(error => { if(error.response.status ===800) {
        console.log(error.response);
        
      }
     
      })
      
      
  }

  render() {
    return (
      <div id="wrapper3">
        <header>
          <div id="logo"></div>
          <h1>Créer un compte </h1>
        </header>
        <section>
          <form >
            <div className="form-field3s">
              <div className="form-field3set">
                <div className="form-field3">
                  <label htmlFor="form-field3-firstname">Prénom</label>
                  <input
                    type="text"
                    id="firstname"
                    className="field"
                    name="firstname"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-field3">
                  <label htmlFor="form-field3-lastname">Nom</label>
                  <input
                    type="text"
                    id="lastname"
                    className="field"
                    name="lastname"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="form-field3set">
                <div className="form-field3">
                  <label htmlFor="form-field3-email">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="field"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-field3set">
                  <div className="form-field3">
                    <label htmlFor="form-field3-username">Nom d'utilisateur</label>
                    <input
                      type="text"
                      id="username"
                      className="field"
                      name="username"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-field3set">
                  <div className="form-field3">
                    <label htmlFor="form-field3-Address">Adress</label>
                    <input
                      type="text"
                      id="Address"
                      className="field"
                      name="adress"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-field3">
                  <label htmlFor="form-field3-password">Mot de passe</label>
                  <input
                    type="password"
                    id="password"
                    className="field"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-field3">
                  <label htmlFor="form-field3-password-confirmation">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    id="form-field3-password-confirmation"
                    className="field"
                  />
                </div>
              </div>


              <Button onClick={this.submit} className="form-submit" theme="light">
                
                S'inscrire
              
              </Button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default Inscription;
