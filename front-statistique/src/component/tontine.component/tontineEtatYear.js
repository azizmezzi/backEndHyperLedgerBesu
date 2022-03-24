import React from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
    tontineColor,
  cashinColor
  } from "../Colors/colors";
class TontineEtatYear extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  async componentDidMount() {

    let enCours = [];
    let termine = [];
    for (let i = -8; i < 1; i++) {
        enCours.push(
        await axios
          .get("http://3.88.223.95:3006/tontine/getEnCoursByYear/"  + -i+"/"+this.props.select)
          .then((res) => {
            return res.data;
          })
      );
      termine.push(
        await axios
          .get("http://3.88.223.95:3006/tontine/getTermineByYear/" + -i+"/"+this.props.select)
          .then((res1) => {
            return res1.data;
          })
      );
    }
    Promise.all(enCours,termine).then((results) => {
       
      var newData = {
        labels: results.filter((agence) => {
          return agence["agence"] === this.props.select
        }
          )  
        .map((year) => year["year"]),
        datasets: [
          {
            label: "Tontines En Cours",
            backgroundColor: cashinColor,
            borderColor: cashinColor,
            borderWidth: 1,
            hoverBackgroundColor: cashinColor,
            hoverBorderColor: cashinColor,
            data: enCours.filter((agence) => {
              return agence["agence"] === this.props.select
            }
              ) 
            .map((amount) => amount["amount"]),
          },
          {
            label: "Tontines Terminée",
            backgroundColor: tontineColor,
            borderColor: tontineColor,
            borderWidth: 1,
            hoverBackgroundColor: tontineColor,
            hoverBorderColor: tontineColor,
            data: termine.filter((agence) => {
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
              labelString: 'Nombre de tontines'
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
        <h2>Tontines</h2>
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

export default TontineEtatYear;
