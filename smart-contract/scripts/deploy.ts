import { ethers } from "hardhat";

async function main() {
  const desTokenContract = await ethers.getContractFactory("DesToken");
  const token = await desTokenContract.deploy();

  console.log("Token address:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
