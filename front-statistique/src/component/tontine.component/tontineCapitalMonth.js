import React from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

class TontineCapitalMonth extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  async componentDidMount() {
    let responses = [];
    for (let i = -8; i < 1; i++) {
      responses.push(
        await axios
          .get("http://3.88.223.95:3006/Tontine/getCapitalByMonth/" + -i+"/"+this.props.select)
          .then((res) => {
            return res.data;
          })
      );
    }
    Promise.all(responses).then((results) => {
      var newData = {
        labels: results.filter((agence) => {
          return agence["agence"] === this.props.select
        }
          ) 
        .map((month) => month["month"]),
        datasets: [
          {
            label: "Montant(e-FCFA)",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: results.filter((agence) => {
              return agence["agence"] === this.props.select
            }
              ) 
            .map((amount) => amount["amount"]),
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
    });
  }

  render() {
    const { data: bardata } = this.state;
    const options = {
      responsive: false,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Montant en e-FCFA'
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
            
        },
        maintainAspectRatio: true 
      };
    return (
      <div>
        
      <div>
        <h2>Montant</h2>
        <Bar
          data={bardata}
          width={800} height={700}
          options={options}
        />
      </div>
     
       </div>

    );
  }
}

export default TontineCapitalMonth;
