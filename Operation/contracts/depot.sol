pragma solidity ^0.4.22;

/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
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
    function approve(address spender, uint256 value) public returns (bool);

    function transfers(
        address from_,
        address _to,
        uint256 _value
    ) public returns (bool);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    function generateToken(address _to, uint256 _value) public returns (bool);
}

contract depotCashin {
    uint256 idOpGlobale = 0;
    address public owner;

    // Structure de donnée de la preuve de transfert
    struct operation {
        string idOp;
        address sender;
        address receiver;
        // typeOp=0 ==> cashin par agent, typeOp=1 ==> cashin par lui meme, typeOp=2 ==> transfert
        uint256 typeOp;
        uint256 OperationDate;
        uint256 amount;
        bytes32 transactionHash;
        string name;
    }

    mapping(address => mapping(uint256 => operation)) public ListeOp;
    address[] addressSender;

    mapping(address => uint256) public NombreOp;

    ERC20 public ERC20Interface;
    ERC20Basic public ERC20BasicInterface;

    //constructeur
    constructor() public {
        owner = msg.sender;
    }

    /**
     * @dev list of all supported tokens for transfer * @param string token symbol * @param address contract address of token */
    mapping(bytes32 => address) public tokens;

    /**
     * @dev add address of token to list of supported tokens using * token symbol as identifier in mapping */
    function addNewToken(address address_) public returns (bool) {
        bytes32 symbol_ = convertttt();
        tokens[symbol_] = address_;

        return true;
    }

    function convertttt() internal pure returns (bytes32 result) {
        string memory testFoo = "IMFT";

        assembly {
            result := mload(add(testFoo, 32))
        }
    }

    //return the symbol of the IMFT
    function tokenSymbole() public pure returns (bytes32 result) {
        string memory testFoo = "IMFT";
        assembly {
            result := mload(add(testFoo, 32))
        }
    }

    function newOperation(
        address sender,
        address receiver,
        uint256 OperationDate,
        uint256 amount,
        uint256 typeOperation,
        string name
    ) public {
        address contract_ = tokens[tokenSymbole()];
        ERC20BasicInterface = ERC20Basic(contract_);
        ERC20Interface = ERC20(contract_);

        require(amount >= 10);
        require(amount <= 1000);
        require(ERC20BasicInterface.balanceOf(receiver) <= 2000);
        require((ERC20BasicInterface.balanceOf(receiver) + amount) <= 2000);

        string memory idOp;

        if (typeOperation == 0 ) {
            idOp = concat("A", uint2str(idOpGlobale));
        }else if(typeOperation == 1) {
            idOp = concat("I", uint2str(idOpGlobale));
        }
        else if(typeOperation == 2) {
            idOp = concat("T", uint2str(idOpGlobale));
        }else {
            idOp = concat("O", uint2str(idOpGlobale));
        }

        ListeOp[sender][NombreOp[sender]].idOp = idOp;

        ListeOp[sender][NombreOp[sender]].sender = sender;

        ListeOp[sender][NombreOp[sender]].receiver = receiver;

        ListeOp[sender][NombreOp[sender]].typeOp = typeOperation;

        ListeOp[sender][NombreOp[sender]].OperationDate = OperationDate;

        ListeOp[sender][NombreOp[sender]].amount = amount;

        ListeOp[sender][NombreOp[sender]].transactionHash = 0x0;
        
        ListeOp[sender][NombreOp[sender]].name = name;

        NombreOp[sender] = NombreOp[sender] + 1;

        idOpGlobale++;
        for (uint256 i = 0; i < addressSender.length; i++) {
            if (addressSender[i] != sender) {
                addressSender.push(sender);
            }
        }

        if (typeOperation == 1) {
             ERC20Interface.generateToken(receiver, amount);
           
        } else {
            ERC20Interface.transfers(sender, receiver, amount);
        }
    }

    function getOperationLengthByBorrower(address sender)
        public
        view
        returns (uint256)
    {
        return (NombreOp[sender]);
    }

    function getOperationLength(address sender, address receiver)
        public
        view
        returns (uint256)
    {
        uint256 j = 0;
        for (uint256 i = 0; i < NombreOp[sender]; i++) {
            if (ListeOp[sender][i].receiver == receiver) {
                j += 1;
            }
        }
        return (j);
    }

    function getOperationInfoByIndexAway(
        uint256 index,
        address sender,
        address receiver
    )
        public
        view
        returns (
            string memory,
          //  uint256,
            uint256,
            uint256,
            bytes32,
            string
        )
    {
        uint256 j = 0;
        for (uint256 i = 0; i < NombreOp[sender]; i++) {
            if (ListeOp[sender][i].receiver == receiver) {
                if (j == index) {
                    return (
                        ListeOp[sender][i].idOp,
                       // ListeOp[sender][i].typeOp,
                        ListeOp[sender][i].OperationDate,
                        ListeOp[sender][i].amount,
                        ListeOp[sender][i].transactionHash,
                        ListeOp[sender][i].name
                    );
                }
                j += 1;
            }
        }
    }

    function getOperationInfoByIndex(uint256 index, address sender)
        public
        view
        returns (
            string memory,
            address,
           // uint256,
            uint256,
            uint256,
            bytes32,
            string memory
        )
    {
        return (
            ListeOp[sender][index].idOp,
            ListeOp[sender][index].receiver,
          //  ListeOp[sender][index].typeOp,
            ListeOp[sender][index].OperationDate,
            ListeOp[sender][index].amount,
            ListeOp[sender][index].transactionHash,
            ListeOp[sender][index].name
        );
    }

    function setOperationHash(
        bytes32 hash,
        address sender,
        uint256 _timetocompate
    ) public {
        for (uint256 i = 0; i < NombreOp[sender]; i++) {
            if (ListeOp[sender][i].OperationDate == _timetocompate) {
                ListeOp[sender][i].transactionHash = hash;
            }
        }
    }

    function uint2str(uint256 i) internal pure returns (string) {
        if (i == 0) return "0";
        uint256 j = i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length - 1;
        while (i != 0) {
            bstr[k--] = bytes1(48 + (i % 10));
            i /= 10;
        }
        return string(bstr);
    }

    /** @dev function to concatenat 2 string and return 1 string
     */

    function concat(string memory _base, string memory _value)
        internal
        pure
        returns (string memory)
    {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

        assert(_valueBytes.length > 0);

        string memory _tmpValue = new string(
            _baseBytes.length + _valueBytes.length
        );
        bytes memory _newValue = bytes(_tmpValue);

        uint256 i;
        uint256 j;

        for (i = 0; i < _baseBytes.length; i++) {
            _newValue[j++] = _baseBytes[i];
        }

        for (i = 0; i < _valueBytes.length; i++) {
            _newValue[j++] = _valueBytes[i];
        }

        return string(_newValue);
    }
}

