/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface VotingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "createVote"
      | "endVote"
      | "getVoteResult"
      | "vote"
      | "voteCount"
      | "votes"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "VoteCreated" | "Voted" | "VotingEnded"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "createVote",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "endVote",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getVoteResult",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(functionFragment: "voteCount", values?: undefined): string;
  encodeFunctionData(functionFragment: "votes", values: [BigNumberish]): string;

  decodeFunctionResult(functionFragment: "createVote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "endVote", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getVoteResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "voteCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "votes", data: BytesLike): Result;
}

export namespace VoteCreatedEvent {
  export type InputTuple = [
    voteId: BigNumberish,
    question: string,
    endTime: BigNumberish
  ];
  export type OutputTuple = [voteId: bigint, question: string, endTime: bigint];
  export interface OutputObject {
    voteId: bigint;
    question: string;
    endTime: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VotedEvent {
  export type InputTuple = [
    voteId: BigNumberish,
    voter: AddressLike,
    voteYes: boolean
  ];
  export type OutputTuple = [voteId: bigint, voter: string, voteYes: boolean];
  export interface OutputObject {
    voteId: bigint;
    voter: string;
    voteYes: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VotingEndedEvent {
  export type InputTuple = [
    voteId: BigNumberish,
    yesVotes: BigNumberish,
    noVotes: BigNumberish
  ];
  export type OutputTuple = [voteId: bigint, yesVotes: bigint, noVotes: bigint];
  export interface OutputObject {
    voteId: bigint;
    yesVotes: bigint;
    noVotes: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Voting extends BaseContract {
  connect(runner?: ContractRunner | null): Voting;
  waitForDeployment(): Promise<this>;

  interface: VotingInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  createVote: TypedContractMethod<
    [_question: string, _duration: BigNumberish],
    [void],
    "nonpayable"
  >;

  endVote: TypedContractMethod<[_voteId: BigNumberish], [void], "nonpayable">;

  getVoteResult: TypedContractMethod<
    [_voteId: BigNumberish],
    [
      [string, bigint, bigint] & {
        question: string;
        yesVotes: bigint;
        noVotes: bigint;
      }
    ],
    "view"
  >;

  vote: TypedContractMethod<
    [_voteId: BigNumberish, _voteYes: boolean],
    [void],
    "nonpayable"
  >;

  voteCount: TypedContractMethod<[], [bigint], "view">;

  votes: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, bigint, boolean] & {
        question: string;
        yesVotes: bigint;
        noVotes: bigint;
        endTime: bigint;
        isEnded: boolean;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createVote"
  ): TypedContractMethod<
    [_question: string, _duration: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "endVote"
  ): TypedContractMethod<[_voteId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getVoteResult"
  ): TypedContractMethod<
    [_voteId: BigNumberish],
    [
      [string, bigint, bigint] & {
        question: string;
        yesVotes: bigint;
        noVotes: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "vote"
  ): TypedContractMethod<
    [_voteId: BigNumberish, _voteYes: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "voteCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "votes"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, bigint, boolean] & {
        question: string;
        yesVotes: bigint;
        noVotes: bigint;
        endTime: bigint;
        isEnded: boolean;
      }
    ],
    "view"
  >;

  getEvent(
    key: "VoteCreated"
  ): TypedContractEvent<
    VoteCreatedEvent.InputTuple,
    VoteCreatedEvent.OutputTuple,
    VoteCreatedEvent.OutputObject
  >;
  getEvent(
    key: "Voted"
  ): TypedContractEvent<
    VotedEvent.InputTuple,
    VotedEvent.OutputTuple,
    VotedEvent.OutputObject
  >;
  getEvent(
    key: "VotingEnded"
  ): TypedContractEvent<
    VotingEndedEvent.InputTuple,
    VotingEndedEvent.OutputTuple,
    VotingEndedEvent.OutputObject
  >;

  filters: {
    "VoteCreated(uint256,string,uint256)": TypedContractEvent<
      VoteCreatedEvent.InputTuple,
      VoteCreatedEvent.OutputTuple,
      VoteCreatedEvent.OutputObject
    >;
    VoteCreated: TypedContractEvent<
      VoteCreatedEvent.InputTuple,
      VoteCreatedEvent.OutputTuple,
      VoteCreatedEvent.OutputObject
    >;

    "Voted(uint256,address,bool)": TypedContractEvent<
      VotedEvent.InputTuple,
      VotedEvent.OutputTuple,
      VotedEvent.OutputObject
    >;
    Voted: TypedContractEvent<
      VotedEvent.InputTuple,
      VotedEvent.OutputTuple,
      VotedEvent.OutputObject
    >;

    "VotingEnded(uint256,uint256,uint256)": TypedContractEvent<
      VotingEndedEvent.InputTuple,
      VotingEndedEvent.OutputTuple,
      VotingEndedEvent.OutputObject
    >;
    VotingEnded: TypedContractEvent<
      VotingEndedEvent.InputTuple,
      VotingEndedEvent.OutputTuple,
      VotingEndedEvent.OutputObject
    >;
  };
}