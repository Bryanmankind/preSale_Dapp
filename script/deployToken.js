const {ethers} = require ("hardhat");


const main = async () => {
    const starterTokenContractFactory = await ethers.getContractFactory("PMTToken");
    const starterTokenDeploy = await starterTokenContractFactory.deploy();

    console.log("Contract deployed to: ", await starterTokenDeploy.getAddress());

    const amountToApprove = ethers.parseUnits("200000", "ether");
    const approveTx = await pmtTokenContract.approve(presaleContract.address, amountToApprove);
     await approveTx.wait();

  console.log(`Approved ${amountToApprove} tokens from PMTToken to Presale contract.`);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);

    }catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();