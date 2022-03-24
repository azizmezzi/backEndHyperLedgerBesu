import React from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
class HomeWebMobile extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allTransfers: 0,
      data: {}
    };
  }

  async componentDidMount() {
    let transfers = [];
    let transfersMobile = [];
    let echeances = [];
    let echeancesMobile = [];
    let tontines = [];
    let tontinesMobile = [];
    let cashins = [];
    let cashinsMobile = [];
    let cashouts = [];
    let cashoutsMobile = [];
    function getWebPercentage(
      transfers,
      transfersMobile,
      cashins,
      cashinsMobile,
      cashouts,
      cashoutsMobile,
      tontines,
      tontinesMobile,
      echeances,
      echeancesMobile
    ) {
      return (
        100 -
        ((transfersMobile +
          cashinsMobile +
          cashoutsMobile +
          tontinesMobile +
          echeancesMobile) *
          100) /
          (transfers + cashins + cashouts + tontines + echeances)
      );
    }
    function geMobilePercentage(
      transfers,
      transfersMobile,
      cashins,
      cashinsMobile,
      cashouts,
      cashoutsMobile,
      tontines,
      tontinesMobile,
      echeances,
      echeancesMobile
    ) {
      return (
        ((transfersMobile +
          cashinsMobile +
          cashoutsMobile +
          tontinesMobile +
          echeancesMobile) *
          100) /
        (transfers + cashins + cashouts + tontines + echeances)
      );
    }
    transfers.push(
      await axios
        .get("http://3.88.223.95:3006/transfer/getAllUsersCount")
        .then(transfers => {
          return transfers.data;
        })
    );
    transfersMobile.push(
      await axios
        .get("http://3.88.223.95:3006/transfer/getMobile")
        .then(transfersMobile => {
          return transfersMobile.data;
        })
    );
    cashins.push(
      await axios
        .get("http://3.88.223.95:3006/cashin/getAllUsersCount")
        .then(cashins => {
          return cashins.data;
        })
    );
    cashinsMobile.push(
      await axios
        .get("http://3.88.223.95:3006/cashin/getMobile")
        .then(cashinsMobile => {
          return cashinsMobile.data;
        })
    );
    cashouts.push(
      await axios
        .get("http://3.88.223.95:3006/cashout/getAllUsersCount")
        .then(cashouts => {
          return cashouts.data;
        })
    );
    cashoutsMobile.push(
      await axios
        .get("http://3.88.223.95:3006/cashout/getMobile")
        .then(cashoutsMobile => {
          return cashoutsMobile.data;
        })
    );
    tontines.push(
      await axios
        .get("http://3.88.223.95:3006/tontine/getAllUsersCount")
        .then(tontines => {
          return tontines.data;
        })
    );
    tontinesMobile.push(
      await axios
        .get("http://3.88.223.95:3006/tontine/getMobile")
        .then(tontinesMobile => {
          return tontinesMobile.data;
        })
    );
    echeances.push(
      await axios
        .get("http://3.88.223.95:3006/echeance/getAllUsersCount")
        .then(echeances => {
          return echeances.data;
        })
    );
    echeancesMobile.push(
      await axios
        .get("http://3.88.223.95:3006/echeance/getMobile")
        .then(echeancesMobile => {
          return echeancesMobile.data;
        })
    );

    Promise.all(
      transfers,
      transfersMobile,
      tontines,
      tontinesMobile,
      cashins,
      cashinsMobile,
      cashouts,
      cashoutsMobile,
      echeances,
      echeancesMobile
    ).then(res => {
      var newData = {
        labels: ["Web", "Mobile"],
        datasets: [
          {
            data: [
              getWebPercentage(
                transfers[0],
                transfersMobile[0],
                cashins[0],
                cashinsMobile[0],
                cashouts[0],
                cashoutsMobile[0],
                tontines[0],
                tontinesMobile[0],
                echeances[0],
                echeancesMobile[0]
              ),
              geMobilePercentage(
                transfers[0],
                transfersMobile[0],
                cashins[0],
                cashinsMobile[0],
                cashouts[0],
                cashoutsMobile[0],
                tontines[0],
                tontinesMobile[0],
                echeances[0],
                echeancesMobile[0]
              )
            ],
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
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
        <h2>Web/Mobile</h2>
        <Pie data={bardata} width={400} height={200} />
      </div>
    );
  }
}

export default HomeWebMobile;
