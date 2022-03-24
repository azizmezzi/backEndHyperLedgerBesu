import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "../../scripts/css/inner.layout.css";
import "../../scripts/css/layout.css";
import "../../scripts/css/inner.form.css";
import NavBar from "../../Menu/navBar";
import EcheanceCapital from "./echeanceCapital";
import EcheanceCapitalMonth from "./echeanceCapitalMonth";
import EcheanceCapitalYear from "./echeanceCapitalYear";
import EcheanceCapitalWeek from "./echeanceCapitalWeek";
import EcheanceUtilisation from "./echeanceUtilisation";
import EcheanceWebMobile from "./echeanceWebMobile";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EcheanceUtilisationWeek from "./echeanceUtilisationWeek";
import EcheanceUtilisationMonth from "./echeanceUtilisationMonth";
import EcheanceUtilisationYear from "./echeanceUtilisationYear";
import EcheanceWebMobileWeek from "./echeanceWebMobileWeek";
import EcheanceWebMobileMonth from "./echeanceWebMobileMonth";
import EcheanceWebMobileYear from "./echeanceWebMobileYear";
import EcheanceSexWeek from "./echeanceSexWeek";
import EcheanceSexMonth from "./echeanceSexMonth";
import EcheanceSexYear from "./echeanceSexYear";
import EcheanceSex from "./echeanceSex";
import EcheanceAgeWeek from "./echeanceAgeWeek";
import EcheanceAgeMonth from "./echeanceAgeMonth";
import EcheanceAgeYear from "./echeanceAgeYear";
import EcheanceAge from "./echeanceAge";
import EcheanceProfession from "./echeanceProfession";
import EcheanceProfessionWeek from "./echeanceProfessionWeek";
import EcheanceProfessionMonth from "./echeanceProfessionMonth";
import EcheanceProfessionYear from "./echeanceProfessionYear";
import EcheanceMontantPourcentage from "./echeanceMontantPourcentage";
import Card from "@material-ui/core/Card";

