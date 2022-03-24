import React from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
class CashoutAgeWeek extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allCashouts: 0,
      data: {}
    };
  }

  async componentDidMount() {
    axios
      .get("http://3.88.223.95:3006/Cashout/getUsesByWeek/0/"+this.props.select)
      .then(res => this.setState({ allCashouts: res.data.utilisation }));
    axios.get("http://3.88.223.95:3006/Cashout/getAgeByWeek/0/"+this.props.select).then(res => {
      var newData = {
        labels: ["Adulte", "Jeune"],
        datasets: [
          {
            data: [
              (100 - (res.data.utilisation * 100) / this.state.allCashouts).toFixed(2),
              ((res.data.utilisation * 100) / this.state.allCashouts).toFixed(2)
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
        <h2>Age</h2>
        <Pie data={bardata}   width={350} height={300} />
      </div>
    );
  }
}

export default CashoutAgeWeek;
