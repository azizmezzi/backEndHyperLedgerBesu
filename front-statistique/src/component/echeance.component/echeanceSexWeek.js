import React from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
class EcheanceSexWeek extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allEcheances: 0,
      data: {}
    };
  }

  async componentDidMount() {
    axios
      .get("http://3.88.223.95:3006/Echeance/getUsesByWeek/0/"+this.props.select)
      .then(res => this.setState({ allEcheances:res.data.utilisation }));
    axios.get("http://3.88.223.95:3006/Echeance/getSexByWeek/0/"+this.props.select).then(res => {
      var newData = {
        labels: ["Femme", "Homme"],
        datasets: [
          {
            data: [
              (100 - (res.data.utilisation * 100) / this.state.allEcheances).toFixed(2),
              ((res.data.utilisation * 100) / this.state.allEcheances).toFixed(2)
            ],
            backgroundColor: ["#00FF00", "#FFA07A"],
            hoverBackgroundColor: ["#00FF00", "#FFA07A"]
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
    return (
      <div>
        <h2>Genre</h2>
        <Pie data={bardata}  width={350} height={300} />
      </div>
    );
  }
}

export default EcheanceSexWeek;
