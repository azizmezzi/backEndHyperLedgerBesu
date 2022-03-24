import React from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import {
  tontineColor,
  cashinColor,
  cashoutColor,
  echeanceColor,
  transferColor,
} from "../Colors/colors";
class HomeMontantPourcentage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }
  async componentDidMount() {
    let tontines = [];
    let echeances = [];
    let cashins = [];
    let cashouts = [];
    let transfers = [];
    for (let j = 0; j < 500; j += 50) {
      tontines.push(
        await axios
          .get(
            "http://3.88.223.95:3006/tontine/getMontPourcentageByDay/" +
              1 +
              "/" +
              parseInt(j) +
              "/" +
              parseInt(j + 50) +
              "/" +
              this.props.select
          )
          .then((res) => {
            return res.data;
          })
      );
      echeances.push(
        await axios
          .get(
            "http://3.88.223.95:3006/echeance/getMontPourcentageByDay/" +
              1 +
              "/" +
              parseInt(j) +
              "/" +
              parseInt(j + 50) +
              "/" +
              this.props.select
          )
          .then((res1) => {
            return res1.data;
          })
      );
      cashins.push(
        await axios
          .get(
            "http://3.88.223.95:3006/cashin/getMontPourcentageByDay/" +
              1 +
              "/" +
              parseInt(j) +
              "/" +
              parseInt(j + 50) +
              "/" +
              this.props.select
          )
          .then((res2) => {
            return res2.data;
          })
      );
      cashouts.push(
        await axios
          .get(
            "http://3.88.223.95:3006/cashout/getMontPourcentageByDay/" +
              1 +
              "/" +
              parseInt(j) +
              "/" +
              parseInt(j + 50) +
              "/" +
              this.props.select
          )
          .then((res3) => {
            return res3.data;
          })
      );
      transfers.push(
        await axios
          .get(
            "http://3.88.223.95:3006/transfer/getMontPourcentageByDay/" +
              1 +
              "/" +
              parseInt(j) +
              "/" +
              parseInt(j + 50) +
              "/" +
              this.props.select
          )
          .then((res4) => {
            return res4.data;
          })
      );
    }
    Promise.all(tontines, echeances, cashins, cashouts, transfers).then(
      (results) => {
        var newData = {
          labels: results
            .filter((agence) => {
              return agence["agence"] === this.props.select;
            })
            .map((montant) => montant["montant"]),
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
              data: tontines.map((pourcentage) => pourcentage["pourcentage"]),
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
              data: echeances.map((pourcentage) => pourcentage["pourcentage"]),
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
              data: cashins.map((pourcentage) => pourcentage["pourcentage"]),
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
              data: cashouts.map((pourcentage) => pourcentage["pourcentage"]),
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
              pointHoverBackgroundColor: transferColor,
              pointHoverBorderColor: transferColor,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: transfers.map((pourcentage) => pourcentage["pourcentage"]),
            },
          ],
        };
        this.setState((prevState) => {
          return {
            data: {
              ...prevState.data, // eslint-disable-next-line
              ...newData,
            },
          };
        });
      }
    );
  }

  render() {
    const { data: bardata } = this.state;
    const options = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Pourcentage d'utilisateurs",
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Tranches de montants en e-FCFA",
            },
          },
        ],
      },
      legend: {
        labels: {
          boxWidth: 50,
        },
      },
      maintainAspectRatio: true,
    };

    return (
      <div>
        <h3> Pourcentage d’utilisateurs par tranches de montants</h3>
        <Bar data={bardata} width={100} height={50} options={options} />
      </div>
    );
  }
}

export default HomeMontantPourcentage;
