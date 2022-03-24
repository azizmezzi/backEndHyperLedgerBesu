import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "../../scripts/css/inner.layout.css";
import "../../scripts/css/layout.css";


import "../../scripts/css/home.css";

class HomeWeek extends Component {

  render() {

    return (
      <article id="wrapper">
        <NavBar position={7} />
        <section id="content2" className="workspace">
          <div className="content2-wrapper">
            <h1>WEEK</h1>
          </div>
        </section>
       

      </article>
    );
  }
}

export default HomeWeek;
