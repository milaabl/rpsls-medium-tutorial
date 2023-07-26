// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.12;

contract RPSLSFactory {
    RPSLS[] private gameSessions;
    mapping (address => RPSLS[]) private userGameSessions;

    event NewGameSession(address indexed gameSession);
    function createGameSession(
        bytes32 _move1Hash,
        address _player2
    ) external payable {
        RPSLS gameSession = (new RPSLS){value: msg.value}(
            _move1Hash,
            msg.sender,
            _player2
        );
        gameSessions.push(gameSession);
        userGameSessions[msg.sender].push(gameSession);
        userGameSessions[_player2].push(gameSession);

        emit NewGameSession(address(gameSession));
    }
    function getGameSessions()
        external
        view
        returns (RPSLS[] memory _gameSessions)
    {
        return userGameSessions[msg.sender];
    }
}

contract RPSLS {
    enum Move {
        Null, Rock, Paper, Scissors, Lizard, Spock
    }
    address public player1;
    address public player2;

    bytes32 move1Hash;

    Move public move1;
    Move public move2;

    uint256 public stake;

    uint256 public TIMEOUT_IN_MS = 5 minutes;
    uint256 public lastTimePlayed;

    modifier onlyOwner() {
        require(msg.sender == player1);
        _;
    }

    event Player2Played(address indexed _player2, Move indexed _move2);
    event GameSolved(address indexed winner);
    event GameTied();
    event GameTimedOut(address indexed fallbackWinner);

    constructor(bytes32 _move1Hash, address _player1, address _player2) payable {
        stake = msg.value;
        move1Hash = _move1Hash;
        player1 = _player1;
        player2 = _player2;
        lastTimePlayed = block.timestamp;
    }

    function play (Move _move2) external payable {
        require(msg.value == stake, "Insufficient funds for move. Make sure you stake the required amount of ETH for the transaction to succeed.");
        require(msg.sender == player2);
        require(move2 == Move.Null, "Move already played");

        move2 = _move2;
        lastTimePlayed = block.timestamp;

        emit Player2Played(player2, _move2);
    }

    function solve(Move _move1, string calldata _salt) onlyOwner external {
        require(player2 != address(0), "Player 2 should make his move in order to solve the round.");
        require(move2 != Move.Null, "Player 2 should move first.");
        require(keccak256(abi.encodePacked(_move1, _salt)) == move1Hash, "The exposed value is not the hashed one!");
        require(stake > 0, "Winner is already determined.");

        move1 = _move1;

        uint256 _stake = stake;

        if (win(move1, move2)) {
            stake = 0;
            (bool _success) = payable(player1).send(2 * _stake);
            if (!_success) {
                stake = _stake;
            }
            else {
                emit GameSolved(player1);
            }
        }
        else if (win(move1, move2)) {
            stake = 0;
            (bool _success) = payable(player2).send(2 * _stake);
            if (!_success) {
                stake = _stake;
            }
            else {
                emit GameSolved(player2);
            }
        }
        else {
            stake = 0;
            (bool _success1) = payable(player2).send(_stake);
            (bool _success2) = payable(player1).send(_stake);
            if (!(_success1 || _success2)) {
                stake = _stake;
            }
            else {
                emit GameTied();
            }
        }
    }

    function win(Move _move1, Move _move2) public pure returns (bool) {
        if (_move1 == _move2)
            return false; // They played the same so no winner.
        else if (_move1 == Move.Null)
            return false; // They did not play.
        else if (uint(_move1) % 2 == uint(_move2) % 2) 
            return (_move1 < _move2);
        else
            return (_move1 > _move2);
    }

    function claimTimeout() external {
        require(msg.sender == player1 || msg.sender == player2, "You're not a player of this game.");

        require(block.timestamp > lastTimePlayed + TIMEOUT_IN_MS, "Time has not run out yet.");

        uint256 _stake = stake;
        stake = 0;

        if (player2 == address(0)) {
            (bool _success) = payable(player1).send(_stake);
            if (!_success) {
                stake = _stake;
            }
            else {
                emit GameTimedOut(player1);
            }
        }
        else if (move2 != Move.Null) {
         (bool _success) = payable(player2).send(_stake * 2);
            if (!_success) {
                stake = _stake;
            }
            else {
                emit GameTimedOut(player2);
            }   
        }
    }
}