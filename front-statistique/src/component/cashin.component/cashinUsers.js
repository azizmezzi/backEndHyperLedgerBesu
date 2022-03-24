import React from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
class CashinUsers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allTransfers: 0,
      adheranCount: 0,
      agentCount: 0,
      data: {}
    };
  }

  componentDidMount() {
    axios
      .get("http://3.88.223.95:3006/cashin/getAllUsersCount")
      .then(allTransfers => {
        this.setState({ allTransfers: allTransfers.data });
        axios
          .get("http://3.88.223.95:3006/cashin/getAdherant")
          .then(adheranCount => {
            this.setState({ adheranCount: adheranCount.data });
            axios
              .get("http://3.88.223.95:3006/cashin/getAgent")
              .then(agentCount => {
                var newData = {
                  labels: ["Agent", "Adhérant", "Intermédiaire "],
                  datasets: [
                    {
                      data: [
                        (agentCount.data * 100) / allTransfers.data,
                        (agentCount.data * 100) / allTransfers.data,
                        100 -
                          ((agentCount.data * 100) / allTransfers.data +
                            (adheranCount.data * 100) / allTransfers.data)
                      ],
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
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
          });
      });
  }
  render() {
    const { data: bardata } = this.state;
    return (
      <div>
        <h2>Utilisateurs</h2>
        <Pie data={bardata} width={400} height={200} />
      </div>
    );
  }
}
export default CashinUsers;
