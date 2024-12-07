"use client";

import { useState, useEffect } from "react";
import { ethers, Contract, Signer } from "ethers";
import { useAccount } from "wagmi";
import type { NextPage } from "next";
import Link from "next/link";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Адрес контракта и ABI
const votingContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // Убедитесь, что это строка с прямым адресом
const votingAbi = [
  {
    "inputs": [
      { "internalType": "string", "name": "_question", "type": "string" },
      { "internalType": "uint256", "name": "_duration", "type": "uint256" }
    ],
    "name": "createVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_voteId", "type": "uint256" }],
    "name": "endVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_voteId", "type": "uint256" },
      { "internalType": "bool", "name": "_voteYes", "type": "bool" }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_voteId", "type": "uint256" }],
    "name": "getVoteResult",
    "outputs": [
      { "internalType": "string", "name": "question", "type": "string" },
      { "internalType": "uint256", "name": "yesVotes", "type": "uint256" },
      { "internalType": "uint256", "name": "noVotes", "type": "uint256" }
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
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      // Инициализация провайдера
      const web3Provider = new ethers.WebSocketProvider(window.ethereum);
      setProvider(web3Provider);

      // Получаем подписанта асинхронно
      const getSigner = async () => {
        const userSigner = await web3Provider.getSigner();
        setSigner(userSigner);
      };

      // Получаем контракт асинхронно
      const contractInstance = new ethers.Contract(votingContractAddress, votingAbi, web3Provider);
      setContract(contractInstance);

      getSigner(); // Вызываем асинхронную функцию для получения подписанта
    }
  }, []);

  // Создание голосования
  const handleCreateVote = async () => {
    if (contract && signer) {
      try {
        const tx = await contract.createVote(question, 3600); // Пример: создаем голосование на 1 час
        await tx.wait();
        console.log("Vote created successfully!");
      } catch (error) {
        console.error("Error creating vote:", error);
      }
    }
  };

  // Голосование (за/против)
  const handleVote = async (voteYes: boolean) => {
    if (contract && signer) {
      try {
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
      try {
        const result = await contract.getVoteResult(voteId);
        // Обновляем состояние с результатами голосования
        setVoteResult({
          yesVotes: result.yesVotes.toNumber(), // Преобразуем BigNumber в число
          noVotes: result.noVotes.toNumber()
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

        <div className="mt-8 text-center">
          <button
            onClick={() => handleVote(true)}
            className="btn btn-success"
          >
            Vote Yes
          </button>
          <button
            onClick={() => handleVote(false)}
            className="btn btn-error ml-4"
          >
            Vote No
          </button>
          <button
            onClick={handleEndVote}
            className="btn btn-warning ml-4"
          >
            End Voting
          </button>
          <button
            onClick={handleGetVoteResult}
            className="btn btn-info ml-4"
          >
            Get Results
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold">Vote Results:</h3>
          <p>Yes Votes: {voteResult.yesVotes}</p>
          <p>No Votes: {voteResult.noVotes}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
