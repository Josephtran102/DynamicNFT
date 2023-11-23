const { expect } = require("chai");

describe("dNFT", async function () {
  //LINK Token address set to Goerli address. Can get other values at https://docs.chain.link/docs/link-token-contracts
  //VRF Details set for Goerli environment, can get other values at https://docs.chain.link/docs/vrf-contracts#config
  const VRF_COORDINATOR = "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
  const LINK_TOKEN_ADDR = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const VRF_KEYHASH =
    "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";
  const VRF_FEE = "100000000000000000";

  it("Deploys to Goerli testnet and creates collectible", async function () {
    //deploy the contract
    this.timeout(0);
    const DNFT = await ethers.getContractFactory("dNFT");
    const dNFT = await DNFT.deploy(
      VRF_COORDINATOR,
      LINK_TOKEN_ADDR,
      VRF_KEYHASH,
      VRF_FEE
    );
    await dNFT.deployed();

    //Now that contract is funded, we can call the function to do the data request
    await hre.run("create-collectible", {
      contract: dNFT.address,
    });

    const tokenid = await dNFT.tokenCounter();

    expect(tokenid.toNumber()).to.be.greaterThan(0);
  });
});
