

import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "../../scripts/css/inner.layout.css";
import "../../scripts/css/layout.css";
import "../../scripts/css/inner.form.css";
import NavBar from "../../Menu/navBar";
import TontineCapital from "./tontineCapital";
import TontineCapitalMonth from "./tontineCapitalMonth";
import TontineCapitalYear from "./tontineCapitalYear";
import TontineCapitalWeek from "./tontineCapitalWeek";
import TontineUtilisation from "./tontineUtilisation";
import TontineWebMobile from "./tontineWebMobile";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TontineUtilisationWeek from "./tontineUtilisationWeek";
import TontineUtilisationMonth from "./tontineUtilisationMonth";
import TontineUtilisationYear from "./tontineUtilisationYear";
import TontineWebMobileWeek from "./tontineWebMobileWeek";
import TontineWebMobileMonth from "./tontineWebMobileMonth";
import TontineWebMobileYear from "./tontineWebMobileYear";
import TontineSexWeek from "./tontineSexWeek";
import TontineSexMonth from "./tontineSexMonth";
import TontineSexYear from "./tontineSexYear";
import TontineSex from "./tontineSex";
import TontineAgeWeek from "./tontineAgeWeek";
import TontineAgeMonth from "./tontineAgeMonth";
import TontineAgeYear from "./tontineAgeYear";
import TontineAge from "./tontineAge";
import TontineProfession from "./tontineProfession";
import TontineProfessionWeek from "./tontineProfessionWeek";
import TontineProfessionMonth from "./tontineProfessionMonth";
import TontineProfessionYear from "./tontineProfessionYear";
import TontineEtat from "./tontineEtat";
import TontineEtatWeek from "./tontineEtatWeek";
import TontineEtatMonth from "./tontineEtatMonth";
import TontineEtatYear from "./tontineEtatYear";
import TontineMontantPourcentage from "./tontineMontantPourcentage";
import Card from "@material-ui/core/Card";
import axios from "axios";
import "@reach/listbox/styles.css";
class Tontine extends Component {
  constructor(props) {
    super(props);
    axios.get('http://3.88.223.95:3006/Tontine/updateTontine')
    this.state = {
      componentsCapital: {
        TontineCapital: <TontineCapital select={localStorage.getItem('agence')}/>,
        TontineCapitalWeek: <TontineCapitalWeek select={localStorage.getItem('agence')}/>,
        TontineCapitalMonth: <TontineCapitalMonth select={localStorage.getItem('agence')}/>,
        TontineCapitalYear: <TontineCapitalYear select={localStorage.getItem('agence')}/>,
      },
      displayedCapital: "TontineCapitalYear",
      componentsUtilisation: {
        TontineUtilisation: <TontineUtilisation select={localStorage.getItem('agence')}/>,
        TontineUtilisationWeek: <TontineUtilisationWeek select={localStorage.getItem('agence')}/>,
        TontineUtilisationMonth: <TontineUtilisationMonth select={localStorage.getItem('agence')}/>,
        TontineUtilisationYear: <TontineUtilisationYear select={localStorage.getItem('agence')}/>,
      },
      displayedUtilisation: "TontineUtilisationYear",
      componentsWebMobile: {
        TontineWebMobile: <TontineWebMobile select={localStorage.getItem('agence')}/>,
        TontineWebMobileWeek: <TontineWebMobileWeek select={localStorage.getItem('agence')}/>,
        TontineWebMobileMonth: <TontineWebMobileMonth select={localStorage.getItem('agence')}/>,
        TontineWebMobileYear: <TontineWebMobileYear select={localStorage.getItem('agence')}/>,
      },
      displayedWebMobile: "TontineWebMobileYear",
      componentsSex: {
        TontineSex: <TontineSex select={localStorage.getItem('agence')}/>,
        TontineSexWeek: <TontineSexWeek select={localStorage.getItem('agence')}/>,
        TontineSexMonth: <TontineSexMonth select={localStorage.getItem('agence')}/>,
        TontineSexYear: <TontineSexYear select={localStorage.getItem('agence')}/>,
      },
      displayedSex: "TontineSexYear",
      componentsAge: {
        TontineAge: <TontineAge select={localStorage.getItem('agence')}/>,
        TontineAgeWeek: <TontineAgeWeek select={localStorage.getItem('agence')}/>,
        TontineAgeMonth: <TontineAgeMonth select={localStorage.getItem('agence')}/>,
        TontineAgeYear: <TontineAgeYear select={localStorage.getItem('agence')}/>,
      },
      displayedAge: "TontineAgeYear",
      componentsProfession: {
        TontineProfession: <TontineProfession select={localStorage.getItem('agence')}/>,
        TontineProfessionWeek: <TontineProfessionWeek select={localStorage.getItem('agence')}/>,
        TontineProfessionMonth: <TontineProfessionMonth select={localStorage.getItem('agence')}/>,
        TontineProfessionYear: <TontineProfessionYear select={localStorage.getItem('agence')}/>,
      },
      displayedProfession: "TontineProfessionYear",
            componentsEtat: {
        TontineEtat: <TontineEtat select={localStorage.getItem('agence')}/>,
        TontineEtatWeek: <TontineEtatWeek select={localStorage.getItem('agence')}/>,
        TontineEtatMonth: <TontineEtatMonth select={localStorage.getItem('agence')}/>,
        TontineEtatYear: <TontineEtatYear select={localStorage.getItem('agence')}/>,
      },
      displayedEtat: "TontineEtatYear",
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
    displayEtat(etat) {
    this.setState({ displayedEtat: etat });
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
                        "TontineUtilisation"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "TontineUtilisationWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "TontineUtilisationMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "TontineUtilisationYear"
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
                        "TontineCapital"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "TontineCapitalWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "TontineCapitalMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "TontineCapitalYear"
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
                        "TontineWebMobile"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "TontineWebMobileWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "TontineWebMobileMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "TontineWebMobileYear"
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
                        "TontineProfession"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "TontineProfessionWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "TontineProfessionMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "TontineProfessionYear"
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
                    <Button onClick={this.displaySex.bind(this, "TontineSex")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "TontineSexWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "TontineSexMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "TontineSexYear")}
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
                    <Button onClick={this.displayAge.bind(this, "TontineAge")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "TontineAgeWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "TontineAgeMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "TontineAgeYear")}
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
          <section id="content2" className="workspace2">
            <Card style={cardStyle}>
              <div className="content2-wrapper">
                <TontineMontantPourcentage  select={localStorage.getItem('agence')}></TontineMontantPourcentage>
              </div>
            </Card>
     
          <Card style={cardStyle}>
           <div className="content2-wrapper">
        
          {this.state.componentsEtat[this.state.displayedEtat]}
           <div className="App" style={{ textAlign: "center" }}>
              <ButtonGroup
                size="large"
                aria-label="small outlined button group"
              >
                <Button onClick={this.displayEtat.bind(this, "TontineEtat")}>
                  Jour
                </Button>
                <Button onClick={this.displayEtat.bind(this, "TontineEtatWeek")}>
                  Semaine
                </Button>
                <Button
                  onClick={this.displayEtat.bind(this, "TontineEtatMonth")}
                >
                  Mois
                </Button>
                <Button onClick={this.displayEtat.bind(this, "TontineEtatYear")}>
                  Année
                </Button>
              </ButtonGroup>
            </div>
                </div>
          </Card>
        </section>
      </section>
      </article>
    );
  }
}

export default Tontine;
