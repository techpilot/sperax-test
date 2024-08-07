import { useWeb3 } from "../contexts/Web3Context";

const GetWalletBalance = () => {
  const { walletAddress, contract } = useWeb3();

  const handleGetBalance = async () => {
    try {
      if (contract && walletAddress) {
        const balance = await contract.methods
          .getBalance("0x70997970c51812dc3a010c7d01b50e0d17dc79c8")
          .call();
        console.log("BAlance", balance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>GetWalletBalance</div>;
};

export default GetWalletBalance;
