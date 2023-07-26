import { Address } from "wagmi";

export const contracts = {
    factory: {
        address: process.env.REACT_APP_PUBLIC_RPSLS_FACTORY_ADDRESS as Address,
        abi: [
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "gameSession",
                type: "address"
              }
            ],
            name: "NewGameSession",
            type: "event"
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "_move1Hash",
                type: "bytes32"
              },
              {
                internalType: "address",
                name: "_player2",
                type: "address"
              }
            ],
            name: "createGameSession",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          {
            inputs: [],
            name: "getGameSessions",
            outputs: [
              {
                internalType: "contract RPSLS[]",
                name: "_gameSessions",
                type: "address[]"
              }
            ],
            stateMutability: "view",
            type: "function"
          }
        ]
      },
      rpslsGame: {
        abi: [
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "_move1Hash",
                type: "bytes32"
              },
              {
                internalType: "address",
                name: "_player1",
                type: "address"
              },
              {
                internalType: "address",
                name: "_player2",
                type: "address"
              }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "winner",
                type: "address"
              }
            ],
            name: "GameSolved",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [],
            name: "GameTied",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "fallbackWinner",
                type: "address"
              }
            ],
            name: "GameTimedOut",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "_player2",
                type: "address"
              },
              {
                indexed: true,
                internalType: "enum RPSLS.Move",
                name: "_move2",
                type: "uint8"
              }
            ],
            name: "Player2Played",
            type: "event"
          },
          {
            inputs: [],
            name: "TIMEOUT_IN_MS",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [],
            name: "claimTimeout",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "lastTimePlayed",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [],
            name: "move1",
            outputs: [
              {
                internalType: "enum RPSLS.Move",
                name: "",
                type: "uint8"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [],
            name: "move2",
            outputs: [
              {
                internalType: "enum RPSLS.Move",
                name: "",
                type: "uint8"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "enum RPSLS.Move",
                name: "_move2",
                type: "uint8"
              }
            ],
            name: "play",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          {
            inputs: [],
            name: "player1",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [],
            name: "player2",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "enum RPSLS.Move",
                name: "_move1",
                type: "uint8"
              },
              {
                internalType: "string",
                name: "_salt",
                type: "string"
              }
            ],
            name: "solve",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "stake",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "enum RPSLS.Move",
                name: "_move1",
                type: "uint8"
              },
              {
                internalType: "enum RPSLS.Move",
                name: "_move2",
                type: "uint8"
              }
            ],
            name: "win",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool"
              }
            ],
            stateMutability: "pure",
            type: "function"
          }
        ]
      }
};