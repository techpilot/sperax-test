import React, { useState, useEffect, ReactNode } from "react";
import Web3 from "web3";
import DesTokenContract from "../contracts/DesToken.json";
import { Web3Context } from "./Web3Context";

const ContractContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [balance, setBalance] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [contract, setContract] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else if (window.web3) {
      const web3Instance = new Web3(window.web3.currentProvider);
      setWeb3(web3Instance);
    } else {
      alert(
        "No Ethereum detected in your browser. You should consider trying MetaMask!"
      );
    }
    connectWallet();
  }, []);

  // Connects to a browser ehtereum wallet
  const connectWallet = async () => {
    try {
      const web3Instance = new Web3(window?.ethereum);
      const accounts = await web3Instance.eth.requestAccounts();
      setWalletAddress(accounts[0]);

      const contractInstance = new web3Instance.eth.Contract(
        DesTokenContract.abi,
        DesTokenContract.address
      );

      setContract(contractInstance);

      return accounts[0];
    } catch (error) {
      alert("Wallet connection canceled");
    }
  };

  // connects to smart contract using the provided ABi and contract address
  const connectContract = () => {
    const web3Instance = new Web3(window?.ethereum);
    const contractInstance = new web3Instance.eth.Contract(
      DesTokenContract.abi,
      DesTokenContract.address
    );
    setContract(contractInstance);
    return contractInstance;
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        balance,
        setBalance,
        walletAddress,
        connectWallet,
        contract,
        modalIsOpen,
        setModalIsOpen,
        amount,
        setAmount,
        recipient,
        setRecipient,
        setWalletAddress,
        setContract,
        connectContract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default ContractContextProvider;
