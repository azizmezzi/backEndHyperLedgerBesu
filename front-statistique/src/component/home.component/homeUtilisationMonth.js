import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {tontineColor,cashinColor,cashoutColor,echeanceColor,transferColor} from "../Colors/colors"
class HomeUtilisationMonth extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  async componentDidMount() {
    let responses = [];
    let responses1 = [];
    let responses2 = [];
    let responses3 = [];
    let responses4 = [];
    for (let i = -8; i < 1; i++) {
      responses.push(
        await axios
          .get("http://3.88.223.95:3006/tontine/getUsesByMonth/" + -i+"/"+this.props.select)
          .then(res => {
            return res.data;
          })
      );
      responses1.push(
        await axios
          .get("http://3.88.223.95:3006/echeance/getUsesByMonth/" + -i+"/"+this.props.select)
          .then(res1 => {
            return res1.data;
          })
      );
      responses2.push(
        await axios
          .get("http://3.88.223.95:3006/cashin/getUsesByMonth/" + -i+"/"+this.props.select)
          .then(res2 => {
            return res2.data;
          })
      );
      responses3.push(
        await axios
          .get("http://3.88.223.95:3006/cashout/getUsesByMonth/" + -i+"/"+this.props.select)
          .then(res3 => {
            return res3.data;
          })
      );
      responses4.push(
        await axios
        .get("http://3.88.223.95:3006/transfer/getUsesByMonth/" + -i+"/"+this.props.select)
          .then(res4 => {
            return res4.data;
          })
      );
    }

    Promise.all(responses, responses1, responses2, responses3, responses4).then(
      results => {
        var newData = {
          labels: results.filter((agence) => {
            return agence["agence"] === this.props.select
          }
            )
          .map(month => month["month"]),
          datasets: [
            {
              label: "Tontines",
              fill: false,
              lineTension: 0.1,
              backgroundColor: tontineColor,
              borderColor: tontineColor,
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: tontineColor,
              pointBackgroundColor: tontineColor,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: tontineColor,
              pointHoverBorderColor: tontineColor,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: results.filter((agence) => {
                return agence["agence"] === this.props.select
              }
                )
              .map(utilisation => utilisation["utilisation"])
            },
            {
              label: "Echeance",
              fill: false,
              lineTension: 0.1,
              backgroundColor: echeanceColor,
              borderColor: echeanceColor,
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: echeanceColor,
              pointBackgroundColor: echeanceColor,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: echeanceColor,
              pointHoverBorderColor: echeanceColor,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responses1.filter((agence) => {
                return agence["agence"] === this.props.select
              }
                )
              .map(utilisation => utilisation["utilisation"])
            },
            {
              label: "Cash In",
              fill: false,
              lineTension: 0.1,
              backgroundColor: cashinColor,
              borderColor: cashinColor,
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: cashinColor,
              pointBackgroundColor: cashinColor,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: cashinColor,
              pointHoverBorderColor: cashinColor,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responses2.filter((agence) => {
                return agence["agence"] === this.props.select
              }
                )
              .map(utilisation => utilisation["utilisation"])
            },

            {
              label: "Cash Out",
              fill: false,
              lineTension: 0.1,
              backgroundColor: cashoutColor,
              borderColor: cashoutColor,
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: cashoutColor,
              pointBackgroundColor: cashoutColor,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: cashoutColor,
              pointHoverBorderColor: cashoutColor,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responses3.filter((agence) => {
                return agence["agence"] === this.props.select
              }
                )
              .map(utilisation => utilisation["utilisation"])
            },
            {
              label: "Transfert",
              fill: false,
              lineTension: 0.1,
              backgroundColor: transferColor,
              borderColor: transferColor,
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: transferColor,
              pointBackgroundColor: transferColor,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor:transferColor,
              pointHoverBorderColor: transferColor,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responses4.filter((agence) => {
                return agence["agence"] === this.props.select
              }
                )
              .map(utilisation => utilisation["utilisation"])
            }
          ]
        };
        this.setState(prevState => {
          return {
            data: {
              ...prevState.data, // eslint-disable-next-line
              ...newData
            }
          };
        });
      }
    );
  }

  render() {
    const { data: bardata } = this.state;
    const options = {
      responsive: false,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Fréquence d'utilisation"
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
        },  
        legend: {
          
          labels: {
            boxWidth: 50
          },
            
        }
      };
    return (
      <div>
        <h2 >Fréquence d'utilisation</h2>
        <Line data={bardata} width={800} height={700} options={options}/>
      </div>
    );
  }
}

export default HomeUtilisationMonth;
