pragma solidity 0.5.11;
import './PA.sol';
pragma experimental ABIEncoderV2;



contract tontine_Cercle1 {
    using SafeMath for uint256;
participant_contract a;


    struct Tontine {
        string ID_Tontine;
        string Nom_Tontine;
        uint256 Date;
        uint256 Montant;
        address Createur;
        uint256 Nbr_participants;
        uint256 Nbr_cycles;
        uint256 Iteration_enCours;
        uint256 Cycle_enCours;
        bool Etat;
        string Frequence;
      //  uint256 SommeParMois;
        mapping(address => participant_contract) ListeParticipant;
        address[] participantsAddress;
    }

     mapping(string => Tontine) public tontineCercle;

    string[] public tontineList;
    
        mapping(bytes32 => address) public tokens;

    ERC20 public ERC20Interface;

  constructor (participant_contract _a) public {
      
    a = _a;
  }
  
  
    /* ********************* Transaction Globale **************************/

  
      function convertttt() internal pure returns (bytes32 result) {
        string memory testFoo = "IMFT";

        assembly {
            result := mload(add(testFoo, 32))

        }

    }

    /**
 
    * @dev add address of token to list of supported tokens using * token symbol as identifier in mapping */

    function addNewToken(address address_) public returns (bool) {
        bytes32 symbol_ = convertttt();

        tokens[symbol_] = address_;

        return true;

    }
    
    
       function transaction(address add,address add1,uint256 m) internal {
     //   participant_contract a = new participant_contract();
               bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];
       
        a.transaction(add,add1,m,contract_);
    }
    
       
  
  /* ********************* Tontine Create + Get **************************/

  
    function addTontine(
        string memory ID_Tontine,
        string memory Nom_Tontine,
        uint256 Montant,
        uint256 Nbr_participants,
        uint256 Nbr_cycles,
        string memory Frequence,
        uint256 Ordre,
        address addressParticipant,
        address addressTon
    ) public { 
        
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

       // tontineCercle[ID_Tontine].SommeParMois = 0;

        tontineCercle[ID_Tontine].Montant = Montant;

        tontineCercle[ID_Tontine].Etat = false;

        tontineCercle[ID_Tontine].Cycle_enCours = 0;

        tontineCercle[ID_Tontine].Iteration_enCours = 0;

        tontineCercle[ID_Tontine].Frequence = Frequence;

        tontineList.push(ID_Tontine);
        
       // tontineCercle[ID_Tontine].participantsAddress.push(addressParticipant);

       
        addParticipant(ID_Tontine, Ordre,false,addressTon);
        

    }

    
    function getTontine(string memory ID_Tontine)
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256,
            string memory,
            address,
            bool
        )
    {
        return (
            tontineCercle[ID_Tontine].Nom_Tontine,
            tontineCercle[ID_Tontine].Nbr_participants,
            tontineCercle[ID_Tontine].Montant,
            tontineCercle[ID_Tontine].Nbr_cycles,
            tontineCercle[ID_Tontine].Frequence,
            tontineCercle[ID_Tontine].Createur,
            tontineCercle[ID_Tontine].Etat
            
        );

    }
    
          /* **************************** Ajouter Participant : Post + Get      ******************************/

    
    
           function addParticipant(string memory ID_Tontine, uint256 Ordre,bool decline, address addressTon) public {
                 //  tontineCercle[ID_Tontine].ListeParticipant[msg.sender] = new participant_contract();

tontineCercle[ID_Tontine].ListeParticipant[msg.sender] =a;

tontineCercle[ID_Tontine].ListeParticipant[msg.sender].addUser(ID_Tontine,msg.sender, Ordre);
       bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];
