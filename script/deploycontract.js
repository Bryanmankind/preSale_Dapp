const {ethers} = require ("hardhat");

const main = async () => {
    const StarterPreSaleContract = await ethers.getContractFactory("StarterPreSale");
    const starterPreSaleContract = await StarterPreSaleContract.deploy("0xf5C82A01c5DFCAB20c1990141c7E354e660D362f", "0x2C9678042D52B97D27f2bD2947F7111d93F3dD0D");

    console.log("Contract deploy to: ", await starterPreSaleContract.getAddress());
}

const runMain = async () => {
    try {
        await main ();
        process.exit(0);
    } catch (error) {
        console.log (error);
        process.exit(1);
    }
}


runMain();