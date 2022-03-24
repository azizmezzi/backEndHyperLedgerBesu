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

  function allowance(address owner, address spender) public view returns (uint256);

  function transferFrom(address from, address to, uint256 value) public returns (bool);

  function approve(address spender, uint256 value) public returns (bool);

  function transfers(address from_,address _to, uint256 _value) public returns (bool);

  event Approval(address indexed owner, address indexed spender, uint256 value);

}

 

 



contract tontine_Cercle {

    

   using SafeMath for uint256;


   struct Liste {

   address Adherent_Address;

   uint Ordre;

   bool Inscrit;

    }

   struct Tontine {

        string ID_Tontine;

        string Nom_Tontine;

        uint Date;
        
        uint Montant;

        address Createur;

        uint Nbr_participants;

        uint Nbr_cycles; 

        uint Iteration_enCours;

        uint Cycle_enCours;

        bool Etat;

        string Frequence;
        
        uint SommeParMois;

        mapping (address => Liste) ListeParticipant; 

        address[]  participantsAddress;

    }

    

    struct Participant {

        

        address Adherent_Address ;

        uint ID_Participant;

         

    }

    uint private numPart =2;

    mapping (address => Participant) public Participants;

    address[] ListToutParti;

    

 

    struct TxGarantie {

        uint ID_Garantie;

        //uint ID_Participant;

        string ID_Tontine;

        uint ID_Cycle;
        
        uint date_garantie;

        uint ID_Iteration;

        uint Montant;

        string Type_Transaction;

        uint Cumule;

        bytes32 Hash_Transaction;

    }

    uint private numGarantie = 0;

    mapping (address => TxGarantie[]) public Garanties;

    address[] AddressAdhGar;

    

    struct TxCotisation {

        uint ID_Cotisation;

       // uint ID_Participant;

        string ID_Tontine;

        uint ID_Cycle;

        uint ID_Iteration;
        
        uint date_cotisation;

        uint Montant;

        bytes32 Hash_Transaction;

    }

    uint private  numCotisation = 0;

    mapping (address => TxCotisation[]) public Cotisations;

    address[] AddressAdhCot;

    

    struct TxDistribution {

        uint ID_Distribution;

        string ID_Tontine;
        
        uint date_distribution;

        uint ID_Cycle;

        uint ID_Iteration;

        uint ID_Part_Gagnant;

        uint Montant;

        bytes32 Hash_Transaction;

    }

    uint private numDistribution = 0;

    mapping (address => TxDistribution[]) public Distributions;

    address[] AddressAdhDist;



    mapping (string => Tontine) public tontineCercle;

    string [] public tontineList ;

    

      /**

    * @dev list of all supported tokens for transfer * @param string token symbol * @param address contract address of token */  

     mapping(bytes32 => address) public tokens;

 

     ERC20 public ERC20Interface;

  

  

    constructor() public {

        //   require (owner == msg.sender);

    }
    
      function() external payable {}

    
    function convertttt() public pure returns (bytes32 result) 

    {

    

        string memory testFoo = "IMFT";

        assembly {

            result := mload(add(testFoo, 32))

        }

    }


    /**

    * @dev add address of token to list of supported tokens using * token symbol as identifier in mapping */

    function addNewToken(address address_) public returns (bool) 

    {

                bytes32 symbol_ =  convertttt();

         tokens[symbol_] = address_;

         return true;

         

    }

 

    function addTontine(string memory ID_Tontine, string memory Nom_Tontine, uint Montant, uint Nbr_participants, uint Nbr_cycles, string memory Frequence ) /* onlyOwner */ public 

    {

        bytes memory identi = bytes(tontineCercle[ID_Tontine].ID_Tontine);

        require(identi.length == 0);
        require(Nbr_participants >= 2);
        require(Nbr_cycles >= 1);
        

        tontineCercle[ID_Tontine].ID_Tontine = ID_Tontine;

        tontineCercle[ID_Tontine].Nom_Tontine = Nom_Tontine;

        tontineCercle[ID_Tontine].Createur = msg.sender;

        tontineCercle[ID_Tontine].Nbr_participants = Nbr_participants;

        tontineCercle[ID_Tontine].Nbr_cycles = Nbr_cycles;

        tontineCercle[ID_Tontine].Date = 0;
        
     //   tontineCercle[ID_Tontine].DateDistribution = 0;
        
        tontineCercle[ID_Tontine].SommeParMois = 0;

        tontineCercle[ID_Tontine].Montant = Montant;

        tontineCercle[ID_Tontine].Etat = false;

        tontineCercle[ID_Tontine].Cycle_enCours = 0;

        tontineCercle[ID_Tontine].Iteration_enCours = 0;

        tontineCercle[ID_Tontine].Frequence = Frequence;

        tontineList.push(ID_Tontine);

        addParticipant(ID_Tontine,1);

    }

    

   

    function getTontine(string memory ID_Tontine) view public returns(string memory, uint, uint, uint, string memory)

    {

        

        return (tontineCercle[ID_Tontine].Nom_Tontine,tontineCercle[ID_Tontine].Nbr_participants, tontineCercle[ID_Tontine].Montant, tontineCercle[ID_Tontine].Nbr_cycles, tontineCercle[ID_Tontine].Frequence);

    

    }
    
    function addUser(string memory ID_Tontine,address Adherent_Address, uint  Ordre ) public 

    {

        

        require(   tontineCercle[ID_Tontine].Nbr_participants  >= tontineCercle[ID_Tontine].participantsAddress.length);

        require(tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].Adherent_Address == address(0));

        for(uint i =0 ; i <  tontineCercle[ID_Tontine].participantsAddress.length ; i++){

            require(tontineCercle[ID_Tontine].ListeParticipant[tontineCercle[ID_Tontine].participantsAddress[i]].Ordre != Ordre && Ordre <= tontineCercle[ID_Tontine].Nbr_participants && 0 < Ordre );

        }

        

        tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].Adherent_Address = Adherent_Address;

        tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].Ordre = Ordre;

        tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].Inscrit = true;

        tontineCercle[ID_Tontine].participantsAddress.push(Adherent_Address);


    }


    function addParticipant(string memory ID_Tontine, uint Ordre) public 

    {

                 addUser(  ID_Tontine, msg.sender,   Ordre ) ;


        if(Participants[msg.sender].Adherent_Address == address(0))

            {

                 Participants[msg.sender].ID_Participant = numPart;

                 Participants[msg.sender].Adherent_Address = msg.sender;

            } 

        addTxGarantie(ID_Tontine,msg.sender,address(this),true);
        if(tontineCercle[ID_Tontine].participantsAddress.length == tontineCercle[ID_Tontine].Nbr_participants){
            tontineCercle[ID_Tontine].Date =  now ;
            tontineCercle[ID_Tontine].Etat = true ; 
            tontineCercle[ID_Tontine].Cycle_enCours = 1 ; 
            tontineCercle[ID_Tontine].Iteration_enCours = 1;
        }

        numPart ++;

         

    }

    
    function getNumPartTontine(string memory ID_Tontine) view public returns(uint ) 
    {
        return (tontineCercle[ID_Tontine].participantsAddress.length);
    }
    function getParticipant(address Adherent_Address) public view returns(address, uint) 

    {

        

        return(Participants[Adherent_Address].Adherent_Address, Participants[Adherent_Address].ID_Participant);

        

    }


    function getParticipantTontine(address Adherent_Address, string memory ID_Tontine) public view returns(address, uint, bool) 

    {

        return (tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].Adherent_Address, tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].Ordre, tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].Inscrit);

        

    }


     //Modifier le hash de la transaction d'un cashout

    function setTransactionHashGarantie(bytes32 trHash, address Adherent_Address) public {


        for(uint i=0; i<Garanties[Adherent_Address].length; i++) 

        {

            if(Garanties[Adherent_Address][i].ID_Garantie == (numGarantie))

            {

                Garanties[Adherent_Address][i].Hash_Transaction = trHash;

            }

        }

       

    }
    
    
    function setTransactionHashCotisation(bytes32 trHash, address Adherent_Address) public {


        for(uint i=0; i<Cotisations[Adherent_Address].length; i++) 

        {

            if(Cotisations[Adherent_Address][i].ID_Cotisation == (numCotisation))

            {

                Cotisations[Adherent_Address][i].Hash_Transaction = trHash;

            }

        }

       

    }
    
    
    function setTransactionHashDistribution(bytes32 trHash, address Adherent_Address) public {


        for(uint i=0; i<Distributions[Adherent_Address].length; i++) 

        {

            if(Distributions[Adherent_Address][i].ID_Distribution == (numDistribution))

            {

                Distributions[Adherent_Address][i].Hash_Transaction = trHash;

            }

        }

       

    }



    function addTxGarantie(string memory ID_Tontine, address Adherent_Address, address Contract_Address , bool Type) public 

    {  

        transaction(Adherent_Address, Contract_Address,tontineCercle[ID_Tontine].Montant);


        uint cumule;
        bool verif = true;

        for(uint i=0; i<Garanties[Adherent_Address].length; i++) 

        {

            if((keccak256(abi.encodePacked(Garanties[Adherent_Address][i].ID_Tontine)) == keccak256(abi.encodePacked(ID_Tontine))))

            {

                cumule = Garanties[Adherent_Address][i].Cumule;

            }

        }

       

        numGarantie ++;

        for(uint i=0; i<AddressAdhGar.length; i++)

        {

            if(AddressAdhGar[i] != Adherent_Address)

            {
                verif = false;
             
            }

        }  
        if(verif)
        {
            AddressAdhGar.push(Adherent_Address);
        }

        TxGarantie memory garantie ;

        garantie.ID_Garantie= numGarantie;

        garantie.ID_Tontine = ID_Tontine;
        
        garantie.date_garantie = now;

        garantie.ID_Cycle = tontineCercle[ID_Tontine].Cycle_enCours;

        garantie.ID_Iteration = tontineCercle[ID_Tontine].Iteration_enCours;

        garantie.Montant = tontineCercle[ID_Tontine].Montant;

           if(Type) {

               garantie.Type_Transaction = "Recharge";

               garantie.Cumule = cumule + tontineCercle[ID_Tontine].Montant;

         }else {

               garantie.Type_Transaction = "Retrait";

               garantie.Cumule = cumule - tontineCercle[ID_Tontine].Montant;

         }

    

        garantie.Hash_Transaction = 0x0;

        Garanties[Adherent_Address].push(garantie);


    } 
    
    function getSommeParMois(string memory ID_Tontine) public view returns(uint ) 
    {
        return tontineCercle[ID_Tontine].SommeParMois;
    }
  function getLastGarantie(string memory ID_Tontine, address Address_Receiver) view public returns(string memory, uint, uint) 
  {
      string memory type_Transaction ;
      uint cumule ;
      uint date_garantie;
      for(uint i=0; i<Garanties[Address_Receiver].length; i++) 
        {
             if((keccak256(abi.encodePacked(Garanties[Address_Receiver][i].ID_Tontine)) == keccak256(abi.encodePacked(ID_Tontine))))

            {   type_Transaction = Garanties[Address_Receiver][i].Type_Transaction;
                cumule = Garanties[Address_Receiver][i].Cumule;
                date_garantie = Garanties[Address_Receiver][i].date_garantie;
            }

            
          
        }
        return (type_Transaction, cumule, date_garantie);
  }
  
   function getLastDistribution(string memory ID_Tontine)view public returns(address, uint,uint) 
  {
      address AddAdherent;
      uint Montant ;
      uint date_distribution;
      bool verif = false;
      for(uint j=0; j<AddressAdhDist.length; j++) {
      for(uint i=0; i<Distributions[AddressAdhDist[j]].length; i++) 
        {
             if((keccak256(abi.encodePacked(Distributions[AddressAdhDist[j]][i].ID_Tontine)) == keccak256(abi.encodePacked(ID_Tontine))))

            {  verif= true;
                AddAdherent = AddressAdhDist[j];
                Montant = Distributions[AddressAdhDist[j]][i].Montant;
                date_distribution = Distributions[AddressAdhDist[j]][i].date_distribution;

            }
          
        }}
        return (AddAdherent, Montant,date_distribution);
  }
  
  function getLastCotisation(string memory ID_Tontine, address Address_Receiver) view public returns(uint, uint) 
  {
      uint ID_Iteration;
      uint date_cotisation;
      for(uint i=0; i<Cotisations[Address_Receiver].length; i++) 
        {
             if((keccak256(abi.encodePacked(Cotisations[Address_Receiver][i].ID_Tontine)) == keccak256(abi.encodePacked(ID_Tontine))))

            {   ID_Iteration = Cotisations[Address_Receiver][i].ID_Iteration;
                date_cotisation = Cotisations[Address_Receiver][i].date_cotisation;

            }

            
          
        }
        return (ID_Iteration, date_cotisation);
  }
    

    TxGarantie[]  list;

    

    function getGarPartIndice(address Adherent_Address, string memory ID_Tontine, uint indice) public returns(TxGarantie memory garantie)

    {

        

         for(uint i=0; i<Garanties[Adherent_Address].length;i++) 

             {

                  if((keccak256(abi.encodePacked(Garanties[Adherent_Address][i].ID_Tontine)) == keccak256(abi.encodePacked(ID_Tontine))))

                    {

                         list.push(Garanties[Adherent_Address][i]);

                    }

             }

         TxGarantie memory rr = list[indice];

         delete list;

         garantie.ID_Garantie = rr.ID_Garantie;

         garantie.ID_Tontine = rr.ID_Tontine;

         garantie.ID_Cycle = rr.ID_Cycle;

         garantie.ID_Iteration = rr.ID_Iteration;

    }

    

    function addTxCotisation(string memory ID_Tontine, address Adherent_Address) public

    {

          bool verif = true;

        numCotisation ++;

        for(uint i=0; i<AddressAdhCot.length; i++)

        {

            if(AddressAdhCot[i] != Adherent_Address)

            {
                verif = false;
            }

        }
        if(verif) 
        {
            AddressAdhCot.push(Adherent_Address);
        }
        TxCotisation memory cotisation ;

        cotisation.ID_Cotisation= numCotisation;

        cotisation.ID_Tontine = ID_Tontine;
        
        cotisation.date_cotisation = now;

        cotisation.ID_Cycle = tontineCercle[ID_Tontine].Cycle_enCours;

        cotisation.ID_Iteration = tontineCercle[ID_Tontine].Iteration_enCours;

        cotisation.Montant = tontineCercle[ID_Tontine].Montant;

        cotisation.Hash_Transaction = 0x0;

        Cotisations[Adherent_Address].push(cotisation);

       

    }

    function getNumTontine()public view returns(uint){
        return tontineList.length;
    }


    function addTxDistribution(string memory ID_Tontine, address Adherent_Address/*, uint ID_Part_Gagnant*/) public 

    {

        bool verif = true;
        numDistribution ++;

        for(uint i=0; i<AddressAdhDist.length; i++)

        {

            if(AddressAdhDist[i] == Adherent_Address)

            {
                verif = false;
            }

        }
        if(verif)
        { 
            AddressAdhDist.push(Adherent_Address);
            
        }

        TxDistribution memory distribution ;
  
        distribution.ID_Distribution = numDistribution;

        distribution.ID_Tontine = ID_Tontine;

        distribution.ID_Cycle = tontineCercle[ID_Tontine].Cycle_enCours;

        distribution.ID_Iteration = tontineCercle[ID_Tontine].Iteration_enCours;
        
        distribution.date_distribution = now;

       // distribution.ID_Part_Gagnant = ID_Part_Gagnant;

        distribution.Montant = tontineCercle[ID_Tontine].Montant.mul(tontineCercle[ID_Tontine].Nbr_participants);

        distribution.Hash_Transaction = 0x0;

        Distributions[Adherent_Address].push(distribution);

    }

    

    

      function notification(string memory ID_Tontine) view public returns(uint, string memory, uint , uint ){

if(tontineCercle[ID_Tontine].Etat){
    return (tontineCercle[ID_Tontine].Date, tontineCercle[ID_Tontine].Frequence , tontineCercle[ID_Tontine].Cycle_enCours , tontineCercle[ID_Tontine].Iteration_enCours);
}       
    }

          function getDateLancement(string memory ID_Tontine) view public returns(uint , uint, string memory){

if(tontineCercle[ID_Tontine].Etat){
    return (tontineCercle[ID_Tontine].Date , tontineCercle[ID_Tontine].Iteration_enCours, tontineCercle[ID_Tontine].Frequence);
}      else return (0 , 0 , ''); 
    }

    

    function transaction(address Address_Sender , address Address_Receiver , uint Montant) public
    {

        bytes32 symbol_ =  convertttt();
        address contract_ = tokens[symbol_];
        ERC20Interface = ERC20(contract_);
        ERC20Interface.transfers(Address_Sender, Address_Receiver , Montant);

    }

    

    function cotisation(string memory ID_Tontine) public 
    {
        addTxCotisation(ID_Tontine, msg.sender);
        transaction(msg.sender, address(this), tontineCercle[ID_Tontine].Montant);
        tontineCercle[ID_Tontine].SommeParMois += tontineCercle[ID_Tontine].Montant;

    }
    

    function envoiGarantie(address Contract_Address , uint Montant) public 
    {

        transaction(msg.sender, Contract_Address,Montant);

    }
    
    function verifGarantie(string memory ID_Tontine, address Address_Receiver) public {
         uint nbr = tontineCercle[ID_Tontine].Nbr_participants;
             uint montant =tontineCercle[ID_Tontine].Montant;   
             uint cumule;      
        if(tontineCercle[ID_Tontine].SommeParMois != montant.mul(nbr)) {
             for(uint i=0; i<Garanties[Address_Receiver].length; i++) 
        {
             if((keccak256(abi.encodePacked(Garanties[Address_Receiver][i].ID_Tontine)) == keccak256(abi.encodePacked(ID_Tontine))))

            {
                cumule = Garanties[Address_Receiver][i].Cumule;

            }

            
          
        }
        
       
            if(cumule != 0) {
                tontineCercle[ID_Tontine].SommeParMois += tontineCercle[ID_Tontine].Montant;

            }

        numGarantie ++;


        TxGarantie memory garantie ;

        garantie.ID_Garantie= numGarantie;

        garantie.ID_Tontine = ID_Tontine;

	garantie.date_garantie = now;

        garantie.ID_Cycle = tontineCercle[ID_Tontine].Cycle_enCours;

        garantie.ID_Iteration = tontineCercle[ID_Tontine].Iteration_enCours;

        garantie.Montant = tontineCercle[ID_Tontine].Montant;

          
               garantie.Type_Transaction = "Retrait";

               garantie.Cumule = cumule - tontineCercle[ID_Tontine].Montant;

    

        garantie.Hash_Transaction = 0x0;

        Garanties[Address_Receiver].push(garantie);


        } 
    }

    

    function distribution(string memory ID_Tontine, address Address_Receiver, uint Ordre) public 
    {
  uint nbr = tontineCercle[ID_Tontine].Nbr_participants;
             uint montant =tontineCercle[ID_Tontine].Montant;
  
       require(tontineCercle[ID_Tontine].SommeParMois == montant.mul(nbr));     
             if(Ordre ==tontineCercle[ID_Tontine].Iteration_enCours){
                tontineCercle[ID_Tontine].SommeParMois = 0;
                if(tontineCercle[ID_Tontine].Iteration_enCours == tontineCercle[ID_Tontine].Nbr_participants){
                //require(tontineCercle[ID_Tontine].Cycle_enCours <= tontineCercle[ID_Tontine].Nbr_cycles);
                tontineCercle[ID_Tontine].Cycle_enCours += 1;
                tontineCercle[ID_Tontine].Iteration_enCours = 1 ;

              } else {
                 tontineCercle[ID_Tontine].Iteration_enCours += 1;

              }

             transaction(address(this), Address_Receiver, montant.mul(nbr));
           
           }


        addTxDistribution(ID_Tontine, Address_Receiver); 
    }
    
    
    
    
       function getNumIterationCycle(string memory ID_Tontine)public view returns(uint){
        return tontineCercle[ID_Tontine].Nbr_participants.mul(tontineCercle[ID_Tontine].Nbr_cycles);
    }
    
    
}


