import React from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
class TransferProfessionWeek extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allTransfers: 0,
      commericialCount: 0,
      agricultureCount: 0,
      artisanatCount: 0,
      salarieCount: 0,
      data: {}
    };
  }

  componentDidMount() {
    axios
     .get("http://3.88.223.95:3006/transfer/getProfessionByWeek/0/Commercial/"+this.props.select)
       .then(commericialCount => {
         this.setState({ commericialCount: commericialCount.data.utilisation });
    axios
     .get("http://3.88.223.95:3006/transfer/getProfessionByWeek/0/Agriculture/"+this.props.select)
       .then(agricultureCount => {
         this.setState({ agricultureCount: agricultureCount.data.utilisation });
   axios
     .get("http://3.88.223.95:3006/transfer/getProfessionByWeek/0/Artisanat/"+this.props.select)
       .then(artisanatCount => {
         this.setState({ artisanatCount: artisanatCount.data.utilisation });
   axios
     .get("http://3.88.223.95:3006/transfer/getProfessionByWeek/0/Salarie/"+this.props.select)
       .then(salarieCount => {
         this.setState({salarieCount : salarieCount.data.utilisation})
               var newData = {
                 labels: ["Commercial", "Agriculture", "Artisanat","Salarié"],
                 datasets: [
                   {
                     data: [
                      ((commericialCount.data.utilisation * 100) / (commericialCount.data.utilisation +salarieCount.data.utilisation + artisanatCount.data.utilisation +agricultureCount.data.utilisation )).toFixed(2),
                      ((agricultureCount.data.utilisation * 100) / (commericialCount.data.utilisation +salarieCount.data.utilisation + artisanatCount.data.utilisation +agricultureCount.data.utilisation )).toFixed(2),
                      ((artisanatCount.data.utilisation * 100) / (commericialCount.data.utilisation +salarieCount.data.utilisation + artisanatCount.data.utilisation +agricultureCount.data.utilisation )).toFixed(2),
                     ( (salarieCount.data.utilisation * 100) / (commericialCount.data.utilisation +salarieCount.data.utilisation + artisanatCount.data.utilisation +agricultureCount.data.utilisation )).toFixed(2)
                
                 ],
                     backgroundColor: ["#00FF00", "#FFA07A", "#00FFFF","#008080"],
                     hoverBackgroundColor: ["#00FF00", "#FFA07A", "#00FFFF","#008080"]
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
       });
       
       
 }
   
  
  render() {
    const { data: bardata } = this.state;
    return (
      <div>
        <h2>Profession</h2>
        <Pie data={bardata} width={350} height={300}/>
      </div>
    );
  }
}
    
export default TransferProfessionWeek;
