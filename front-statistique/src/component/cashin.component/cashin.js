import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "../../scripts/css/inner.layout.css";
import "../../scripts/css/layout.css";
import "../../scripts/css/inner.form.css";
import NavBar from "../../Menu/navBar";
import CashinCapital from "./cashinCapital";
import CashinCapitalMonth from "./cashinCapitalMonth";
import CashinCapitalYear from "./cashinCapitalYear";
import CashinCapitalWeek from "./cashinCapitalWeek";
import CashinUtilisation from "./cashinUtilisation";
import CashinWebMobile from "./cashinWebMobile";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CashinUtilisationWeek from "./cashinUtilisationWeek";
import CashinUtilisationMonth from "./cashinUtilisationMonth";
import CashinUtilisationYear from "./cashinUtilisationYear";
import CashinWebMobileWeek from "./cashinWebMobileWeek";
import CashinWebMobileMonth from "./cashinWebMobileMonth";
import CashinWebMobileYear from "./cashinWebMobileYear";
import CashinSexWeek from "./cashinSexWeek";
import CashinSexMonth from "./cashinSexMonth";
import CashinSexYear from "./cashinSexYear";
import CashinSex from "./cashinSex";
import CashinAgeWeek from "./cashinAgeWeek";
import CashinAgeMonth from "./cashinAgeMonth";
import CashinAgeYear from "./cashinAgeYear";
import CashinAge from "./cashinAge";
import CashinProfession from "./cashinProfession";
import CashinProfessionWeek from "./cashinProfessionWeek";
import CashinProfessionMonth from "./cashinProfessionMonth";
import CashinProfessionYear from "./cashinProfessionYear";
import CashinMontantPourcentage from "./cashinMontantPourcentage";
import Card from "@material-ui/core/Card";

import "@reach/listbox/styles.css";
class Cashin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myVar : "",
      componentsCapital: {
        CashinCapital: <CashinCapital select={localStorage.getItem('agence')}/>,
        CashinCapitalWeek: <CashinCapitalWeek select={localStorage.getItem('agence')}/>,
        CashinCapitalMonth: <CashinCapitalMonth select={localStorage.getItem('agence')}/>,
        CashinCapitalYear: <CashinCapitalYear select={localStorage.getItem('agence')}/>,
      },
      displayedCapital: "CashinCapitalYear",
      componentsUtilisation: {
        CashinUtilisation: <CashinUtilisation select={localStorage.getItem('agence')}/>,
        CashinUtilisationWeek: <CashinUtilisationWeek select={localStorage.getItem('agence')} />,
        CashinUtilisationMonth: <CashinUtilisationMonth select={localStorage.getItem('agence')}/>,
        CashinUtilisationYear: <CashinUtilisationYear select={localStorage.getItem('agence')}/>,
      },
      displayedUtilisation: "CashinUtilisationYear",
      componentsWebMobile: {
        CashinWebMobile: <CashinWebMobile select={localStorage.getItem('agence')} />,
        CashinWebMobileWeek: <CashinWebMobileWeek select={localStorage.getItem('agence')}/>,
        CashinWebMobileMonth: <CashinWebMobileMonth select={localStorage.getItem('agence')}/>,
        CashinWebMobileYear: <CashinWebMobileYear select={localStorage.getItem('agence')}/>,
      },
      displayedWebMobile: "CashinWebMobileYear",
      componentsSex: {
        CashinSex: <CashinSex select={localStorage.getItem('agence')}/>,
        CashinSexWeek: <CashinSexWeek select={localStorage.getItem('agence')}/>,
        CashinSexMonth: <CashinSexMonth select={localStorage.getItem('agence')}/>,
        CashinSexYear: <CashinSexYear select={localStorage.getItem('agence')}/>,
      },
      displayedSex: "CashinSexYear",
      componentsAge: {
        CashinAge: <CashinAge select={localStorage.getItem('agence')}/>,
        CashinAgeWeek: <CashinAgeWeek select={localStorage.getItem('agence')}/>,
        CashinAgeMonth: <CashinAgeMonth select={localStorage.getItem('agence')}/>,
        CashinAgeYear: <CashinAgeYear select={localStorage.getItem('agence')}/>,
      },
      displayedAge: "CashinAgeYear",
      componentsProfession: {
        CashinProfession: <CashinProfession select={localStorage.getItem('agence')}/>,
        CashinProfessionWeek: <CashinProfessionWeek select={localStorage.getItem('agence')}/>,
        CashinProfessionMonth: <CashinProfessionMonth select={localStorage.getItem('agence')}/>,
        CashinProfessionYear: <CashinProfessionYear select={localStorage.getItem('agence')}/>,
      },
      displayedProfession: "CashinProfessionYear",
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
                        "CashinUtilisation"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "CashinUtilisationWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "CashinUtilisationMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "CashinUtilisationYear"
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
                        "CashinCapital"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "CashinCapitalWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "CashinCapitalMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "CashinCapitalYear"
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
                        "CashinWebMobile"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "CashinWebMobileWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "CashinWebMobileMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "CashinWebMobileYear"
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
                        "CashinProfession"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "CashinProfessionWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "CashinProfessionMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "CashinProfessionYear"
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
                    <Button onClick={this.displaySex.bind(this, "CashinSex")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "CashinSexWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "CashinSexMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "CashinSexYear")}
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
                    <Button onClick={this.displayAge.bind(this, "CashinAge")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "CashinAgeWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "CashinAgeMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "CashinAgeYear")}
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
                <CashinMontantPourcentage select={localStorage.getItem('agence')}></CashinMontantPourcentage>
              </div>
            </Card>
          </section>
        </section>
      </article>
    );
  }
}

export default Cashin;
