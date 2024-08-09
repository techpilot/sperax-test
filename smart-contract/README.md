<br />
<div align="center">
  <h3 align="center">SPERAX SMART CONTRACT</h3>

  <p align="center">
    <br />
    <br />
    <a href="https://github.com/techpilot/sperax-test.git/issues">View Demo</a>
  </p>
</div>

## About The Project

This project is a Solidity-based smart contract that allows minting, transferring tokens, and retrieving the balance of a given address. The project is developed using the Hardhat development environment.

### Built With

- [Typescript][Typescript_url]
- [React.js][React_js]

## Getting Started

Setup and run this project in your computer.

### Prerequisites

- Node

  ```sh
  sudo apt install nodejs
  ```

- npm

- Hardhat

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/techpilot/sperax-test.git
   ```
2. Navigate to the smart contract directory

   ```sh
   cd smart-contract
   ```

3. Install packages
   ```sh
   npm install
   ```
4. Compile the smart contract
   ```sh
   npx hardhat compile
   ```

### Deployment

1. Start a local Hardhat node

   ```sh
   npx hardhat node
   ```

2. Deploy the contract
   ```sh
   npx hardhat run scripts/deploy.ts --network hardhat
   ```
3. Deploy on testnet
   ```sh
   npx hardhat run scripts/deploy.ts --network sepolia
   ```
