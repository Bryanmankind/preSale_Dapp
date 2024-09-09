require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    "scroll-sepolia": {
      url: "https://scroll-sepolia.blastapi.io/33eaf70b-45fc-43f3-88f2-3801210d2aba",
      accounts: ["2a442a5aea064e8f9b00ae0069dd857355a9b37682d61e82151118007c3d6b66"],
    },
  }
};