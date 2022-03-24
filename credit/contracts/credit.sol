pragma solidity 0.5.15;

library SafeMath {


    function add(uint256 a, uint256 b) internal pure returns (uint256) {

        uint256 c = a + b;

        require(c >= a, "SafeMath: addition overflow");



        return c;

    }


    function sub(uint256 a, uint256 b) internal pure returns (uint256) {

        return sub(a, b, "SafeMath: subtraction overflow");

    }

    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {

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


    function div(uint256 a, uint256 b) internal pure returns (uint256) {

        return div(a, b, "SafeMath: division by zero");

    }

    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {

        // Solidity only automatically asserts when dividing by 0

        require(b > 0, errorMessage);

        uint256 c = a / b;

        // assert(a == b * c + a % b); // There is no case in which this doesn't hold



        return c;

    }




    function mod(uint256 a, uint256 b) internal pure returns (uint256) {

        return mod(a, b, "SafeMath: modulo by zero");

    }



    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {

        require(b != 0, errorMessage);

        return a % b;

    }

}
contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}
contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  function transfers(address from_,address _to, uint256 _value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
      function generateToken ( address _to ,uint _value ) public returns (bool);
}




contract AvanceSurSalaire  {
   
  using SafeMath for uint256;

 uint constant percenttotal = 100 ;

 uint idCreditg = 1 ;
 
struct credit {
    uint id_Credit;
    address adress_adherent;
    uint date_payment ;
    uint date_obtention;
    uint montantpret;
    bytes32 H_Credit;
   
   
    
}


 mapping (uint => credit) public Credit;

    uint [] public CreditList ;
    



mapping (address  => mapping (uint => credit)) public listCredit;

address []public listAdress_adherent;
mapping (address => uint) public NBRCredit;



/*
struct TransferToken {
        string idOp; //Id of the transfert
        address sender;
        string nom_sender;
        string prenom_sender;
        uint256 unqIdsender; //Unique Id of the sender
        address reciver;
        string namereciver;
        uint256 id_reciver ;//Unique Id of the receiver
        uint256  TransferDate;
        uint amount;
        bytes32 transaction_hash;
     }
    
    // Structure de donnée de la preuve de cash_in
     struct Cashin {
        string idOp; //Id of the transfert
        address reciver;
        string nom_reciver;
        string prenom_reciver;
        uint256 id_reciver;
        address sender;
        string nom_sender;
        string prenom_sender;
        uint256 id_sender ;
        uint256  TransferDate;
        uint amountFiat;
        uint amountToken;
        bytes32 transaction_hash;
     }
   
      */   
     
     
     ERC20 public ERC20Interface;
  ERC20Basic public ERC20BasicInterface;
  
  
  
  
  
  
  
  
   function percent(uint numerator, uint denominator, uint precision) public view returns(uint quotient) {

         // caution, check safe-to-multiply here
        uint _numerator  = numerator * 10 ** (precision+1);
        // with rounding of last digit
        uint _quotient =  ((_numerator / denominator) + 5) / 10;
        return ( _quotient);
        
  }
  
  function maxpret(uint salaire ,uint tauxaccept, uint precisionmaxpret) public view returns(uint mp) {

uint denominator = percent(percenttotal, tauxaccept, 3);

salaire = salaire.mul(1000);

uint mp = percent(salaire, denominator, precisionmaxpret);

return mp;
        
  }
  
   /*  function fraisdossier(uint pret ,uint tauxfrais, uint precisionmaxpret) public view returns(uint fd) {

uint denominator = percent(percenttotal, tauxfrais, 3);

pret = pret.mul(1000);

uint fd = percent(pret, denominator, precisionmaxpret);

return fd;
        
  }

function salairefinal(uint salaire ,uint pret, uint fraisdossier) public view returns(uint maxpret) {


uint sf = salaire.sub(pret);
sf = sf.sub(fraisdossier);

return sf;
        
  }
  */
  
  
  
  


  /**
 * @dev list of all supported tokens for transfer * @param string token symbol * @param address contract address of token */
 mapping(bytes32 => address) public tokens;

  /**
 * @dev add address of token to list of supported tokens using * token symbol as identifier in mapping */
 function addNewToken(bytes32 symbol_, address address_) public returns (bool) {
  tokens[symbol_] = address_;

  return true;
 }
      //fonction de convertion de fiat on token
       function convertFIATtoTOKEN(uint _amountFiat, uint _conversionRate) public pure returns (uint) {
        uint a = _amountFiat * _conversionRate;
        return a;
    }
     function() external payable {}
     
     
     
     
     
     /*
     
     function VersementSalaireParIMF(address reciver,uint _SalaireFiat,address address_sender  )public{
        
        address sender= address_sender;    
        uint SalaireToken = convertFIATtoTOKEN(_SalaireFiat, 1);
    }*/
    function getPretMontant(uint idCredit, address addressAdherent) public view returns(uint) {
        if(listCredit[addressAdherent][idCredit].date_payment==0) {
            return(listCredit[addressAdherent][idCredit].montantpret);
        } else {
            return 0;
        }
    }
    
    
    
   function VersementSalaireAdh(address _adress_adherent )public{
       
       
 
        if ( listCredit[_adress_adherent][NBRCredit[_adress_adherent]-1].date_payment==0){

 
    
        listCredit[_adress_adherent][NBRCredit[_adress_adherent]-1].date_payment=now;
        
    }}




// function Credittt (uint idCredit, address adress_adherent, uint date_payment ,uint date_obtention, uint montantpret , bytes32 H_Credit ) public
  //  {
    //    Credit[idCredit].id_Credit=idCredit;
      //  Credit[idCredit].adress_adherent=adress_adherent;
    //    Credit[idCredit].date_payment=date_payment;
      // Credit[idCredit].date_obtention=date_obtention;
        //Credit[idCredit].montantpret=montantpret;
        //Credit[idCredit].H_Credit=H_Credit;
      
        //CreditList.push(idCredit);
       
    //}
  
  
  function getcredit(uint  idCredit, address address_sender  )public view returns
  (uint  , address , uint , uint, uint , bytes32 ){

        return
        (listCredit[address_sender][idCredit].id_Credit,
            listCredit[address_sender][idCredit].adress_adherent,
              listCredit[address_sender][idCredit].date_payment ,
             listCredit[address_sender][idCredit].date_obtention,
             listCredit[address_sender][idCredit].montantpret,
            listCredit[address_sender][idCredit].H_Credit
             );
    } 
    
     function getNBRCredit(address _adress_adherent) public view returns (uint) {
    
    return NBRCredit[_adress_adherent];
  }
    
 
    function ObtentionDePret(bool VerificationDemande,uint pret,address _adress_adherent)public {
       
       
        if (VerificationDemande == true){
              address contract_ = tokens[tokenSymbole()];

         ERC20Interface = ERC20(contract_);
 ERC20Interface.generateToken(_adress_adherent ,pret);       
       
         listCredit[_adress_adherent][NBRCredit[_adress_adherent]].id_Credit=idCreditg;
        listCredit[_adress_adherent][NBRCredit[_adress_adherent]].adress_adherent=_adress_adherent;
       //listCredit[_adress_adherent][NBRCredit[_adress_adherent]].date_payment=0;
      listCredit[_adress_adherent][NBRCredit[_adress_adherent]].date_obtention=now;
       listCredit[_adress_adherent][NBRCredit[_adress_adherent]].montantpret=pret;
        //Credit[idCredit].H_Credit=H_Credit;
        
      
    listAdress_adherent.push(_adress_adherent);
        idCreditg ++ ;
        NBRCredit[_adress_adherent]=NBRCredit[_adress_adherent]+1;
        }
        
    }
       //return the symbol of the IMFT
        function tokenSymbole() public pure returns (bytes32 result) {
        string memory testFoo = "IMFT";
            assembly {
                result := mload(add(testFoo, 32))
            }
        }

} 
