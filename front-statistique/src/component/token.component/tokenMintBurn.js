import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {tontineColor,echeanceColor} from "../Colors/colors"
// NB :  Statique !!!!!!!!!!!!!!
class TokenMintBurn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }
  async componentDidMount() {
    let responses = [];
    let responses1 = [];

    for (let i = 0; i < 8; i++) {
      responses.push(
        await axios
          .get("http://3.88.223.95:3006/tontine/getUsesByDay/" + i)
          .then(res => {
            return res.data;
          })
      );
      responses1.push(
        await axios
          .get("http://3.88.223.95:3006/cashin/getUsesByDay/" + i)
          .then(res1 => {
            return res1.data;
          })
      );
     
    }

    Promise.all(responses, responses1).then(
      results => {
        var newData = {
          labels: results.map(day => day["day"]),
          datasets: [
            {
              label: "Mint",
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
              data: results.map(utilisation => utilisation["utilisation"])
            },
            {
              label: "Burn",
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
              data: responses1.map(utilisation => utilisation["utilisation"])
            },
            
            
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
    return (
      <div>
        <h2>Mint VS Burn</h2>
        <Line data={bardata}  width={600} height={200} />
      </div>
    );
  }
}

export default TokenMintBurn;
