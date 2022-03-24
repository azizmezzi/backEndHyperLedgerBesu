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

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");

    }

    function div(uint256 a, uint256 b, string memory errorMessage)
        internal
        pure
        returns (uint256)
    {
        // Solidity only automatically asserts when dividing by 0

        require(b > 0, errorMessage);

        uint256 c = a / b;

        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;

    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");

    }

    function mod(uint256 a, uint256 b, string memory errorMessage)
        internal
        pure
        returns (uint256)
    {
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

contract tontine_Cercle {
    using SafeMath for uint256;

    struct Liste {
        address Adherent_Address;
        uint256 Ordre;
        bool Inscrit;
    }

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
        uint256 SommeParMois;
        mapping(address => Liste) ListeParticipant;
        address[] participantsAddress;
    }

    struct Participant {
        address Adherent_Address;
        uint256 ID_Participant;
    }

    uint256 public numPart = 1;

    mapping(address => Participant) public Participants;

    address[] public ListToutParti;

    struct TxGarantie {
        uint256 ID_Garantie;
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

    mapping(address => TxGarantie[]) public Garanties;

    address[] public AddressAdhGar;

    struct TxCotisation {
        uint256 ID_Cotisation;
        string ID_Tontine;
        uint256 ID_Cycle;
        uint256 ID_Iteration;
        uint256 date_cotisation;
        uint256 Montant;
        bytes32 Hash_Transaction;
    }

    uint256 public numCotisation = 0;

    mapping(address => TxCotisation[]) public Cotisations;

    address[] public AddressAdhCot;

    struct TxDistribution {
        uint256 ID_Distribution;
        string ID_Tontine;
        uint256 date_distribution;
        uint256 ID_Cycle;
        uint256 ID_Iteration;
        uint256 Montant;
        bytes32 Hash_Transaction;
    }

    uint256 public numDistribution = 0;

    mapping(address => TxDistribution[]) public Distributions;

    address[] public AddressAdhDist;

    mapping(string => Tontine) public tontineCercle;

    string[] public tontineList;

    /**

    * @dev list of all supported tokens for transfer * @param string token symbol * @param address contract address of token */

    mapping(bytes32 => address) public tokens;

    ERC20 public ERC20Interface;

    constructor() public {
        //   require (owner == msg.sender);
    }

    function() external payable {}

    function convertttt() public pure returns (bytes32 result) {
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

    /** 
     * dev de fonction d'ajout de tontine */
    function addTontine(
        string memory ID_Tontine,
        string memory Nom_Tontine,
        uint256 Montant,
        uint256 Nbr_participants,
        uint256 Nbr_cycles,
        string memory Frequence,
        uint256 Ordre,
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

        tontineCercle[ID_Tontine].SommeParMois = 0;

        tontineCercle[ID_Tontine].Montant = Montant;

        tontineCercle[ID_Tontine].Etat = false;

        tontineCercle[ID_Tontine].Cycle_enCours = 0;

        tontineCercle[ID_Tontine].Iteration_enCours = 0;

        tontineCercle[ID_Tontine].Frequence = Frequence;

        tontineList.push(ID_Tontine);

        addParticipant(ID_Tontine, Ordre,false,addressTon);

    }

    /**
     *  dev de fonction get tontine */
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

    function addUser(
        string memory ID_Tontine,
        address Adherent_Address,
        uint256 Ordre
    ) public {
        require(
            tontineCercle[ID_Tontine].Nbr_participants >=
                tontineCercle[ID_Tontine].participantsAddress.length
        );
        require(
            tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address]
                .Adherent_Address ==
                address(0)
        );

        for (
            uint256 i = 0;
            i < tontineCercle[ID_Tontine].participantsAddress.length;
            i++
        ) {
            require(
                tontineCercle[ID_Tontine]
                    .ListeParticipant[tontineCercle[ID_Tontine]
                    .participantsAddress[i]]
                    .Ordre !=
                    Ordre &&
                    Ordre <= tontineCercle[ID_Tontine].Nbr_participants &&
                    0 < Ordre
            );

        }

        tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address]
            .Adherent_Address = Adherent_Address;

        tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address]
            .Ordre = Ordre;

        tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address]
            .Inscrit = true;

        tontineCercle[ID_Tontine].participantsAddress.push(Adherent_Address);

    }

     function addParticipant(string memory ID_Tontine, uint256 Ordre,bool decline, address addressTon) public {
        numPart++;

 

        addUser(ID_Tontine, msg.sender, Ordre);

 

        if (Participants[msg.sender].Adherent_Address == address(0)) {
            Participants[msg.sender].ID_Participant = numPart;

 

            Participants[msg.sender].Adherent_Address = msg.sender;

 

        }
       if(decline){
           tontineCercle[ID_Tontine].Date = now;
            tontineCercle[ID_Tontine].Etat = false;
       }else{
           addTxGarantie(ID_Tontine, msg.sender, addressTon, true);
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

    function getNumPartTontine(string memory ID_Tontine)
        public
        view
        returns (uint256)
    {
        return (tontineCercle[ID_Tontine].participantsAddress.length);

    }

/*    function getParticipant(address Adherent_Address)
        public
        view
        returns (address, uint256)
    {
        return (
            Participants[Adherent_Address].Adherent_Address,
            Participants[Adherent_Address].ID_Participant
        );

    }

    function getParticipantTontine(
        address Adherent_Address,
        string memory ID_Tontine
    ) public view returns (address, uint256, bool) {
        return (
            tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address]
                .Adherent_Address,
            tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].Ordre,
            tontineCercle[ID_Tontine].ListeParticipant[Adherent_Address].Inscrit
        );

    }*/

    //Modifier le hash d'une transaction d'envoi de garantie

    function setTransactionHashGarantie(
        bytes32 trHash,
        address Adherent_Address
    ) public {
        for (uint256 i = 0; i < Garanties[Adherent_Address].length; i++) {
            if (Garanties[Adherent_Address][i].ID_Garantie == (numGarantie)) {
                Garanties[Adherent_Address][i].Hash_Transaction = trHash;

            }
        }

    }

    function setTransactionHashCotisation(
        bytes32 trHash,
        address Adherent_Address
    ) public {
        for (uint256 i = 0; i < Cotisations[Adherent_Address].length; i++) {
            if (
                Cotisations[Adherent_Address][i].ID_Cotisation ==
                (numCotisation)
            ) {
                Cotisations[Adherent_Address][i].Hash_Transaction = trHash;

            }
        }

    }

    function setTransactionHashDistribution(
        bytes32 trHash,
        address Adherent_Address
    ) public {
        for (uint256 i = 0; i < Distributions[Adherent_Address].length; i++) {
            if (
                Distributions[Adherent_Address][i].ID_Distribution ==
                (numDistribution)
            ) {
                Distributions[Adherent_Address][i].Hash_Transaction = trHash;

            }
        }

    }
    
    
    
    

    function addTxGarantie(
        string memory ID_Tontine,
        address Adherent_Address,
        address Contract_Address,
        bool Type
    ) public {
        transaction(
            Adherent_Address,
            Contract_Address,
            tontineCercle[ID_Tontine].Montant
        );

        uint256 cumule;
        bool verif = true; 

        for (uint256 i = 0; i < Garanties[Adherent_Address].length; i++) {
            if (
                (keccak256(
                    abi.encodePacked(Garanties[Adherent_Address][i].ID_Tontine)
                ) ==
                    keccak256(abi.encodePacked(ID_Tontine)))
            ) {
                cumule = Garanties[Adherent_Address][i].Cumule;

            }
        }

        numGarantie++;
        for (uint256 i = 0; i < AddressAdhGar.length; i++) {
            if (AddressAdhGar[i] != Adherent_Address) {
                verif = false;

            }
        }

        if (verif) {
            AddressAdhGar.push(Adherent_Address);
        }

        TxGarantie memory garantie;

        garantie.ID_Garantie = numGarantie;

        garantie.ID_Tontine = ID_Tontine;

        garantie.date_garantie = now;

        garantie.ID_Cycle = tontineCercle[ID_Tontine].Cycle_enCours;

        garantie.ID_Iteration = tontineCercle[ID_Tontine].Iteration_enCours;

        garantie.Montant = tontineCercle[ID_Tontine].Montant;

        if (Type) {
            garantie.Type_Transaction = "Recharge";

            garantie.Cumule = cumule.add(tontineCercle[ID_Tontine].Montant);

        } else {
            garantie.Type_Transaction = "Retrait";

            garantie.Cumule = cumule.sub(tontineCercle[ID_Tontine].Montant);

        }

        garantie.Hash_Transaction = 0x0;

        Garanties[Adherent_Address].push(garantie);

    }

  /*  function getSommeParMois(string memory ID_Tontine)
        public
        view
        returns (uint256)
    {
        return tontineCercle[ID_Tontine].SommeParMois;

    }
    */
    
    
        
       function getCotisation(
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
        uint256 ID_Cycle = 0;
         uint256 Cumule = 0;
          uint256 ID_Iteration = 0;
           if (Gar) {
                    if (
                    (keccak256(
                        abi.encodePacked(
                            Garanties[Address_Receiver][indice].ID_Tontine
                        )
                    ) ==
                        keccak256(abi.encodePacked(ID_Tontine)))
                ) {
              
                   ID_Iteration = Garanties[Address_Receiver][indice].ID_Iteration;
                    Cumule = Garanties[Address_Receiver][indice].Cumule;
                    ID_Cycle = Garanties[Address_Receiver][indice].ID_Cycle;
                }
           }
            if (Cot) {
                if (
                    (keccak256(
                        abi.encodePacked(
                            Cotisations[Address_Receiver][indice].ID_Tontine
                        )
                    ) ==
                        keccak256(abi.encodePacked(ID_Tontine)))
                ) {
                    ID_Iteration = Cotisations[Address_Receiver][indice]
                        .ID_Iteration;
                    ID_Cycle = Cotisations[Address_Receiver][indice]
                        .ID_Cycle;
                }

            
            }
                
                 if (Dis) {
                               if (
                    (keccak256(
                        abi.encodePacked(
                            Distributions[Address_Receiver][indice].ID_Tontine
                        )
                    ) ==
                        keccak256(abi.encodePacked(ID_Tontine)))
                ) {
                    ID_Iteration = Distributions[Address_Receiver][indice]
                        .ID_Iteration;
                    ID_Cycle = Distributions[Address_Receiver][indice]
                        .ID_Cycle;
                }
                 }
                    return(ID_Cycle , ID_Iteration  , Cumule  );

            
        
    }
    
         function getLeng(
        
        address Address_Receiver
       
    )
        public
        view
        returns (uint256,uint256,uint256)
    {
        return (Garanties[Address_Receiver].length,Cotisations[Address_Receiver].length,Distributions[Address_Receiver].length);
        }


    function getLastGarCotDist(
        string memory ID_Tontine,
        address Address_Receiver,
        bool Gar,
        bool Cot,
        bool Dis
    )
        public
        view
        returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256)
    {
        // uint type_Transaction  ;

        uint256[] memory listiddate = new uint256[](7);

        if (Gar) {
            for (uint256 i = 0; i < Garanties[Address_Receiver].length; i++) {
                if (
                    (keccak256(
                        abi.encodePacked(
                            Garanties[Address_Receiver][i].ID_Tontine
                        )
                    ) ==
                        keccak256(abi.encodePacked(ID_Tontine)))
                ) {
                    // type_Transaction = Garanties[Address_Receiver][i].Type_Transaction;
                    listiddate[0] = Garanties[Address_Receiver][i]
                        .date_garantie;
                    listiddate[1] = Garanties[Address_Receiver][i].ID_Iteration;
                    listiddate[6] = Garanties[Address_Receiver][i].Cumule;
                }

            }
        }

        if (Cot) {
            for (uint256 i = 0; i < Cotisations[Address_Receiver].length; i++) {
                if (
                    (keccak256(
                        abi.encodePacked(
                            Cotisations[Address_Receiver][i].ID_Tontine
                        )
                    ) ==
                        keccak256(abi.encodePacked(ID_Tontine)))
                ) {
                    listiddate[2] = Cotisations[Address_Receiver][i]
                        .ID_Iteration;
                    listiddate[3] = Cotisations[Address_Receiver][i]
                        .date_cotisation;

                }

            }
        }

        if (Dis) {
            for (
                uint256 i = 0;
                i < Distributions[Address_Receiver].length;
                i++
            ) {
                if (
                    (keccak256(
                        abi.encodePacked(
                            Distributions[Address_Receiver][i].ID_Tontine
                        )
                    ) ==
                        keccak256(abi.encodePacked(ID_Tontine)))
                ) {
                    listiddate[4] = Distributions[Address_Receiver][i]
                        .ID_Iteration;
                    listiddate[5] = Distributions[Address_Receiver][i]
                        .date_distribution;

                }

            }

        }

        return (
            listiddate[0],
            listiddate[1],
            listiddate[2],
            listiddate[3],
            listiddate[4],
            listiddate[5],
            listiddate[6]
        );

    }

   
 

    function addTxCotisation(string memory ID_Tontine, address Adherent_Address)
        public
    {
        bool verif = true;
        numCotisation++;

        for (uint256 i = 0; i < AddressAdhCot.length; i++) {
            if (AddressAdhCot[i] != Adherent_Address) {
                verif = false;
            }
        }

        if (verif) {
            AddressAdhCot.push(Adherent_Address);
        }

        TxCotisation memory cotisationAdd;

        cotisationAdd.ID_Cotisation = numCotisation;

        cotisationAdd.ID_Tontine = ID_Tontine;

        cotisationAdd.date_cotisation = now;

        cotisationAdd.ID_Cycle = tontineCercle[ID_Tontine].Cycle_enCours;

        cotisationAdd.ID_Iteration = tontineCercle[ID_Tontine]
            .Iteration_enCours;

        cotisationAdd.Montant = tontineCercle[ID_Tontine].Montant;

        cotisationAdd.Hash_Transaction = 0x0;

        Cotisations[Adherent_Address].push(cotisationAdd);

    }

    function getNumTontine() public view returns (uint256) {
        return tontineList.length;

    }

    function addTxDistribution(
        string memory ID_Tontine,
        address Adherent_Address
    ) public {
        bool verif = true;
        numDistribution++;
        uint256 montant = tontineCercle[ID_Tontine].Montant;

        for (uint256 i = 0; i < AddressAdhDist.length; i++) {
            if (AddressAdhDist[i] == Adherent_Address) {
                verif = false;
            }
        }

        if (verif) {
            AddressAdhDist.push(Adherent_Address);

        }

        TxDistribution memory distribution;

        distribution.ID_Distribution = numDistribution;

        distribution.ID_Tontine = ID_Tontine;

        distribution.ID_Cycle = tontineCercle[ID_Tontine].Cycle_enCours;

        distribution.ID_Iteration = tontineCercle[ID_Tontine].Iteration_enCours;

        distribution.date_distribution = now;

        distribution.Montant = montant.mul(
            tontineCercle[ID_Tontine].Nbr_participants
        );

        distribution.Hash_Transaction = 0x0;

        Distributions[Adherent_Address].push(distribution);

    }

    function getDateLancement(string memory ID_Tontine)
        public
        view
        returns (uint256, uint256, string memory, uint256, bool)
    {
        //  if(tontineCercle[ID_Tontine].Etat){
        return (
            tontineCercle[ID_Tontine].Date,
            tontineCercle[ID_Tontine].Iteration_enCours,
            tontineCercle[ID_Tontine].Frequence,
            tontineCercle[ID_Tontine].Cycle_enCours,
            tontineCercle[ID_Tontine].Etat
        );
        // }
        // else return (0, 0, '',0,false);
    }

    function transaction(
        address Address_Sender,
        address Address_Receiver,
        uint256 Montant
    ) public {
        bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];
        ERC20Interface = ERC20(contract_);
        ERC20Interface.transfers(Address_Sender, Address_Receiver, Montant);

    }

    function cotisation(string memory ID_Tontine, address addressTon) public {
        uint256 montant = tontineCercle[ID_Tontine].Montant;
        addTxCotisation(ID_Tontine, msg.sender);
        transaction(
            msg.sender,
            addressTon,
            tontineCercle[ID_Tontine].Montant
        );
        tontineCercle[ID_Tontine].SommeParMois = montant.add(
            tontineCercle[ID_Tontine].SommeParMois
        );

    }

    function envoiGarantie(address Contract_Address, uint256 Montant) public {
        transaction(msg.sender, Contract_Address, Montant);

    }
    function envoiMondataire(address tontine_address, address mondataire1_address, address mondataire2_address) public 
    {
        
        bytes32 symbol_ = convertttt();
        address contract_ = tokens[symbol_];
        ERC20Interface = ERC20(contract_);
       // ERC20Interface.balanceOf(tontine_address);
        transaction(tontine_address, mondataire1_address, ERC20Interface.balanceOf(tontine_address)/2);
        transaction(tontine_address, mondataire2_address, ERC20Interface.balanceOf(tontine_address));
    }

    function verifGarantie(string memory ID_Tontine, address Address_Receiver)
        public
    {
        uint256 nbr = tontineCercle[ID_Tontine].Nbr_participants;
        uint256 montant = tontineCercle[ID_Tontine].Montant;
        uint256 cumule;
        bool payementCotisation = true;

        if (tontineCercle[ID_Tontine].SommeParMois != montant.mul(nbr)) {
            for (uint256 i = 0; i < Cotisations[Address_Receiver].length; i++) {
                if (
                    (keccak256(
                        abi.encodePacked(
                            Cotisations[Address_Receiver][i].ID_Tontine
                        )
                    ) ==
                        keccak256(abi.encodePacked(ID_Tontine)))
                ) {
                    if (
                        Cotisations[Address_Receiver][i].ID_Iteration ==
                        tontineCercle[ID_Tontine].Iteration_enCours && Cotisations[Address_Receiver][i].ID_Cycle == tontineCercle[ID_Tontine].Cycle_enCours
                    ) {
                        payementCotisation = false;
                    }

                }
            }
            if (payementCotisation) {
                for (
                    uint256 i = 0;
                    i < Garanties[Address_Receiver].length;
                    i++
                ) {
                    if (
                        (keccak256(
                            abi.encodePacked(
                                Garanties[Address_Receiver][i].ID_Tontine
                            )
                        ) ==
                            keccak256(abi.encodePacked(ID_Tontine)))
                    ) {
                        cumule = Garanties[Address_Receiver][i].Cumule;

                    }
                }

                if (cumule != 0) {
                    tontineCercle[ID_Tontine]
                        .SommeParMois += tontineCercle[ID_Tontine].Montant;

                    numGarantie++;

                    TxGarantie memory garantie;

                    garantie.ID_Garantie = numGarantie;

                    garantie.ID_Tontine = ID_Tontine;

                    garantie.date_garantie = now;

                    garantie.ID_Cycle = tontineCercle[ID_Tontine].Cycle_enCours;

                    garantie.ID_Iteration = tontineCercle[ID_Tontine]
                        .Iteration_enCours;

                    garantie.Montant = tontineCercle[ID_Tontine].Montant;

                    garantie.Type_Transaction = "Retrait";

                    garantie.Cumule =0;

                    garantie.Hash_Transaction = 0x0;

                    Garanties[Address_Receiver].push(garantie);

                } else {
                    tontineCercle[ID_Tontine].Etat = false;
                }
            }

        }

    }

    function distribution(
        string memory ID_Tontine,
        address Address_Receiver,
        uint256 Ordre,
        address addressTon
    ) public {
        uint256 nbr = tontineCercle[ID_Tontine].Nbr_participants;
        uint256 montant = tontineCercle[ID_Tontine].Montant;

        require(tontineCercle[ID_Tontine].SommeParMois == montant.mul(nbr));
        require(tontineCercle[ID_Tontine].Etat);

        if (Ordre == tontineCercle[ID_Tontine].Iteration_enCours) {
        

            transaction(addressTon, Address_Receiver, montant.mul(nbr));
            addTxDistribution(ID_Tontine, Address_Receiver);

            tontineCercle[ID_Tontine].SommeParMois = 0;
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



 
}


