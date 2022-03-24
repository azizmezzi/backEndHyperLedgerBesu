import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

class TableauRecapMonth extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    function returnPercentage(toMonth, yesterMonth) {
      if (toMonth === 0 || yesterMonth === 0) {
        return 0;
      }
      else {
        return ((toMonth - yesterMonth) / yesterMonth).toFixed(2);
      }
    }
    var newData = [
      {
        name: "Transfert",
        cap: parseInt(
          await axios
            .get("http://3.88.223.95:3006/transfer/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        nbr_operation :  parseInt(
          await axios
            .get("http://3.88.223.95:3006/transfer/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.utilisation;
            })
        ),
        var: returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/transfer/getCapitalByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/transfer/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        varOp : returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/transfer/getUsesByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/transfer/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        )
      },
      {
        name: "Cash-In",
        cap: parseInt(
          await axios
            .get("http://3.88.223.95:3006/cashin/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        nbr_operation :  parseInt(
          await axios
            .get("http://3.88.223.95:3006/cashin/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.utilisation;
            })
        ),
        var: returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/cashin/getCapitalByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/cashin/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        varOp : returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/cashin/getUsesByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/cashin/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        )
      },
      {
        name: "Cash-Out",
        cap: parseInt(
          await axios
            .get("http://3.88.223.95:3006/cashout/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        nbr_operation :  parseInt(
          await axios
            .get("http://3.88.223.95:3006/cashout/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.utilisation;
            })
        ),
        var: returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/cashout/getCapitalByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/cashout/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        varOp : returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/cashout/getUsesByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/cashout/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        )
      },
      {
        name: "Tontine",
        cap: parseInt(
          await axios
            .get("http://3.88.223.95:3006/tontine/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        nbr_operation :  parseInt(
          await axios
            .get("http://3.88.223.95:3006/tontine/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.utilisation;
            })
        ),
        var: returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/tontine/getCapitalByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/tontine/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        varOp : returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/tontine/getUsesByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/tontine/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        )
      },
      {
        name: "Paiement d'Echeance",
        cap: parseInt(
          await axios
            .get("http://3.88.223.95:3006/echeance/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        nbr_operation :  parseInt(
          await axios
            .get("http://3.88.223.95:3006/echeance/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.utilisation;
            })
        ),
        var: returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/echeance/getCapitalByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/echeance/getCapitalByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        ),
        varOp : returnPercentage(
          parseInt(
            await axios
              .get("http://3.88.223.95:3006/echeance/getUsesByMonth/0/"+this.props.select)
              .then(result => {
                return result.data.amount;
              })
          ),
          await axios
            .get("http://3.88.223.95:3006/echeance/getUsesByMonth/1/"+this.props.select)
            .then(result => {
              return result.data.amount;
            })
        )
      }
    ];
    this.setState(() => {
      return {
        data: newData
      };
    });

  }
  render() {
    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: "#fa9900",
        color: theme.palette.common.white,
        fontSize: 30
      },
      body: {
        fontSize: 25
       
      },
    }))(TableCell);

    const StyledTableRow = withStyles(theme => ({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.background.default
        }
      }
    }))(TableRow);
    const useStyles = makeStyles({
      table: {
        minWidth: 1500
      }
    });

    return (
      <TableContainer component={Paper} >
        <Table className={useStyles.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nom du service</StyledTableCell>
              <StyledTableCell align="right">flux de liquidités cumulés durant le mois en cours en e-FCFA</StyledTableCell>
              <StyledTableCell align="right">Variation par rapport au mois précédant</StyledTableCell>
              <StyledTableCell align="right">Nombre d'operations</StyledTableCell>
              <StyledTableCell align="right">Variation par rapport au mois précédant</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                
                <StyledTableCell align="right">{row.cap}</StyledTableCell>
                <StyledTableCell 
                  style={row.var > 0 ? { color: "green" } : { color: "red" }}
                  align="right"
                >
                  {row.var}{" "}
                </StyledTableCell>
                <StyledTableCell align="right">{row.nbr_operation}</StyledTableCell>
                <StyledTableCell
                  style={row.var > 0 ? { color: "green" } : { color: "red" }}
                  align="right"
                >
                  {row.var}{" "}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default TableauRecapMonth;
