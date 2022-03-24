pragma solidity 0.5.11;


/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  function transfers(address from_,address _to, uint256 _value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

 

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}



contract PretContract {
    
    
        address public owner;
        uint256 public idEcheanceGlobale = 0;
         uint public idPretGlobale = 0;


     struct Echeance {
        string idEcheance;
        uint256 montant;
        uint256 DateLimite ;
        uint256 DateLancement ;
        uint256 DatePaiement;
        address intermediate ;
        // nonPayé .... false : payé .... true
        bool status;
        bytes32 transaction_hash;
        
        
    }
    
    struct Pret {
        string idPret ;
        uint256 DateCreation ;
        // 0 : nonPayé .... 1 : payé .... 2 : bloqué
        uint256 status ;
        address borrower ;
        uint256 NombreEcheances ;
        Echeance[]  ListEcheances;

 

        
  
    }
    
    
    
    
    mapping (address => mapping (uint => Pret)) public ListePret;
    
    mapping(address => uint) public NombrePret;

//  mapping(string => Pret) public ListPrets;

  //  string[] public NbrListPrets;

 mapping(bytes32 => address) public tokens;
 
   ERC20 public ERC20Interface;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

    constructor() public {
         owner = msg.sender;

 

    }
    
    
        
     function addNewToken(bytes32 symbol_, address address_) public returns (bool) {
  tokens[symbol_] = address_;

 

  return true;
 }
    
function transferBackTokens( address adh, uint amount) public {
    
 bytes32 symbol_ = SymbolToken();

 

  address contract_ = tokens[symbol_];
  address from_ = adh;
  ERC20Interface = ERC20(contract_);


  ERC20Interface.transfers(from_,owner, amount);

 

 }
 
 
     function SymbolToken() public pure returns (bytes32 result) {
        string memory testFoo = "IMFT";
         assembly {
        result := mload(add(testFoo, 32))
        }
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
  
 
    
    function addPret( 
        address borrower,
        uint256 NombreEcheances,
        uint256 DateCreation) public {
            
            
          string memory idPret =  concat("PR",uint2str(idPretGlobale)) ;
          
          ListePret[borrower][NombrePret[borrower]].idPret = idPret;
        
        ListePret[borrower][NombrePret[borrower]].DateCreation = DateCreation;
        
        ListePret[borrower][NombrePret[borrower]].status = 0;
        
        ListePret[borrower][NombrePret[borrower]].borrower = borrower;
        
        ListePret[borrower][NombrePret[borrower]].NombreEcheances = NombreEcheances;
        
        NombrePret[borrower] = NombrePret[borrower]+1;
        
        idPretGlobale ++ ;

 
        }
        
          function getPretInfoByIndex(uint256 index, address borrower) public view returns (string memory, uint256 , uint256, address, uint256) {
              
              return(ListePret[borrower][index].idPret, ListePret[borrower][index].DateCreation, ListePret[borrower][index].status, ListePret[borrower][index].borrower, ListePret[borrower][index].NombreEcheances);
              
             
         }
         
        function getPretLengthByBorrower(address borrower) public view returns( uint) {
            
            return (NombrePret[borrower]);
            
        }
        
             
       
        function addEcheance(   
//        string memory idPret,
        uint256 montant,
        uint256 DateLimite,
        uint256 DateLancement,
        address borrower,
        uint256 DateActuel
       ) public {
     
               string memory idEcheance =  concat("E",uint2str(idEcheanceGlobale)) ;
       
       
       Echeance memory echeance;
       
       echeance.idEcheance = idEcheance;
       
       echeance.montant = montant;
       
       echeance.DateLimite = DateLimite;
       
       echeance.intermediate = address(0);
       
       echeance.DateLancement = DateLancement;
       
       echeance.transaction_hash = 0x0;
       
       echeance.status = false;
       
       for(uint256 i=0; i<NombrePret[borrower];i++) {
       
       if(ListePret[borrower][i].DateCreation == DateActuel) {
   
       ListePret[borrower][i].ListEcheances.push(echeance);
     
        idEcheanceGlobale ++ ;
        
       }
       }
    

 
        }
        
        
          function getEcheanceInfoByIndex(string memory idPret, uint256 indexE, address borrower) public view returns (string memory, uint256 , uint256, address, uint256, bool) {
              
                  
            for(uint256 i=0; i<NombrePret[borrower]; i++){
                
                if(keccak256( abi.encodePacked(ListePret[borrower][i].idPret)) == keccak256( abi.encodePacked(idPret))) {
                      return(ListePret[borrower][i].ListEcheances[indexE].idEcheance,ListePret[borrower][i].ListEcheances[indexE].montant, ListePret[borrower][i].ListEcheances[indexE].DateLimite, ListePret[borrower][i].ListEcheances[indexE].intermediate,
              ListePret[borrower][i].ListEcheances[indexE].DateLancement, ListePret[borrower][i].ListEcheances[indexE].status);
                }
            }
              
            
              
             
         }
        
     
      
           function getEcheanceInfoByIndexX(string memory idPret, uint256 indexE, address borrower) public view returns (string memory, uint256, bytes32) {
              
                  
            for(uint256 i=0; i<NombrePret[borrower]; i++){
                
                if(keccak256( abi.encodePacked(ListePret[borrower][i].idPret)) == keccak256( abi.encodePacked(idPret))) {
                      return(ListePret[borrower][i].ListEcheances[indexE].idEcheance, ListePret[borrower][i].ListEcheances[indexE].DatePaiement, ListePret[borrower][i].ListEcheances[indexE].transaction_hash );
                }
            }
              
            
              
             
         }
         
        function getEcheanceLengthByPret(address borrower, string memory idPret) public view returns( uint) {
            
            for(uint256 i=0; i<NombrePret[borrower]; i++){
                
                if(keccak256( abi.encodePacked(ListePret[borrower][i].idPret)) == keccak256( abi.encodePacked(idPret))) {
                    return(ListePret[borrower][i].ListEcheances.length);
                }
            }
            
        }
        
   
         
       
    function setTransactionHash(
        bytes32 trHash,
        uint256 indexE,
        uint256 indexP,
        address borrower
    ) public {
        
        ListePret[borrower][indexP].ListEcheances[indexE].transaction_hash = trHash;
    

    }
    

    function payerEcheance( string memory idPret, address borrower, string memory idEcheance) public {
        
        
           for(uint256 j=0; j<NombrePret[borrower]; j++){
                
                if(keccak256( abi.encodePacked(ListePret[borrower][j].idPret)) == keccak256( abi.encodePacked(idPret))) {
        for(uint i =0; i<ListePret[borrower][j].ListEcheances.length; i++) {
            
            if (keccak256( abi.encodePacked(ListePret[borrower][j].ListEcheances[i].idEcheance)) == 
            keccak256( abi.encodePacked(idEcheance))) {
                
                   require(ListePret[borrower][j].borrower == msg.sender);
        
        require (ListePret[borrower][j].ListEcheances[i].DateLimite > now );
     
        require(ListePret[borrower][j].ListEcheances[i].status == false);
        
        uint256 amount = ListePret[borrower][j].ListEcheances[i].montant;
        
        transferBackTokens( msg.sender, amount);
        
        ListePret[borrower][j].ListEcheances[i].status = true;
        
       ListePret[borrower][j].ListEcheances[i].DatePaiement = now;
                
            }
            
        }
                }}
        
     
        
   

 

    }
    
    
    function PayerEcheanceIntermadiate(string memory idPret, address borrower, string memory idEcheance) public
    {
        
        
              for(uint256 j=0; j<NombrePret[borrower]; j++){
                
                if(keccak256( abi.encodePacked(ListePret[borrower][j].idPret)) == keccak256( abi.encodePacked(idPret))) {
        for(uint i =0; i<ListePret[borrower][j].ListEcheances.length; i++) {
            
            if (keccak256( abi.encodePacked(ListePret[borrower][j].ListEcheances[i].idEcheance)) == 
            keccak256( abi.encodePacked(idEcheance))) {
                
             //      require(ListePret[borrower][j].borrower == msg.sender);
        
        require (ListePret[borrower][j].ListEcheances[i].DateLimite > now );
     
        require(ListePret[borrower][j].ListEcheances[i].status == false);
        
        uint256 amount = ListePret[borrower][j].ListEcheances[i].montant;
        
        transferBackTokens( msg.sender, amount);
        
        ListePret[borrower][j].ListEcheances[i].status = true;
        
       ListePret[borrower][j].ListEcheances[i].DatePaiement = now;
        ListePret[borrower][j].ListEcheances[i].intermediate = msg.sender;
                
            }
            
        }
                }}
        
     
  
    }
    




}


