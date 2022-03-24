import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
class CashinUtilisationWeek extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  async componentDidMount() {
    let responses = [];
    for (let i = -8; i < 1; i++) {
      responses.push(
        await axios
          .get("http://3.88.223.95:3006/Cashin/getUsesByWeek/" + -i+"/"+this.props.select)
          .then(res => {
            return res.data;
          })
      );
    }
    Promise.all(responses).then(results => {
      var newData = {
        labels: results.filter((agence) => {
          return agence["agence"] === this.props.select
        }
          ).map((week) => week["week"]),
        datasets: [
          {
            label: "Utilisation",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: results.map(utilisation => utilisation["utilisation"])
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
            
        },
     
      };
    return (
      <div>
        <h2>Fréquence d'utilisation du service Cashin</h2>
        <Line data={bardata}     width={800} height={700} options={options} />
      </div>
    );
  }
}


export default CashinUtilisationWeek;
