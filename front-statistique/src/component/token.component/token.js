import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "../../scripts/css/inner.layout.css";
import "../../scripts/css/layout.css";
import "../../scripts/css/inner.form.css";
import "../../scripts/css/echeances.css";
import ProfileCard from "./tokenCard";
import TokenMintBurn from "./tokenMintBurn";

import NavBar from "../../Menu/navBar";
//Still static !!!!
class Token extends Component {
  render() {
    return (
      <article id="wrapper">
        <NavBar position={7} />
        <section id="content2" className="workspace">
          <div className="content2-wrapper">
            <ProfileCard></ProfileCard>
            <TokenMintBurn />
          </div>
        </section>
      </article>
    );
  }
}

export default Token;
