//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
    // State Variables
    address public immutable owner;
    string public greeting = "Building Unstoppable Apps!!!";
    bool public premium = false;
    uint256 public totalCounter = 0;
    mapping(address => uint) public userGreetingCounter;

    // Events: a way to emit log statements from smart contract that can be listened to by external parties
    event GreetingChange(address indexed greetingSetter, string newGreeting, bool premium, uint256 value);

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor(address _owner) {
        owner = _owner;
    }

    // Modifier: used to define a set of rules that must be met before or after a function is executed
    // Check the withdraw() function
    modifier isOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    /**
     * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
     *
     * @param _newGreeting (string memory) - new greeting to save on the contract
     */
    function setGreeting(string memory _newGreeting) public payable {
        // Print data to the hardhat chain console. Remove when deploying to a live network.
        console.log("Setting new greeting '%s' from %s", _newGreeting, msg.sender);

        // Change state variables
        greeting = _newGreeting;
        totalCounter += 1;
        userGreetingCounter[msg.sender] += 1;

        // msg.value: built-in global variable that represents the amount of ether sent with the transaction
        if (msg.value > 0) {
            premium = true;
        } else {
            premium = false;
        }

        // emit: keyword used to trigger an event
        emit GreetingChange(msg.sender, _newGreeting, msg.value > 0, msg.value);
    }

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function withdraw() public isOwner {
        (bool success, ) = owner.call{ value: address(this).balance }("");
        require(success, "Failed to send Ether");
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}

contract Voting {
    // Структура для хранения информации о каждом голосовании
    struct Vote {
        string question; // Вопрос для голосования
        uint256 yesVotes; // Количество голосов "за"
        uint256 noVotes; // Количество голосов "против"
        uint256 endTime; // Время завершения голосования
        bool isEnded; // Признак завершенности голосования
    }

    mapping(uint256 => Vote) public votes; // Карта для хранения голосований по ID
    uint256 public voteCount; // Счётчик голосований

    // События для логирования
    event VoteCreated(uint256 indexed voteId, string question, uint256 endTime);
    event Voted(uint256 indexed voteId, address indexed voter, bool voteYes);
    event VotingEnded(uint256 indexed voteId, uint256 yesVotes, uint256 noVotes);

    // Функция для создания нового голосования
    function createVote(string memory _question, uint256 _duration) external {
        uint256 voteId = voteCount;
        voteCount++;

        uint256 endTime = block.timestamp + _duration;

        votes[voteId] = Vote({
            question: _question,
            yesVotes: 0,
            noVotes: 0,
            endTime: endTime,
            isEnded: false
        });

        emit VoteCreated(voteId, _question, endTime);
    }

    // Функция для голосования
    function vote(uint256 _voteId, bool _voteYes) external {
        Vote storage vote = votes[_voteId];

        require(block.timestamp < vote.endTime, "Voting has ended");
        require(!vote.isEnded, "Voting is already ended");

        if (_voteYes) {
            vote.yesVotes++;
        } else {
            vote.noVotes++;
        }

        emit Voted(_voteId, msg.sender, _voteYes);
    }

    // Функция для завершения голосования
    function endVote(uint256 _voteId) external {
        Vote storage vote = votes[_voteId];

        require(block.timestamp >= vote.endTime, "Voting time has not ended yet");
        require(!vote.isEnded, "Voting is already ended");

        vote.isEnded = true;

        emit VotingEnded(_voteId, vote.yesVotes, vote.noVotes);
    }

    // Функция для получения результатов голосования
    function getVoteResult(uint256 _voteId) external view returns (string memory question, uint256 yesVotes, uint256 noVotes) {
        Vote storage vote = votes[_voteId];
        return (vote.question, vote.yesVotes, vote.noVotes);
    }
}

