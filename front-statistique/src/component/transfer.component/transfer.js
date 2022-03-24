import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "../../scripts/css/inner.layout.css";
import "../../scripts/css/layout.css";
import "../../scripts/css/inner.form.css";
import NavBar from "../../Menu/navBar";
import TransferCapital from "./transferCapital";
import TransferCapitalMonth from "./transferCapitalMonth";
import TransferCapitalYear from "./transferCapitalYear";
import TransferCapitalWeek from "./transferCapitalWeek";
import TransferUtilisation from "./transferUtilisation";
import TransferWebMobile from "./transferWebMobile";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TransferUtilisationWeek from "./transferUtilisationWeek";
import TransferUtilisationMonth from "./transferUtilisationMonth";
import TransferUtilisationYear from "./transferUtilisationYear";
import TransferWebMobileWeek from "./transferWebMobileWeek";
import TransferWebMobileMonth from "./transferWebMobileMonth";
import TransferWebMobileYear from "./transferWebMobileYear";
import TransferSexWeek from "./transferSexWeek";
import TransferSexMonth from "./transferSexMonth";
import TransferSexYear from "./transferSexYear";
import TransferSex from "./transferSex";
import TransferAgeWeek from "./transferAgeWeek";
import TransferAgeMonth from "./transferAgeMonth";
import TransferAgeYear from "./transferAgeYear";
import TransferAge from "./transferAge";
import TransferProfession from "./transferProfession";
import TransferProfessionWeek from "./transferProfessionWeek";
import TransferProfessionMonth from "./transferProfessionMonth";
import TransferProfessionYear from "./transferProfessionYear";
import TransferMontantPourcentage from "./transferMontantPourcentage";
import Card from "@material-ui/core/Card";

import "@reach/listbox/styles.css";
class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myVar : "",
      componentsCapital: {
        TransferCapital: <TransferCapital select={localStorage.getItem('agence')}/>,
        TransferCapitalWeek: <TransferCapitalWeek select={localStorage.getItem('agence')}/>,
        TransferCapitalMonth: <TransferCapitalMonth select={localStorage.getItem('agence')}/>,
        TransferCapitalYear: <TransferCapitalYear select={localStorage.getItem('agence')}/>,
      },
      displayedCapital: "TransferCapitalYear",
      componentsUtilisation: {
        TransferUtilisation: <TransferUtilisation select={localStorage.getItem('agence')}/>,
        TransferUtilisationWeek: <TransferUtilisationWeek select={localStorage.getItem('agence')} />,
        TransferUtilisationMonth: <TransferUtilisationMonth select={localStorage.getItem('agence')}/>,
        TransferUtilisationYear: <TransferUtilisationYear select={localStorage.getItem('agence')}/>,
      },
      displayedUtilisation: "TransferUtilisationYear",
      componentsWebMobile: {
        TransferWebMobile: <TransferWebMobile select={localStorage.getItem('agence')} />,
        TransferWebMobileWeek: <TransferWebMobileWeek select={localStorage.getItem('agence')}/>,
        TransferWebMobileMonth: <TransferWebMobileMonth select={localStorage.getItem('agence')}/>,
        TransferWebMobileYear: <TransferWebMobileYear select={localStorage.getItem('agence')}/>,
      },
      displayedWebMobile: "TransferWebMobileYear",
      componentsSex: {
        TransferSex: <TransferSex select={localStorage.getItem('agence')}/>,
        TransferSexWeek: <TransferSexWeek select={localStorage.getItem('agence')}/>,
        TransferSexMonth: <TransferSexMonth select={localStorage.getItem('agence')}/>,
        TransferSexYear: <TransferSexYear select={localStorage.getItem('agence')}/>,
      },
      displayedSex: "TransferSexYear",
      componentsAge: {
        TransferAge: <TransferAge select={localStorage.getItem('agence')}/>,
        TransferAgeWeek: <TransferAgeWeek select={localStorage.getItem('agence')}/>,
        TransferAgeMonth: <TransferAgeMonth select={localStorage.getItem('agence')}/>,
        TransferAgeYear: <TransferAgeYear select={localStorage.getItem('agence')}/>,
      },
      displayedAge: "TransferAgeYear",
      componentsProfession: {
        TransferProfession: <TransferProfession select={localStorage.getItem('agence')}/>,
        TransferProfessionWeek: <TransferProfessionWeek select={localStorage.getItem('agence')}/>,
        TransferProfessionMonth: <TransferProfessionMonth select={localStorage.getItem('agence')}/>,
        TransferProfessionYear: <TransferProfessionYear select={localStorage.getItem('agence')}/>,
      },
      displayedProfession: "TransferProfessionYear",
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
                        "TransferUtilisation"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "TransferUtilisationWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "TransferUtilisationMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayUtilisation.bind(
                        this,
                        "TransferUtilisationYear"
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
                        "TransferCapital"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "TransferCapitalWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "TransferCapitalMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayCapital.bind(
                        this,
                        "TransferCapitalYear"
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
                        "TransferWebMobile"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "TransferWebMobileWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "TransferWebMobileMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayWebMobile.bind(
                        this,
                        "TransferWebMobileYear"
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
                        "TransferProfession"
                      )}
                    >
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "TransferProfessionWeek"
                      )}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "TransferProfessionMonth"
                      )}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayProfession.bind(
                        this,
                        "TransferProfessionYear"
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
                    <Button onClick={this.displaySex.bind(this, "TransferSex")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "TransferSexWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "TransferSexMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displaySex.bind(this, "TransferSexYear")}
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
                    <Button onClick={this.displayAge.bind(this, "TransferAge")}>
                      Jour
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "TransferAgeWeek")}
                    >
                      Semaine
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "TransferAgeMonth")}
                    >
                      Mois
                    </Button>
                    <Button
                      onClick={this.displayAge.bind(this, "TransferAgeYear")}
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
                <TransferMontantPourcentage select={localStorage.getItem('agence')}></TransferMontantPourcentage>
              </div>
            </Card>
          </section>
        </section>
      </article>
    );
  }
}

export default Transfer;
