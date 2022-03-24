import React from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
class HomeUsers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allTransfers: 0,
      data: {}
    };
  }

  async componentDidMount() {
    let transfers = [];
    let transfersAdherant = [];
    let transfersAgent = [];
    let echeances = [];
    let echeancesAdherant = [];
    let echeancesAgent = [];
    let tontines = [];
    let tontinesAdherant = [];
    let tontinesAgent = [];
    let cashins = [];
    let cashinsAdherant = [];
    let cashinsAgent = [];
    let cashouts = [];
    let cashoutsAdherant = [];
    let cashoutsAgent = [];
    function getAgentPercentage(
      transfers,

      transfersAgent,
      echeances,

      echeancesAgent,
      tontines,

      tontinesAgent,
      cashins,

      cashinsAgent,
      cashouts,

      cashoutsAgent
    ) {
      return (
        ((transfersAgent +
          cashinsAgent +
          cashoutsAgent +
          tontinesAgent +
          echeancesAgent) *
          100) /
        (transfers + cashins + cashouts + tontines + echeances)
      );
    }
    function getAdherantPercentage(
      transfers,
      transfersAdherant,

      echeances,
      echeancesAdherant,

      tontines,
      tontinesAdherant,

      cashins,
      cashinsAdherant,

      cashouts,
      cashoutsAdherant
    ) {
      return (
        ((transfersAdherant +
          cashinsAdherant +
          cashoutsAdherant +
          tontinesAdherant +
          echeancesAdherant) *
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
    transfersAdherant.push(
      await axios
        .get("http://3.88.223.95:3006/transfer/getAdherant")
        .then(transfersAdherant => {
          return transfersAdherant.data;
        })
    );
    transfersAgent.push(
      await axios
        .get("http://3.88.223.95:3006/transfer/getAgent")
        .then(transfersAgent => {
          return transfersAgent.data;
        })
    );
    cashins.push(
      await axios
        .get("http://3.88.223.95:3006/cashin/getAllUsersCount")
        .then(cashins => {
          return cashins.data;
        })
    );
    cashinsAdherant.push(
      await axios
        .get("http://3.88.223.95:3006/cashin/getAdherant")
        .then(cashinsAdherant => {
          return cashinsAdherant.data;
        })
    );
    cashinsAgent.push(
      await axios
        .get("http://3.88.223.95:3006/cashin/getAgent")
        .then(cashinsAgent => {
          return cashinsAgent.data;
        })
    );
    cashouts.push(
      await axios
        .get("http://3.88.223.95:3006/cashout/getAllUsersCount")
        .then(cashouts => {
          return cashouts.data;
        })
    );
    cashoutsAdherant.push(
      await axios
        .get("http://3.88.223.95:3006/cashout/getAdherant")
        .then(cashoutsAdherant => {
          return cashoutsAdherant.data;
        })
    );
    cashoutsAgent.push(
      await axios
        .get("http://3.88.223.95:3006/cashout/getAgent")
        .then(cashinsAgent => {
          return cashinsAgent.data;
        })
    );
    tontines.push(
      await axios
        .get("http://3.88.223.95:3006/tontine/getAllUsersCount")
        .then(tontines => {
          return tontines.data;
        })
    );
    tontinesAdherant.push(
      await axios
        .get("http://3.88.223.95:3006/tontine/getAdherant")
        .then(tontinesAdherant => {
          return tontinesAdherant.data;
        })
    );
    tontinesAgent.push(
      await axios
        .get("http://3.88.223.95:3006/tontine/getAgent")
        .then(tontinesAgent => {
          return tontinesAgent.data;
        })
    );
    echeances.push(
      await axios
        .get("http://3.88.223.95:3006/echeance/getAllUsersCount")
        .then(echeances => {
          return echeances.data;
        })
    );
    echeancesAdherant.push(
      await axios
        .get("http://3.88.223.95:3006/echeance/getAdherant")
        .then(echeancesAdherant => {
          return echeancesAdherant.data;
        })
    );
    echeancesAgent.push(
      await axios
        .get("http://3.88.223.95:3006/echeance/getAgent")
        .then(echeancesAgent => {
          return echeancesAgent.data;
        })
    );
    Promise.all(
      transfers,
      transfersAdherant,
      transfersAgent,
      echeances,
      echeancesAdherant,
      echeancesAgent,
      tontines,
      tontinesAdherant,
      tontinesAgent,
      cashins,
      cashinsAdherant,
      cashinsAgent,
      cashouts,
      cashoutsAdherant,
      cashoutsAgent
    ).then(res => {
      var newData = {
        labels: ["Agent", "Adhérant", "Intermédiaire"],
        datasets: [
          {
            data: [
              getAgentPercentage(
                transfers[0],

                transfersAgent[0],
                echeances[0],

                echeancesAgent[0],
                tontines[0],

                tontinesAgent[0],
                cashins[0],

                cashinsAgent[0],
                cashouts[0],

                cashoutsAgent[0]
              ),
              getAdherantPercentage(
                transfers[0],
                transfersAdherant[0],

                echeances[0],
                echeancesAdherant[0],

                tontines[0],
                tontinesAdherant[0],

                cashins[0],
                cashinsAdherant[0],

                cashouts[0],
                cashoutsAdherant[0]
              ),
              100 -
                ((getAgentPercentage(
                  transfers[0],

                  transfersAgent[0],
                  echeances[0],

                  echeancesAgent[0],
                  tontines[0],

                  tontinesAgent[0],
                  cashins[0],

                  cashinsAgent[0],
                  cashouts[0],

                  cashoutsAgent[0]
                ) *
                  100) /
                  (transfers + cashins + cashouts + tontines + echeances) +
                  (getAdherantPercentage(
                    transfers[0],
                    transfersAdherant[0],

                    echeances[0],
                    echeancesAdherant[0],

                    tontines[0],
                    tontinesAdherant[0],

                    cashins[0],
                    cashinsAdherant[0],

                    cashouts[0],
                    cashoutsAdherant[0]
                  ) *
                    100) /
                    (transfers + cashins + cashouts + tontines + echeances))
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
  }
  render() {
    const { data: bardata } = this.state;
    return (
      <div>
        <h2>Utilisateur</h2>
        <Pie data={bardata} width={400} height={200} />
      </div>
    );
  }
}

export default HomeUsers;
