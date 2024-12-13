"use client";

import { useState, useEffect } from "react";
import { Contract, ethers} from "ethers";
import { useAccount } from "wagmi";
import type { NextPage } from "next";
import Link from "next/link";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Voting } from "../../hardhat/typechain-types/Voting";
import { YourContract} from "../../hardhat/typechain-types/YourContract";

// Адрес контракта и ABI
const votingContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "voteId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "question",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "VoteCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "voteId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "voteYes",
        "type": "bool"
      }
    ],
    "name": "Voted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "voteId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "yesVotes",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "noVotes",
        "type": "uint256"
      }
    ],
    "name": "VotingEnded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_question",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      }
    ],
    "name": "createVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_voteId",
        "type": "uint256"
      }
    ],
    "name": "endVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_voteId",
        "type": "uint256"
      }
    ],
    "name": "getVoteResult",
    "outputs": [
      {
        "internalType": "string",
        "name": "question",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "yesVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "noVotes",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "greeting",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_voteId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_voteYes",
        "type": "bool"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voteCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_voteId",
        "type": "uint256"
      }
    ],
    "name": "voteExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "votes",
    "outputs": [
      {
        "internalType": "string",
        "name": "question",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "yesVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "noVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isEnded",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];


const Home: NextPage = () => {
  const { address: connectedAddress, isConnected } = useAccount();
  const [voteId, setVoteId] = useState(0);
  const [question, setQuestion] = useState('');
  const [voteResult, setVoteResult] = useState<{ yesVotes: number; noVotes: number }>({
    yesVotes: 0,
    noVotes: 0
  });

  // Состояния для провайдера, подписанта и контракта
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<Contract  | null>(null);

  useEffect(() => {
    const initProviderAndContract = async () => {
      if (window.ethereum) {
        try {
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(browserProvider);

          // Получаем подписанта
          const userSigner = await browserProvider.getSigner();
          setSigner(userSigner);

          // Инициализируем контракт
          const contractInstance = new ethers.Contract(votingContractAddress, contractABI, browserProvider);
          setContract(contractInstance);

        } catch (error) {
          console.error("Error initializing provider, signer, or contract:", error);
        }
      } else {
        console.error("Ethereum provider not found.");
      }
    };

    initProviderAndContract(); // Выполняем инициализацию при монтировании компонента
  }, []);

  // Создание голосования
  const handleCreateVote = async () => {
    //console.log("Signer:", signer);
    //console.log("Contract:", contract);
    if (contract && signer && question) {
      try {
        console.log("????");
        //const contractWithSigner = new ethers.Contract(votingContractAddress, contractABI, signer);
        //console.log("Contract:", contractWithSigner);
        //const tx = await contractWithSigner.createVote(question, 3600); // Пример: создаем голосование на 1 час
        const tx = await contract.createVote(question, 3600); // Пример: создаем голосование на 1 час
        console.log("!!!!");
        await tx.wait();
        console.log("Vote created successfully!");
        <button onClick={() => { console.log("Vote No clicked"); handleVote(false); }} className="btn btn-error ml-4">
        Vote No
      </button>
      } catch (error) {
        console.error("Error creating vote:", error);
      }
    }
  };

  // Голосование (за/против)
  const handleVote = async (voteYes: boolean) => {
    if (contract && signer) {
      try {
        //const contractWithSigner = new ethers.Contract(votingContractAddress, contractABI, signer);
        const tx = await contract.vote(voteId, voteYes);  // Голосуем за/против
        await tx.wait();
        console.log("Vote casted successfully!");
      } catch (error) {
        console.error("Error casting vote:", error);
      }
    }
  };

  // Завершение голосования
  const handleEndVote = async () => {
    if (contract && signer) {
      try {
        //const contractWithSigner = new ethers.Contract(votingContractAddress, contractABI, signer);
        const tx = await contract.endVote(voteId);  // Завершаем голосование
        await tx.wait();
        console.log("Vote ended successfully!");
      } catch (error) {
        console.error("Error ending vote:", error);
      }
    }
  };

  // Получение результатов голосования
  const handleGetVoteResult = async () => {
    if (contract) {
      //const contractWithSigner = new ethers.Contract(votingContractAddress, contractABI, signer);
      try {
        // Проверяем существует ли голосование с данным ID
        //const exists = await contractWithSigner.voteExists(voteId);
        //if (!exists) {
        //  alert("Voting with this ID does not exist!"); // Предупреждение
        //  return;
        //}
        const result = await contract.getVoteResult(voteId);
        setVoteResult({
          yesVotes: Number(result.yesVotes.toString()),
          noVotes: Number(result.noVotes.toString())
        });
      } catch (error) {
        console.error("Error fetching vote result:", error);
      }
    }
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">Voting System</span>
        </h1>

        <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
          <p className="my-2 font-medium">Connected Address:</p>
          <p>{connectedAddress}</p>
        </div>

        <div className="text-center mt-6">
          <input
            type="text"
            placeholder="Enter a voting question"
            className="input input-bordered input-primary w-full max-w-xs"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleCreateVote} className="btn btn-primary mt-4">
            Create Vote
          </button>
        </div>

        <div className="mt-4 text-center">
          <input
            type="number"
            placeholder="Enter Vote ID"
            className="input input-bordered input-primary w-full max-w-xs"
            value={voteId}
            onChange={(e) => setVoteId(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => handleVote(true)} className="btn btn-success">
            Vote Yes
          </button>
          <button onClick={() => handleVote(false)} className="btn btn-error ml-4">
            Vote No
          </button>
          <button onClick={handleEndVote} className="btn btn-warning ml-4">
            End Voting
          </button>
          <button onClick={handleGetVoteResult} className="btn btn-info ml-4">
            Get Results
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold">Vote Results for ID {voteId}:</h3>
          <p>Yes Votes: {voteResult.yesVotes}</p>
          <p>No Votes: {voteResult.noVotes}</p>
        </div>
      </div>
    </div>
  );
};


export default Home;
