import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

// import "../../scripts/css/inner.layout.css";
// import "../../scripts/css/layout.css";

import NavBar from "../../Menu/navBar";
import "../../scripts/css/home.css";
import HomeUtilisation from "./homeUtilisation";
import HomeUtilisationWeek from "./homeUtilisationWeek";
import HomeUtilisationMonth from "./homeUtilisationMonth";
import HomeUtilisationYear from "./homeUtilisationYear";
import TableauRecap from "./homeTable";
import HomeCapital from "./homeCapital";
import HomeCapitalWeek from "./homeCapitalWeek";
import HomeCapitalMonth from "./homeCapitalMonth";
import HomeCapitalYear from "./homeCapitalYear";
import TableauRecapMonth from "./homeTableMonth";
import HomeMontantPourcentage from "./homeMontantPourcentage";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import axios from "axios";
// import HomeWebMobile from "./homeWebMobile";

// import HomeUsers from "./homeUsers";
import Card from "@material-ui/core/Card";

class Home extends Component {
  constructor(props) {
    super(props);
    axios.get('http://3.88.223.95:3006/Tontine/updateTontine')
    this.state = {
      componentsTableau: {
        TableauRecap: <TableauRecap select={localStorage.getItem("agence")} />,
        TableauRecapMonth: (
          <TableauRecapMonth select={localStorage.getItem("agence")} />
        ),
      },
      displayedTableau: "TableauRecap",
      componentsCapital: {
        HomeCapital: <HomeCapital select={localStorage.getItem("agence")} />,
        HomeCapitalWeek: (
          <HomeCapitalWeek select={localStorage.getItem("agence")} />
        ),
        HomeCapitalMonth: (
          <HomeCapitalMonth select={localStorage.getItem("agence")} />
        ),
        HomeCapitalYear: (
          <HomeCapitalYear select={localStorage.getItem("agence")} />
        ),
      },
      displayedCapital: "HomeCapitalYear",
      componentsUtilisation: {
        HomeUtilisation: (
          <HomeUtilisation select={localStorage.getItem("agence")} />
        ),
        HomeUtilisationWeek: (
          <HomeUtilisationWeek select={localStorage.getItem("agence")} />
        ),
        HomeUtilisationMonth: (
          <HomeUtilisationMonth select={localStorage.getItem("agence")} />
        ),
        HomeUtilisationYear: (
          <HomeUtilisationYear select={localStorage.getItem("agence")} />
        ),
      },
      displayedUtilisation: "HomeUtilisationYear",
    };
  }
  displayTableau(tableau) {
    this.setState({ displayedTableau: tableau });
  }
  displayCapital(capital) {
    this.setState({ displayedCapital: capital });
  }
  displayUtilisation(utilisation) {
    this.setState({ displayedUtilisation: utilisation });
  }
  render() {
    const cardStyle = {
      display: "inline-block",
      margin: "0 1px",
      transform: "scale(0.8)",
      minWidth: 275,
      border: `2px solid black`,
      padding: "0 20px",
      paddingTop: "50px",
    };
    return (
      <article id="wrapper">
        <NavBar position={7} />

        <section id="content2" className="workspace">
          <section id="content2" className="workspace">
            <Card style={cardStyle}>
              <div className="content2-wrapper">
                <div className="content2-wrapper">
                  {this.state.componentsTableau[this.state.displayedTableau]}
                  <div className="App" style={{ textAlign: "center" }}>
                    <ButtonGroup
                      size="large"
                      aria-label="small outlined button group"
                    >
                      <Button
                        onClick={this.displayTableau.bind(this, "TableauRecap")}
                      >
                        Jour
                      </Button>
                      <Button
                        onClick={this.displayTableau.bind(
                          this,
                          "TableauRecapMonth"
                        )}
                      >
                        Mois
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            </Card>
          </section>
          <section id="content2" className="workspace2">
            <div className="content2-wrapper">
              <Card style={cardStyle}>
                <div className="content2-wrapper">
                  {this.state.componentsCapital[this.state.displayedCapital]}
                  <div className="App" style={{ textAlign: "center" }}>
                    <ButtonGroup
                      size="large"
                      aria-label="small outlined button group"
                    >
                      <Button
                        onClick={this.displayCapital.bind(this, "HomeCapital")}
                      >
                        Jour
                      </Button>
                      <Button
                        onClick={this.displayCapital.bind(
                          this,
                          "HomeCapitalWeek"
                        )}
                      >
                        Semaine
                      </Button>
                      <Button
                        onClick={this.displayCapital.bind(
                          this,
                          "HomeCapitalMonth"
                        )}
                      >
                        Mois
                      </Button>
                      <Button
                        onClick={this.displayCapital.bind(
                          this,
                          "HomeCapitalYear"
                        )}
                      >
                        Année
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </Card>
            </div>
            <div className="content2-wrapper">
              <Card style={cardStyle}>
                <div className="content2-wrapper">
                  {
                    this.state.componentsUtilisation[
                      this.state.displayedUtilisation
                    ]
                  }
                  <div className="App" style={{ textAlign: "center" }}>
                    <ButtonGroup
                      size="large"
                      aria-label="small outlined button group"
                    >
                      <Button
                        onClick={this.displayUtilisation.bind(
                          this,
                          "HomeUtilisation"
                        )}
                      >
                        Jour
                      </Button>
                      <Button
                        onClick={this.displayUtilisation.bind(
                          this,
                          "HomeUtilisationWeek"
                        )}
                      >
                        Semaine
                      </Button>
                      <Button
                        onClick={this.displayUtilisation.bind(
                          this,
                          "HomeUtilisationMonth"
                        )}
                      >
                        Mois
                      </Button>
                      <Button
                        onClick={this.displayUtilisation.bind(
                          this,
                          "HomeUtilisationYear"
                        )}
                      >
                        Année
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </Card>
            </div>
          </section>
          <section id="content2" className="workspace">
            <div className="content2-wrapper">
              <Card style={cardStyle}>
                <HomeMontantPourcentage
                  select={localStorage.getItem("agence")}
                />
              </Card>
            </div>
          </section>
        </section>
      </article>
    );
  }
}

export default Home;
