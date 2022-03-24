pragma solidity 0.5.11;

pragma experimental ABIEncoderV2;

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;

        require(c >= a, "SafeMath: addition overflow");

        return c;

    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");

    }

    function sub(uint256 a, uint256 b, string memory errorMessage)
        internal
        pure
        returns (uint256)
    {
        require(b <= a, errorMessage);

        uint256 c = a - b;

        return c;

    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the

        // benefit is lost if 'b' is also tested.

        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522

        if (a == 0) {
            return 0;

        }

        uint256 c = a * b;

        require(c / a == b, "SafeMath: multiplication overflow");

        return c;

    }


}

/**

 * @title ERC20Basic

 * @dev Simpler version of ERC20 interface

 * @dev see https://github.com/ethereum/EIPs/issues/179

 * 

 * 

 */

contract ERC20Basic {
    function totalSupply() public view returns (uint256);

    function balanceOf(address who) public view returns (uint256);

    function transfer(address to, uint256 value) public returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

}

/**

 * @title ERC20 interface

 * @dev see https://github.com/ethereum/EIPs/issues/20

 */

contract ERC20 is ERC20Basic {
    function allowance(address owner, address spender)
        public
        view
        returns (uint256);

    function transferFrom(address from, address to, uint256 value)
        public
        returns (bool);

    function approve(address spender, uint256 value) public returns (bool);

    function transfers(address from_, address _to, uint256 _value)
        public
        returns (bool);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

}