tontineCercle[ID_Tontine].participantsAddress.push(msg.sender);
       if(decline){
           tontineCercle[ID_Tontine].Date = now;
            tontineCercle[ID_Tontine].Etat = false;
       }else{
           
           tontineCercle[ID_Tontine].ListeParticipant[msg.sender].addTxGarantie(ID_Tontine, msg.sender, 
           tontineCercle[ID_Tontine].Cycle_enCours, tontineCercle[ID_Tontine].Iteration_enCours, tontineCercle[ID_Tontine].Montant, addressTon, true,contract_);
        if (
            tontineCercle[ID_Tontine].participantsAddress.length ==
            tontineCercle[ID_Tontine].Nbr_participants
        ) {
            tontineCercle[ID_Tontine].Date = now;
            tontineCercle[ID_Tontine].Etat = true;
            tontineCercle[ID_Tontine].Cycle_enCours = 1;
            tontineCercle[ID_Tontine].Iteration_enCours = 1;
        }
           
       }

    }
    
    // à supprimer: non utilsée
    
    function getPart(string memory ID_Tontine, address addresPart) public view returns(uint256, bool) {
       return(tontineCercle[ID_Tontine].ListeParticipant[addresPart].get(ID_Tontine,addresPart));
        
    }
    
    
      /* ****************************cotisation : Post + Get      ******************************/

    

      function cotisation(string memory ID_Tontine, address addressTon) public {
              tontineCercle[ID_Tontine].ListeParticipant[msg.sender] = a;

      //  tontineCercle[ID_Tontine].ListeParticipant[msg.sender] = new participant_contract();
      bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];
    //     tontineCercle[ID_Tontine].ListeParticipant[msg.sender].cotisation(ID_Tontine, addressTon, tontineCercle[ID_Tontine].Cycle_enCours,
    //tontineCercle[ID_Tontine].Iteration_enCours, tontineCercle[ID_Tontine].Montant, contract_);
    tontineCercle[ID_Tontine].ListeParticipant[msg.sender].addTxCotisation(ID_Tontine, msg.sender, tontineCercle[ID_Tontine].Cycle_enCours,
    tontineCercle[ID_Tontine].Iteration_enCours, tontineCercle[ID_Tontine].Montant);
     tontineCercle[ID_Tontine].ListeParticipant[msg.sender].transaction( msg.sender, addressTon, tontineCercle[ID_Tontine].Montant, contract_);
       
      /* tontineCercle[ID_Tontine].SommeParMois = tontineCercle[ID_Tontine].Montant.add(
            tontineCercle[ID_Tontine].SommeParMois
        );*/

    }
    
    // à supprimer: non utilisée (pour test)
    
            function getCotnbr(string memory ID_Tontine, address Adherent_Address) public view returns(uint256) {
       return(tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].getCotNbr(ID_Tontine,Adherent_Address));
        
    }
    
        

    
          /* **************************** Recharge et Garantie  :Post + Get      ******************************/
          
          
          
              function RechargeGarantie(
        string memory ID_Tontine,
        address tontine_Address,
        bool Type
    ) public {
             bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];

       tontineCercle[ID_Tontine].ListeParticipant[msg.sender].addTxGarantie(
      ID_Tontine,
         msg.sender,
         tontineCercle[ID_Tontine].Cycle_enCours,
         tontineCercle[ID_Tontine].Iteration_enCours,
         tontineCercle[ID_Tontine].Montant,
         tontine_Address,
         Type,
         contract_);

    }

              // à supprimer: non utilisée (pour test)
              
     function getGarnbr(string memory ID_Tontine) public view returns(uint256) {
       return(tontineCercle[ID_Tontine].ListeParticipant[msg.sender].getGarNbr(ID_Tontine,msg.sender));
        
    }
    /* **************************** distribution  :Post + Get      ******************************/

    function distribution(
        string memory ID_Tontine,
        address Address_Receiver,
        uint256 Ordre,
        address addressTon
    ) public {
        uint256 nbr = tontineCercle[ID_Tontine].Nbr_participants;
        uint256 montant = tontineCercle[ID_Tontine].Montant;

       // require(tontineCercle[ID_Tontine].SommeParMois == montant.mul(nbr));
        require(tontineCercle[ID_Tontine].Etat);
              //  tontineCercle[ID_Tontine].ListeParticipant[msg.sender] = new participant_contract();

tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver] = a;
           
           for(uint i=0; i< tontineCercle[ID_Tontine].participantsAddress.length; i++) {
                if (tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].getLastCotisation(ID_Tontine, tontineCercle[ID_Tontine].participantsAddress[i], tontineCercle[ID_Tontine].Cycle_enCours,  tontineCercle[ID_Tontine].Iteration_enCours)) 
            {
               tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].verifgarantie(ID_Tontine, tontineCercle[ID_Tontine].participantsAddress[i], 
           tontineCercle[ID_Tontine].Cycle_enCours, tontineCercle[ID_Tontine].Iteration_enCours, montant);
           }
            }


        if (Ordre == tontineCercle[ID_Tontine].Iteration_enCours) {
           bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];

             tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].transaction(
                  addressTon,
            Address_Receiver,
            montant.mul(nbr),
            contract_ 
            
        );
            tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver]
            .addTxDistribution( ID_Tontine, Address_Receiver, tontineCercle[ID_Tontine].Cycle_enCours, tontineCercle[ID_Tontine].Iteration_enCours, montant, nbr);
         

           // tontineCercle[ID_Tontine].SommeParMois = 0;
            if (
                tontineCercle[ID_Tontine].Iteration_enCours ==
                tontineCercle[ID_Tontine].Nbr_participants
            ) {
                tontineCercle[ID_Tontine].Cycle_enCours += 1;
                tontineCercle[ID_Tontine].Iteration_enCours = 1;

            } else {
                tontineCercle[ID_Tontine].Iteration_enCours += 1;

            }

        }

    }
    
        // à supprimer: non utilisée (pour test)

           function getDisnbr(string memory ID_Tontine, address Adherent_Address) public view returns(uint256) {
       return(tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].getDisNbr(ID_Tontine,Adherent_Address));
        
    }
    
    
     function getLastCotisation(string memory ID_Tontine, address Adherent_Address) public view returns(bool) {
       return(tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].getLastCotisation(ID_Tontine,Adherent_Address,tontineCercle[ID_Tontine].Cycle_enCours, tontineCercle[ID_Tontine].Iteration_enCours));
        
    }
    function interruption(string memory ID_Tontine) public {
    
    
    for(uint i=0; i< tontineCercle[ID_Tontine].participantsAddress.length; i++) {
        if (tontineCercle[ID_Tontine].Etat ) {
            
             if (tontineCercle[ID_Tontine].ListeParticipant[tontineCercle[ID_Tontine].participantsAddress[i]].getLastCumule(ID_Tontine,tontineCercle[ID_Tontine].participantsAddress[i]) == 0) {
                tontineCercle[ID_Tontine].Etat = false;
            }
        }
        
    }
    }
    
   /* function verifGarantie(string memory ID_Tontine, address Address_Receiver) public  {
     // tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver] = a;
      uint256 nbr = tontineCercle[ID_Tontine].Nbr_participants;
        uint256 montant = tontineCercle[ID_Tontine].Montant;
        //uint256 cumule ;
               bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];
        //bool payementCotisation = true;
    if(tontineCercle[ID_Tontine].Etat){
      // if (tontineCercle[ID_Tontine].SommeParMois != montant.mul(nbr)) {
        
                   
            if (tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].getLastCotisation(ID_Tontine,Address_Receiver, tontineCercle[ID_Tontine].Cycle_enCours,  tontineCercle[ID_Tontine].Iteration_enCours)) 
            {
              
                  
              // cumule =  tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].getLastCumule(Address_Receiver);

               //  if (tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].getLastCumule(Address_Receiver) != 0) {
              
                 // tontineCercle[ID_Tontine].SommeParMois += montant;
                        
                      tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver] = a;


                        tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].verifgarantie(ID_Tontine, Address_Receiver, 
           tontineCercle[ID_Tontine].Cycle_enCours, tontineCercle[ID_Tontine].Iteration_enCours, montant);
 


             //  } 
              // else {
                //    tontineCercle[ID_Tontine].Etat = false;
               // }
            }

    //    }
      
    }
    }*/
    
   /* function getsommeparmois(string memory ID_Tontine) public view returns(uint256) {
        return tontineCercle[ID_Tontine].SommeParMois;
    }*/
    
    
        /* **************************** hashFunction      ******************************/
        
        // selon le choix de type transaction(0,1,2) on va modifier le hash de la transaction

    function setTransactionHash(
        bytes32 trHash,
        uint256 typeTransaction,
        string memory ID_Tontine
    ) public {
        // 0 : garantie
        tontineCercle[ID_Tontine].ListeParticipant[msg.sender] =a;

   if(typeTransaction == 0) {
       tontineCercle[ID_Tontine].ListeParticipant[msg.sender].setTransactionHashGarantie(ID_Tontine,trHash,msg.sender);

   }
           // 1 : cotisation

   else if(typeTransaction == 1){
              tontineCercle[ID_Tontine].ListeParticipant[msg.sender].setTransactionHashCotisation(ID_Tontine,trHash,msg.sender);

   }
           // 2 : distribution

   else{
              tontineCercle[ID_Tontine].ListeParticipant[msg.sender].setTransactionHashDistribution(ID_Tontine,trHash,msg.sender);

   }

    }
    
    
    /* **************************** fonction pour affichage dans node      ******************************/



        function getNumberParticipantByTontine(string memory ID_Tontine) public view returns(uint256) {
       return(tontineCercle[ID_Tontine].participantsAddress.length);
        
    }
    
     /* ****************************  affichage plus de détails tontine      ******************************/

   function GetGarCotiDisByIndex(
        string memory ID_Tontine,
        address Address_Receiver,
        uint256 indice ,
           bool Gar,
        bool Cot,
        bool Dis
    )
        public
        view
        returns (uint256, uint256, uint256 )
    {
        
        for(uint256 i=0; i< tontineCercle[ID_Tontine].participantsAddress.length; i++) {
    if(Address_Receiver == tontineCercle[ID_Tontine].participantsAddress[i]) {
           //    tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver] =a;

           if (Gar) {
                     return(tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].getGarantie(ID_Tontine,Address_Receiver,indice));

           }
            if (Cot) {
                    return(tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].getCotisation(ID_Tontine,Address_Receiver,indice));


            
            }
                
            if (Dis) {
                    return(tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].getDistribution(ID_Tontine,Address_Receiver,indice));

         }
     }
        }
        
        return(0,0,0);

            
        
    }
    
    
    
             function getLeng(
        string memory ID_Tontine,
        address Adherent_Address )
        public
        view
        returns (uint256,uint256,uint256)
    {
    
  for(uint256 i=0; i< tontineCercle[ID_Tontine].participantsAddress.length; i++) {
if(Adherent_Address == tontineCercle[ID_Tontine].participantsAddress[i]) {
         return (tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].getGarNbr(ID_Tontine,Adherent_Address),tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].getCotNbr(ID_Tontine,Adherent_Address),
        tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].getDisNbr(ID_Tontine,Adherent_Address));
       
  }  }
 
  return (0,0,0); 
        
    }

    /* ******************************** fonction pour le node (schedule)******************************/

    function getNumIterationCycle(string memory ID_Tontine)
        public
        view
        returns (uint256, uint256)
    {
        return (
            tontineCercle[ID_Tontine].Nbr_participants.mul(
                tontineCercle[ID_Tontine].Nbr_cycles
            ), tontineCercle[ID_Tontine].Nbr_cycles
        );

    }
    
    /* ******************************** fonction pour le node (schedule et notification)******************************/


    function getDateLancement(string memory ID_Tontine)
        public
        view
        returns (uint256, uint256, string memory, uint256, bool)
    {
       
        return (
            tontineCercle[ID_Tontine].Date,
            tontineCercle[ID_Tontine].Iteration_enCours,
            tontineCercle[ID_Tontine].Frequence,
            tontineCercle[ID_Tontine].Cycle_enCours,
            tontineCercle[ID_Tontine].Etat
        );
    
    }
    /* ******************************** envoi Mondataire******************************/


  function envoiMondataire(string memory ID_Tontine,address tontine_address, address mondataire1_address, address mondataire2_address) public 
    {           bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];
        ERC20Interface = ERC20(contract_);

             tontineCercle[ID_Tontine].ListeParticipant[mondataire1_address].transaction(
                  tontine_address,
            mondataire1_address,
          ERC20Interface.balanceOf(tontine_address)/2,
            contract_ 
            
        );
               

             tontineCercle[ID_Tontine].ListeParticipant[mondataire2_address].transaction(
                  tontine_address,
            mondataire2_address,
           ERC20Interface.balanceOf(tontine_address),
            contract_ 
            
        );
  

    }
    
        /* ******************************** dernières opérations******************************/

        function getLastGarCotDist(
        string memory ID_Tontine,
        address Address_Receiver,
        bool Gar,
        bool Cot,
        bool Dis) public  view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256)
    {
        for(uint256 i=0; i< tontineCercle[ID_Tontine].participantsAddress.length; i++) {
if(Address_Receiver == tontineCercle[ID_Tontine].participantsAddress[i]) {
   return ( tontineCercle[ID_Tontine].ListeParticipant[Address_Receiver].getLastGarCotDist(
       ID_Tontine,
        Address_Receiver,
         Gar,
         Cot,
         Dis));
     }
    }
    return(0,0,0,0,0,0,0);
    }

 
}

