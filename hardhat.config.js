require("hardhat-deploy");
require("hardhat-docgen");
require("hardhat-deploy-ethers");
require("hardhat-abi-exporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");
//require("./tasks/Tasks");

/**
 * @type import("hardhat/config").HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      }
    }
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      forking: {
        url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_API_KEY}`,
        blockNumber: 31780576
      },
      gasPrice: 50000000000, //8000000000, // 50 gwei
      gas: 5000000 //2100000,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_API_KEY}`,
      gasPrice: 50000000000, // 50 gwei
      gas: 5000000,
      timeout: 1000000,
      accounts: [process.env.ETH_PRIVATE_KEY_ONE, process.env.ETH_PRIVATE_KEY_TWO, process.env.ETH_PRIVATE_KEY_THREE, process.env.ETH_PRIVATE_KEY_FOUR, process.env.ETH_PRIVATE_KEY_FIVE]
    }
  },
  etherscan: {
    apiKey: process.env.POLYSCAN_API,
    accounts: [process.env.ETH_PRIVATE_KEY_ONE]
  },
  namedAccounts: {
    deployer: {
      default: 0,
      goerli: "0x1C3f50CA4f8b96fAa6ab1020D9C54a44ADfAc814",
      mumbai: "0x1C3f50CA4f8b96fAa6ab1020D9C54a44ADfAc814",
    },
    owner: {
      default: 1,
      goerli: "0x9De58536C2013EA0d68531169d7b8001Bdc2f463",
      mumbai: "0x9De58536C2013EA0d68531169d7b8001Bdc2f463",
    },
    operator: {
      default: 2,
      goerli: "0xd6f2E32c6B3126c763f31B3d3aFC97F61E161454",
      mumbai: "0xd6f2E32c6B3126c763f31B3d3aFC97F61E161454",
    },
    alice: {
      default: 3,
      goerli: "0xdD468447Bd99040b70781D58cF80AA24b5a7Fe2c",
      mumbai: "0xdD468447Bd99040b70781D58cF80AA24b5a7Fe2c",
    },
    bob: {
      default: 4,
      goerli: "0x30f1563408D6a919FA93784Fc7df7a41DD7704cF",
      mumbai: "0x30f1563408D6a919FA93784Fc7df7a41DD7704cF",
    },
    swapFactory: {
      default: "0x009E2a5a72097d0C0c4CC3562e44C9eA5737C856",
      mumbai: '0x009E2a5a72097d0C0c4CC3562e44C9eA5737C856'
    },
    swapRouter: {
      default: "0xb08C0F2657329aB317286ca3Dcc23A5643e52CFa",
      mumbai: '0xb08C0F2657329aB317286ca3Dcc23A5643e52CFa'
    }
  },
  abiExporter: {
    path: "abi",
    clear: true,
    flat: true,
    spacing: 2
  },
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
    only: []
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    outputFile: "gas-report.txt",
    noColors: true,
  },
};
