import React from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import {
  tontineColor,
} from "../Colors/colors";
class TontineMontantPourcentage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }
  async componentDidMount() {

    let Tontines = [];
    for (let j = 0; j < 500; j+=50) {
    
      Tontines.push(
        await axios
          .get("http://3.88.223.95:3006/Tontine/getMontPourcentageByDay/"+1+"/"+parseInt(j)+"/"+parseInt(j+50)+"/"+this.props.select)
          .then((res) => {
            return res.data;
          })
      );
    
        }
    Promise.all( Tontines).then(
      (results) => {
        var newData = {
          labels: results.filter((agence) => {
            return agence["agence"] === this.props.select
          }
            ).map((montant) => montant["montant"]),
          datasets: [
        
            {
              label: "Tontine",
              fill: false,
              lineTension: 0.1,
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: tontineColor,
              pointBackgroundColor: tontineColor,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: Tontines.map((pourcentage) => pourcentage["pourcentage"])
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
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Pourcentage d'utilisateurs"
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Tranches de montants en e-FCFA'
            }
          }],
        },  
        legend: {
          
          labels: {
            boxWidth: 50
          },
            
        },
        maintainAspectRatio: true
      };
    return (
      <div>
        <h3> Pourcentage d’utilisateurs par tranches de montants</h3>
        <Bar data={bardata}  width={800} height={700} options={ options } />
      </div>
    );
  }
}

export default TontineMontantPourcentage;
