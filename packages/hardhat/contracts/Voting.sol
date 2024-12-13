//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract Voting {
    // State Variables
    address public immutable owner;
    string public greeting = "BUILD!";

        constructor(address _owner) {
        owner = _owner;
    }

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

