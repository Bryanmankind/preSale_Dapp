require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    "scroll-sepolia": {
      url: process.env.SCROLL_SEPOLIA_URL,
      accounts: [process.evn.DEPLOYER],
    },
  }
};