contract participant_contract {
    
     using SafeMath for uint256;
    
        struct participants {
        address Adherent_Address;
        uint256 Ordre;
        bool Inscrit;
         mapping (string => TxGarantie) ListeGaranties;
        string [] NbrGaranties;
        mapping (string => TxCotisation) ListeCotisations;
        string [] NbrCotisations;
        mapping (string => TxDistribution) ListeDistributions;
        string [] NbrDistributions;
    }
    
    mapping  (  string =>   mapping(address => participants)) public Liste;
       mapping(string => address[]) public participantsAddress;
        string[] IDTontines;
    
     struct TxGarantie {
        string ID_Garantie;
        string ID_Tontine;
        uint256 ID_Cycle;
        uint256 date_garantie;
        uint256 ID_Iteration;
        uint256 Montant;
        string Type_Transaction;
        uint256 Cumule;
        bytes32 Hash_Transaction;
    }

    uint256 public numGarantie = 0;


    struct TxCotisation {
        string ID_Cotisation;
        string ID_Tontine;
        uint256 ID_Cycle;
        uint256 ID_Iteration;
        uint256 date_cotisation;
        uint256 Montant;
        bytes32 Hash_Transaction;
    }

    uint256 public numCotisation = 0;


    struct TxDistribution {
        string ID_Distribution;
        string ID_Tontine;
        uint256 date_distribution;
        uint256 ID_Cycle;
        uint256 ID_Iteration;
        uint256 Montant;
        bytes32 Hash_Transaction;
    }

    uint256 public numDistribution = 0;
    
    
    
    function concat(string memory _base, string memory _value)
        internal
        pure
        returns (string memory) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

 

        assert(_valueBytes.length > 0);

 

        string memory _tmpValue = new string(_baseBytes.length +
            _valueBytes.length);
        bytes memory _newValue = bytes(_tmpValue);

 

        uint i;
        uint j;

 

        for (i = 0; i < _baseBytes.length; i++) {
            _newValue[j++] = _baseBytes[i];
        }

 

        for (i = 0; i < _valueBytes.length; i++) {
            _newValue[j++] = _valueBytes[i];
        }

 

        return string(_newValue);
    }
    function uint2str(uint i) internal pure returns (string memory){
    if (i == 0) return "0";
    uint j = i;
    uint length;
    while (j != 0){
        length++;
        j /= 10;
    }
    bytes memory bstr = new bytes(length);
    uint k = length - 1;
    while (i != 0){
        bstr[k--] = byte(uint8(48 + i % 10)); 
        i /= 10;
    }
    return string(bstr);
}

 /**

    * @dev list of all supported tokens for transfer * @param string token symbol * @param address contract address of token */


    constructor() public {
        //   require (owner == msg.sender);
    }

    function() external payable {}

    
        ERC20 public ERC20Interface;

    function transaction(
        address Address_Sender,
        address Address_Receiver,
        uint256 Montant,
        address contract_
    ) public {

        ERC20Interface = ERC20(contract_);
        ERC20Interface.transfers(Address_Sender, Address_Receiver, Montant);

    }
    
     function addUser(
        string memory ID_Tontine,
        address Adherent_Address,
        uint256 Ordre
    ) public {
       
        require(
            Liste[ID_Tontine][Adherent_Address]
                .Adherent_Address ==
                address(0)
        );


       Liste[ID_Tontine][Adherent_Address]
            .Adherent_Address = Adherent_Address;

        Liste[ID_Tontine][Adherent_Address]
            .Ordre = Ordre;

        Liste[ID_Tontine][Adherent_Address]
            .Inscrit = true;

  participantsAddress[ID_Tontine].push(Adherent_Address);

    }
    
    
    function get(string memory ID_Tontine ,address addPart) public view returns(uint256, bool) {
        return(Liste[ID_Tontine][addPart].Ordre, Liste[ID_Tontine][addPart].Inscrit);
    }
    
    function addTxGarantie(
    string memory ID_Tontine,
        address Adherent_Address,
        uint256 Cycle_enCours,
        uint256 Iteration_enCours,
        uint256 Montant,
        address addTontine,
        bool Type,
        address contract_
    ) public {
        transaction(
            Adherent_Address,
            addTontine,
            Montant,
            contract_ 
            
        );

        // to get the latest cumule

       uint256 cumule =0;
        
         
        if (Liste[ID_Tontine][Adherent_Address].NbrGaranties.length != 0) { 
        string memory lastGarantie = Liste[ID_Tontine][Adherent_Address].NbrGaranties[Liste[ID_Tontine][Adherent_Address].NbrGaranties.length-1];
       
       cumule = Liste[ID_Tontine][Adherent_Address].ListeGaranties[lastGarantie].Cumule;
        } 
          
        
      
        string memory ID_Garantie =  concat("GAR",uint2str(numGarantie)) ;
    
       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].ID_Garantie = ID_Garantie;

        Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].ID_Tontine = ID_Tontine;

       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].date_garantie = now;

       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].ID_Cycle = Cycle_enCours;

        Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].ID_Iteration = Iteration_enCours;

       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Montant = Montant;

        if (Type) {
          Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Type_Transaction = "Recharge";

           Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Cumule = cumule.add(Montant);

        } else {
           Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Type_Transaction = "Retrait";

            Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Cumule = cumule.sub(Montant);

        }

       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Hash_Transaction = 0x0;
        
     Liste[ID_Tontine][Adherent_Address].NbrGaranties.push(ID_Garantie);

        
         numGarantie++;

    }
    
    
 
    
    function getGarNbr(string memory ID_Tontine,address  Adherent_Address) public view returns (uint256) {
        return (Liste[ID_Tontine][Adherent_Address].NbrGaranties.length);
        
    }
    
     function getCotNbr(string memory ID_Tontine,address  Adherent_Address) public view returns (uint256) {
        return (Liste[ID_Tontine][Adherent_Address].NbrCotisations.length);
        
    }
    
     function getDisNbr(string memory ID_Tontine,address  Adherent_Address) public view returns (uint256) {
        return (Liste[ID_Tontine][Adherent_Address].NbrDistributions.length);
        
    }
    
   
    
     function verifgarantie(
    string memory ID_Tontine,
        address Adherent_Address,
        uint256 Cycle_enCours,
        uint256 Iteration_enCours,
        uint256 Montant
    ) public {
       

       uint256 cumule =0;
        
         
        if (Liste[ID_Tontine][Adherent_Address].NbrGaranties.length != 0) { 
        string memory lastGarantie = Liste[ID_Tontine][Adherent_Address].NbrGaranties[Liste[ID_Tontine][Adherent_Address].NbrGaranties.length-1];
       
       cumule = Liste[ID_Tontine][Adherent_Address].ListeGaranties[lastGarantie].Cumule;
        } 
          
        
      
        string memory ID_Garantie =  concat("GAR",uint2str(numGarantie)) ;
    
       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].ID_Garantie = ID_Garantie;

        Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].ID_Tontine = ID_Tontine;

       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].date_garantie = now;

       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].ID_Cycle = Cycle_enCours;

        Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].ID_Iteration = Iteration_enCours;

       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Montant = Montant;

       
       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Type_Transaction = "Retrait";

       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Cumule = cumule.sub(Montant);

        

       Liste[ID_Tontine][Adherent_Address].ListeGaranties[ID_Garantie].Hash_Transaction = 0x0;
        
     Liste[ID_Tontine][Adherent_Address].NbrGaranties.push(ID_Garantie);

        
         numGarantie++;

    }
 
    
    
    function addTxCotisation(string memory ID_Tontine, address Adherent_Address, uint256 Cycle_enCours, uint256 Iteration_enCours, uint256 Montant)
        public {
        
         string memory ID_Cotisation =  concat("COT",uint2str(numCotisation)) ;
      // string memory ID_Cotisation= 'rr';
     
         Liste[ID_Tontine][Adherent_Address].ListeCotisations[ID_Cotisation].ID_Cotisation = ID_Cotisation;

        Liste[ID_Tontine][Adherent_Address].ListeCotisations[ID_Cotisation].ID_Tontine = ID_Tontine;

        Liste[ID_Tontine][Adherent_Address].ListeCotisations[ID_Cotisation].date_cotisation = now;

        Liste[ID_Tontine][Adherent_Address].ListeCotisations[ID_Cotisation].ID_Cycle = Cycle_enCours;

       Liste[ID_Tontine][Adherent_Address].ListeCotisations[ID_Cotisation].ID_Iteration = Iteration_enCours;

        Liste[ID_Tontine][Adherent_Address].ListeCotisations[ID_Cotisation].Montant = Montant;

        Liste[ID_Tontine][Adherent_Address].ListeCotisations[ID_Cotisation].Hash_Transaction = 0x0;

        Liste[ID_Tontine][Adherent_Address].NbrCotisations.push(ID_Cotisation);
        
         numCotisation++;

    }


    function addTxDistribution(
        string memory ID_Tontine,
        address Adherent_Address, uint256 Cycle_enCours, uint256 Iteration_enCours, uint256 Montant, uint256 Nbr_participants) public {
       

        string memory ID_Distribution =  concat("DIS",uint2str(numDistribution)) ;
        
        Liste[ID_Tontine][Adherent_Address].ListeDistributions[ID_Distribution].ID_Distribution = ID_Distribution;

        Liste[ID_Tontine][Adherent_Address].ListeDistributions[ID_Distribution].ID_Tontine = ID_Tontine;

        Liste[ID_Tontine][Adherent_Address].ListeDistributions[ID_Distribution].ID_Cycle = Cycle_enCours;

       Liste[ID_Tontine][Adherent_Address].ListeDistributions[ID_Distribution].ID_Iteration = Iteration_enCours;

        Liste[ID_Tontine][Adherent_Address].ListeDistributions[ID_Distribution].date_distribution = now;

        Liste[ID_Tontine][Adherent_Address].ListeDistributions[ID_Distribution].Montant = Montant.mul(Nbr_participants );

        Liste[ID_Tontine][Adherent_Address].ListeDistributions[ID_Distribution].Hash_Transaction = 0x0;

        Liste[ID_Tontine][Adherent_Address].NbrDistributions.push(ID_Distribution);
             numDistribution++;

    }
    
     /* function cotisation(string memory ID_Tontine, address addressTon, uint256 Cycle_enCours, uint256 Iteration_enCours, uint256 montant, address contract_) public {
      
        addTxCotisation(ID_Tontine, msg.sender, Cycle_enCours, Iteration_enCours, montant);
      
        transaction(
            msg.sender,
            addressTon,
            montant,
            contract_
        );
   

    }*/
    
    function getLastCumule(string memory ID_Tontine, address Address_Receiver) public view returns (uint256) {
       
        string memory lastGarantie = Liste[ID_Tontine][Address_Receiver].NbrGaranties[Liste[ID_Tontine][Address_Receiver].NbrGaranties.length-1];
       
        return (Liste[ID_Tontine][Address_Receiver].ListeGaranties[lastGarantie].Cumule);
    }
    
    function getLastCotisation(string memory ID_Tontine,address Adherent_Address, uint256 Cycle_enCours, uint256 Iteration_enCours) public view returns (bool) {
        bool payementCotisation = true;
        
          if (Liste[ID_Tontine][Adherent_Address].NbrCotisations.length != 0) { 
         string memory lastCotisation = Liste[ID_Tontine][Adherent_Address].NbrCotisations[Liste[ID_Tontine][Adherent_Address].NbrCotisations.length-1];
           
                   
                    if ( Liste[ID_Tontine][Adherent_Address].ListeCotisations[lastCotisation].ID_Cycle ==
                        Cycle_enCours && Liste[ID_Tontine][Adherent_Address].ListeCotisations[lastCotisation].ID_Iteration == Iteration_enCours
                    ) {
                        payementCotisation = false;
                    }
          }
          return payementCotisation;
    }


          function setTransactionHashGarantie(
          string memory ID_Tontine,
        bytes32 trHash,
        address Adherent_Address
    ) public {
        string memory last = Liste[ID_Tontine][Adherent_Address].NbrGaranties[Liste[ID_Tontine][Adherent_Address].NbrGaranties.length-1];
      Liste[ID_Tontine][Adherent_Address].ListeGaranties[last].Hash_Transaction = trHash;

    }
    
        function setTransactionHashCotisation(
        string memory ID_Tontine,
        bytes32 trHash,
        address Adherent_Address
    ) public {
            string memory last = Liste[ID_Tontine][Adherent_Address].NbrCotisations[Liste[ID_Tontine][Adherent_Address].NbrCotisations.length-1];
      Liste[ID_Tontine][Adherent_Address].ListeCotisations[last].Hash_Transaction = trHash;

    }

    function setTransactionHashDistribution(
    string memory ID_Tontine,
        bytes32 trHash,
        address Adherent_Address
    ) public {
         string memory last = Liste[ID_Tontine][Adherent_Address].NbrDistributions[Liste[ID_Tontine][Adherent_Address].NbrDistributions.length-1];
      Liste[ID_Tontine][Adherent_Address].ListeDistributions[last].Hash_Transaction = trHash;
    }

 /*   function envoiMondataire(address tontine_address, address mondataire1_address, address mondataire2_address) public 
    {
        
        bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];
        ERC20Interface = ERC20(contract_);
       // ERC20Interface.balanceOf(tontine_address);
        transaction(tontine_address, mondataire1_address, ERC20Interface.balanceOf(tontine_address)/2);
        transaction(tontine_address, mondataire2_address, ERC20Interface.balanceOf(tontine_address));
    }*/



   function getGarantie(
       string memory ID_Tontine,
        address Address_Receiver,
        uint256 indice
    )
        public
        view
        returns (uint256, uint256, uint256 )
    {
      uint256 lastGarantie =  Liste[ID_Tontine][Address_Receiver].NbrGaranties.length;
           if(lastGarantie == 0) {
            return(0,0,0);
           } else  {
        return (Liste[ID_Tontine][Address_Receiver].ListeGaranties[ Liste[ID_Tontine][Address_Receiver].NbrGaranties[indice]].ID_Cycle,
            Liste[ID_Tontine][Address_Receiver].ListeGaranties[ Liste[ID_Tontine][Address_Receiver].NbrGaranties[indice]].ID_Iteration,
            Liste[ID_Tontine][Address_Receiver].ListeGaranties[ Liste[ID_Tontine][Address_Receiver].NbrGaranties[indice]].Cumule);
}
        
    }
    
       function getCotisation(
        string memory ID_Tontine,
        address Address_Receiver,
        uint256 indice 
        
    )
        public
        view
        returns (uint256, uint256, uint256 )
    {
   uint256 lastCotisation =  Liste[ID_Tontine][Address_Receiver].NbrCotisations.length;
           if(lastCotisation == 0) {
            return(0,0,0);
           } else  {
                    return (Liste[ID_Tontine][Address_Receiver].ListeCotisations[ Liste[ID_Tontine][Address_Receiver].NbrCotisations[indice]].ID_Cycle,
            Liste[ID_Tontine][Address_Receiver].ListeCotisations[ Liste[ID_Tontine][Address_Receiver].NbrCotisations[indice]].ID_Iteration,
            0);
                   }
        }
            
    
    
       function getDistribution(
        string memory ID_Tontine,
        address Address_Receiver,
        uint256 indice
    )
        public
        view
        returns (uint256, uint256, uint256 )
    {
   uint256 lastDistribution =  Liste[ID_Tontine][Address_Receiver].NbrDistributions.length;
           if(lastDistribution == 0) {
            return(0,0,0);
           } else  {
             return (Liste[ID_Tontine][Address_Receiver].ListeDistributions[ Liste[ID_Tontine][Address_Receiver].NbrDistributions[indice]].ID_Cycle,
            Liste[ID_Tontine][Address_Receiver].ListeDistributions[ Liste[ID_Tontine][Address_Receiver].NbrDistributions[indice]].ID_Iteration,
           0);
           }
        
    }
    
    
           function getLastGarCotDist(
            string memory ID_Tontine,
        address Address_Receiver,
        bool Gar,
        bool Cot,
        bool Dis) public  view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256)
    {

           
  uint256[] memory listiddate = new uint256[](7);        

        if (Gar) {
       
        uint256 lastGarantie = Liste[ID_Tontine][Address_Receiver].NbrGaranties.length;
            if(lastGarantie == 0) {
                 listiddate[0] = 0;
                  listiddate[1] = 0;
                   listiddate[6] = 0;
            } else {
                    listiddate[0] = Liste[ID_Tontine][Address_Receiver].ListeGaranties[ Liste[ID_Tontine][Address_Receiver].NbrGaranties[lastGarantie - 1]].date_garantie;
                    listiddate[1] =Liste[ID_Tontine][Address_Receiver].ListeGaranties[ Liste[ID_Tontine][Address_Receiver].NbrGaranties[lastGarantie - 1]].ID_Iteration;
                    listiddate[6] = Liste[ID_Tontine][Address_Receiver].ListeGaranties[ Liste[ID_Tontine][Address_Receiver].NbrGaranties[lastGarantie - 1]].Cumule;
           }
        }

        if (Cot) {
            
            uint256 lastCotisation =  Liste[ID_Tontine][Address_Receiver].NbrCotisations.length;
           if(lastCotisation == 0) {
                listiddate[2] =0;
                 listiddate[3] = 0; } 
                 else {
                    listiddate[2] =Liste[ID_Tontine][Address_Receiver].ListeCotisations[ Liste[ID_Tontine][Address_Receiver].NbrCotisations[lastCotisation - 1]].ID_Iteration;
                    listiddate[3] = Liste[ID_Tontine][Address_Receiver].ListeCotisations[ Liste[ID_Tontine][Address_Receiver].NbrCotisations[lastCotisation - 1]].date_cotisation;
}
        }

        if (Dis) {
            
            uint256 lastDistribution =  Liste[ID_Tontine][Address_Receiver].NbrDistributions.length;
          if(lastDistribution == 0) {
               listiddate[4] =0;
                listiddate[5] =0;
          } else {
             
                    listiddate[4] = Liste[ID_Tontine][Address_Receiver].ListeDistributions[ Liste[ID_Tontine][Address_Receiver].NbrDistributions[lastDistribution - 1]].ID_Iteration;
                    listiddate[5] = Liste[ID_Tontine][Address_Receiver].ListeDistributions[ Liste[ID_Tontine][Address_Receiver].NbrDistributions[lastDistribution - 1]].date_distribution;
}
        }

        return ( listiddate[0],
            listiddate[1],
            listiddate[2],
            listiddate[3],
            listiddate[4],
            listiddate[5],
            listiddate[6] );
    }
    
}

