import { expect } from "chai";
import { ethers } from "hardhat";
import { Voting } from "../typechain";

describe("Voting", function () {

  let votingContract: Voting;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const votingContractFactory = await ethers.getContractFactory("Voting");
    votingContract = (await votingContractFactory.deploy(owner.address)) as unknown as Voting;
    await votingContract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await votingContract.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";
    });
  });
});