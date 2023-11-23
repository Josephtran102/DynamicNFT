module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  //LINK Token address set to Goerli address. Can get other values at https://docs.chain.link/docs/link-token-contracts
  //VRF Details set for Goerli environment, can get other values at https://docs.chain.link/docs/vrf-contracts#config
  const VRF_COORDINATOR = "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
  const LINK_TOKEN_ADDR = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const VRF_KEYHASH =
    "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";
  const VRF_FEE = "100000000000000000";

  console.log("----------------------------------------------------");
  console.log("Deploying dNFT");
  const dNFT = await deploy("dNFT", {
    from: deployer,
    gasLimit: 4000000,
    args: [VRF_COORDINATOR, LINK_TOKEN_ADDR, VRF_KEYHASH, VRF_FEE],
  });

  console.log("dNFT deployed to: ", dNFT.address);
  console.log("Run the following command to fund contract with LINK:");
  console.log("npx hardhat fund-link --contract ", dNFT.address);
  console.log("Then create a dNFT with the following command:");
  console.log("npx hardhat create-collectible --contract ", dNFT.address);
  console.log("----------------------------------------------------");
};
