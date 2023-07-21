import { Address } from "wagmi";

export const contracts = {
    factory: {
        address: process.env.REACT_APP_PUBLIC_RPSLS_FACTORY_ADDRESS as Address,
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
                  name: "_player2",
                  type: "address"
                }
              ],
              name: "createFoundation",
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
        }
};