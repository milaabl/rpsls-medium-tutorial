// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.12;

import "./RPSLS.sol";

contract RPSLSFactory {
    RPSLS[] private gameSessions;
    mapping (address => RPSLS[]) private userGameSessions;
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
    }
    function getGameSessions()
        external
        view
        returns (RPSLS[] memory _gameSessions)
    {
        return userGameSessions[msg.sender];
    }
}