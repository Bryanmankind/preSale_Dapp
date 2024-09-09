const { ethers } = require("hardhat");

const main = async () => {
  // Deploy the PMTToken contract
  const PMTTokenContractFactory = await ethers.getContractFactory("PMTToken");
  const pmtTokenContract = await PMTTokenContractFactory.deploy();

  console.log("PMTToken Contract deployed to:", await pmtTokenContract.getAddress());

  // Deploy the Presale contract
  const PresaleContractFactory = await ethers.getContractFactory("StarterPreSale"); // Replace with your actual presale contract factory
  const presaleContract = await PresaleContractFactory.deploy(pmtTokenContract.getAddress(), "0x2C9678042D52B97D27f2bD2947F7111d93F3dD0D");

  console.log("Presale Contract deployed to:", await presaleContract.getAddress());

  // Approve the Presale contract to spend tokens from the PMTToken contract
  const amountToApprove = ethers.parseUnits("200000", "ether"); // Adjust the amount as needed
  const approveTx = await pmtTokenContract.approve(presaleContract.getAddress(), amountToApprove);
  await approveTx.wait();

  console.log(`Approved ${amountToApprove} tokens from PMTToken to Presale contract.`);


  const gasLimit = ethers.toBeHex(300000); // Adjust the gas limit if needed
  const depositTx = await presaleContract.depositPMT(amountToApprove, {
    gasLimit: 200000
  });

  await depositTx.wait();

  console.log(`Deposited ${amountToApprove} tokens from PMTToken to Presale contract.`);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
