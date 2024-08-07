import { useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";

const SendToken = () => {
  const { web3, walletAddress, contract } = useWeb3();

  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleTokenTransfer = async () => {
    try {
      if (contract && walletAddress) {
        const amountInWei = web3?.utils.toWei(amount, "ether");
        await contract.methods
          .sendToken(recipient, amountInWei)
          .send({ from: walletAddress });
        console.log("sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>SendToken</div>;
};

export default SendToken;
