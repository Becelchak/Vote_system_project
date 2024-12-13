/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { Voting, VotingInterface } from "../Voting";

const _abi = [
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061093b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80634541c853146100675780635df813301461007c578063865df0ad146100a9578063bfa0fc93146100bc578063c6384071146100de578063c9d27afe146100f5575b600080fd5b61007a6100753660046105ab565b610108565b005b61008f61008a366004610660565b6101ee565b6040516100a09594939291906106bf565b60405180910390f35b61007a6100b7366004610660565b6102a8565b6100cf6100ca366004610660565b6103bd565b6040516100a0939291906106f8565b6100e760015481565b6040519081526020016100a0565b61007a61010336600461071d565b61047a565b60018054908190600061011a83610768565b909155506000905061012c8342610781565b6040805160a081018252868152600060208083018290528284018290526060830185905260808301829052868252819052919091208151929350909181906101749082610823565b50602082015160018201556040808301516002830155606083015160038301556080909201516004909101805460ff19169115159190911790555182907f524ae7610c7dd0c1b94d8155ea00bc06c2e5e7069c118c88441de4f2970803e6906101e090879085906108e3565b60405180910390a250505050565b6000602081905290815260409020805481906102099061079a565b80601f01602080910402602001604051908101604052809291908181526020018280546102359061079a565b80156102825780601f1061025757610100808354040283529160200191610282565b820191906000526020600020905b81548152906001019060200180831161026557829003601f168201915b505050506001830154600284015460038501546004909501549394919390925060ff1685565b6000818152602081905260409020600381015442101561030f5760405162461bcd60e51b815260206004820152601d60248201527f566f74696e672074696d6520686173206e6f7420656e6465642079657400000060448201526064015b60405180910390fd5b600481015460ff161561035e5760405162461bcd60e51b8152602060048201526017602482015276159bdd1a5b99c81a5cc8185b1c9958591e48195b991959604a1b6044820152606401610306565b60048101805460ff19166001908117909155810154600282015460405184927fcea89ec8feb1022162fb57e69a2bb2c4774289bcc281c3e4ff611d3a63ee6e08926103b192918252602082015260400190565b60405180910390a25050565b60008181526020819052604081206001810154600282015482546060949384939092839283906103ec9061079a565b80601f01602080910402602001604051908101604052809291908181526020018280546104189061079a565b80156104655780601f1061043a57610100808354040283529160200191610465565b820191906000526020600020905b81548152906001019060200180831161044857829003601f168201915b50505050509250935093509350509193909250565b6000828152602081905260409020600381015442106104ce5760405162461bcd60e51b815260206004820152601060248201526f159bdd1a5b99c81a185cc8195b99195960821b6044820152606401610306565b600481015460ff161561051d5760405162461bcd60e51b8152602060048201526017602482015276159bdd1a5b99c81a5cc8185b1c9958591e48195b991959604a1b6044820152606401610306565b811561053f5760018101805490600061053583610768565b9190505550610557565b60028101805490600061055183610768565b91905055505b6040518215158152339084907ff2913dbe661ee2acc4a046d8fbcdc792373bda34c41c6086484b5345e5785e5f9060200160405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156105be57600080fd5b823567ffffffffffffffff808211156105d657600080fd5b818501915085601f8301126105ea57600080fd5b8135818111156105fc576105fc610595565b604051601f8201601f19908116603f0116810190838211818310171561062457610624610595565b8160405282815288602084870101111561063d57600080fd5b826020860160208301376000602093820184015298969091013596505050505050565b60006020828403121561067257600080fd5b5035919050565b6000815180845260005b8181101561069f57602081850181015186830182015201610683565b506000602082860101526020601f19601f83011685010191505092915050565b60a0815260006106d260a0830188610679565b905085602083015284604083015283606083015282151560808301529695505050505050565b60608152600061070b6060830186610679565b60208301949094525060400152919050565b6000806040838503121561073057600080fd5b823591506020830135801515811461074757600080fd5b809150509250929050565b634e487b7160e01b600052601160045260246000fd5b60006001820161077a5761077a610752565b5060010190565b8082018082111561079457610794610752565b92915050565b600181811c908216806107ae57607f821691505b6020821081036107ce57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561081e57600081815260208120601f850160051c810160208610156107fb5750805b601f850160051c820191505b8181101561081a57828155600101610807565b5050505b505050565b815167ffffffffffffffff81111561083d5761083d610595565b6108518161084b845461079a565b846107d4565b602080601f831160018114610886576000841561086e5750858301515b600019600386901b1c1916600185901b17855561081a565b600085815260208120601f198616915b828110156108b557888601518255948401946001909101908401610896565b50858210156108d35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6040815260006108f66040830185610679565b9050826020830152939250505056fea2646970667358221220c6c79531e7042584f4e65657161ef784d80d011ed81135e6d921a9be77e1976264736f6c63430008140033";

type VotingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VotingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Voting__factory extends ContractFactory {
  constructor(...args: VotingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Voting & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Voting__factory {
    return super.connect(runner) as Voting__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VotingInterface {
    return new Interface(_abi) as VotingInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Voting {
    return new Contract(address, _abi, runner) as unknown as Voting;
  }
}