import "@reach/listbox/styles.css";
class Echeance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myVar : "",
      componentsCapital: {
        EcheanceCapital: <EcheanceCapital select={localStorage.getItem('agence')}/>,
        EcheanceCapitalWeek: <EcheanceCapitalWeek select={localStorage.getItem('agence')}/>,
        EcheanceCapitalMonth: <EcheanceCapitalMonth select={localStorage.getItem('agence')}/>,
        EcheanceCapitalYear: <EcheanceCapitalYear select={localStorage.getItem('agence')}/>,
      },
      displayedCapital: "EcheanceCapitalYear",
      componentsUtilisation: {
        EcheanceUtilisation: <EcheanceUtilisation select={localStorage.getItem('agence')}/>,
        EcheanceUtilisationWeek: <EcheanceUtilisationWeek select={localStorage.getItem('agence')} />,
        EcheanceUtilisationMonth: <EcheanceUtilisationMonth select={localStorage.getItem('agence')}/>,
        EcheanceUtilisationYear: <EcheanceUtilisationYear select={localStorage.getItem('agence')}/>,
      },
      displayedUtilisation: "EcheanceUtilisationYear",
      componentsWebMobile: {
        EcheanceWebMobile: <EcheanceWebMobile select={localStorage.getItem('agence')} />,
        EcheanceWebMobileWeek: <EcheanceWebMobileWeek select={localStorage.getItem('agence')}/>,
        EcheanceWebMobileMonth: <EcheanceWebMobileMonth select={localStorage.getItem('agence')}/>,
        EcheanceWebMobileYear: <EcheanceWebMobileYear select={localStorage.getItem('agence')}/>,
      },
      displayedWebMobile: "EcheanceWebMobileYear",
      componentsSex: {
        EcheanceSex: <EcheanceSex select={localStorage.getItem('agence')}/>,
        EcheanceSexWeek: <EcheanceSexWeek select={localStorage.getItem('agence')}/>,
        EcheanceSexMonth: <EcheanceSexMonth select={localStorage.getItem('agence')}/>,
        EcheanceSexYear: <EcheanceSexYear select={localStorage.getItem('agence')}/>,
      },
      displayedSex: "EcheanceSexYear",
      componentsAge: {
        EcheanceAge: <EcheanceAge select={localStorage.getItem('agence')}/>,
        EcheanceAgeWeek: <EcheanceAgeWeek select={localStorage.getItem('agence')}/>,
        EcheanceAgeMonth: <EcheanceAgeMonth select={localStorage.getItem('agence')}/>,
        EcheanceAgeYear: <EcheanceAgeYear select={localStorage.getItem('agence')}/>,
      },
      displayedAge: "EcheanceAgeYear",
      componentsProfession: {
        EcheanceProfession: <EcheanceProfession select={localStorage.getItem('agence')}/>,
        EcheanceProfessionWeek: <EcheanceProfessionWeek select={localStorage.getItem('agence')}/>,
        EcheanceProfessionMonth: <EcheanceProfessionMonth select={localStorage.getItem('agence')}/>,
        EcheanceProfessionYear: <EcheanceProfessionYear select={localStorage.getItem('agence')}/>,
      },
      displayedProfession: "EcheanceProfessionYear",
    };
  }
  displayCapital(capital) {
    this.setState({ displayedCapital: capital });
  }
  displayUtilisation(utilisation) {
    this.setState({ displayedUtilisation: utilisation });
  }
  displayWebMobile(webMobile) {
    this.setState({ displayedWebMobile: webMobile });
  }
  displaySex(sex) {
    this.setState({ displayedSex: sex });
  }
  displayAge(age) {
    this.setState({ displayedAge: age });
  }
  displayProfession(profession) {
    this.setState({ displayedProfession: profession });
  }
  componentDidMount() {

    this.setState({myVar : localStorage.getItem('agence')})
  }
  render() {
    const cardStyle = {
      display: "inline-block",
      margin: "0 1px",
      transform: "scale(0.8)",
      minWidth: 275,
      border: `2px solid black`,
      padding : "0 20px",
      paddingTop: '50px',
    };
    return (
      <article id="wrapper">
        <NavBar position={7} />

        <section id="content2" className="workspace">
          <section id="content2" className="workspace2">
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
                        "EcheanceUtilisation"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "EcheanceUtilisationWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "EcheanceUtilisationMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "EcheanceUtilisationYear"
                      )}
                    >
                      Année
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Card>

            <Card style={cardStyle}>
              <div
                className="content2-wrapper"
                style={{ backgroundColor: "white" }}
              >
                {this.state.componentsCapital[this.state.displayedCapital]}
                <div className="App" style={{ textAlign: "center" }}>
                  <ButtonGroup
                    size="large"
                    aria-label="small outlined button group"
                  >
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "EcheanceCapital"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "EcheanceCapitalWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "EcheanceCapitalMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "EcheanceCapitalYear"
                      )}
                    >
                      Année
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Card>
          </section>
          <section id="content2" className="workspace2">
            <Card style={cardStyle}>
              <div
                className="content2-wrapper"
                style={{ backgroundColor: "white" }}
              >
                {this.state.componentsWebMobile[this.state.displayedWebMobile]}
                <div className="App" style={{ textAlign: "center" }}>
                  <ButtonGroup
                    size="large"
                    aria-label="small outlined button group"
                  >
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "EcheanceWebMobile"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "EcheanceWebMobileWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "EcheanceWebMobileMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "EcheanceWebMobileYear"
                      )}
                    >
                      Année
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Card>

            <Card style={cardStyle}>
              <div
                className="content2-wrapper"
                style={{ backgroundColor: "white" }}
              >
                {
                  this.state.componentsProfession[
                    this.state.displayedProfession
                  ]
                }
                <div className="App" style={{ textAlign: "center" }}>
                  <ButtonGroup
                    size="large"
                    aria-label="small outlined button group"
                  >
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "EcheanceProfession"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "EcheanceProfessionWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "EcheanceProfessionMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "EcheanceProfessionYear"
                      )}
                    >
                      Année
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Card>
            <Card style={cardStyle}>
              <div className="content2-wrapper">
                {this.state.componentsSex[this.state.displayedSex]}
                <div className="App" style={{ textAlign: "center" }}>
                  <ButtonGroup
                    size="large"
                    aria-label="small outlined button group"
                  >
                    <Button onClick={this.displaySex.bind(this, "EcheanceSex")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "EcheanceSexWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "EcheanceSexMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "EcheanceSexYear")}
                    >
                      Année
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Card>
            <Card style={cardStyle}>
              <div
                className="content2-wrapper"
                style={{ backgroundColor: "white" }}
              >
                {this.state.componentsAge[this.state.displayedAge]}
                <div className="App" style={{ textAlign: "center" }}>
                  <ButtonGroup
                    size="large"
                    aria-label="small outlined button group"
                  >
                    <Button onClick={this.displayAge.bind(this, "EcheanceAge")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "EcheanceAgeWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "EcheanceAgeMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "EcheanceAgeYear")}
                    >
                      Année
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Card>
          </section>
      
          <section id="content2" className="workspace2">
            
          </section>
          <section id="content2" className="workspace">
            <Card style={cardStyle}>
              <div className="content2-wrapper">
                <EcheanceMontantPourcentage select={localStorage.getItem('agence')}></EcheanceMontantPourcentage>
              </div>
            </Card>
          </section>
        </section>
      </article>
    );
  }
}

export default Echeance;
