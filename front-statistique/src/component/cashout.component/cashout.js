import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "../../scripts/css/inner.layout.css";
import "../../scripts/css/layout.css";
import "../../scripts/css/inner.form.css";
import NavBar from "../../Menu/navBar";
import CashoutCapital from "./cashoutCapital";
import CashoutCapitalMonth from "./cashoutCapitalMonth";
import CashoutCapitalYear from "./cashoutCapitalYear";
import CashoutCapitalWeek from "./cashoutCapitalWeek";
import CashoutUtilisation from "./cashoutUtilisation";
import CashoutWebMobile from "./cashoutWebMobile";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CashoutUtilisationWeek from "./cashoutUtilisationWeek";
import CashoutUtilisationMonth from "./cashoutUtilisationMonth";
import CashoutUtilisationYear from "./cashoutUtilisationYear";
import CashoutWebMobileWeek from "./cashoutWebMobileWeek";
import CashoutWebMobileMonth from "./cashoutWebMobileMonth";
import CashoutWebMobileYear from "./cashoutWebMobileYear";
import CashoutSexWeek from "./cashoutSexWeek";
import CashoutSexMonth from "./cashoutSexMonth";
import CashoutSexYear from "./cashoutSexYear";
import CashoutSex from "./cashoutSex";
import CashoutAgeWeek from "./cashoutAgeWeek";
import CashoutAgeMonth from "./cashoutAgeMonth";
import CashoutAgeYear from "./cashoutAgeYear";
import CashoutAge from "./cashoutAge";
import CashoutProfession from "./cashoutProfession";
import CashoutProfessionWeek from "./cashoutProfessionWeek";
import CashoutProfessionMonth from "./cashoutProfessionMonth";
import CashoutProfessionYear from "./cashoutProfessionYear";
import CashoutMontantPourcentage from "./cashoutMontantPourcentage";
import Card from "@material-ui/core/Card";

import "@reach/listbox/styles.css";
class Cashout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myVar : "",
      componentsCapital: {
        CashoutCapital: <CashoutCapital select={localStorage.getItem('agence')}/>,
        CashoutCapitalWeek: <CashoutCapitalWeek select={localStorage.getItem('agence')}/>,
        CashoutCapitalMonth: <CashoutCapitalMonth select={localStorage.getItem('agence')}/>,
        CashoutCapitalYear: <CashoutCapitalYear select={localStorage.getItem('agence')}/>,
      },
      displayedCapital: "CashoutCapitalYear",
      componentsUtilisation: {
        CashoutUtilisation: <CashoutUtilisation select={localStorage.getItem('agence')}/>,
        CashoutUtilisationWeek: <CashoutUtilisationWeek select={localStorage.getItem('agence')} />,
        CashoutUtilisationMonth: <CashoutUtilisationMonth select={localStorage.getItem('agence')}/>,
        CashoutUtilisationYear: <CashoutUtilisationYear select={localStorage.getItem('agence')}/>,
      },
      displayedUtilisation: "CashoutUtilisationYear",
      componentsWebMobile: {
        CashoutWebMobile: <CashoutWebMobile select={localStorage.getItem('agence')} />,
        CashoutWebMobileWeek: <CashoutWebMobileWeek select={localStorage.getItem('agence')}/>,
        CashoutWebMobileMonth: <CashoutWebMobileMonth select={localStorage.getItem('agence')}/>,
        CashoutWebMobileYear: <CashoutWebMobileYear select={localStorage.getItem('agence')}/>,
      },
      displayedWebMobile: "CashoutWebMobileYear",
      componentsSex: {
        CashoutSex: <CashoutSex select={localStorage.getItem('agence')}/>,
        CashoutSexWeek: <CashoutSexWeek select={localStorage.getItem('agence')}/>,
        CashoutSexMonth: <CashoutSexMonth select={localStorage.getItem('agence')}/>,
        CashoutSexYear: <CashoutSexYear select={localStorage.getItem('agence')}/>,
      },
      displayedSex: "CashoutSexYear",
      componentsAge: {
        CashoutAge: <CashoutAge select={localStorage.getItem('agence')}/>,
        CashoutAgeWeek: <CashoutAgeWeek select={localStorage.getItem('agence')}/>,
        CashoutAgeMonth: <CashoutAgeMonth select={localStorage.getItem('agence')}/>,
        CashoutAgeYear: <CashoutAgeYear select={localStorage.getItem('agence')}/>,
      },
      displayedAge: "CashoutAgeYear",
      componentsProfession: {
        CashoutProfession: <CashoutProfession select={localStorage.getItem('agence')}/>,
        CashoutProfessionWeek: <CashoutProfessionWeek select={localStorage.getItem('agence')}/>,
        CashoutProfessionMonth: <CashoutProfessionMonth select={localStorage.getItem('agence')}/>,
        CashoutProfessionYear: <CashoutProfessionYear select={localStorage.getItem('agence')}/>,
      },
      displayedProfession: "CashoutProfessionYear",
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
                        "CashoutUtilisation"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "CashoutUtilisationWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "CashoutUtilisationMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "CashoutUtilisationYear"
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
                        "CashoutCapital"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "CashoutCapitalWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "CashoutCapitalMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "CashoutCapitalYear"
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
                        "CashoutWebMobile"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "CashoutWebMobileWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "CashoutWebMobileMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "CashoutWebMobileYear"
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
                        "CashoutProfession"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "CashoutProfessionWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "CashoutProfessionMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "CashoutProfessionYear"
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
                    <Button onClick={this.displaySex.bind(this, "CashoutSex")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "CashoutSexWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "CashoutSexMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "CashoutSexYear")}
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
                    <Button onClick={this.displayAge.bind(this, "CashoutAge")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "CashoutAgeWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "CashoutAgeMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "CashoutAgeYear")}
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
                <CashoutMontantPourcentage select={localStorage.getItem('agence')}></CashoutMontantPourcentage>
              </div>
            </Card>
          </section>
        </section>
      </article>
    );
  }
}

export default Cashout;
