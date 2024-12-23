/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    YourContract: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "voteId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "question",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "endTime",
              type: "uint256",
            },
          ],
          name: "VoteCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "voteId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "voter",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "voteYes",
              type: "bool",
            },
          ],
          name: "Voted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "voteId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "yesVotes",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "noVotes",
              type: "uint256",
            },
          ],
          name: "VotingEnded",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_question",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_duration",
              type: "uint256",
            },
          ],
          name: "createVote",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_voteId",
              type: "uint256",
            },
          ],
          name: "endVote",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_voteId",
              type: "uint256",
            },
          ],
          name: "getVoteResult",
          outputs: [
            {
              internalType: "string",
              name: "question",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "yesVotes",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "noVotes",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "greeting",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_voteId",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "_voteYes",
              type: "bool",
            },
          ],
          name: "vote",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "voteCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "votes",
          outputs: [
            {
              internalType: "string",
              name: "question",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "yesVotes",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "noVotes",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "endTime",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isEnded",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
