import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "../scripts/css/inner.layout.css";

import "../scripts/css/layout.css";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class NavBar extends Component {
  state = {
    position: 7,
    select: localStorage.getItem("agence"),
  };
  handleChange = (e) => {
    this.setState({ select: e.target.value });
    localStorage.setItem("agence", e.target.value);
    console.log(e.target);
    window.location.reload(false);
  };

  render() {
    return (
      <section id="menu">
        <div className="menu-wrapper">
          <header>
            <Link to="home" className="logo"></Link>
            <div className="user">
              <span className="firstname"></span>
              <span className="lastname"></span>
            </div>
          </header>

          <section style={{ textAlign: "center" }}>
            <FormControl style={{}}>
              <InputLabel
                id="demo-controlled-open-select-label"
                style={{ flexDirection: 'row-reverse', color: "White", fontSize: 20 }}
              >
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Choisissez une agence 
              </InputLabel>
        <br/>
        <br/>
              <Select
                style={{ color: "White", fontSize: 15 }}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={this.state.select}
                onChange={this.handleChange}
              >
                <MenuItem value="Tous">
                  <em>Tous</em>
                </MenuItem>
                <MenuItem value={"Ariana"}>Ariana</MenuItem>
                <MenuItem value={"Tunis"}>Tunis</MenuItem>
              </Select>
            </FormControl>
          </section>
          <section>
            <Link
              to="home"
              className={this.props.position === 0 ? "link current" : "link"}
            >
              Home
            </Link>
            <Link
              to="transfer"
              className={this.props.position === 1 ? "link current" : "link"}
            >
              Transfert
            </Link>
            <Link
              to="cashin"
              className={this.props.position === 2 ? "link current" : "link"}
            >
              Cash In
            </Link>
            <Link
              to="cashout"
              className={this.props.position === 3 ? "link current" : "link"}
            >
              Cash Out
            </Link>
            <Link
              to="tontine"
              className={this.props.position === 4 ? "link current" : "link"}
            >
              Tontine
            </Link>
            <Link
              to="echeance"
              className={this.props.position === 5 ? "link current" : "link"}
            >
              Paiment d'échéance
            </Link>
            {/* <Link
              to="token"
              className={this.props.position === 6 ? "link current" : "link"}
            >
              Token
            </Link> */}
          </section>
          <footer>
            <Link to="/" className="link" id="signout-btn">
              Deconnexion
            </Link>
          </footer>
        </div>
      </section>
    );
  }
}

export default NavBar;
